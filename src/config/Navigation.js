import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Home'
import ProfileScreen from '../components/Profile'
import Chatroom from '../components/Chatroom'
import { Image } from 'react-native';
// import ChatsTab from '../component/Tabs/Chats'
// import CallsTab from '../component/Tabs/Calls'
// import StatusTab from '../component/Tabs/Status'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../components/login'
import mainPage from '../components/mainPage'
import { connect } from 'react-redux';
import SideMenu from '../components/sideMenu'
import registrationForm from '../components/registrationForm'
import Chat from '../components/Chats'
import NearbyDonors from '../components/Nearby'
import Nearby from '../components/Nearby';

// import { View, StyleSheet } from 'react-native';
// import {
//   DrawerItem,
//   DrawerContentScrollView,
// } from '@react-navigation/drawer';
// import {
//   useTheme,
//   Avatar,
//   Title,
//   Caption,
//   Paragraph,
//   Drawer,
//   Text,
//   TouchableRipple,
//   Switch,
// } from 'react-native-paper';
// import { MaterialCommunityIcons } from '@expo/vector-icons';




const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator(props) {
    return (
        <Stack.Navigator initialRouteName='Blood Donation App' screenOptions={{ headerShown:false}}>
            {/* <Stack.Screen name='Blood Donation App' component={mainPage} /> */}

            <Stack.Screen name='Login' component={Login} />
            {/* <Stack.Screen name='Registration Form' component={registrationForm} /> */}

            <Stack.Screen name="Home" component={DrawerNavigator} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}

            {/* {console.log('propsööö', props.data)} */}
        </Stack.Navigator>
    );
}



function DrawerNavigator(props, isLoggedIn) {



    return (


        // <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>

        //     {props.isLoggedIn ? (
        //         <>
        //             <Drawer.Screen name="Home" component={HomeScreen} />
        //             <Drawer.Screen name="Profile" component={ProfileScreen} />
        //             {/* <Drawer.Screen name='Login' component={Login} /> */}
        //         </>
        //     ) : (


        //             <Drawer.Screen name='Login' component={Login} />
        //             )}
        <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>

            {/* {props.isLoggedIn ? ( */}
            <>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                {/* <Drawer.Screen name='Chatroom' component={Chatroom} />
                <Drawer.Screen name='Chat' component={Chat} /> */}
                <Drawer.Screen name='Registration Form' component={registrationForm} />
                {/* <Drawer.Screen name='Nearby' component={Nearby} /> */}


                

            </>
            {/* ) : ( */}


            {/* <Drawer.Screen name='Login' component={Login} /> */}
            {/* )} */}

        </Drawer.Navigator>

    )
}


// import React from 'react';


// function DrawerContent(props) {
//     console.log('drawerdata++++',props.data)
//   return (
//     <DrawerContentScrollView {...props}>
//       <View
//         style={
//           styles.drawerContent
//         }
//       >
//         <View style={styles.userInfoSection}>
//         {props.data && props.data.picture && props.data.picture.data && props.data.picture.data.url ?  <Avatar.Image
//             source={{
//               uri:
//                 props.data.picture.data.url,
//             }}
//             size={50}
//           />:null}
//           <Title style={styles.title}>{props.data && props.data.name}</Title>
//           <Caption style={styles.caption}>@trensik</Caption>
//           <View style={styles.row}>
//             <View style={styles.section}>
//               <Paragraph style={[styles.paragraph, styles.caption]}>
//                 202
//               </Paragraph>
//               <Caption style={styles.caption}>Following</Caption>
//             </View>
//             <View style={styles.section}>
//               <Paragraph style={[styles.paragraph, styles.caption]}>
//                 159
//               </Paragraph>
//               <Caption style={styles.caption}>Followers</Caption>
//             </View>
//           </View>
//         </View>
//         <Drawer.Section style={styles.drawerSection}>
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="account-outline"
//                 color={color}
//                 size={size}
//               />
//             )}
//             label="Profile"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons name="tune" color={color} size={size} />
//             )}
//             label="Preferences"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="bookmark-outline"
//                 color={color}
//                 size={size}
//               />
//             )}
//             label="Bookmarks"
//             onPress={() => {}}
//           />
//         </Drawer.Section>
//         <Drawer.Section title="Preferences">
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.preference}>
//               <Text>Dark Theme</Text>
//               <View pointerEvents="none">
//                 <Switch value={false} />
//               </View>
//             </View>
//           </TouchableRipple>
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.preference}>
//               <Text>RTL</Text>
//               <View pointerEvents="none">
//                 <Switch value={false} />
//               </View>
//             </View>
//           </TouchableRipple>
//         </Drawer.Section>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
// });
// const  mapStateToProps = function (state) {
//     return {
//          data: state.data
//     }

// }

// export default (DrawerNavigator);
export default (StackNavigator);



// export default connect() (StackNavigator)





