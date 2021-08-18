import React from 'react';
import { Text, FlatList, StyleSheet, View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // koristimo da bismo mogli da pristupimo store/reducers/PRODUCTS nizu
import * as cartActions from '../../store/actions/cart'
import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton.js';
const ProductsScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.list}>

            <FlatList

                data={products}
                keyExtractor={item => item.id}
                renderItem={item =>
                    <ProductItem
                        image={item.item.imageUrl}
                        title={item.item.name}
                        price={item.item.price}
                        onViewDetail={() => {
                            props.navigation.navigate('ProductDetails',  // iz MainNavigation-a, identifier name
                                {
                                    productId: item.item.productId,
                                    productName: item.item.name
                                }) // prosledjujem Id proizvoda da bih znala koje podatke treba da prikazem
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addProduct(item.item)); // koristimo redux da bismo prosledili objekat product koji zelimo da ubacimo u bazu pomocu addProduct akcije
                        }}
                    >

                    </ProductItem>}

            />
        </SafeAreaView>

    )
}


ProductsScreen.navigationOptions = props => {
    return {

        headerTitle: '#skincare',
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTintColor: '#272625',
        headerTitleAlign: 'center',
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName='ios-cart'
                    onPress={() => {props.navigation.navigate('Cart')}} // Cart iz MainNavigtor-a gde je definisana ova ruta u createStackNav
                />
            </HeaderButtons>


    }
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',

    }
});

export default ProductsScreen;