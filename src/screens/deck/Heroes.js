import React, { Component } from 'react';
import { View, PanResponder, Animated } from 'react-native';
import { Text } from 'native-base';
import { Image } from 'react-native-expo-image-cache';
import i18n from 'i18n-js';
import _ from 'lodash';

import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';

const height = 48;
const divider = 0.8;
const array = _.times(5);

class Heroes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: array.map(h => new Animated.ValueXY()),
            space: array.map(h => null),
            zIndex: array.map(h => 1)
        };
        this.setPan();
    }

    setPan = () => {
        this.panResponder = array.map((h, i) => {
            const { zIndex } = this.state;
            return PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: (e, gesture) =>
                    Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10,
                onPanResponderMove: (e, gesture) => {
                    if (zIndex[i] === 1) {
                        this.setZIndex(i, 2);
                    }
                    Animated.event([
                        null,
                        {
                            dx: this.state.pan[i].x,
                            dy: this.state.pan[i].y
                        }
                    ])(e, gesture);
                },
                onPanResponderRelease: (e, gesture) => {
                    this.setZIndex(i, 1);
                    const joinedIndex = this.joinedIndex(gesture, i);
                    if (!_.isUndefined(joinedIndex)) {
                        //inOther
                        // swap
                    } else {
                        if (this.outSpace(gesture, i)) {
                            this.removeHero(i);
                        }
                        Animated.spring(this.state.pan[i], { toValue: { x: 0, y: 0 } }).start();
                    }
                }
            });
        });
    };

    setZIndex = (i, index) => this.setState({ zIndex: { ...this.state.zIndex, [i]: index } });

    removeHero = i => this.props.manageDeckCards(this.props.heroes[i], -1);

    joinedIndex = (gesture, i) => {
        switch (i) {
            case 0:
                return undefined;
            case 1:
                return undefined;
            case 2:
                return undefined;
            case 3:
                return undefined;
            case 4:
                return undefined;
            default:
                return undefined;
        }
    };

    outSpace = (gesture, i) => {
        const dz = this.state.space[i];
        return Math.abs(gesture.dx) >= height || Math.abs(gesture.dy) >= height;
    };

    setSpace = (event, i) =>
        this.setState({
            space: { ...this.state.space, [i]: event.nativeEvent.layout }
        });

    getGap = () => (this.props.width - 5 * height - 2 * divider) / 6;

    calculateAvatar = num => {
        const { heroes } = this.props;
        const gap = this.getGap();
        const turn = num < 4 ? 1 : num - 2;
        const index = num < 4 ? num - 1 : 0;
        const item = heroes.filter(h => h.turn === turn)[index];
        const left = (num - 1) * (gap + height) + (num > 3 ? (num - 3) * (divider + gap) : 0);
        return { left, turn, item };
    };

    renderAvatar = num => {
        const { left, turn, item } = this.calculateAvatar(num);
        const i = num - 1;
        const { zIndex } = this.state;
        const isDragged = !_.every(zIndex, z => z === 1);
        return (
            <View
                onLayout={e => this.setSpace(e, i)}
                style={{
                    position: 'absolute',
                    top: 8,
                    left,
                    borderWidth: 1,
                    borderColor: isDragged ? '#cad4ff' : '#42565f',
                    width: height,
                    height,
                    zIndex: zIndex[i]
                }}
            >
                <View style={style.empty}>
                    <Text style={style.round}>{i18n.t('Round')}</Text>
                    <Text style={style.turn}>{turn}</Text>
                </View>
                <Animated.View
                    {...this.panResponder[i].panHandlers}
                    style={[this.state.pan[i].getLayout()]}
                >
                    <Avatar item={item} navigate={this.props.navigate} />
                </Animated.View>
            </View>
        );
    };

    renderDivider = num => {
        const gap = this.getGap();
        let left = 3 * (gap + height);
        if (num === 2) {
            left = 5 * gap + 4 * height + divider;
        }
        return (
            <View style={{ position: 'absolute', top: 8, left }}>
                <Divider length={height} />
            </View>
        );
    };

    render() {
        return (
            <View style={style.container}>
                {this.renderAvatar(1)}
                {this.renderAvatar(2)}
                {this.renderAvatar(3)}
                {this.renderDivider(1)}
                {this.renderAvatar(4)}
                {this.renderDivider(2)}
                {this.renderAvatar(5)}
            </View>
        );
    }
}

export default Heroes;

const style = {
    container: {
        height: 64,
        width: '100%'
    },
    empty: { position: 'absolute', left: 13, top: 2 },
    round: { textAlign: 'center', fontSize: 10 },
    turn: { textAlign: 'center', fontSize: 22 }
};
