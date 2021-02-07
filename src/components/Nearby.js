import 'react-native-gesture-handler';
import React, { useEffect, useState, } from 'react'
import { View, Text, Button, Alert, FlatList, StyleSheet, StatusBar, Header, ScrollView, TextInput, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';

import { firebase } from '../config/firebase'

import { DataTable, Title, Appbar, icon } from 'react-native-paper';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements'








function Nearby(props) {


    const [token, setToken] = useState([])
    const [DocumentId, setDocumentId] = useState('')
    const [fullName, setFullName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [Health, setHealth] = useState('')
  
    const [phoneNo, setPhoneNo] = useState('')
    const [Allinfo, setAllinfo] = useState('')
    const [chatID, setChatID] = useState('')
    const [name1, setName] = useState('')
    const [Allinfo2, setAllinfo2] = useState('')
    const [filterData, setfilterData] = useState(false)
    const [buttonFilter, setbuttonFilter] = useState(true)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    

    


    useEffect(() => {
        getUserDetail()
        getCompanyToken()

    }, [])

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; 
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
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


            // .where('fbid', '==', fbid)
            .get().then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('docdonor2****', doc.data())
                    var KM = getDistanceFromLatLonInKm(latitude, longitude, doc.data().location.coords.latitude, doc.data().location.coords.longitude)
                    console.log('KM----<', KM)
                    if (KM < 10) {
                        info.push({ ...doc.data(), tokenId: doc.id })
                        console.log('info***', info)

                    }



                 



                })
                setAllinfo(info)
                console.log('ok2--->', Allinfo)
                




            })









    }
    



    const getUserDetail = async (bloodGroup, fbid, Health, number, location, name) => {


        var fbid = props.data.id;





        await firebase.firestore().collection('userInfo')


            .where('fbid', '==', fbid)
            .get()
            .then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('docdonors****', doc.data())

                    var detail = [];

                    detail.push({ ...doc.data(), documentId: doc.id })
                  
                    console.log('name***', name)
               
                    setLatitude(detail[0].location.coords.latitude)
                    console.log('latitude----->',latitude)
                    

                    setLongitude(detail[0].location.coords.longitude)
                    console.log('longitude----->',longitude)
                    setAllinfo(detail)

                   
                })
                // setAllinfo(detail)
                


















            })
       



    }
 







    const getFilterData = async () => {




        var info2 = [];
        const filterName = name;
        // filterName.toLowerCase(1)
        console.log('name---->', filterName)
        await firebase.firestore().collection('userInfo')
            // .where()

            .where('bloodGroup', '==', filterName)



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
        // setDocumentId(Allinfo[0].tokenId) 
        const myUid = props.data.id
        // let chatArray = []

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
        




            props.navigation.navigate('Chatroom', { chatID: foundChatroom.id })


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
        



            props.navigation.navigate('Chatroom', { chatID: foundChatroom.id })
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
                    {/* <Text>Donors List</Text> */}
                    Nearby Donors
                </Title>






            </View>











            {/* <Button title='LogOut' onPress={() => props.navigation.navigate('Blood Donation App')} /> */}





            <View style={styles.inputContainer}>

                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Search Blood Group"
                    icon='search'


                    underlineColorAndroid='transparent'
                    // onChangeText={(name) => getFilterData()}

                    onChangeText={(text) => setName(text)}



                    value={name1}

                />

            </View>
            {/* {buttonFilter ? <Button title='Filter' icon={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHTlXXfdDbGLfu-vv7IW8puAufpkFpfMwlww&usqp=CAU' }} onPress={() => getFilterData()} /> :
                <Button width='' title='Remove Filter' onPress={() => getCompanyToken()} />} */}
            {buttonFilter ? <TouchableOpacity icon='camera' style={[styles.buttonContainer, styles.loginButton]} onPress={() => getFilterData()}>
                <Text style={styles.loginText}>Filter</Text>
            </TouchableOpacity> :
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => getCompanyToken()}>
                    <Text style={styles.loginText}>Remove FIlter</Text>
                </TouchableOpacity>}









            <Text style={{ color: '#d70f64', margin: 5 }}>Here You Can Find All The Donors Who Registered In Our App As a Donor.</Text>




            {!filterData ? <FlatList
                data={Allinfo}
                // style={{display:'flex',alignItems:'center'}}
                keyExtractor={elem => elem.name}
                renderItem={elem => (<View style={styles.middle}>
                    <Text><Title>Name: </Title><Title style={styles.top}>{elem.item.name}</Title></Text>
                    <Text><Title>Phone No: </Title><Title style={{ color: 'purple' }}>{elem.item.number}</Title></Text>
                    <Text><Title>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                    <Text><Title>Health: </Title><Title style={{ color: 'purple' }}>{elem.item.Health}</Title></Text>
                    {/* <Text><Title>tokenId: </Title><Title style={{ color: 'purple' }}>{elem.item.tokenId}</Title></Text> */}

                    {/* <Button title={`Chat with ${elem.item.name}`} onPress={() => navigateToChat(elem.item.fbid)} /> */}

                </View>)}
            /> :

                <FlatList
                    data={Allinfo2}
                    // style={{display:'flex',alignItems:'center'}}
                    keyExtractor={elem => elem.name}
                    renderItem={elem => (<View style={styles.middle}>
                        <Text><Title>Name: </Title><Title style={styles.top}>{elem.item.name}</Title></Text>
                        <Text><Title>Phone No: </Title><Title style={{ color: 'purple' }}>{elem.item.number}</Title></Text>
                        <Text><Title>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                        <Text><Title>Health: </Title><Title style={{ color: 'purple' }}>{elem.item.Health}</Title></Text>
                        {/* <Text><Title>tokenId: </Title><Title style={{ color: 'purple' }}>{elem.item.tokenId}</Title></Text> */}

                        {/* <Button title={`Chat with ${elem.item.name}`} onPress={() => navigateToChat(elem.item.fbid)} /> */}

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
        // margin: 10,
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
    buttonContainer: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
        width: 150,
        borderRadius: 30,
        marginTop: '15%'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

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
        // marginBottom: 20,
        width: 150,
        borderRadius: 10,
        marginLeft: 70
        // marginTop: '15%'
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



export default connect(mapStateToProps, null)(Nearby);


