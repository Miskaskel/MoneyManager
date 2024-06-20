import { View, Text, TextInput, StyleSheet,TouchableOpacity, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import Colors from '../services/Colors'
import ColorPicker from '../components/ColorPicker'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {supabase} from './../services/SupaBaseConfig'
import {useRouter} from 'expo-router';
import { auth } from '../services/firebase';

export default function AddNewCategory() {

    const [selectedIcon,setSelectedIcon] = useState('😄')
    const [selectedColor,setSelectedColor] =useState(Colors.BLUE)
    const [categoryName,setCategoryName] = useState();
    const [totalBudget,setTotalBudget] = useState();
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    
    const onCreateCategory=async()=>{  
      setLoading(true)
      const user = await auth.currentUser?.email
        const { data, error } = await supabase
        .from('Category')
        .insert([{
            name:categoryName,
            assigned_budget:totalBudget,
            icon:selectedIcon,
            color:selectedColor,
            created_by:user
        }]).select();
        
        console.log(error)
        console.log(data);
        if(data){
            router.replace({
                pathname:'/category-detail',
                params:{
                    categoryId:data[0].id
                }
            })
            setLoading(false)
           ToastAndroid.show('Categoria criada!', ToastAndroid.SHORT) 
        }
        if(error){
            setLoading(false)
        }
    }


    const formatNumber = (value) => {
        const numericValue = value.replace(/\D/g, '');
      
        if (numericValue.length === 0) {
          return '';
        }
        if (numericValue.length === 1) {
          return '0,0' + numericValue;
        }
        if (numericValue.length === 2) {
          return '0,' + numericValue;
        }
        const decimalPart = numericValue.slice(-2);
        let integerPart = numericValue.slice(0, -2);
        integerPart = integerPart.replace(/^0+/, '');
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formattedIntegerPart},${decimalPart}`;
      };
      
      
    const handleChange = (input) => {
        const formatted = formatNumber(input);
        console.log(formatted)
        setTotalBudget(formatted);
    };

  return (
    <View style={{marginTop:20,padding:20}}>
        <View style={{
            justifyContent:'center',
            alignItems:'center'
        }}>
            <TextInput
                style={[styles.iconInput,{ backgroundColor:selectedColor}]}
                maxLength={2}
                placeholder='😄'
                onChangeText={(value)=>setSelectedIcon(value)}

            >{selectedIcon}</TextInput>
             <ColorPicker selectedColor={selectedColor}
             setSelectedColor={(color)=>setSelectedColor(color)}/>
        </View>
       {/* Add Category Name and Total Budget Section */}
        <View style={styles.inputView}>
            <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
            <TextInput placeholder='Nome da Categoria' style={{width:'100%', fontSize:17}} 
            onChangeText={(v)=>setCategoryName(v)}/>
        </View>

        <View style={styles.inputView}>
            <FontAwesome name="dollar" size={24} color={Colors.GRAY} />
            <TextInput placeholder='Total do Orçamento' keyboardType='numeric' value={totalBudget} onChangeText={(value)=>handleChange(value)} style={{width:'100%', fontSize:17}} />
        </View>

        <TouchableOpacity style={styles.button} disabled={!categoryName||!totalBudget||loading} 
        onPress={()=>onCreateCategory()}>
            
            {loading?
                <ActivityIndicator color={Colors.WHITE}/>:
                <Text style={{textAlign:'center', fontSize:16, color:Colors.WHITE}}>Criar</Text>
            }
            
        </TouchableOpacity>

    </View>
  )
}

const styles =StyleSheet.create({
    iconInput:{
        textAlign:'center',
        fontSize: 30,
        padding:20,
        borderRadius:99,
        paddingHorizontal:28,
        color:Colors.WHITE
    },
    inputView:{
        border:1,
        flexDirection:'row',
        gap:2,
        padding:14,
        borderRadius:10,
        borderColor:Colors.BLACK,
        backgroundColor:Colors.WHITE,
        alignItems:'center',
        marginTop:30
    },
    button:{
        padding:15,
        borderRadius:99,
        marginTop:30,
        backgroundColor:Colors.PRIMARY
    }
})