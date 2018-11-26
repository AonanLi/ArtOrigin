import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import styles from './style';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = { values: props.record };
    }

    onChange = values => this.setState({ values });

    render() {
        const { path, max, icon, color, onChange, lock } = this.props;
        const { values } = this.state;
        const slider = (
            <MultiSlider
                values={values}
                sliderLength={icon ? 198 : 248}
                min={1}
                max={max}
                selectedStyle={{ backgroundColor: color }}
                isMarkersSeparated
                onValuesChangeStart={() => lock(true)}
                onValuesChangeFinish={v => {
                    lock(false);
                    onChange(path, v);
                }}
                onValuesChange={v => this.setState({ values: v })}
                customMarkerLeft={() => (
                    <View style={styles.outer}>
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: color
                            }}
                        />
                        <Text style={styles.left}>{values[0]}</Text>
                    </View>
                )}
                customMarkerRight={() => (
                    <View style={styles.outer}>
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: color
                            }}
                        />
                        <Text style={styles.right}>{values[1]}</Text>
                    </View>
                )}
            />
        );
        return (
            <View>
                {icon ? (
                    <View style={styles.row}>
                        <Image source={icon} style={styles.sliderImage} />
                        {slider}
                    </View>
                ) : (
                    slider
                )}
            </View>
        );
    }
}

export default Slider;
