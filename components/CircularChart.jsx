import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../services/Colors';
import PieChart from 'react-native-pie-chart';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CircularChart({ categoryList }) {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
  const [totalCalculatedEstimate, setTotalCalculatedEstimate] = useState(0);

  useEffect(() => {
    if (categoryList) {
      updateCircularChart();
    }
  }, [categoryList]);

  const updateCircularChart = () => {
    let totalCalculatedEstimate = 0;
    let newSliceColor = [];
    let newValues = [];
    let otherCost = 0;

    categoryList.forEach((item, index) => {
      let itemTotalCost = 0;

      item.CategoryItems?.forEach((item_) => {
        itemTotalCost += item_.cost;
        totalCalculatedEstimate += item_.cost;
      });

      if (index < 4) {
        // Use the color chosen by the user if available, otherwise fallback to default color
        const color = item.color || Colors.COLOR_LIST[index];
        newSliceColor.push(color);
        newValues.push(itemTotalCost);
      } else {
        otherCost += itemTotalCost;
      }
    });

    // Add "Other" category if there are more than 4 categories
    if (categoryList.length > 4) {
      newSliceColor.push(Colors.COLOR_LIST[4]);
      newValues.push(otherCost);
    }

    if (newValues.length === 0) {
      newValues.push(1);
      newSliceColor.push(Colors.GRAY);
    }

    setSliceColor(newSliceColor);
    setValues(newValues);
    setTotalCalculatedEstimate(totalCalculatedEstimate);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>Valor Estimado:<Text style={{ fontFamily: 'outfit-bold' }}> R$ {totalCalculatedEstimate} </Text></Text>
      <View style={styles.SubContainer}>
        {values.reduce((a, b) => a + b, 0) > 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={'#FFF'}
          />
        ) : (
          <Text>Sem dados para exibir</Text>
        )}
        {categoryList && categoryList.length === 0 ? (
          <View style={styles.chartNameContainer}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
            <Text>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList && categoryList.map((category, index) => index <= 4 && (
              <View key={index} style={styles.chartNameContainer}>
                <MaterialCommunityIcons
                  name="checkbox-blank-circle" size={24} color={category.color || Colors.COLOR_LIST[index]} />
                <Text>{index < 4 ? category.name : 'Other'}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    elevation: 1
  },
  SubContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40
  },
  chartNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  }
});
