import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api';

function Signup(props) {
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" });

    let history = useNavigate();

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = cred;
        const response = await fetch(`${BASE_URL}/api/auth/CreatUser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.jwtData);
            history('/login');
            props.showAlert("Account Created Suceesfully","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Signup;
