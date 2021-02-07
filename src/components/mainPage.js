import React, { useEffect, useState } from 'react'
import { View, Text, Button, KeyboardAvoidingView, StyleSheet, FlatList, ScrollView, Image, TouchableHighlight, Dimensions } from 'react-native'
import { TextInput, Title } from 'react-native-paper'

import { connect } from 'react-redux';
import { firebase } from '../config/firebase'




function MainPage(props) {




    return (


        <View style={styles.container}>
            <Image size={20} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRl5zaYsngBKP8q2v7PjEvYOcXGDmP7AhiQwA&usqp=CAU' }} style={styles.container2} />
            <View style={styles.container3}>
                <Text style={{ color: 'grey', fontSize: 25 }}>What is Blood Donation App?</Text>
            </View>
            <View style={styles.container4}>
                <Image size={50} source={{ uri: 'https://image.freepik.com/free-vector/cute-funny-smiling-doctor-hematologist-happy-blood-drop-healthcare_92289-785.jpg' }} style={styles.container5} />

                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>Blood Donation is an app to help{'\n'}to connect peoples with the{'\n'}same location.You can request{'\n'}blood donation help
                    or ask{'\n'}someone to help.
                    </Text>



            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => props.navigation.navigate('Login')} >
                <Text style={styles.loginText}>Get Started</Text>
            </TouchableHighlight>




        </View>
    )







    {/* <View style={styles.container3}>

               
            </View> */}








}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
     


    },
    container2: {
     
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.4,

    },
    container3: {
        flex: 5,
        justifyContent: 'space-between',
        alignItems: 'center',

        // backgroundColor: 'red',
    },
    container4: {
        flex: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
   
    },
    container5: {
        flex: 3,
        marginTop: 25,
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.3,

    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "pink",
    },
})

const mapStateToProps = function (state) {
    return {
        data: state.data,
        // fbdata:state.fbdata
    }
  

}


export default connect(mapStateToProps, null)(MainPage);
