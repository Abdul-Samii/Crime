import React,{useState} from 'react';
import {View,Image,Text, LogBox,StyleSheet, KeyboardAvoidingView,TouchableOpacity,Alert} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) =>{

const [email,setEmail] = useState("");
const [pass,setPass] = useState("");

const SignFire = async()=>{
    if(!email||!pass)
    {
        Alert.alert("Email or Password is empty!");
        return;
    }
    try{
    await auth().signInWithEmailAndPassword(email,pass);
    }
    catch(error)
    {
        Alert.alert("Email or Password Wrong");
    }
}
    return(
        <KeyboardAvoidingView behavior='position' style={styles.container}>
            <View style={styles.view1}>
                <Image  style={styles.logo} source={{uri:'https://firebasestorage.googleapis.com/v0/b/myapp-456fc.appspot.com/o/items%2Fcrime.jpg?alt=media&token=8f8991c1-426b-40ae-bd8b-8485c3bd4fb3'}}/>
                <Text style={styles.heading}>Login to Continue!</Text>
            </View>
            <View style={styles.input}>
                <TextInput label="Email" mode="outlined" value={email} onChangeText={(text)=>setEmail(text)}/>
                <TextInput label='Password' mode='outlined' value={pass} onChangeText={(text)=>setPass(text)}/>
                <Button mode="contained" onPress={()=>SignFire()}>Login</Button>
                <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text style={styles.signupLink}>Don't have an account?</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingTop:60
        },
    logo:{
        width:270,
        height:130,    
    },
    view1:{
        alignItems:'center'
    },
    heading:{
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    },
    input:{
        paddingHorizontal:20,
        marginTop:30,
        height:'50%',
        justifyContent:'space-evenly'
    },
    signupLink:{
        textAlign:'center',
        textDecorationLine:"underline",
    }
})
export default LoginScreen;