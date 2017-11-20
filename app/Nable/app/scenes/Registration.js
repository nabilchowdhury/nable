/**
 * Created by JohnWu on 2017-04-01.
 */
'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Button
} from 'react-native';

import LoginBackground from '../components/LoginBackground.js';
import Title from '../components/Title.js';
import InputUsername from '../components/InputUsername.js';
import InputRegistrationEmail from '../components/InputRegistrationEmail.js';
import InputRegistrationPhone from '../components/InputRegistrationPhone.js';
import InputRegistrationPassword from '../components/InputRegistrationPassword.js';

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: ''
        };
    }

    updateUsername = (text) => {
        this.setState({name: text})
    }

    updateRegistrationEmail = (text) => {
        this.setState({email: text})
    }

    updateRegistrationPhone = (text) => {
        this.setState({phone: text})
    }

    updateRegistrationPassword = (text) => {
        this.setState({password: text})
    }

    render() {
        return (
            <LoginBackground>
                <Title text="Registration"></Title>
                <InputUsername text="Name" updateUsername={this.updateUsername}></InputUsername>
                <InputRegistrationEmail text="Email" updateRegistrationEmail={this.updateRegistrationEmail}></InputRegistrationEmail>
                <InputRegistrationPhone text="Phone Number" updateRegistrationPhone={this.updateRegistrationPhone}></InputRegistrationPhone>
                <InputRegistrationPassword text="Password" updateRegistrationPassword={this.updateRegistrationPassword}></InputRegistrationPassword>
                <Button
                    onPress={()=>this.createAccount()}
                    title="Submit"
                    color="#063e77"
                />
            </LoginBackground>
        );
    }

    createAccount() {
        var inputName = this.state.name.text;
        var inputEmail = this.state.email.text;
        var inputPhone = this.state.phone.text;
        var inputPassword = this.state.password.text;

        if ( inputName == undefined || inputEmail == undefined ||  inputPhone == undefined || inputPassword == undefined) {
            return;
        }

        var details = {
            'name': inputName,
            'email': inputEmail,
            'phone': inputPhone,
            'password': inputPassword
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:5000/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseData) => {
                if ( responseData == "Duplicate entry" ) return;
                this.goBackToLastPage();
            })
            .done();

    }

    goBackToLastPage() {
        this.props.navigator.pop();
    }

};

export default Registration;
