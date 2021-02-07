import React, { useEffect, useState } from 'react'

import { View, Image, Alert, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TextInput,TouchableHighlight } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch, Button } from 'react-native-paper'
import { connect } from 'react-redux';

import { Picker } from '@react-native-picker/picker';
import { firebase } from '../config/firebase';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



import AsyncStorage from '@react-native-async-storage/async-storage';



import Constants from 'expo-constants';



function RegistrationForm(props) {

    const [userInfo, setuserInfo] = useState(props.data)
    const [language, setLanguage] = useState('')
    const [bloodGroup, setbloodGroup] = useState('')
    const [Health, setHealth] = useState('')
    const [name, setName] = useState('');
    const [number, SetNumber] = useState('')
 
    const [Allinfo, setAllinfo] = useState('')
 


    const [region, setregion] = useState({
        latitude: 24.9588605,
        longitude: 67.065834,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    })
    const [markers, setMarker] = useState([])
    const [regionChange, setregionChange] = useState({})
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
  
    

    const [DocumentId, setDocumentId] = useState('')
    console.log('docme+++', DocumentId)
  
    


    const [value2, onChangeText2] = useState('Your Number');

    useEffect(async () => {
        Mapfunction()

        // getUserDetail()
    }, []);
    // useEffect(() => {

    // }, [])

    const Mapfunction = async () => {

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert('Permission to access location was denied');
            // return
        }
        Location.watchPositionAsync({
            distanceInterval: 1,

            accuracy: 6
        }, location => {
            console.log('location***', location)
            let { coords: { latitude, longitude } } = location
            setLocation(location)
            setregion({

                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001

            });

        });

    }

    const saveUserData = async () => {
        // try {
        const fbid = props.data.id
        const docid = DocumentId
        console.log('newdocid---<', docid)

        
        firebase.firestore().collection('userInfo').add({
            bloodGroup, fbid, Health, number, location, name, docid

        }).then(() => {
            Alert.alert('Your Information Save successfully')
          


        }).catch(function (error) {
            Alert.alert(error)


        })


    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#bac0d1' }}>
                <Text style={{ color: 'yellow', fontSize: 30, fontWeight: 'bold', }}>Registration Form</Text>
                <Title style={{ color: 'white' }}>Want To Register As a Donor? Then Fill The Form Below : </Title>

                <Image size={50} source={{ uri: props.data.picture.data.url }} style={styles.container2} />
                {/* <Avatar.Image size={100} source={{uri :props.data.picture.data.url}} />  */}

                {/* <Title>Name: {props.data.name}</Title>  */}
                {/* <TextInput
                style={{ height: 60 }}
                placeholder="Your Name"
                onChangeText={(name) => setName(name)}
                defaultValue={name}
                // borderWidth =  {3}
                label={'Name'}
            /> */}
                {/* <Title>Your Name :</Title> */}
                {/* <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setName(text)}
                value={name}
            /> */}

                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Name"
                        keyboardType="text"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => setName(text)} />
                </View>

                {/* <Title>Your Blood Group :</Title> */}
                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={bloodGroup}

                        style={styles.inputs}
                        onValueChange={(itemValue, itemIndex) =>
                            setbloodGroup(itemValue)
                        }>
                        <Picker.Item label="Choose Your Blood Group" value="" />
                        <Picker.Item label="O+" value="O+" />
                        <Picker.Item label="O-" value="O-" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="B-" value="B+" />
                        <Picker.Item label="B-" value="B+" />
                        <Picker.Item label="AB+" value="AB+" />
                        <Picker.Item label="AB-" value="AB-" />

                    </Picker>
                </View>

                {/* <Title>Your Health :</Title> */}
                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={Health}
                        style={styles.inputs}
                        onValueChange={(itemValue, itemIndex) =>
                            setHealth(itemValue)
                        }>
                        <Picker.Item label="Tell About Your Health" value="" />
                        <Picker.Item label="Healthy" value="Healthy" />
                        <Picker.Item label="Sick" value="Sick" />
                    </Picker>
                </View>
                {/* <TextInput
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={(number) => SetNumber(number)}
                // value={this.state.myNumber}
                defaultValue={number}
                maxLength={11}  //setting limit of input
                label={'Phone Number'}
            /> */}
                {/* <Title>Your Phone Number :</Title> */}
                {/* <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SetNumber(text)}
                value={number}
                keyboardType='numeric'
            /> */}

                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Phone No"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        value={number}
                        onChangeText={(text) => SetNumber(text)} />
                </View>

                 {/* <Title style={{ color: 'white' }}>Your Live Location</Title> */}
                {/* <MapView
                    style={styles.mapStyle}
                    region={region}
                    // setregionChange={region}

                    scrollEnabled={true}
                >
                    {/* {markers.map((marker, index) => ( */}
                    {/* <Marker
                        // key={index}
                        coordinate={region}
                        title={'Farhan Biryani'}
                        description={'Mazaydar Biryani'}
                    />

                </MapView>  */}
                {/* <Button icon={{ uri: 'https://www.pngkey.com/png/detail/395-3957074_free-save-button-icon-png-file-save-icon.png' }} mode="contained" onPress={() => saveUserData()}>
                    Save
                </Button> */}
                <View style={{display:'flex',flexDirection:'column'}}>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => saveUserData()}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => props.navigation.navigate('Home')}>
                    <Text style={styles.loginText}>Go To Donor's List</Text>
                </TouchableHighlight>

                </View> 
               
                
                {/* <Button icon={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png' }} mode="contained" onPress={() => getUserDetail2()}>
                    Edit
                </Button> */}
            </ScrollView>
        </SafeAreaView>












    )




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bac0d1',
        marginTop: Constants.statusBarHeight,
    },
    // scrollView: {
    //             backgroundColor: 'red',
    //     marginHorizontal: 20,
    //     // flexGrow:1,
    //     // alignItems:'center',
    //     // justifyContent:'center'
    // },
    text: {
        fontSize: 42,
    },
    container2: {
        // flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
        // backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.3,
        borderRadius: 100,
        marginTop: 5

    },
    mapStyle: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderBottomWidth: 1,
        width: 350,
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
    loginButton: {

        backgroundColor: "#166FE5",

    },
    loginText: {
        color: 'white',
    }

});

const mapStateToProps = function (state) {
    return {
        data: state.data
    }


}


export default connect(mapStateToProps, null)(RegistrationForm);