import { createStackNavigator } from 'react-navigation-stack';//Stack Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductsScreen from '../screens/shop/ProductsScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from '../constants/Colors';
import LoginScreen from '../screens/shop/LoginScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import UpdateProductScreen from '../screens/user/UpdateProductScreen';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'
const ProductsNavigator = createStackNavigator({
    HomeScreen: ProductsScreen, // ovo ce nam biti pocetni Screen nakon sto se korisnik prijavi 
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}
    ,
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.secondaryColor,
            },
            headerTitleStyle: {
                fontFamily: 'lora-italic',
            }
        }
    });


// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// },
//     {
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: Colors.secondaryColor,
//             },
//             headerTitleStyle: {
//                 fontFamily: 'lora-italic',
//             }
//         }
//     })

const AdminUserProducts = createStackNavigator({
    AdminProducts: UserProductScreen,  // za brisanje i pregled proizvoda admina
    UpdateAdminProducts: UpdateProductScreen
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.secondaryColor,
            },
            headerTitleStyle: {
                fontFamily: 'lora-italic',
            }
        }
    });

// const DrawNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator
// })
const MainTabNavigator = createBottomTabNavigator({
    Products: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="globe-outline" size={25} color='black' style={{ marginTop: 5 }} />
            },
            tabBarLabel: 'Shop'
        }
    },
    // Orders: OrdersNavigator,
    AdminScreen: {
        screen: AdminUserProducts,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="person-circle-outline" size={25} color='black' style={{ marginTop: 5 }} />
            },
            tabBarLabel: 'My products'
        }
    }
})
export default createAppContainer(MainTabNavigator);