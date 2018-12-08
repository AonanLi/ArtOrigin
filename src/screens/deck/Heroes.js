import React, { Component } from 'react';
import { View, PanResponder, Animated } from 'react-native';
import { Text } from 'native-base';
import i18n from 'i18n-js';
import _ from 'lodash';

import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';

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
                    Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5,
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
                        this.swap(i, joinedIndex);
                    } else {
                        if (this.outSpace(gesture, i)) {
                            this.removeHero(i);
                        }
                    }
                    Animated.spring(this.state.pan[i], { toValue: { x: 0, y: 0 } }).start();
                }
            });
        });
    };

    swap = (from, to) => this.props.swapHeroes(from, to);

    setZIndex = (i, index) => this.setState({ zIndex: { ...this.state.zIndex, [i]: index } });

    removeHero = i => this.props.manageDeckCards(this.props.heroes[i], -1);

    distance = () => {
        const gap = this.getGap();
        return {
            0: {
                1: gap + 24,
                2: 2 * gap + 72,
                3: 4 * gap + 120.8,
                4: 6 * gap + 169.6
            },
            1: {
                2: gap + 24,
                3: 3 * gap + 72.8,
                4: 5 * gap + 121.6
            },
            2: {
                3: 2 * gap + 24.8,
                4: 4 * gap + 73.6
            },
            3: {
                4: 2 * gap + 24.8
            }
        };
    };

    joinedIndex = (gesture, i) => {
        const { dx, dy } = gesture;

        if (dy < -24 || dy > 24) {
            //vertically fall out
            return undefined;
        }

        const distances = this.distance();

        for (let q = 0; q <= 4; q++) {
            if (q > i) {
                //drag right
                const distance = distances[i][q];
                if (dx >= distance && dx <= distance + 48) {
                    return q;
                }
            }
            if (q < i) {
                //drag left
                const distance = -distances[q][i];
                if (dx >= distance - 48 && dx <= distance) {
                    return q;
                }
            }
        }
    };

    outSpace = (gesture, i) => {
        const dz = this.state.space[i];
        return Math.abs(gesture.dx) >= 48 || Math.abs(gesture.dy) >= 48;
    };

    setSpace = (event, i) =>
        this.setState({
            space: { ...this.state.space, [i]: event.nativeEvent.layout }
        });

    getGap = () => (this.props.width - 238.4) / 6;

    calculateAvatar = num => {
        const { heroes } = this.props;
        const gap = this.getGap();
        const turn = num < 4 ? 1 : num - 2;
        const index = num < 4 ? num - 1 : 0;
        const item = heroes.filter(h => h.turn === turn)[index];
        const left = (num - 1) * (gap + 48) + (num > 3 ? (num - 3) * (0.8 + gap) : 0);
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
                    width: 48,
                    height: 48,
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
        let left = 3 * (gap + 48);
        if (num === 2) {
            left = 5 * gap + 192.8;
        }
        return (
            <View style={{ position: 'absolute', top: 8, left }}>
                <Divider length={48} />
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
    empty: { position: 'absolute', top: 2, width: '100%' },
    round: { textAlign: 'center', fontSize: 10 },
    turn: { textAlign: 'center', fontSize: 22 }
};
