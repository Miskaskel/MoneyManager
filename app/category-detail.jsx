import { View, ScrollView ,TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Link, router, useLocalSearchParams, useRouter} from 'expo-router'
import { supabase } from '../services/SupaBaseConfig';
import { Ionicons } from '@expo/vector-icons';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemList from '../components/CourseDetail/CourseItemList';
import Colors from '../services/Colors';

export default function CategoryDetails() {

  const {categoryId}=useLocalSearchParams();
  const [categoryData,setCategoryData] = useState([]);
  const router=useRouter();
  useEffect(()=>{
    console.log(categoryId)
    categoryId&&getCategoryDetail();    
  },[categoryId]);

  const getCategoryDetail=async()=>{
    const {data,error}=await supabase.from('Category')
    .select('*,CategoryItems(*)')
    .eq('id',categoryId)
    setCategoryData(data[0]);
  }
  return (
    <View style={{padding:20,marginTop:20, flex:1, backgroundColor:Colors.WHITE}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={()=>router.replace('/(tabs)')}>
          <Ionicons name="arrow-back-circle" size={44} color="black" />
        </TouchableOpacity>
        <CourseInfo categoryData={categoryData}/>
        
        <CourseItemList categoryData={categoryData} setUpdateRecord={()=>getCategoryDetail()}/>
      </ScrollView>

      <Link style={styles.floatingBtn} href={{
        pathname:'/add-new-category-items',
        params:{
          categoryId:categoryData.id,
          categoryData:categoryData.assigned_budget
        }
      }}>
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  floatingBtn:{
    position:'absolute',
    bottom:16,
    right:16
  }
})