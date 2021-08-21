import { Alert } from "react-native"

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT';

export const signUp = (email, password) => {
    return async dispatch => {
        const serverResponse = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2JByMpsHeFsAvMXHJ-S1G1ybyHeOIB9Y',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        if (!serverResponse.ok) {
            const errorResData = await serverResponse.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
              message = 'This email exists already!';
            }
            throw new Error(message);
          }
        const responseData = await serverResponse.json();
        console.log(responseData)
        dispatch({
            type: SIGNUP,
            userId: responseData.localId
        })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const serverResponse = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2JByMpsHeFsAvMXHJ-S1G1ybyHeOIB9Y',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        console.log('555555555555555555555555555555555555555555555555')
        console.log(serverResponse.message)
        if (!serverResponse.ok) {
            const errorResData = await serverResponse.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }
        // Alert.alert('ERROR', 'User does not exist or there has been a server error.')

        const responseData = await serverResponse.json();
        console.log(responseData)
        dispatch({
            type: LOGIN,
            userId: responseData.localId
        })


    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}