import React, { Component } from 'react';
import { 
    View, 
    Text,
} from 'react-native';

import {connect} from 'react-redux'
import {getUserFav} from '../redux/action/favAction'

class Home extends Component {
    constructor() {
        super() 
        this.state = {
        }
    }
    render() {
        return (
            <View>
                <Text>Home</Text>
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
  )(Home)


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