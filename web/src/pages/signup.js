import React, {useEffect, useState} from "react";
import {useMutation, useApolloClient, gql} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import UserForm from "../components/UserForm";


const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!){
        signUp(email: $email, username: $username, password: $password)
    }
`;


const SignUp = (props) => {
    useEffect(() => {
        document.title = "Sign Up - Notedly";
    });
    const [values, setValues] = useState({});
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const navigate = useNavigate();
    const client = useApolloClient();
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem("token", data.signUp);

            client.writeQuery({
                query: gql`
            query WriteLogged($jwt: String!) {
                isLoggedIn(jwt: $jwt){
                    id
                    jwt
                }
            }`,
                data: { // Contains the data to write
                    isLoggedIn: {
                        __typename: 'jwt',
                        id: data.signUp,
                        jwt: true
                    },
                },
            });

            navigate("/");
        }
    });


    return (
        <>
            <UserForm action={signUp} formType="signup"/>
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account</p>}
        </>
    );
};

export default SignUp;