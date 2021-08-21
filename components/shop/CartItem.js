import React from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.amount}</Text>
                <Text style={styles.mainText}>{props.name}</Text>

            </View>

            <View style={styles.itemData}>
                <Text style={styles.mainText}>
                    {props.totalSum.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={props.Remove} style={styles.deleteButton}>
                    <Ionicons name={'ios-trash'} size={23} color="#CD5C5C" />
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     paddingHorizontal:20,
    //     justifyContent:'space-between',
    //     flexDirection: 'row',
    //      marginHorizontal: 20,
    //      marginVertical:10
    // },
    // textContainer:{
    //     paddingRight:90,
    //     justifyContent:'space-between',
    //     alignItems:'center'
    // },

    // sumBtn:{
    //     justifyContent:'space-around',
    //     paddingLeft:0,
    //     alignItems:'center'
    // },
    // text:{
    //     fontSize:20,
    //     fontFamily:'lora-regular'
    // }
    cartItem: {
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
      },
      itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around'
      },
      quantity: {
        fontFamily: 'lora-regular',
        color: 'black',
        fontSize: 15,
        marginRight:8,
        borderRadius:100,
        backgroundColor:'#FFDEAD',
        paddingHorizontal:15,
        paddingVertical:5
      },
      mainText: {
        fontFamily: 'lora-regular',
        fontSize: 15,
       
      },
      deleteButton: {
        marginLeft: 20
      }
})
export default CartItem;