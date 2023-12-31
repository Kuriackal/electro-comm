import React, { useState,useEffect } from "react";
import  {toast} from 'react-toastify'
import { useSelector } from "react-redux";
import { auth } from "../../firebasec";



const Register =({history})=>{
    const [email,setEmail]=useState("")
    const { user }= useSelector((state)=> ({...state}));



    useEffect(()=>{
        if(user && user.token){
            history.push("/")
        } 
    },[user,history])

const handleSubmit =  async (e) =>{
    e.preventDefault()             //for preventing reload
    console.log("ENV-->",process.env.REACT_APP_REGISTER_REDIRECT_URL)



    const config={
        url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp:true
    }
    await auth.sendSignInLinkToEmail(email,config)
    toast.success(`Email is send to ${email}, Click the link to complete your registration `);

    //saving the email in local storage
    window.localStorage.setItem('emailForRegistration',email)

    //clear state
    setEmail("");
}






    const registerForm=()=><form onSubmit={handleSubmit}>
        <input type="email" 
        className="form-control" 
        value={email} 
        onChange={(e) =>setEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
        />
        <br />

        <button type="submit" className="btn  btn-raised shadow my-button w-xs  btn-outline-secondary">Register</button>

    </form>
    return(
        <div className="container p-5">
            <div className="row">
             <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                   
                    {registerForm()}
             </div>


            </div>
        </div>
    )
}

export default Register