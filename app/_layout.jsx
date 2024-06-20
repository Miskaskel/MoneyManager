import { View, Text } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router';
import { useFonts } from 'expo-font';


export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'), 
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),  
  });
  return (
    <Stack
    screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

      <Stack.Screen name='add-new-category' options={{
      presentation:'modal',
      headerShown:true,
      headerTitle:'Adicione uma Categoria'
    }}/>

      <Stack.Screen name='add-new-category-items' options={{
            presentation:'modal',
            headerShown:true,
            headerTitle:'Adicione um item'
          }}/>
      <Stack.Screen name='login/Registro' options={{
            presentation:'modal',
            headerShown:true,
            headerTitle:'Cadastrar Usuario'
          }}/>


    </Stack>

    
  )
}