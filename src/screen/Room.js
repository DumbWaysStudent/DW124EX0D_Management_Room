import React, { Component } from 'react';
import { 
    View, 
    Text,
    FlatList,
    StyleSheet,
    Modal,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    Item,
    Input,
    Label,
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {connect} from 'react-redux'
import {getRoom} from '../redux/action/actionRoom'
import HeaderComp from '../component/header/HeaderComp';
import { addNewRoom, editRoom } from '../function/api';

class Room extends Component {
    constructor() {
        super() 
        this.state = {
            modalVisible : false,
            name : '',
            newName : '',
            roomId : '',
            modalEditVisible : false
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    setModalEditVisible(visible) {
        this.setState({modalEditVisible: visible});
      }
    
    handleCancel = () => {
        this.setModalVisible(!this.state.modalVisible)
    }
    handleSave = async () => {
        const data = {
            name : this.state.name
        }
        await addNewRoom(data)
        await this.props.getRoom()
        this.setState({name : ''})
        this.setModalVisible(!this.state.modalVisible)
    }

    handlePressEdit = (item) => {
        this.setState({newName : item.name, roomId : item._id})
        this.setModalEditVisible(!this.state.modalEditVisible)
    }

    handleSaveEdit = async() => {
        const data = {
            name : this.state.newName
        }
        await editRoom(data , this.state.roomId)
        await this.props.getRoom()
        this.setModalEditVisible(!this.state.modalEditVisible)
    }
    handleCancelEdit = () => {
        this.setModalEditVisible(!this.state.modalEditVisible)
    }
    
    async componentDidMount() {
        await this.props.getRoom()
    }
    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderComp title="ROOM"/>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalEditVisible}
                onRequestClose={() =>  this.setModalEditVisible(!this.state.modalEditVisible)}
                >
                    <View style={{flex : 1, justifyContent: "center"}}>
                        <Card style={{paddingVertical : 40, paddingHorizontal : 20}}>
                            <Text style={{fontSize : 20, textAlign : "center"}}>Edit Room </Text>
                            <Item floatingLabel>
                                <Label>Room Name</Label>
                                <Input 
                                value={this.state.newName}
                                keyboardType="default"
                                onChangeText={(text)=> this.setState({newName: text})}
                                />
                            </Item>
                            <View style={{flexDirection : 'row', justifyContent : 'space-around',paddingTop :20}}>
                                <TouchableOpacity onPress={this.handleCancelEdit}>
                                    <View>
                                        <Text>Cancel</Text>
                                    </View>                                  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleSaveEdit} >
                                    <View>
                                        <Text>Save</Text>
                                    </View>                                  
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </Modal>
                <FlatList
                data={this.props.room.data}
                renderItem={({item}) => (
                    <TouchableOpacity style={{paddingHorizontal : 10 }}
                    onPress={() => this.handlePressEdit(item)}
                    >
                        <Card >
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
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                    <View style={{flex : 1, justifyContent: "center", padding : 70}}>
                        <Card style={{paddingVertical : 40, paddingHorizontal : 20}}>
                            <Text style={{fontSize : 20, textAlign : "center"}}>Add Room </Text>
                            <Item floatingLabel>
                                <Label>Room Name</Label>
                                <Input 
                                value={this.state.name}
                                keyboardType="default"
                                onChangeText={(text)=> this.setState({name: text})}
                                />
                            </Item>
                            <View style={{flexDirection : 'row', justifyContent : 'space-around',paddingTop :20}}>
                                <TouchableOpacity onPress={this.handleCancel}>
                                    <View>
                                        <Text>Cancel</Text>
                                    </View>                                  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handleSave} >
                                    <View>
                                        <Text>Save</Text>
                                    </View>                                  
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </Modal>
                <View style={{position:'absolute',bottom:10,alignSelf:'flex-end', padding :25}}>
                    <Icon style={styles.btnStyle} color="#64ccda" name="plus-circle"
                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        />
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
      room: state.Room
    };
  }


export default connect(
    mapStateToProps,
    { getRoom }
  )(Room)


const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 20
    },
    btnStyle : {
        fontSize : 50
    }
})