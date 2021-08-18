import React from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';

const CartScreen = props => {

    const totalAmount = useSelector(state => state.cart.sum)   // state jer nam je dostupno, cart jer je tako definisan selektor u App.js-u i onda sum da uzmemo sumu
    const products = useSelector(state => {
        const productsArray = [];
        for (const key in state.cart.cartProducts) { // transformisem objekat u niz, da bih lakse radila sa flatlistom
            productsArray.push({
                productId: key,
                name: state.cart.cartProducts[key].name, // iz cartItem.js modela
                price: state.cart.cartProducts[key].price,
                amount: state.cart.cartProducts[key].amount,
                totalSum: state.cart.cartProducts[key].totalSum
            })
        }
        console.log(state.cart.cartProducts)
        // console.log("NIZ")
        // console.log(productsArray);
        return productsArray.sort((p1, p2) => p1.productId > p2.productId ? 1 : -1); // sort sortira brojeve, zato pomocu ternarnog operatora proveravam vrednost i ako je vece onda vracam 1 u suprotnom -1
    });

    const dispatch = useDispatch();

    return <View style={styles.container}>
        <View style={styles.cartInfo}>
            <View style={styles.textView}>
                <Text style={styles.text}>Total $ <Text style={styles.text}>{totalAmount.toFixed(2)}</Text></Text>
            </View>
            <TouchableOpacity disabled={products.length === 0} style={styles.btn}><Text style={styles.text}>SHOP NOW</Text></TouchableOpacity>
        </View>

        <View style={styles.k}>

            <FlatList
                style={styles.list}
                data={products}
                keyExtractor={itemData => itemData.productId}
                renderItem={itemData => (
                    <CartItem
                        amount={itemData.item.amount}
                        name={itemData.item.name}
                        totalSum={itemData.item.totalSum}
                        Remove={() => {
                            dispatch(cartActions.deleteProduct(itemData.item.productId))
                        }}
                    />
                    // <Text>{itemData.item.name}</Text>
                )}
            />
        </View>


    </View>
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    // },
    cartInfo: {
        margin: 20
    },
    textView: {
        padding: 15,
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
    },
    btn: {
        padding: 20,
        margin: 30,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        borderColor: '#DEB887',
        backgroundColor: '#DEB887',
        elevation: 5
    },
    text:
    {
        fontFamily: 'lora-regular',
        fontSize: 18
    },
    list: {
        backgroundColor: '#F5F5DC'
    },
    k: {

    }
})

CartScreen.navigationOptions = props => {
    return {
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTintColor: '#272625',
        headerTitleAlign: 'center',

    }
}
export default CartScreen;