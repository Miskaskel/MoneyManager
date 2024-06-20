import { View, Text, StyleSheet, Button, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router'
import { supabase } from '../../services/SupaBaseConfig'
import Header from '../../components/Header';
import CircularChart from '../../components/CircularChart';
import Colors from '../../services/Colors';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../services/firebase';
import CategoryList from '../../components/CategoryList';
import { signOut } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {

  const router = useRouter();
  const [user,setUser] = useState()
  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      ListarCategorias();
    }, [])
  );

  useEffect(() => {
    getUser();
    ListarCategorias();
    const unsubscribe = auth.onAuthStateChanged(user => {        
      if (user) {
        
      }else{
        router.replace('/login')
      }
    })
    
    return unsubscribe
  }, [])

  const logout = async ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const getUser = ()=>{
    const user = auth.currentUser?.email
    setUser(user);
    ListarCategorias()
    console.log(user)
}

const ListarCategorias = async() =>{
    setLoading(true)
    const {data, error} = await supabase.from('Category').select('*,CategoryItems(*)').eq('created_by',user)
    setCategoryList(data)
    console.log(data)        
    data&&setLoading(false)
}

  return (
    <View style={{
      marginTop:0,
      flex: 1
    }}>
      <ScrollView  refreshControl={<RefreshControl onRefresh={() => ListarCategorias()} refreshing={loading}
      />}>
        <View style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: 150,
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '85%',
          }}>
            <Header />
            <View >
              <TouchableOpacity onPress={logout}>
                <MaterialIcons name="exit-to-app" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>


        </View>
        <View style={{
          padding: 20,
          marginTop: -80,
        }}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <Link href={'/add-new-category'} style={styles.adBtnContainer}>
        <Ionicons name="add-circle" size={64} color={Colors.PRIMARY} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  adBtnContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }
})