import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import BASE_URL from '../api';
function Login(props) {
    const [cred, setCred] = useState({email:"",password:""});
    
    const history=useNavigate();

    const onchange =(e)=>{
        setCred({ ...cred, [e.target.name]: e.target.value});
    }

    const handleSubmit =async(e)=>{
      e.preventDefault();
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:cred.email , password:cred.password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        console.log(json)
        localStorage.setItem('token',json.jwtData);
        history("/");
        props.showAlert("Logged-In SuccessFully","success");
      }
      else{
        props.showAlert("Invalid Credentials","danger");
      }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={cred.email} aria-describedby="emailHelp" onChange={onchange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={cred.password}  onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
export default Login