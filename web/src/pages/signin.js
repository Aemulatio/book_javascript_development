import React, {useEffect} from 'react'
import {useMutation, useApolloClient, gql} from "@apollo/client";

import {useNavigate} from "react-router-dom";
import UserForm from "../components/UserForm";


const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!){
        signUp(email: $email, password: $password)
    }
`;


const SignIn = () => {
    useEffect(() => {
        document.title = "Sign In - Notedly";
    });

    const navigate = useNavigate();
    const client = useApolloClient();
    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            localStorage.setItem("token", data.signIn);
            navigate("/");
        }
    })

    return (
        <>
            <UserForm action={signIn} formType="signIn"/>
            {loading && <p>Loading...</p>}
            {error && <p>Error signing in!</p>}
        </>
    );
}

export default SignIn;