import 'react-native-gesture-handler';
import React, { useEffect, useState, } from 'react'
import { View, Text, Button, Image, Alert, FlatList, StyleSheet, StatusBar, Header, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';

import { firebase } from '../config/firebase'

import { DataTable, Title, Appbar } from 'react-native-paper';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';












function Home(props) {


    const [token, setToken] = useState([])
    const [DocumentId, setDocumentId] = useState('')
    const [fullName, setFullName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [Health, setHealth] = useState('')
  
    const [phoneNo, setPhoneNo] = useState('')
    const [Allinfo, setAllinfo] = useState('')
    const [chatID, setChatID] = useState('')
    const [name, setName] = useState('')
    const [Allinfo2, setAllinfo2] = useState('')
    const [filterData, setfilterData] = useState(false)
    const [buttonFilter, setbuttonFilter] = useState(true)

  




    useEffect(() => {
        getCompanyToken()

    }, [])

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; 
        var dLat = deg2rad(lat2 - lat1);  
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; 
        console.log('Km---->', d)
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }


    const getCompanyToken = async () => {
        setfilterData(false)
        setbuttonFilter(true)



        var info = [];
        await firebase.firestore().collection('userInfo')


           
            .get().then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('doc****', doc.data())
                


                    info.push({ ...doc.data(), tokenId: doc.id })
                    console.log('info***', info)
                   



                })
                setAllinfo(info)
                console.log('ok2--->', Allinfo)
             









            })









    }

    const getFilterData = async () => {




        var info2 = [];
        const filterName = name;
     
        console.log('name---->', filterName)
        await firebase.firestore().collection('userInfo')
      

            .where('name', '==', filterName)



            
            .get().then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('doc****', doc.data())

                    info2.push({ ...doc.data(), tokenId: doc.id })
                    console.log('info**--2', info2)
              



                })
                setAllinfo2(info2)
                setfilterData(true)
                setbuttonFilter(false)



                console.log('ok--->', Allinfo2)







            }).then(() => {
                console.log('chala---->')
                setName('')
            })











    }

    const navigateToChat = async (friendId) => {
 
        const myUid = props.data.id

        try {




            console.log('myUid****', 'fbid****', myUid, friendId)
            var response = await firebase.firestore().collection('chatrooms')
                .where('user1', '==', myUid)
                .where('user2', '==', friendId)
                .get()
            console.log('response***', response)
            let foundChatroom = false

            response.forEach(doc => {

                console.log('docData****', doc.data())
                foundChatroom = { ...doc.data(), id: doc.id }
          

            })
            console.log('chatroom 1st check***', foundChatroom)
     




            var chatID = foundChatroom.id
     




            props.navigation.navigate('Chat', { chatID: foundChatroom.id })


            if (foundChatroom) return foundChatroom

            console.log('myUid****', 'fbid****', myUid, friendId)
            var response = await firebase.firestore().collection('chatrooms')
                .where('user2', '==', myUid)
                .where('user1', '==', friendId)
                .get()
            console.log('response***', response)
            foundChatroom = false

            response.forEach(doc => {

                console.log('docData****', doc.data())
                foundChatroom = { ...doc.data(), id: doc.id }
         


            })
            console.log('chatroom 2nd check***', foundChatroom)





            console.log('idchat+++++', foundChatroom.id)
            var chatID = foundChatroom.id
       




            props.navigation.navigate('Chat', { chatID: foundChatroom.id })
            if (foundChatroom) return foundChatroom








            return await firebase.firestore().collection('chatrooms').add({
                user1: myUid,
                user2: friendId,
                timestamp: Date.now()
            })




        } catch (e) {
          
            console.log('error', e.message)



        }

    }










   








   

    const onChange = (text) => {
        setName(text)
        getFilterData()

    }













    return (



        <View style={styles.container}>




            <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center', width: 300, backgroundColor: '#f1f0f0', marginBottom: 5 }}>




                <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Image size={50} source={{ uri: 'https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png' }} style={{ width: 50, height: 50 }} />


                </TouchableOpacity>
                <Title style={{ color: 'red' }}>

                    Chatroom
                </Title>






            </View>

            <View style={styles.inputContainer}>

                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Search Name"

                    underlineColorAndroid='transparent'
                

                    onChangeText={(text) => setName(text)}



                    value={name}

                />

            </View>

            {buttonFilter ? <TouchableOpacity icon='camera' style={[styles.buttonContainer, styles.loginButton]} onPress={() => getFilterData()}>
                <Text style={styles.loginText}>Filter</Text>
            </TouchableOpacity> :
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => getCompanyToken()}>
                    <Text style={styles.loginText}>Remove FIlter</Text>
                </TouchableOpacity>}





            <Text style={{ color: '#d70f64',margin:5 }}>Here You Can Chat with The Donor You Want which are registered In Our App.</Text>




            {!filterData ? <FlatList
                data={Allinfo}
         
                keyExtractor={elem => elem.name}
                renderItem={elem => (<View style={styles.middle}>
                    <Text><Title>Name: </Title><Title style={styles.top}>{elem.item.name}</Title></Text>
                    <Text><Title>Phone No: </Title><Title style={{ color: 'purple' }}>{elem.item.number}</Title></Text>
                    <Text><Title>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                    <Text><Title>Health: </Title><Title style={{ color: 'purple' }}>{elem.item.Health}</Title></Text>
                    {/* <Text><Title>tokenId: </Title><Title style={{ color: 'purple' }}>{elem.item.tokenId}</Title></Text> */}

                    {/* <Button title={`Chat with ${elem.item.name}`} onPress={() => navigateToChat(elem.item.fbid)} /> */}
                    <TouchableOpacity style={[styles.buttonContainer2, styles.loginButton]} onPress={() => navigateToChat(elem.item.fbid)}>
                            <Text style={styles.loginText}>Chat With {elem.item.name} </Text>
                        </TouchableOpacity>

                </View>)}
            /> :

                <FlatList
                    data={Allinfo2}
                 
                    keyExtractor={elem => elem.name}
                    renderItem={elem => (<View style={styles.middle}>
                        <Text><Title>Name: </Title><Title style={styles.top}>{elem.item.name}</Title></Text>
                        <Text><Title>Phone No: </Title><Title style={{ color: 'purple' }}>{elem.item.number}</Title></Text>
                        <Text><Title>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                        <Text><Title>Health: </Title><Title style={{ color: 'purple' }}>{elem.item.Health}</Title></Text>
                        {/* <Text><Title>tokenId: </Title><Title style={{ color: 'purple' }}>{elem.item.tokenId}</Title></Text> */}

                        {/* <Button title={`Chat with ${elem.item.name}`} onPress={() => navigateToChat(elem.item.fbid)} /> */}
                        <TouchableOpacity style={[styles.buttonContainer2, styles.loginButton]} onPress={() => navigateToChat(elem.item.fbid)}>
                            <Text style={styles.loginText}>Chat With {elem.item.name} </Text>
                        </TouchableOpacity>

                    </View>)}
                />
            }




        </View>






    )





}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#bac0d1',
        padding: 20,
     
    },
    top: {
        flex: 0.3,

        color: 'red',
        alignItems: 'center'
    },
    middle: {
        flex: 0.3,
        backgroundColor: "#e9ebee",
        borderWidth: 5,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: '#23978b',
        alignItems: 'center',
        color: 'white'
    },
    bottom: {
        flex: 0.3,
        backgroundColor: "pink",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
     


        width: 150,
        borderRadius: 10,
        marginLeft: 70
       

    },
    buttonContainer2: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      
        width: 250,
        borderRadius: 10,
     
    },

    loginButton: {

        backgroundColor: "blue",

    },
    loginText: {
        color: 'white',
    }
})

const mapStateToProps = function (state) {
    return {
        data: state.data,


    }

}



export default connect(mapStateToProps, null)(Home);


