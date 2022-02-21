import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from "../auth/index";


const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    const {name, email, password, error, success} = values;

    const handleChange = e => {
        setValues({...values, error: false, [e.target.name]: e.target.value})
    }

    //Otra forma de escribir el handleChange:
    //-------------------------------------
    // const handleChange = name => event => {
    //     setValues({ ...values, error: false, [name]: event.target.value });
    // };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true,
                })
            }
        })
    }

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
            Account created. Please <Link to="/signin">sign in</Link>
        </div>
    )

    const signUpForm = () => {
        return (
            <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input className='form-control' type="text" onChange={handleChange} name="name" value={name}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input className='form-control' type="email" onChange={handleChange} name="email" value={email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input className='form-control' type="password" onChange={handleChange} name="password" value={password}/>
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}> 
                Submit
            </button>
        </form>
        )
    }

    return (
        <Layout title="Register" className='container'>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup;