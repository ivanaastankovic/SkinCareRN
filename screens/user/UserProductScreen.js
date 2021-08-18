import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as productsAction from '../../store/actions/products';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    // const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    console.log(userProducts);
    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
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
                        style={styles.btn1}
                        onPress={() => { selectItemHandler(item.item.productId) }}>
                        <Text style={styles.btnText}>LEARN MORE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btn2}
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
        headerTitleAlign: 'center'
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
        backgroundColor: '#e0b56c',
        borderRadius: 170,
        elevation: 5
    },
    btnText: {
        color: 'white',
        fontFamily: 'lora-regular'
    },
})
export default UserProductScreen;