/**
 * Created by JohnWu on 2017-04-01.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';

import Dimensions from 'Dimensions';

var windowHeight = Dimensions.get('window').height;

class Logo extends Component {

    render() {
        return (
            <Image style={styles.logo} source={require('../images/logo.png')} />
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        marginTop: windowHeight/6,
        height: windowHeight/4,
        width: windowHeight/4
    }
});

export default Logo;