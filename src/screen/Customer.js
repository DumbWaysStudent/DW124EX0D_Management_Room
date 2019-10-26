import React, { Component } from 'react';
import { 
    View, 
    Text,
    Modal,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    Card,
    Item,
    Input,
    Label,
    Thumbnail
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
import {getCustomer} from '../redux/action/actionCustomer'
import HeaderComp from '../component/header/HeaderComp';
import { addCustomer, getUserToken, editCustomer } from '../function/api';

class Customer extends Component {
    constructor() {
        super() 
        this.state = {
            modalVisible : false,
            name : '',
            idCard : '',
            phonenumber : '',
            modalEditVisible : false,
            userToken : '',
            customerId : ''
        }
    }

    async componentDidMount() {
        const userToken = await getUserToken()
        this.setState({userToken})
        await this.props.getCustomer(userToken)
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
    setModalEditVisible(visible) {
        this.setState({modalEditVisible: visible});
      }

    handleCancel = () => {
        this.setModalVisible(!this.state.modalVisible);
    }

    handleSave = async () => {
        const data = {
            name : this.state.name,
            idCard : this.state.idCard,
            phonenumber : this.state.phonenumber
        }
        await addCustomer(data)
        await this.props.getCustomer(this.state.userToken)
        this.setModalVisible(!this.state.modalVisible);
    }

    handlePressEdit = (item) => {
        this.setState({
            name : item.name, 
            customerId : item._id,
            phonenumber : item.phonenumber.toString(),
            idCard : item.idCard.toString()
        })
        this.setModalEditVisible(!this.state.modalEditVisible)
    }

    handleSaveEdit = async() => {
        const data = {
            name : this.state.name,
            idCard : this.state.idCard,
            phonenumber : this.state.phonenumber
        }
        await editCustomer(data , this.state.customerId)
        await this.props.getCustomer(this.state.userToken)
        this.setState({
            name : '',
            idCard : '',
            phonenumber : '',
            customerId : ''
        })
        this.setModalEditVisible(!this.state.modalEditVisible)
    }

    handleCancelEdit = () => {
        this.setState({
            name : '',
            idCard : '',
            phonenumber : '',
            customerId : ''
        })
        this.setModalEditVisible(!this.state.modalEditVisible)
    }

    render() {
        const uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAM1BMVEWVu9////+QuN6Mtt35+/2avuDe6fTU4vHw9fr1+PynxuTk7favy+agwuK30OjN3u/C1+zv6qIoAAADRklEQVRoge2b65KkIAyFIVxFQd//aRe1715I7NBu1Ximan5sbdfXMYSEwyjEpUuX/rZAKRFDl3+iUAp+hoUw2EbLWbqxQ4BfwJXpvfyU742qzAXh9II7he5E1bghrXMndqqIVm6TO8pVe+Kq3QVL2VZCF8G10KovgqXsK6AhIMBSBv5lBssqXpNnJ0NCgaVkry1kyPxBQ4cES9nxopVFk5kryzRocmNYybiSmhU4wTAQyANnoglpltJyJlpha2qUZyXjF1heYqxlRSJzgs32KLKU5iyrv0g+L89w2to+sZ7Lw99TrM0K9gftdznOp31exxD4kSQPJZxgEfEFrSMrWeAXt+cFExo0a3smjNv8A3dEk5nTjE80c5oJewnrPjIJO/eyzryTTjtLCsAc3PPRvYJNAyhyDX8IFTT/+pqEIFfhYoKukeUJXWpYupYLWDQOmO2CFxUssRpm2AO91yyZ2+OHYBttK7vrm52jUiXP0Pn3+hh6GzirbGHmVqwqLsf+Ns45ht5wG3EQ3bMPqfCebRtua2vsZy7yXaeAUmkO09+fpoKut15r7W3fwZ1r5kbaJp6LJAXpJcLuUTn5+0x6MNTLPmMTfFlioLqPMtq6ogHxseht903gKi0HET2ssEEMyz3dd8fjXt82mj6Kl3jycw39+sneHgVvT17epTi7ISYmt/P/DnGhdFpvvPclF6M9kOvCrRhWB27PKL7ynsjzN8kZ2RPZNeEKmRw0U5ZHETNdHPbwoo2FhIN6WaSjPMn/Kok0rSi+h50fNyXRhhEsJcF1Zk0zKdHIszJWhNNWsVnQRGgbihUsJX6J4ewBvPAxU5xdjNDuL8nNxgjteLPuYKPQuxjz0qYsbsodEUb4GyxmMN4ywjvKWCGdZ8JfcGCFtG7YiwpdVsz9YhSyZ+y4MEeFdG9OJHNvJPithHLlixP2THmRf0g+cW3znSPvwv5FJATeNtkQHPeFDfaFqMbYu/V3HHvEDARQ3Y7hVJZ3OdqDPiDkDyZ3ZDNtXZo+/Y3y500YrMeea7W3QzDfUp/48VWEjG/2+LoZoW/OJJPmVyHS4Nr8DZ5fQWdi64ZU/QUJmIxtMDFM72OEaOZ/+NlLGZcuXfr/9A9ytCPa4535zAAAAABJRU5ErkJggg==";
        return (
            <View style={{flex : 1}}>
                <HeaderComp title="CUSTOMER"/>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalEditVisible}
                onRequestClose={() =>  this.setModalEditVisible(!this.state.modalEditVisible)}
                >
                    <View style={{flex : 1, justifyContent: "center"}}>
                        <Card style={{paddingVertical : 40, paddingHorizontal : 20}}>
                            <Text style={{fontSize : 20, textAlign : "center"}}>Edit Customer </Text>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input 
                                value={this.state.name}
                                keyboardType="default"
                                onChangeText={(text)=> this.setState({name: text})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Phone Number</Label>
                                <Input 
                                value={this.state.phonenumber}
                                keyboardType="number-pad"
                                onChangeText={(text)=> this.setState({phonenumber: text})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Id Card</Label>
                                <Input 
                                value={this.state.idCard}
                                keyboardType="default"
                                onChangeText={(text)=> this.setState({idCard: text})}
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
                data={this.props.customer.data}
                renderItem={({item}) => (
                    <TouchableOpacity style={{paddingHorizontal : 10}}
                    onPress={() => this.handlePressEdit(item)}
                    >
                        <Card style={{flexDirection : 'row'}}>
                            <View style={{padding : 20}}>
                                <Thumbnail source={{uri: uri}} />
                            </View>
                            <View style={{padding : 20}}>
                                <Text>Name : {item.name}</Text>
                                <Text>Id Number : {item.idCard}</Text>
                                <Text>Phone Number : {item.phonenumber}</Text>
                            </View>
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
                                <Label>Name</Label>
                                <Input 
                                value={this.state.name}
                                keyboardType="default"
                                onChangeText={(text)=> this.setState({name: text})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Phone Number</Label>
                                <Input 
                                value={this.state.phonenumber}
                                keyboardType="number-pad"
                                onChangeText={(text)=> this.setState({phonenumber: text})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Id Card</Label>
                                <Input 
                                value={this.state.idCard}
                                keyboardType="default"
                                onChangeText={(text)=> this.setState({idCard: text})}
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
                    <Icon style={{fontSize : 50}} color="#64ccda" name="plus-circle"
                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        />
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
      customer: state.Customer
    };
  }


export default connect(
    mapStateToProps,
    { getCustomer }
  )(Customer)
