import React,{useState,useEffect} from 'react';
import { View,Text,StatusBar,SafeAreaView,StyleSheet } from 'react-native';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer,DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';


import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import CreateAdScreen from './Screens/CreateAdScreen';
import DisplayScreen from './Screens/DisplayScreen';
import ProfileScreen from './Screens/ProfileScreen';
import { white } from 'react-native-paper/lib/typescript/styles/colors';



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary:'black'
  },
};
const MyTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    background:'white'
  },
};

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

const TabNavigator=()=>{

  return(

    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'        
        }
        else if(route.name === 'Post')
        {
          iconName= 'plus-circle'
        }
        else if(route.name === 'Profile')
        {
          iconName = 'user'
        }
        // You can return any component that you like here!
        return <Text ><Feather name={iconName} size={35} color={color} /></Text>
     
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'lightblue',
    })}>
      <Tab.Screen name='Home' component={DisplayScreen} options={{headerShown:false,title:""}} />
      <Tab.Screen name="Post" component={CreateAdScreen} options={{headerShown:false,title:""}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false,title:""}}/>
    </Tab.Navigator >
  )
}

const StackNav=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Signup' component={SignupScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const AuthNavigator=()=>{
const [token,setToken] = useState(false);
useEffect(()=>{
  try{
  auth().onAuthStateChanged((userExist)=>{
    if(userExist)
    {
      setToken(true);
    }
    else
    {
      setToken(false);
    }
  })
}
  catch(error)
  {
    //
  }
},[])
  return(
    <NavigationContainer theme={MyTheme}>
      {token?
      <TabNavigator/>:
      <StackNav/>
      }
    </NavigationContainer>
  )
}
const App=()=>{

  
  return(
    <PaperProvider theme={theme}>
    <View style={styles.constainer}>
      <StatusBar backgroundColor='black'/>
      <AuthNavigator/>
    </View>
    </PaperProvider>
  )
}
const styles=StyleSheet.create({
constainer:{
  backgroundColor:"white",
  flex:1,
  
}
})
export default App;