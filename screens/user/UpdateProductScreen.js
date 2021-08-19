import React, { useState, useEffect, useCallback, useReducer } from 'react';
// useReducer hook pomaze da handlejem stanje promenljivih, ako ih ima vise i kompleksno je npr
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton.js';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import Input from '../../components/Input';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formValidationReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const newValues = {
            ...state.inputValues,
            [action.triggeredInputField]: action.inputValue   // prethodno sam kopirala stanje input polja a potom izmenila key-value par gde sam promenila vrednost odredjenog text field-a novom vrednoscu 
        }
        console.log(state.inputValues)
        const updatedinputValidation = {
            ...state.inputValidation,
            [action.triggeredInputField]: action.isValid,
        }
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        console.log(updatedinputValidation)
        let updatedFormIsValid = true;
        for (const key in updatedinputValidation) {
            updatedFormIsValid = updatedFormIsValid && updatedinputValidation[key];
        }
        return {
            ...state,
            inputValues: newValues,
            inputValidation: updatedinputValidation,
            formInputIsValid: updatedFormIsValid
        }

        return state;
    }

}
const UpdateProductScreen = props => {
    // ovaj screen koristim i za add product i za update product i zbog toga proveravam da li je updatingProduct ==null
    // ako nije onda je update mode, a ako jeste onda je add product mode

    const productId = props.navigation.getParam('productId');
    const updatingProduct = useSelector(state => state.products.userProducts.find(product => product.productId === productId))
    // 
    // const [name, setName] = useState(updatingProduct ? updatingProduct.name : '');
    // const [isNameValid, setIsNameValid] = useState(false)
    // const [description, setDescription] = useState(updatingProduct ? updatingProduct.description : '');
    // const [price, setPrice] = useState('');
    // const [image, setImage] = useState(updatingProduct ? updatingProduct.imageUrl : '');

    const [formState, dispatchFormState] = useReducer(formValidationReducer,       // prvi argument je fja koju zelim da pozovem i koja ce menjati stanje objektu koji je drugi argument
        // i to kada se trigeruje type.action , a drugi je objekat koji se odnosi na initial state, 
        // tj. stanje nad kojim cu primeniti fju
        // vraca niz, gde je prvi element novo updateovano stanje, a drugi dispatch koji ce zapravo trigerovati fju
        {
            // inputValues ce mi biti pocetne vrednosti (state) za name, desc,image i price i u zavisnosti od toga 
            // da li azuriram stanje proizvoda ili kreiram novi ce dobiti odredjenu inicijalnu vrednost
            inputValues: {
                name: updatingProduct ? updatingProduct.name : '',
                description: updatingProduct ? updatingProduct.description : '',
                price: '',
                image: updatingProduct ? updatingProduct.imageUrl : ''
            },
            inputValidation: {
                name: updatingProduct ? true : false, // ako updateujem proizvod onda je sigurno validno stanje
                description: updatingProduct ? true : false,
                price: updatingProduct ? true : false,
                image: updatingProduct ? true : false
            },
            formInputIsValid: updatingProduct ? true : false,
        })

    const dispatch = useDispatch();;
    const submitHandler = useCallback(() => {
        if (!formState.formInputIsValid) {
            Alert.alert('Invalid input!', 'Please enter a valid data in all fields.');
            return;
        }
        if (updatingProduct) {
            // ako nije null uci ce u if granu, tj. updateujem proizvod
            dispatch(productActions.updateProduct(productId, formState.inputValues.name, formState.inputValues.description, formState.inputValues.image))
        }
        else {
            // dodajem proizvod // ADD Product
            dispatch(productActions.insertProduct(formState.inputValues.name, formState.inputValues.description, formState.inputValues.image, +formState.inputValues.price))
        }

        props.navigation.goBack();
    }, [dispatch, productId, formState])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    const userInputHandler = useCallback(
        (inputFieldIdentifier, text, isValidText) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,        // ovde mu kazem da se dispatch-uje FORM_INPUT_UPDATE
                inputValue: text,
                isValid: isValidText,
                triggeredInputField: inputFieldIdentifier   // triggerInputField ce mi reci na koji state u okviru useReducer-a se odnosi ova dispatch fja; npr. inputFieldId = 'name'
            })
        }, [dispatchFormState]
    )
    // const userInputHandler = (inputFieldIdentifier, text) => {
    //     let isValidText = true;
    //     if (text.length === 0) {
    //         isValidText = false;
    //     }
    //     dispatchFormState({
    //         type: FORM_INPUT_UPDATE,        // ovde mu kazem da se dispatch-uje FORM_INPUT_UPDATE
    //         inputValue: text,
    //         isValid: isValidText,
    //         triggeredInputField: inputFieldIdentifier   // triggerInputField ce mi reci na koji state u okviru useReducer-a se odnosi ova dispatch fja; npr. inputFieldId = 'name'
    //     })
    // }
    return (
        <ScrollView style={styles.screen}>
            <View style={styles.container}>

                <Input
                    id='name'
                    label='Product Name:'
                    onInputChange={userInputHandler}
                    initialValue={updatingProduct ? updatingProduct.name : ''}
                    initiallyValid={!!updatingProduct}
                />
                <Input
                    id='description'
                    label='Description:'
                    multiline={true}
                    onInputChange={userInputHandler}
                    initialValue={updatingProduct ? updatingProduct.description : ''}
                    initiallyValid={!!updatingProduct}
                />
                {updatingProduct ? null : (
                    <Input
                        id='price'
                        label='Price'
                        onInputChange={userInputHandler}
                        initialValue={updatingProduct ? updatingProduct.price : ''}
                        initiallyValid={!!updatingProduct}
                        keyboardType="decimal-pad"
                    />
                )}
                <Input
                    id='image'
                    label='Image url:'
                    multiline={true}
                    onInputChange={userInputHandler}
                    initialValue={updatingProduct ? updatingProduct.imageUrl : ''}
                    initiallyValid={!!updatingProduct}
                />
                {/* <View style={styles.inputField}>
                    <Text style={styles.label}>Product Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={formState.inputValues.name}
                        onChangeText={userInputHandler.bind(this, 'name')}  // ovde se 'title' odnosi na inputFieldIdentifier koji ce znati nad kojim state-om da useReducer trigrruje dispatch fju
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        value={formState.inputValues.description}
                        multiline={true}
                        onChangeText={userInputHandler.bind(this, 'description')} />
                </View>
                {updatingProduct ? null :   //obezbedjujem da ako je u update mode-u ne moze da menja cenu 
                    <View style={styles.inputField}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.textInput}
                            value={formState.inputValues.price}
                            keyboardType='decimal-pad'
                            onChangeText={userInputHandler.bind(this, 'price')} />
                    </View>
                }
                <View style={styles.inputField}>
                    <Text style={styles.label}>Image url:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={formState.inputValues.image}
                        onChangeText={userInputHandler.bind(this, 'image')} />
                </View> */}
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
                onPress={submitFunction} // Cart iz MainNavigtor-a gde je definisana ova ruta u createStackNav
            />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    },
    container: {
        // alignItems: 'center',
        margin: 20,

    },

})
export default UpdateProductScreen;