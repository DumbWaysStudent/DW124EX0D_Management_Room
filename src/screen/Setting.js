import React, { Component } from 'react';
import { 
    View, 
    Text,
} from 'react-native';
import {
    Button, Card 
} from 'native-base'

import Host from '../environment/Host'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { getUserId } from '../function/api';
import HeaderComp from '../component/header/HeaderComp';

class Setting extends Component {
    constructor() {
        super() 
        this.state = {
            user : {
                username : ''
            }
        }
    }
    async componentDidMount() {
        const userId = await getUserId()
        const user = await axios.get(`${Host.localhost}/user/${userId}`)
        this.setState({user : user.data})
    }
    onPressLogout = async () => {
        try {
            await AsyncStorage.clear()
            this.props.navigation.navigate('GuestNavigator')
          } 
          catch(e) {
              alert(e)      
        };
    }
    render() {
        return (
            <View>
                <HeaderComp title="SETTING"/>
                <Card style={{alignItems : "center", padding : 20}}>
                    <Text>
                        Name : {this.state.user.username}
                    </Text>
                    <Text>
                        Phone Number : {this.state.user.phonenumber}
                    </Text>
                </Card>
                <Button style={{margin : 30, justifyContent : "center"}} onPress={this.onPressLogout}>
                    <Text style={{color: "white"}}>LOG OUT</Text>
                </Button>
            </View>
        )
    }
}



export default Setting


// const styles= StyleSheet.create({
//     container : {
//         flex : 1,
//         padding : 20
//     },
//     searchbar : {
//         paddingBottom : 5,
//     },
//     imageDilist : {
//         width : width/4,
//         height : width/4,
//     },
//     wrapContainerFlatlist : {
//         flexDirection: 'row', 
//         paddingTop:8
//     },
//     infoComic : {
//         paddingLeft : 10,
//         justifyContent : "space-around",
//     },
// })