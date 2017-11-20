/**
 * Created by JohnWu on 2017-04-01.
 */
import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Alert,
    Button
} from 'react-native';

import Dimensions from 'Dimensions';

var windowWidth = Dimensions.get('window').width;

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            paymentId: this.props.paymentId,
            name: this.props.name,
            phone: this.props.phone,
            description: this.props.description,
            price: this.props.price,
            date: this.props.date
        };
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.name}>{this.state.name}</Text>

                    <View style={{flexDirection: 'row', width: windowWidth, marginLeft: 12}}>
                        <Text style={styles.date}>{this.state.date}</Text>
                        <Text style={styles.description}>{this.state.description}</Text>
                        <Text style={styles.price}>{"$ "+ this.state.price}</Text>

                    </View>
                    <View style={{position: 'absolute', right: 4+windowWidth*0.025}}>
                        <Button
                            onPress={() =>
                                Alert.alert(this.state.description + " - $" + this.state.price,
                                    "Are you sure you want to delete this entry?",
                                    [
                                        {text: 'Delete', onPress: () => this.deletePayment() },
                                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')}
                                    ]
                                )

                            }
                            title="Delete"
                            color="#063e77"
                        />
                    </View>
            </View>
        );
    }

    deletePayment() {
        var paymentId = this.state.paymentId;
        var userId = this.state.userId;

        if ( paymentId == undefined || userId == undefined ) {
            return;
        }

        var details = {
            'p_id': paymentId,
            '_id': userId
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:5000/api/payment', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth*0.95,
        flexDirection: 'column',
        backgroundColor: "rgba(242, 244, 254, 0.2)",
        borderColor: null,
        borderRadius: 10,
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: windowWidth*0.025,

    },
    name: {
        color: '#063e77',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 12,
        flexDirection: 'row',
    },
    phone:{
        color: '#063e77',
        fontSize: 14,
        fontStyle: 'italic',
        marginLeft: 6,
    },
    date: {
        color: '#063e77',
        fontSize: 14,
    },
    description:{
        color: '#063e77',
        position: 'absolute',
        left: windowWidth/4,

    },
    price: {
        color: '#063e77',
        position: 'absolute',
        right: windowWidth/7 + 65,
        alignItems:'flex-end',
    },

    separator: {
        flex: 1,
        height: 4,
        backgroundColor: null,
    },

});



export default List;