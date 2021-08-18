import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as productsAction from '../../store/actions/products';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton.js';
const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    // const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    console.log(userProducts);
    const updateProductHandler = (id) => {
        props.navigation.navigate('UpdateAdminProducts', {
            productId: id,                                      // pomocu ovog Id-a odlucujem da li je update ili add product u updateProductScreenu
        });
    };
    return <FlatList
        style={styles.list}
        data={userProducts}
        keyExtractor={item => item.productId}
        renderItem={item =>
            <ProductItem
                image={item.item.imageUrl}
                title={item.item.name}
                price={item.item.price}
            >
                <View style={styles.btn}>
                    <TouchableOpacity
                        style={styles.btn1}  // UPDATE
                        onPress={() => { updateProductHandler(item.item.productId) }}>
                        <Text style={styles.btnText}>EDIT</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btn2} // DELETE
                        onPress={() => { dispatch(productsAction.deleteProduct(item.item.productId)) }}>
                        <Text style={styles.btnText}>DELETE</Text>
                    </TouchableOpacity>
                </View>


                {/* onViewDetail={() => {
                    props.navigation.navigate('ProductDetails',  // iz MainNavigation-a, identifier name
                        {
                            productId: item.item.productId,
                            productName: item.item.name
                        }) // prosledjujem Id proizvoda da bih znala koje podatke treba da prikazem
                }} */}
                {/* onAddToCart={() => {
                    dispatch(cartActions.addProduct(item.item)); // koristimo redux da bismo prosledili objekat product koji zelimo da ubacimo u bazu pomocu addProduct akcije
                }} */}
                {/* > */}

            </ProductItem>}

    />

}

UserProductScreen.navigationOptions = props => {
    return {

        headerTitle: 'Your products',
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTitleAlign: 'center',
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='New product'
                    iconName='add-outline'
                    onPress={() => { props.navigation.navigate('UpdateAdminProducts'); }} // Cart iz MainNavigtor-a gde je definisana ova ruta u createStackNav
                />
            </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    },
    btn: {
        padding: 5,
        borderRadius: 150, color: 'red',
        color: 'white',
    },
    btn1: {
        padding: 20,
        paddingHorizontal:30,
        backgroundColor: '#f0d6a8',
        color: 'white',
        borderRadius: 170,
        elevation: 5
    }
    ,
    btn2: {
        padding: 20,
        backgroundColor: '#E9967A',
        borderRadius: 170,
        elevation: 5
    },
    btnText: {
        color: 'white',
        fontFamily: 'lora-regular'
    },
})
export default UserProductScreen;