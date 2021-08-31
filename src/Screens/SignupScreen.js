import React,{useState} from 'react';
import { View,Image,StyleSheet,Text,KeyboardAvoidingView, TouchableOpacity,Alert } from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';


const SignupScreen=({navigation})=>{

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

const SignFire= async()=>{
    if(!email||!pass) {
        Alert.alert("Email and Password is Empty!");
        return;
    }
    const re = await auth().createUserWithEmailAndPassword(email,pass)
    console.log(re);
}

    return(
        <KeyboardAvoidingView behavior='position' style={styles.container}>
        <View style={styles.box1}>
            <Image style={styles.logo} source={{uri:'https://firebasestorage.googleapis.com/v0/b/myapp-456fc.appspot.com/o/items%2Fcrime.jpg?alt=media&token=8f8991c1-426b-40ae-bd8b-8485c3bd4fb3'}}/>
            <Text style={styles.heading}>Sigup</Text>
        </View>
        <View style={styles.signup}>
            <TextInput label='First Name' mode='outlined'/>
            <TextInput label='Last Name' mode='outlined'/>
            <TextInput label='Email' mode='outlined' value={email} onChangeText={(text)=>setEmail(text)}/>
            <TextInput label='Password' mode='outlined' value={pass} onChangeText={(text)=>setPass(text)}/>
            <Button mode='contained' onPress={()=>SignFire()}>Signup</Button>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text style={styles.signupLink}>Already have an account?</Text></TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
}
const styles=StyleSheet.create({
    container:{
        marginTop:60
        },
    logo:{
        width:270,
        height:130,    
    },
    box1:{
        alignItems:"center"
    },
    signup:{
        paddingHorizontal:20,
        marginTop:30,
        height:'55%',
        justifyContent:'space-evenly'
    },
    heading:{
        fontSize:28,
        fontWeight:'bold',
        color:'black'
    },
    signupLink:{
        textAlign:'center',
        textDecorationLine:'underline',
        marginTop:15
    }
})

export default SignupScreen;