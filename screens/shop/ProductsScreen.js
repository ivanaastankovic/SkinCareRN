import React,{useEffect} from 'react';
import { Text, FlatList, StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // koristimo da bismo mogli da pristupimo store/reducers/PRODUCTS nizu
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import * as userActions from '../../store/actions/user'
import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton.js';
import { Ionicons } from '@expo/vector-icons';
const ProductsScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsActions.selectProducts());     // GET method ; vraca mi proizvode iz baze 
    }, [dispatch])
    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
        });
    };
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
                    >
                        <View style={styles.btn}>
                            <TouchableOpacity
                                style={styles.btn1}
                                onPress={() => { selectItemHandler(item.item.productId) }}>
                                <Text style={styles.btnText}>LEARN MORE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btn2}
                                onPress={() => { dispatch(cartActions.addProduct(item.item)) }}>
                                <Text style={styles.btnText}>ADD TO CART</Text>
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
        </SafeAreaView>

    )
}


ProductsScreen.navigationOptions = props => {
    return {

        headerTitle: 'SkinCare Shop',
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTitleAlign: 'center',
        
        headerLeft:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Cart'
                    iconName='cart'
                    onPress={() => { props.navigation.navigate('Cart') }} // Cart iz MainNavigtor-a gde je definisana ova ruta u createStackNav
                />
            </HeaderButtons>
        ,
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='logout'
                    iconName='log-out-outline'
                    onPress={() => {
                        Alert.alert(
                            '',
                            'Are you sure you want to leave?',
                            [
                                {text: 'Yes', onPress: () => props.navigation.navigate('Login')},
                                {text: 'NO', onPress: () => {}}
                            ]
                    )
                        
                    }} // Cart iz MainNavigtor-a gde je definisana ova ruta u createStackNav
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

    },
    btn: {
        padding: 5,
        borderRadius: 150, color: 'red',
        color: 'white',
    },
    btn1:{
        padding: 20,
        backgroundColor: '#f0d6a8',
        color: 'white',
        borderRadius: 170,
        elevation: 5
    }
    ,
    btn2: {
        padding: 20,
        backgroundColor: '#a7e7a7',
        borderRadius: 170,
        elevation: 5
    },
    btnText: {
        color: 'white',
        fontFamily: 'lora-regular'
    },
});

export default ProductsScreen;