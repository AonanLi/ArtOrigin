import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import styles from './style';

class Slider extends Component {
    constructor(props) {
        super(props);
        const { label, record } = props;
        this.state = { values: record[label] };
    }

    onChange = values => this.setState({ values });

    render() {
        const { label, max, icon, color, onChange } = this.props;
        const { values } = this.state;
        const slider = (
            <MultiSlider
                values={values}
                sliderLength={icon ? 198 : 248}
                min={1}
                max={max}
                selectedStyle={{ backgroundColor: color }}
                isMarkersSeparated
                onValuesChangeStart={() => onChange('locked', true)}
                onValuesChangeFinish={v => {
                    onChange('locked', false);
                    onChange(label, v);
                }}
                onValuesChange={v => this.setState({ values: v })}
                customMarkerLeft={() => (
                    <View style={{ marginTop: 22 }}>
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: color
                            }}
                        />
                        <Text style={{ marginTop: 5, marginLeft: 3 }}>{values[0]}</Text>
                    </View>
                )}
                customMarkerRight={() => (
                    <View style={{ marginTop: 22 }}>
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: color
                            }}
                        />
                        <Text style={{ marginTop: 5 }}>{values[1]}</Text>
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
