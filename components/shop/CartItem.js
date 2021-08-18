import React from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CartItem = props => {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>{props.amount}</Text>
                <Text>{props.name}</Text>

            </View>

            <View style={styles.sumBtn}>
                <Text>
                    {props.totalSum.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={props.Remove} style={styles.btn}>
                    <Ionicons name={'ios-trash'} size={23} color="red" />
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 20
    },
    text:{
        margin:5
    },

    sumBtn:{
        margin:5
    }
})
export default CartItem;