import React from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 



const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;


function SideMenu(props, { route, navigation }) {
  

    console.log('data***', props.data)
    return (
        <View style={{ flex: 1, backgroundColor: '#717B64' }}>
            <DrawerContentScrollView {...props}>
                <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#717B64' }}>
                    <Title style={{ color: 'white' }}>Your Profile</Title>

                    <View onTouchEnd={() => props.navigation.navigate('Profile')} style={{ flexDirection: 'row', marginTop: 2 * vh }}>
                        <Image size={50} source={{ uri: props.data.picture.data.url }} style={{ width: 150, height: 150, borderRadius: 100 }} />
                    </View>
                    <View>
                        <Title style={{ color: 'white' }}
                        >{props.data.name}</Title>
                    </View>
                </View>
                <Drawer.Section >

                    <Drawer.Item
                        style={{ backgroundColor: '#F1F1F1' }}
                        icon='home'


                        label='Home'
                        onPress={() => { props.navigation.navigate('Home') }}

                    />
                    <Drawer.Item
                        style={{ backgroundColor: '#F1F1F1' }}
                        icon='face-profile'

                        label='Profile'
                        onPress={() => { props.navigation.navigate('Profile') }}

                    />
                </Drawer.Section>
                <Drawer.Section>
                <Drawer.Item
                        style={{ backgroundColor: '#F1F1F1' }}
                        icon='blood-bag'
                        


                        label='Register As A Donor'
                        onPress={() => { props.navigation.navigate('Registration Form') }}

                    />
                    {/* <Drawer.Item
                        style={{ backgroundColor: '#F1F1F1' }}
                        icon='chat'


                        label='Chatroom'
                        onPress={() => { props.navigation.navigate('Chatroom') }}

                    />
                  
                    <Drawer.Item
                        style={{ backgroundColor: '#F1F1F1' }}
                        icon='blood-bag'
                        label='Nearby Donors'
                        onPress={() => { props.navigation.navigate('Nearby') }}

                    /> */}




                </Drawer.Section>
                <Drawer.Section>

                    <Drawer.Item
                        style={{ backgroundColor: 'red',color:'white',margin:20 }}
                        icon='logout'


                        label='Logout'
                        onPress={() => { props.navigation.navigate('Blood Donation App') }}

                    />

                </Drawer.Section>
            </DrawerContentScrollView>


        </View>
    )
}
const mapStateToProps = function (state) {
    return {
        data: state.data
    }

}

export default connect(mapStateToProps, null)(SideMenu);
