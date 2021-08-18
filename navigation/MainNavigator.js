import { createStackNavigator } from 'react-navigation-stack';//Stack Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.
import {createAppContainer} from 'react-navigation';

import ProductsScreen from '../screens/shop/ProductsScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator({
    HomeScreen: ProductsScreen, // ovo ce nam biti pocetni Screen nakon sto se korisnik prijavi 
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}
,
{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Colors.secondaryColor,
            headerTintColor: 'white' 
        },
        headerTitleStyle: {
            fontFamily: 'lora-italic',
        }
    }
});

export default createAppContainer(ProductsNavigator);