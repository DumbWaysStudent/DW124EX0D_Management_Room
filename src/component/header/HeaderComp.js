import React, { Component } from 'react';
import { 
    StatusBar
 } from 'react-native';
import {
    Header ,
    Body,
    Title,
    Center
} from 'native-base'

export default class HeaderComp extends Component {
    render() {
        return (
            <Header androidStatusBarColor="#64ccda" style={{ backgroundColor : '#64ccda'}}>
                <Body style={{alignItems : "center"}}>
                    <Title style={{fontFamily: 'OpenSans-SemiBold'}}>{this.props.title}</Title>
                </Body>
            </Header>
        );
    }
}