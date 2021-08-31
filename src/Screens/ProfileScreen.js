import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import FlatListData from './FlatListData';

const ProfileScreen=()=>{


    return(
        <>
        <View style={styles.container}>
            <Text style={styles.heading}>Your are logged in as {auth().currentUser.email}</Text>
            <Button style={{marginTop:10}} mode='contained' onPress={()=>auth().signOut()}>Logout</Button>
        </View>

        <View style={styles.container2}>
            <Text style={styles.heading2}>My Posts</Text>
            <FlatListData id={auth().currentUser.uid}/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:15,
        alignItems:'center',
       
       
        
    },
    container2:{
        marginTop:20,
        
    },
    heading:{
        textAlign:'center',
        fontSize:15,
        
    },
    heading2:{
        textAlign:'center',
        fontSize:30,
        textDecorationLine:'none',
        fontWeight:'bold'
    }
})

export default ProfileScreen;