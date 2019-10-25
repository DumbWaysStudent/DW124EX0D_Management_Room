import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Image,
    Dimensions, 
    Text,
} from 'react-native';
import {
    Item,
    Icon,
    Label,
    Input
} from 'native-base'
import { InputTextX } from '../component/Input/Input';
import { stylesglobe } from '../constant/styles';
import {ButtonLogReg} from '../component/button/ButtonLogReg';

import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import jwt from "react-native-pure-jwt";
import Host from '../environment/Host'
import { emailvalid } from '../function/validation';


export default class Register extends Component {
    constructor() {
        super() 
        this.state = {
            idCard : '',
            password : '',
            username : '',
            phonenumber : ''
        }
    }

    _handleRegister = async () => {
        try {
        const {username , idCard,phonenumber, password} = this.state
        const Data = {
            username,
            idCard,
            password,
            phonenumber
        }
        const user = await axios.post(`${Host.localhost}/register`, Data)
        if(user) {
            await AsyncStorage.setItem('userToken', user.data );
                const objJwt = await jwt.decode(
                user.data, // the token
                'roomanagement', // the secret
                {
                    skipValidation: true // to skip signature and exp verification
                }
                );
                await AsyncStorage.setItem('userId',JSON.stringify(objJwt.payload.userId));
                this.props.navigation.navigate('MemberNavigator')
            }
    }
    catch (error){
        console.log(error)
    }
    }

    formValid = () => {
        emailvalid(this.state.email) ?
        this.state.username != "" ? 
        this.state.password != "" 
        : false 
        : true
    }
    render() {
        const {navigation} = this.props
        return (
            <View style={[stylesglobe.background, stylesglobe.paddingContainer, {flex :1}]}>
                <View style={{flex : 2}}>
                    <Image style={styles.imageLogo} source={require('../assets/image/logo.png')} />
                </View>
                <View style={styles.wrapformfield}>
                    <InputTextX 
                    handleChangeText={text => this.setState({username : text})}
                    keyboardType="email-address" icon={true} iconName="mail-open" label="Username"/>                   
                    <Item floatingLabel>
                        <Icon name="ios-lock" style={styles.iconLock}/>
                        <Label>Password</Label>
                        <Input 
                        autoCapitalize="none"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(text)=> this.setState({password: text})}
                        />
                    </Item>
                    <InputTextX 
                    handleChangeText={text => this.setState({idCard : text})}
                    keyboardType="number-pad" icon={true} iconName="person" label="Id Card"/>
                    <InputTextX 
                    handleChangeText={text => this.setState({phonenumber : text})}
                    keyboardType="number-pad" icon={true} iconName="call" label="Phone Number"/>
                </View>
                <View style={styles.wrapBtn}>
                    <ButtonLogReg btnTitle="Daftar" onPressButton={this._handleRegister}/>
                </View>
                <View style={{flex : 1, alignItems : "center"}}>
                    <Text>
                        Sudah punya akun ? 
                        <Text style={styles.textLogin} onPress={() => navigation.navigate('Login')}>Login</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapformfield : {
        padding : 40,
        flex : 2
    },
    imageLogo : {
        width : '100%',
        height : "100%"
    },
    lupasandi : {
        color : "blue",
        // fontFamily : 'Montserrat-black'
    },
    wrapBtn : {
        padding : 20,
        flex : 1
    },
    wrapLupa : {
        alignItems : "flex-end",
        paddingBottom : 10
    },
    textLogin : {
        color : 'blue'
    }
})