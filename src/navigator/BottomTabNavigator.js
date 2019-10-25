import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator }  from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screen/Home'
import Favorit from '../screen/Favorit'

import Icon from 'react-native-vector-icons/Ionicons'
const HomeNavigator = createStackNavigator({
  Home : {
    screen : Home,
    navigationOptions : {
      header : null
    }
  }
})


const BottomTabNavigator =  createBottomTabNavigator({
    HomeNavigator: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: 'FOR YOU',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="logo-windows" color={tintColor} size={24} />
        )
      }
    },
    Favorit: {
      screen: Favorit,
      navigationOptions: {
        tabBarLabel: 'FAVORIT',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-star" color={tintColor} size={24} />
        )
      }
    }
  }, {
      tabBarOptions: {
        activeTintColor: '#443737',
        inactiveTintColor: '#6C7B95',
        style: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowOffset: { width: 5, height: 3 },
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 5
        }
      },
    },
)

export default createAppContainer(BottomTabNavigator)