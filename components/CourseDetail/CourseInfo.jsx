import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../services/Colors';
import { supabase } from '../../services/SupaBaseConfig';
import { useRouter } from 'expo-router';

export default function CourseInfo({ categoryData }) {

    const [totalCost, setTotalCost] = useState();
    const [percTotal, setPercTotal] = useState(0);
    const [newBudgetValue, setNewBudgetValue] = useState(''); // State para armazenar o novo valor do orçamento
    const router = useRouter();

    useEffect(() => {
        categoryData && calculateTotalPerc();
    }, [categoryData]);

    const calculateTotalPerc = () => {
        let total = 0;
        categoryData?.CategoryItems?.forEach(item => {
            total = total + parseToFloat(item.cost);
        });
        setTotalCost(total);
        let perc = (total / categoryData.assigned_budget) * 100;
        if (perc > 100) {
            perc = 100;
        }
        setPercTotal(perc);
    };

    const parseToFloat = (formattedValue) => {
        const valueWithDot = formattedValue.replace(',', '.');
        return parseFloat(valueWithDot);
    };

    const onUpdateCategory = async () => {
        if (!newBudgetValue) {
            ToastAndroid.show('Por favor, insira um novo valor de orçamento.', ToastAndroid.SHORT);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('Category')
                .update({
                    assigned_budget: parseFloat(newBudgetValue), // Converte o valor para float antes de atualizar
                    // Outros campos que deseja atualizar aqui
                })
                .eq('id', categoryData.id)
                .select();

            if (error) {
                console.error('Erro ao atualizar categoria:', error.message);
                ToastAndroid.show('Erro ao atualizar categoria. Tente novamente mais tarde.', ToastAndroid.SHORT);
            } else {
                console.log('Categoria atualizada com sucesso:', data);
                ToastAndroid.show('Categoria atualizada com sucesso!', ToastAndroid.SHORT);
                // Pode ser necessário atualizar o state ou realizar outras ações após a atualização
                setNewBudgetValue(''); // Limpa o campo de entrada após a atualização bem-sucedida
            }
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error.message);
            ToastAndroid.show('Erro ao atualizar categoria. Tente novamente mais tarde.', ToastAndroid.SHORT);
        }
    };

    const onDeleteCategory = () => {
        Alert.alert('Você tem certeza', 'Deseja realmente excluir?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Sim',
                style: 'destructive',
                onPress: async () => {
                    const { error } = await supabase
                        .from('CategoryItems')
                        .delete()
                        .eq('category_id', categoryData.id);

                    await supabase
                        .from('Category')
                        .delete()
                        .eq('id', categoryData.id);

                    if (error) {
                        console.error('Erro ao deletar categoria:', error.message);
                        ToastAndroid.show('Erro ao deletar categoria. Tente novamente mais tarde.', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('A categoria foi deletada!', ToastAndroid.SHORT);
                        router.replace('/(tabs)');
                    }
                }
            }
        ]);
    };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={[styles.textIcon, { backgroundColor: categoryData.color }]}>
                        {categoryData.icon}
                    </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={styles.categoryNameText}>{categoryData?.name}</Text>
                    <Text style={styles.categoryItemText}>{categoryData?.CategoryItems?.length} Item</Text>
                </View>
                <TouchableOpacity onPress={onUpdateCategory}>
                    <MaterialIcons name="update" size={34} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDeleteCategory}>
                    <Ionicons name="trash" size={34} color="red" />
                </TouchableOpacity>
            </View>
            {/* Input para inserir o novo valor do orçamento */}
            <TextInput
                style={styles.input}
                placeholder="Novo valor do orçamento"
                keyboardType="numeric"
                value={newBudgetValue}
                onChangeText={text => setNewBudgetValue(text)}
            />
            {/* Progress Bar */}
            <View style={styles.amountContainer}>
                <Text style={{ fontFamily: 'outfit' }}>R$ {totalCost}</Text>
                <Text style={{ fontFamily: 'outfit' }}>Total do Orçamento: R$ {categoryData.assigned_budget}</Text>
            </View>
            <View style={styles.progressBarMainContainer}>
                <View style={[styles.progressBarSubContainer, { width: percTotal + '%' }]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    textIcon: {
        fontSize: 25,
        padding: 20,
        borderRadius: 15
    },
    categoryNameText: {
        fontFamily: 'outfit-bold',
        fontSize: 24
    },
    categoryItemText: {
        fontFamily: 'outfit',
        fontSize: 16
    },
    amountContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15
    },
    progressBarMainContainer: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
        marginTop: 7
    },
    progressBarSubContainer: {
        width: '40%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        height: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.GRAY,
    },
});
