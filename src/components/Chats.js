import React, { useEffect, useState } from 'react'
import { View, Text, Button, KeyboardAvoidingView, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { TextInput, Title } from 'react-native-paper'
import { connect } from 'react-redux';
import { firebase } from '../config/firebase'



import Constants from 'expo-constants';




function Chat({ route, navigation, data }) {
    console.log('route***', route)

    const { chatID } = route.params



    const myid = data.id
    const [value, onChangeText] = useState('');
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getMessage()
    }, [])

    const sendMessage = async (message) => {


        await firebase.firestore().collection('chatrooms').doc(chatID).collection('messages').add({
            message: value,
            userId: data.id,
            timestamp: Date.now()
        }).then(() => {
            onChangeText('')
            getMessage()



        })




    }
    const getMessage = async () => {
        const tempMessages = []

        await firebase.firestore().collection('chatrooms').doc(chatID).collection('messages').orderBy('timestamp', 'asc').get()
            .then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('doc****', doc.data())
                    tempMessages.push({ ...doc.data() })
                    setMessages(tempMessages)





                })




            })


    }






    return (




        <ScrollView contentContainerStyle={{ position: 'absolute', bottom: 0, backgroundColor: '#bac0d1' }}>
        {/* <ScrollView style={{backgroundColor:'#bac0d1'}}> */}
            <FlatList
                data={messages}
            
                keyExtractor={elem => elem.name}
                renderItem={elem => (<View style={{
                    borderBottomColor: '#F5FCFF',
                    backgroundColor: myid === elem.item.userId ? '#0099FF' : '#F1F0F0',
                    borderRadius: 30,
                    // borderBottomWidth: 1,
                    width: 320,
                    height: 45,
                    marginBottom: 10,
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    <Text key={myid} style={{
                        textAlign: myid === elem.item.userId ? 'right' : 'left',
                        color: myid === elem.item.userId ? 'white' : 'black',
                        height: 45,
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 15,
                        borderBottomColor: '#FFFFFF',
                        flex: 1,
                        fontSize: 20,
                        alignItems: 'center',
                        justifyContent: 'center'


                    }}>
                        {elem.item.message}</Text>

                </View>)}

            />



            {/* <View style={styles.inputContainer2}> */}
            <TextInput
                placeholder='Write Your Message'
                style={{ height: 50, width: 360, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Button title='Send' onPress={() => sendMessage()} />

            {/* </View> */}
            

        </ScrollView>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginTop: Constants.statusBarHeight,
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
        justifyContent: 'center'

    },
    inputContainer2: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        // borderRadius: 30,
        borderBottomWidth: 1,
        bottom:0,
        position:'absolute',
        width: 250,
        height: 45,
        marginBottom: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize: 20,
    },
})

const mapStateToProps = function (state) {
    return {
        data: state.data,
        // fbdata:state.fbdata
    }
    // return {
    //     fbdata: state.data
    // }

}


export default connect(mapStateToProps, null)(Chat);
