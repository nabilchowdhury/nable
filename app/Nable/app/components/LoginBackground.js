/**
 * Created by JohnWu on 2017-04-01.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

class LoginBackground extends Component {

    render() {
        return (
            <Image source={require('../images/background.jpg')}
                   style={styles.backgroundImage}>
                {this.props.children}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});

export default LoginBackground;