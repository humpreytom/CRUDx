import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // logic diring dapita
        // API dapat diri
        // meaning diri ang connection gikan sa frontend
        // padulong sa backend
        // para iyang iprocess ang data nga imong giinput
        // para mabutang sa database
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, email, password);
        axios.post("/api/register", {name, email, password})
        .then(response => {
            const result = response.data;
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Successfully Registered User as ID: ' + result.success,
                    timer: 1500
                }).then(() => props.onFormSwitch('login'));
            } else if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.error,
                    timer: 1500
                });
            }
        })
        .catch(console.error);
        
    }
   
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full Name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="myemail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
            <button type="submit">Register</button>
            
        </form>
        <hr />
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Alreay have an account? Login here.</button>
    </div>
    )
}