import React, { useContext, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { ApiClient } from 'ApiClient';
import { SignInForm, SignUpSuccess } from 'components';
import { parseValidationErrors, validateSignInData } from 'utils/UserValidation';

const INITIAL_STATE = {
    email: '',
    password: '',
    hasErrors: false,
    isSubmitting: false,
    errors: {
        email: null,
        password: null
    }
}

export default function SignUp() {
    const [authState, dispatch] = useContext(AuthContext);
    const [signInData, setSignInData] = useState(INITIAL_STATE);
    const [signInSuccess, setSignInSuccess] = useState(false);
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setSignInData({ ...signInData, [name]: value });
    }

    /**
     * Handler for the form submit
     * 
     * It will first check if there are any FE validation errors before reaching out
     * to the actual registration.
     * 
     * @param {object} event 
     */
    function submitHandler(event) {
        event.preventDefault();
        const validatedData = validateSignInData(signInData);

        if (validatedData.hasErrors) {
            setSignInData({ ...validatedData, isSubmitting: false });
            return;
        }

        setSignInData({ ...validatedData, isSubmitting: true });
        signInUser();
    }

    async function signInUser() {
        const params = {
            user: {
                email: signInData.email,
                password: signInData.password
            }
        };

        // TODO add proper error handling for generic errors
        await client.post('api/v1/auth/sign_in', params)
            .then((response) => {
                dispatchLogin(response);
                setSignInSuccess(true);
            })
            .catch((error) => {
                if (error.response.status = 422) {
                    const errors = parseValidationErrors(error.response.data.errors);
                    setSignInData({ ...signInData, errors: errors, hasErrors: true, isSubmitting: false });
                }
            })
    }

    const dispatchLogin = (response) => {
        const userName = response.data.user.user_name;
        const authHeaders = {
            'access-token': response.headers['access-token'],
            'token-type': response.headers['token-type'],
            'client': response.headers.client,
            'expiry': response.headers.expiry,
            'uid': response.headers.uid
        }
        
        dispatch({
            type: 'LOGIN',
            payload: {
                userName: userName,
                authHeaders: authHeaders
            }
        })
    }

    return (
        <React.Fragment>
            {signInSuccess ? (
                <h1>Success</h1>
            ) : (
                    <SignInForm
                        signInData={signInData}
                        changeHandler={changeHandler}
                        submitHandler={submitHandler}e
                    />
                )}
        </React.Fragment>
    )
}