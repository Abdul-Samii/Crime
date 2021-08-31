import React,{useState,useEffect} from 'react';
import {View,Text,FlatList,StyleSheet,Linking,Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Avatar,Button,Card,Paragraph,Title} from 'react-native-paper';



const FlatListData=(props)=>{

    const [myData,setData] = useState([]);

    const getData=async ()=>{
        const querySnap = await firestore().collection('ads').get()
        const  result = querySnap.docs.map(docSnap=>docSnap.data())
        console.log(result);
        setData(result);
    }
    
    useEffect(()=>{
        getData();
    })

    
const OpenDial = (phone)=>{
    if(Platform.OS === 'android')
    {
        Linking.openURL(`tel:${phone}`);
    }
    else{
        Linking.openURL(`telprompt:${phone}`);
    }
}
    const displayItem=(item)=>{
        if(props.id)
        {
            if(props.id == item.uid)
            {
                return(    

                    <Card style={styles.card}> 
                        <Card.Title title={item.loc} />
                        <Card.Content>
                            <Paragraph>{item.desc}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{uri : item.image}}/>
                        <Card.Actions>
                            
                            <Button onPress={()=>OpenDial(item.phone)}>CALL NOW!</Button>
                        </Card.Actions>
                    </Card>
                    )
            }
        }
        else{
        return(    

            <Card style={styles.card}> 
            <Card.Title title={item.loc} />
            <Card.Content>
                <Paragraph>{item.desc}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri : item.image}}/>
            <Card.Actions>
                
                <Button onPress={()=>OpenDial(item.phone)}>CALL NOW!</Button>
            </Card.Actions>
        </Card>
    )
        }

}

    return(
       
    <FlatList 
            data={myData}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>displayItem(item)}
            
            />
    )
}

const styles=StyleSheet.create(
    {
        card:{
            margin:15,
            elevation:2
        }
    }
)

export default FlatListData;