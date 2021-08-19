import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE'
const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        default:
            return state;
    }
}
const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
    })
    const { onInputChange, id } = props;

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, onInputChange, id]);
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        // if (props.required && text.trim().length === 0) {
        //   isValid = false;
        // }
        // if (props.email && !emailRegex.test(text.toLowerCase())) {
        //   isValid = false;
        // }
        // if (props.min != null && +text < props.min) {
        //   isValid = false;
        // }
        // if (props.max != null && +text > props.max) {
        //   isValid = false;
        // }
        // if (props.minLength != null && text.length < props.minLength) {
        //   isValid = false;
        // }
        if (text.length === 0)
            isValid = false;
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.textInput}
                value={inputState.value}
                onChangeText={textChangeHandler}  // ovde se 'title' odnosi na inputFieldIdentifier koji ce znati nad kojim state-om da useReducer trigrruje dispatch fju
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
    descriptionInput: {
        borderWidth: 1.5,
        paddingHorizontal: 20,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 150,
        borderColor: '#ffc680'
    }
})
export default Input;