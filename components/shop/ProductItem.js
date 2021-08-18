import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
// reusable komponenta koju koristim u ProductsScreen-u
const ProductItem = props => {
    return (
        <View style={styles.product}>

            <View style={styles.productDetails}>
                <Image style={styles.image} source={{ uri: props.image }}></Image>
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttons}>
                {/* <View style={styles.btn}>
                    <TouchableOpacity
                        style={styles.btn1}
                        onPress={props.onViewDetail}>
                        <Text style={styles.btnText}>LEARN MORE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btn2}
                        onPress={props.onAddToCart}>
                        <Text style={styles.btnText}>ADD TO CART</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.btn2} title='Add to Cart' />   </View> */}

               {props.children}
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        alignItems: 'center',
        paddingBottom: 15,
        margin: 15
    },
    productDetails: {
        flex: 1,
        margin: 15,
        height: 250,
        width: 250,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#FFF5EE',
        backgroundColor: '#FFF5EE',
        opacity: 2
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: 5,
        borderRadius: 150, color: 'red',
        color: 'white',
    },
    btn1: {
        padding: 20,
        backgroundColor: '#f0d6a8',
        color: 'white',
        borderRadius: 170,
        elevation: 5
    },
    btn2: {
        padding: 20,
        backgroundColor: '#e0b56c',
        borderRadius: 170,
        elevation: 5
    },
    btnText: {
        color: 'white',
        fontFamily: 'lora-regular'
    },
    title: {
        fontFamily: 'lora-italic',
        fontSize:20
    },
    price:
    {
        fontSize:15,
        fontFamily: 'lora-regular'
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:160
    },
    text:{
        alignItems:'center',
        justifyContent:'center',
        padding:10,
    }
});

export default ProductItem;