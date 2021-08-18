import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import productsReducer from './store/reducers/products';
import { View, Text, StyleSheet} from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import CartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';


const rootReducer = combineReducers({ // rootReducer nam sluzi za kombinovanje vise state-ova, tj. da bismo vratili jedan veliki state koji sadrzi sva potrebna stanja 
  products: productsReducer,
  cart: CartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

export default function App() {

  
  const [loaded] = useFonts({
    'lora-regular': require('./assets/fonts/LoraRegular.ttf'),
    'lora-italic': require('./assets/fonts/LoraItalic.ttf'),
    'lora-regular-italic': require('./assets/fonts/LoraRegularItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
     <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  bla:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})