import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton.js';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';

const UpdateProductScreen = props => {
    // ovaj screen koristim i za add product i za update product i zbog toga proveravam da li je updatingProduct ==null
    // ako nije onda je update mode, a ako jeste onda je add product mode

    const productId = props.navigation.getParam('productId');
    const updatingProduct = useSelector(state => state.products.userProducts.find(product => product.productId === productId))
    // 
    const [name, setName] = useState(updatingProduct ? updatingProduct.name : '');
    const [description, setDescription] = useState(updatingProduct ? updatingProduct.description : '');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(updatingProduct ? updatingProduct.imageUrl : '');

    const dispatch = useDispatch();;
    const submitHandler = useCallback(() => {
        if(updatingProduct){
            // ako nije null uci ce u if granu, tj. updateujem proizvod
            dispatch(productActions.updateProduct(productId, name, description,image))
        }
        else{
            // dodajem proizvod // ADD Product
            dispatch(productActions.insertProduct(name,description,image, +price))
        }
    },  [dispatch, productId, name, description, image, price])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);
    // useEffect(() => {
    //     props.navigation.setParams({ submit: submitHandler });
    //   }, [submitHandler]);
    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={text => setName(text)} />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        value={description}
                        multiline={true}
                        onChangeText={text => setDescription(text)} />
                </View>
                {updatingProduct ? null :   //obezbedjujem da ako je u update mode-u ne moze da menja cenu 
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.textInput}
                            value={price}
                            onChangeText={text => setPrice(text)} />
                    </View>
                }
                <View style={styles.inputField}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={image}
                        onChangeText={text => setImage(text)} />
                </View>
            </View>
        </ScrollView>

    )
}

UpdateProductScreen.navigationOptions = props => {
    const submitFunction = props.navigation.getParam('submit');
    // const submitFn = props.navigation.getParam('submit');
    return {
        headerTitle: props.navigation.getParam('productId') ? 'Edit Product' : 'New Product',
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTitleAlign: 'center',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Save'
                iconName='checkmark-circle-outline'
                onPress={submitFunction } // Cart iz MainNavigtor-a gde je definisana ova ruta u createStackNav
            />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        margin: 20
    },
    inputField: {
        margin: 20
    },
    label: {
        fontSize: 18,
        fontFamily: 'lora-regular-italic',
        margin: 5
    },
    textInput: {
        borderWidth: 1.5,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 150,
        borderColor: '#ffc680'
    },
    descriptionInput:{
        borderWidth: 1.5,
        paddingHorizontal: 20,
        padding: 10,
        paddingVertical:20,
        borderRadius: 150,
        borderColor: '#ffc680'
    }
})
export default UpdateProductScreen;