import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator }  from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import CheckIn from '../screen/CheckIn'
import Room from '../screen/Room'
import Setting from '../screen/Setting'
import Customer from '../screen/Customer'


import Icon from 'react-native-vector-icons/Ionicons'


const BottomTabNavigator =  createBottomTabNavigator({
    CheckIn: {
      screen: CheckIn,
      navigationOptions: {
        tabBarLabel: 'CHECKIN',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-done-all" color={tintColor} size={24} />
        )
      }
    },
    Room: {
      screen: Room,
      navigationOptions: {
        tabBarLabel: 'ROOM',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-bed" color={tintColor} size={24} />
        )
      }
    },
    Customer: {
      screen: Customer,
      navigationOptions: {
        tabBarLabel: 'CUSTOMER',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        )
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'SETTING',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings" color={tintColor} size={24} />
        )
      }
    }
  }, {
      tabBarOptions: {
        activeTintColor: '#64ccda',
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