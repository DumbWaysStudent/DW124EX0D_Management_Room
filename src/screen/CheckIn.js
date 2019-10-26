import React, { Component } from 'react';
import { 
    View, 
    Text,
    Modal,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    Item,
    Input,
    Label,
    Picker
} from 'native-base'

import moment from 'moment'
import {connect} from 'react-redux'
import {getRoom} from '../redux/action/actionRoom'
import {getCustomer} from '../redux/action/actionCustomer'
import HeaderComp from '../component/header/HeaderComp';
import { getUserToken, addOrder, checkOutRoom } from '../function/api';

class CheckIn extends Component {
    constructor() {
        super() 
        this.state = {
            modalCheckInVisible : false,
            modalCheckOutVisible : false,
            checkInRoomName : '',
            checkInData : {
                roomId : '',
                customer : "",
                duration : '',
                orderEndTime : ''
            },
            roomId : '',
            orderId : '',
            CheckOutName : ''
        }
    }

    setModalCheckInVisible(visible) {
        this.setState({modalCheckInVisible: visible});
      }

    setModalCheckOutVisible(visible) {
        this.setState({modalCheckOutVisible: visible});
      }

    async componentDidMount() {
        const userToken = await getUserToken()
        await this.props.getCustomer(userToken)
        await this.props.getRoom()
    }

    handlePressRoom = (item) => {
        if(item.isBooked){
            this.setModalCheckOutVisible(!this.state.modalCheckOutVisible)
            console.log(item._id)
            this.setState({roomId : item._id, orderId : item.order, CheckOutName : item.name})
        }else {
            this.setState({
            checkInRoomName : item.name,
            checkInData : {
                roomId : item._id,
            }})
            this.setModalCheckInVisible(!this.state.modalCheckInVisible)
        }
    }

    handleCheckIn = async () => {
        if(this.state.checkInData.customer === undefined){
            alert("Customer harus diisi")
        }else {
            await addOrder(this.state.checkInData)
            await this.props.getRoom()
            this.setModalCheckInVisible(!this.state.modalCheckInVisible)
        }
    }

    handleCheckOut = async () => {
        const data = {
            roomId : this.state.roomId
        }
        await checkOutRoom(data, this.state.orderId)
        await this.props.getRoom()
        this.setModalCheckOutVisible(!this.state.modalCheckOutVisible)
    }

    handleCancel = () => {
        this.setModalCheckInVisible(!this.state.modalCheckInVisible)
    }

    handleCancelOut = () => {
        this.setModalCheckOutVisible(!this.state.modalCheckOutVisible)
    }

    onValueChange = (value) => {
        this.setState({
            checkInData  : {
            ...this.state.checkInData,
          customer : value 
        }});
      }

    handleAddCustomer = () => {
        this.setModalCheckInVisible(!this.state.modalCheckInVisible)
        this.props.navigation.navigate('Customer')
    }
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp title="CheckIn"/>
                <FlatList
                data={this.props.room.data}
                numColumns={1}
                renderItem={({item}) => (
                    <TouchableOpacity style={{paddingHorizontal : 10}}
                    onPress={() => this.handlePressRoom(item)}
                    >
                        <Card style={{ backgroundColor: item.isDone ? null : "grey" }}>
                            <Text style={{padding : 20}}>
                                {item.name}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item , index) => index.toString()}
                />
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalCheckInVisible}
                onRequestClose={() => {
                    this.setModalCheckInVisible(!this.state.modalCheckInVisible);
                }}>
                    <View style={{flex : 1, justifyContent: "center", padding : 70}}>
                        <Card style={{paddingVertical : 40, paddingHorizontal : 20}}>
                            <Text style={{fontSize : 20, textAlign : "center", paddingBottom : 30}}>CHECK IN</Text>
                            <Text>Room Name</Text>
                            <View style={{borderWidth : 1, marginBottom : 10}}>
                                <Text style={{fontSize : 20}}>{this.state.checkInRoomName}</Text>
                            </View>
                            <Text style={{color : 'blue'}}
                            onPress={this.handleAddCustomer}
                            >Add new Customer</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.checkInData.customer}
                                onValueChange={this.onValueChange.bind(this)}
                                    >
                                <Picker.Item  label="Customer"/>
                                {
                                    this.props.customer.data.map((item) =>{
                                    return(
                                    <Picker.Item  label={item.name} value={item._id} key={item._id}/>
                                    );
                                    })
                                }
                             </Picker>
                            <Item floatingLabel>
                                <Label>Duration (minutes)</Label>
                                <Input 
                                value={this.state.checkInData.duration}
                                keyboardType="number-pad"
                                onChangeText={(text)=> this.setState({checkInData: {...this.state.checkInData,duration : text}})}
                                />
                            </Item>
                            <View style={{flexDirection : 'row', justifyContent : 'space-around',paddingTop :20}}>
                                <TouchableOpacity onPress={this.handleCancel}>
                                    <View>
                                        <Text>Cancel</Text>
                                    </View>                                  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleCheckIn} >
                                    <View>
                                        <Text>CheckIn</Text>
                                    </View>                                  
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </Modal>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalCheckOutVisible}
                onRequestClose={() => {
                    this.setModalCheckOutVisible(!this.state.modalCheckOutVisible);
                }}>
                    <View style={{flex : 1, justifyContent: "center", padding : 70}}>
                        <Card style={{paddingVertical : 40, paddingHorizontal : 20}}>
                            <Text style={{fontSize : 20, textAlign : "center", paddingBottom : 30}}>CHECK OUT</Text>
                            <Text>Room Name</Text>
                            <View style={{borderWidth : 1, marginBottom : 10}}>
                                <Text style={{fontSize : 20}}>{this.state.CheckOutName}</Text>
                            </View>
                            <View style={{flexDirection : 'row', justifyContent : 'space-around',paddingTop :20}}>
                                <TouchableOpacity onPress={this.handleCancelOut}>
                                    <View>
                                        <Text>Cancel</Text>
                                    </View>                                  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleCheckOut} >
                                    <View>
                                        <Text>CheckOut</Text>
                                    </View>                                  
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </Modal>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
      room: state.Room,
      customer : state.Customer
    };
  }


export default connect(
    mapStateToProps,
    { getRoom, getCustomer }
  )(CheckIn)
