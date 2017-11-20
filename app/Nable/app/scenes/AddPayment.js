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

import Input from '../components/Input.js';
import LoginBackground from '../components/LoginBackground.js';
import Title from '../components/Title.js';
import InputLenderName from '../components/InputLenderName.js';
import InputDate from '../components/InputDate.js';
import InputDescription from '../components/InputDescription.js';
import InputPhoneNumber from '../components/InputPhoneNumber.js';
import InputPayment from '../components/InputPayment.js';



class AddPayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            price: '',
            description: '',
            date: '',
            userId: this.props.userId
        }
    }

    updateLenderName = (text) => {
        this.setState({name: text})
    }

    updatePhoneNumber = (text) => {
        this.setState({phone: text})
    }

    updatePrice = (text) => {
        this.setState({price: text})
    }

    updateDescription = (text) => {
        this.setState({description: text})
    }

    updateDate = (text) => {
        this.setState({date: text})
    }

    render() {
        return (
            <LoginBackground>
                <Title text="Add payment"></Title>
                <InputLenderName text="Lender Name" updateLenderName={this.updateLenderName}></InputLenderName>
                <InputPhoneNumber text="Phone Number" updatePhoneNumber={this.updatePhoneNumber}></InputPhoneNumber>
                <InputPayment text="Amount" updatePrice={this.updatePrice}></InputPayment>
                <InputDescription text="Description" updateDescription={this.updateDescription}></InputDescription>
                <InputDate text="Date" updateDate={this.updateDate}></InputDate>
                <Button
                    onPress={()=>this.addPayment()}
                    title="Submit"
                    color="#F2F4FE"
                />
            </LoginBackground>
        );
    }

    addPayment() {
        var inputId = this.state.userId;
        var inputName = this.state.name.text;
        var inputPhone = this.state.phone.text;
        var inputPrice = this.state.price.text;
        var inputDescription = this.state.description.text;
        var inputDate = this.state.date.text;

        if ( inputId == undefined || inputName == undefined ||  inputPhone == undefined || inputPrice == undefined ||
            inputDescription == undefined || inputDate == undefined ) {
            return;
        }

        var details = {
            '_id': inputId,
            'name': inputName,
            'price': inputPrice,
            'description': inputDescription,
            'phone': inputPhone,
            'date': inputDate
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:5000/api/payment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseData) => {
                if ( responseData == "Duplicate entry" ) return;
                console.log(responseData);
                this.goBackToLastPage();
            })
            .done();

    }

    goBackToLastPage() {
        this.props.navigator.pop();
    }

};


export default AddPayment;