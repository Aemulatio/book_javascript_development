import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import {useMutation, useApolloClient, gql} from "@apollo/client";

import Button from "../components/Button";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label, input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

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
        })
    };

    const navigate = useNavigate();

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem("token", data.signUp);

            navigate("/");
        }
    })


    return (
        <Wrapper>
            <h2>Sign Up</h2>
            <Form onSubmit={event => {
                event.preventDefault();
                signUp({
                    variables: {
                        ...values
                    }
                })
            }}>
                <label htmlFor="username">Username:</label>
                <input type="text" required id="username" name="username" placeholder="username" onChange={onChange}/>

                <label htmlFor="email">Email:</label>
                <input type="email" required id="email" name="email" placeholder="Email" onChange={onChange}/>

                <label htmlFor="password">Password:</label>
                <input type="password" required id="password" name="password" placeholder="Password"
                       onChange={onChange}/>
                <Button type='submit'>Submit</Button>
            </Form>
        </Wrapper>
    )
}

export default SignUp