'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet, Button
} from 'react-native';

import LoginBackground from '../components/LoginBackground.js';
import Logo from '../components/Logo.js';
import InputEmail from '../components/InputEmail.js';
import InputPassword from '../components/InputPassword.js'

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userId: ''
        };
    }

    updateEmail = (text) => {
        this.setState({email: text})
    }

    updatePassword = (text) => {
        this.setState({password: text})
    }

    render() {
        return (
            <LoginBackground>
                <Logo></Logo>
                <InputEmail text="Email" updateEmail={this.updateEmail}></InputEmail>
                <InputPassword text="Password" updatePassword={this.updatePassword}></InputPassword>
                <Button
                    onPress={()=>this.authenticate()}
                    title="Login"
                    color="#F2F4FE"
                />
                <Button
                    onPress={() => {
                      this.props.navigator.push({
                        name: 'Registration',
                      });
                    }}
                    title="Create a new account"
                    color="#F2F4FE"
                />
            </LoginBackground>
        );
    }

    authenticate() {
        var emailInput = this.state.email.text;
        var passwordInput = this.state.password.text;

        var details = {
            'email': emailInput,
            'password': passwordInput
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:5000/api/authentication', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseData) => {
                if ( responseData == "Invalid password" ) return;
                if ( responseData == "No user exists with that email, please create an account." ) return;
                this.setState({
                    userId: responseData._id
                });
                this.openNextPage();
            })
            .done();

    }

    openNextPage() {
        this.props.navigator.push({
            name: 'Payments',
            userId: this.state.userId
        });
    }


};


export default Login;