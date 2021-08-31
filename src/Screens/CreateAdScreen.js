import React,{useState} from 'react';
import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView, Alert} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const CreateAdScreen=()=>{

const [loc,setLoc]=useState("");
const [desc,setDesc]=useState("");
const [suspects,setSuspects]=useState("");
const [phone,setPhone]=useState("");
const [image,setImage]=useState("");


const postData=async()=>{
    
await firestore().collection('ads')
.add({
    loc,
    desc,
    phone,
    image,
    suspects,
    uid:auth().currentUser.uid

    

})

Alert.alert("Posted!")
}

const ImageOpen=()=>{
    launchCamera({quality:0.5},(fileobj)=>{
        
        const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
        (snapshot) => {
            
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("Uploaded!")}
            
        }, 
        (error) => {
            alert("Something went wrong")
        }, 
        () => {
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImage(downloadURL)
            });
        }
        );

     })
    }
        

    return(
    
            <View style={styles.container}>
                <Text style={styles.heading}>Add New Complain</Text>
           
                <TextInput 
                label="Location" 
                value={loc} 
                mode="outlined" 
                onChangeText={text=>setLoc(text)}/>

                <TextInput 
                label="Describe"
                value={desc}
                mode="outlined"
                onChangeText={text=>setDesc(text)}
                numberOfLines={3}
                multiline={true} />

                <TextInput 
                label='Number of suspects'
                keyboardType='numeric'
                mode='outlined'
                value={suspects}
                onChangeText={text=>setSuspects(text)}
                />

                

                <TextInput 
                label="Phone Number"
                keyboard Type='numeric'
                mode='outlined'
                value={phone}
                onChangeText={text=>setPhone(text)}
                />

                <Button icon='camera' mode='contained' onPress={()=>ImageOpen()}>Upload Image</Button>
                <Button disabled={image&&phone&&suspects&&desc&&loc?false:true} mode='contained' onPress={()=>postData()}>Post</Button>
        
            </View>
        
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-evenly',
        paddingHorizontal:20,
        height:'100%'

    },
    heading:{
        fontWeight:'bold',
        fontSize:28,
        textAlign:'center'
    }
})

export default CreateAdScreen;
