import React, { Component } from 'react';
import { 
    View, 
    Text,
} from 'react-native';
import {
    Button 
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from 'react-redux'
import {getUserFav} from '../redux/action/favAction'

class Favorit extends Component {
    constructor() {
        super() 
        this.state = {
        }
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
                <Text>Favorit</Text>
                <Button onPress={this.onPressLogout}><Text>Keluar</Text></Button>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
      userFav: state.favoriteReducer
    };
  }


export default connect(
    mapStateToProps,
    { getUserFav }
  )(Favorit)


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