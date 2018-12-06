import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated, Dimensions } from 'react-native';

import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';

const height = 48;
const divider = 0.8;

class Heroes extends Component {
    constructor(props) {
        super(props);
        const { heroes } = props;

        this.state = {
            pan: heroes.map(h => new Animated.ValueXY()),
            showDraggable: true,
            dropZoneValues: null
        };

        this.panResponder = heroes.map((h, i) =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: Animated.event([
                    null,
                    {
                        dx: this.state.pan[i].x,
                        dy: this.state.pan[i].y
                    }
                ]),
                onPanResponderRelease: (e, gesture) => {
                    if (this.isDropZone(gesture)) {
                        this.setState({
                            showDraggable: false
                        });
                    } else {
                        Animated.spring(this.state.pan[i], { toValue: { x: 0, y: 0 } }).start();
                    }
                }
            })
        );
    }

    isDropZone(gesture) {
        const dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    setDropZoneValues(event) {
        this.setState({
            dropZoneValues: event.nativeEvent.layout
        });
    }

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
        return (
            <View style={{ position: 'absolute', top: 8, left }}>
                <Animated.View
                    {...this.panResponder[num - 1].panHandlers}
                    style={[this.state.pan[num - 1].getLayout()]}
                >
                    <Avatar
                        item={item}
                        height={height}
                        round={turn}
                        navigate={this.props.navigate}
                    />
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
            <View style={styles.mainContainer}>
                <View style={styles.dropZone} onLayout={this.setDropZoneValues.bind(this)} />
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

const styles = StyleSheet.create({
    mainContainer: {
        height: 64,
        width: '100%'
    },
    dropZone: {
        height: 64
    }
});
