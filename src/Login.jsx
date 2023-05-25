import React, { useState } from "react";
import axios from 'axios';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (process.env.NODE_ENV === 'development') {
            console.log("Email is:", email);
            console.log("Pass:", pass);
        } else if (process.env.NODE_ENV === 'production') {
            console.log("it is in production");
            axios.post(`${window.location.origin}/api/login`, { email, pass }, { method: 'post', headers: { ["Content-Type"]: 'application/json' }})
            .then((response) => {
                const result = response.data;
                if (result.success) {
                    // set the sessionStorage of userid to the user logged in
                    sessionStorage.setItem('userid', result._id);
                    window.location.reload();
                }
                
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="auth-form-container">
             <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="myemail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
            <button type="submit">Log In</button>
            
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>If you dont have account register here.</button>
    </div>
    )
}