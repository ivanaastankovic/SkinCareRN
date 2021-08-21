import React, { useCallback, useReducer, useState, useEffect } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/user';
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

    }
    return state;

}

const LoginScreen = props => {
    const [signUpMode, setSignUpMode] = useState(false);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [formState, dispatchFormState] = useReducer(formValidationReducer,       // prvi argument je fja koju zelim da pozovem i koja ce menjati stanje objektu koji je drugi argument
        // i to kada se trigeruje type.action , a drugi je objekat koji se odnosi na initial state, 
        // tj. stanje nad kojim cu primeniti fju
        // vraca niz, gde je prvi element novo updateovano stanje, a drugi dispatch koji ce zapravo trigerovati fju
        {
            // inputValues ce mi biti pocetne vrednosti (state) za name, desc,image i price i u zavisnosti od toga 
            // da li azuriram stanje proizvoda ili kreiram novi ce dobiti odredjenu inicijalnu vrednost
            inputValues: {
                email: '',
                password: ''
            },
            inputValidation: {
                email: false,
                password: false
            },
            formInputIsValid: false,
        }
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);
    const signUpOrLoginHangdler = async () => {
        console.log('7777777777777777777777777777777777777777777777777')
        console.log(formState.inputValues.email)
        let action;

        if (signUpMode) {
            action = userActions.signUp(formState.inputValues.email, formState.inputValues.password)

        }
        else {
            action = userActions.login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null);

        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('TabNavigator');

        } catch (error) {
            setError(error.message)
            setIsLoading(false);
        }

    }

    const inputTextHandler = useCallback(
        (inputFieldIdentifier, text, isValidText) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,        // ovde mu kazem da se dispatch-uje FORM_INPUT_UPDATE
                inputValue: text,
                isValid: isValidText,
                triggeredInputField: inputFieldIdentifier   // triggerInputField ce mi reci na koji state u okviru useReducer-a se odnosi ova dispatch fja; npr. inputFieldId = 'name'
            })
        }, [dispatchFormState]
    )
    return <View style={styles.container}>
        <View style={styles.textInputFields}>

            <Input
                id='email'
                label='E-mail'
                onInputChange={inputTextHandler}
                required
                email
                keyboardType="default"
            />
            <Input
                id='password'
                label='Password'
                secureTextEntry
                onInputChange={inputTextHandler}
                required
            />
        </View>
        <View style={styles.buttonsView}>

            <View style={styles.btn}>
                {/* <Button title={signUpMode ? 'Sign up' : 'Login'} /> */}
                <TouchableOpacity
                    style={styles.button1}
                    onPress={signUpOrLoginHangdler}>
                    <Text style={styles.text}>{signUpMode ? 'Sign up' : 'Login'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                {/* <Button title={`Switch to ${signUpMode ? 'Login' : 'Sign up'}`}
                /> */}
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                        setSignUpMode(previousState => !previousState)
                    }}>
                    <Text style={styles.text}>{`Switch to ${signUpMode ? 'Login' : 'Sign up'}`}</Text>
                </TouchableOpacity>

            </View>
        </View>
    </View>

}
LoginScreen.navigationOptions = props => {
    // const submitFn = props.navigation.getParam('submit');
    return {
        headerTitle: '#skincare',
        headerTitleStyle: {
            fontFamily: 'lora-regular',
        },
        headerTitleAlign: 'center',
    }
}
const styles = StyleSheet.create({
    container: { backgroundColor: 'white', width: '100%', height: '100%' },
    btn: {
        marginTop: 10,
        margin: 15,
        marginHorizontal: 100,
        alignContent: 'center',
        alignItems: 'center'
    },
    textInputFields:{
        marginTop:20
    },
    button1: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: '#DEB887',
        elevation: 5,
        borderRadius: 100,

    },
    button2:
    {
        padding: 20,
        backgroundColor: '#FFE4C4',
        elevation: 5,
        borderRadius: 100,

    },
    text: {
        fontFamily: 'lora-regular'
    },
    buttonsView: {
        marginTop: 15
    }
})
export default LoginScreen;