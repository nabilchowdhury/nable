/**
 * nable.js
 *
 * main app file
 *
 * @jwu
 */

import React, { Component } from 'react';
import {
    Navigator
} from 'react-native';

import Payments from './scenes/Payments.js';
import AddPayment from './scenes/AddPayment.js';
import Login from './scenes/Login.js';
import Registration from './scenes/Registration.js';

export default class nable extends Component {

    constructor(props) {
        super(props);
        this._renderScene = this._renderScene.bind(this);
        this._configureScene = this._configureScene.bind(this);
    }


    _renderScene(route, navigator) {
        switch (route.name) {
            case 'Login':
                return ( <Login
                    {...route}
                    navigator={navigator} />);
            case 'Payments':
                return ( <Payments
                    {...route}
                    navigator={navigator} />);
            case 'AddPayment':
                return ( <AddPayment
                    {...route}
                    navigator={navigator} />);

            case 'Registration':
                return ( <Registration
                    {...route}
                    navigator={navigator} />);
            default:
                return;
        }
    }

    _configureScene(route) {
        switch (route.name) {
            default:
                return Navigator.SceneConfigs.HorizontalSwipeJump;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ name: 'Login' }}
                configureScene={this._configureScene}
                renderScene={this._renderScene} />
        );
    }
}