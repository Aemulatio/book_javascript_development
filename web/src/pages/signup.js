import React, {useEffect, useState} from "react";
import styled from 'styled-components'

import Button from "../components/Button";

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

    return (
        <Wrapper>
            <h2>Sign Up</h2>
            <Form>
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