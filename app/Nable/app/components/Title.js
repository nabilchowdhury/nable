/**
 * Created by JohnWu on 2017-04-01.
 */
/**
 * Created by JohnWu on 2017-04-01.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Dimensions from 'Dimensions';

var windowHeight = Dimensions.get('window').height;

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
        };
    }

    render() {
        return (
            <Text style={styles.text}>{this.state.text}</Text>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        color: '#063e77',
        textAlign: 'center',
        marginTop: windowHeight/7,
        fontSize: windowHeight/25
    }
});

export default Input;