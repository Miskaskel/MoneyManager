import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../services/Colors';
import { auth } from '../services/firebase'
export default function Header() {
  const [user,setUser] = useState()

  useEffect(()=>{
      getUser();
  },[])

  const getUser = async()=>{
      const user = await auth.currentUser?.email
      setUser(user);
  }
  /**
   * Used to get User Data
   */
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      padding:10
    }}>
    

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <View style={{}}>
          <Text style={{ color: Colors.WHITE, fontSize: 16, fontFamily: 'outfit' }}>Bem-vindo,</Text>
          <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-bold' }}>{user}</Text>
        </View>
      </View>

    </View>
  )
}