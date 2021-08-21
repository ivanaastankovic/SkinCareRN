import React from 'react';

import { View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('productId');
    const choosenProduct = useSelector(state => state.products.availableProducts.find(p => p.productId === productId));
    const dispatch = useDispatch();
    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.imageView}>

                <Image source={{ uri: choosenProduct.imageUrl }} style={styles.image} />
            </View>
            <View >
                <TouchableOpacity
                style={styles.btnView}
                    onPress={() => {
                        dispatch(cartActions.addProduct(choosenProduct))
                    }}>
                    <Text style={styles.btn}>ADD TO CART</Text>
                </TouchableOpacity>
                {/* <Button color='#e0b56c' style={styles.btn} title="Add to cart" /> */}
            </View>
            <View style={styles.priceView}><Text style={styles.price}>{choosenProduct.price} RSD</Text></View>

            <View style={styles.descView}><Text style={styles.description}>
                {choosenProduct.description}
            </Text>
            </View>
        </ScrollView>
    );

}


ProductDetailsScreen.navigationOptions = props => {
    return {
        headerTitle: 'About product',
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTitleAlign: 'center',
    }
}
const styles = StyleSheet.create({

    scrollview: {
        backgroundColor: 'white',

    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
    },
    image: {
        borderRadius: 300,
        width: 300,
        height: 300,
    },
    btnView: {
        alignItems: 'center',
        padding: 20,
        marginLeft: 70,
        marginRight: 70,
        borderRadius: 200,
        backgroundColor: '#a7e7a7'
    },
    btn: {
        alignItems: 'center',
        fontFamily: 'lora-regular',
        color: 'white',
        fontSize: 20
    },
    price: {
        margin: 15,
        fontSize: 20,
        fontFamily: 'lora-regular',
        textAlign: 'center'
    },
    description: {
        fontFamily: 'lora-italic',
        fontSize: 15,
        margin: 10
    },
    priceView: {
        margin: 10
    },
    descView: {
        backgroundColor: '#FFF8DC',
        elevation: 5,
        margin: 25
    }
});

ProductDetailsScreen.navigationOptions = data => {
    return {
        headerTitle: data.navigation.getParam('productName'),
        headerTitleAlign: 'center'
    }
}
export default ProductDetailsScreen;