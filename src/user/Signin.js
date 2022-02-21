import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from "../auth/index";


const Signin = () => {

    const [values, setValues] = useState({
        email: 'admin@hotmail.com',
        password: '123456',
        error: '',
        loading: false,
        redirectToReferrer: false,
    })

    const {email, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated();

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
        setValues({...values, error: false, loading: true});
        signin({email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                    })
                })
            }
        })
    }

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className='alert alert-info'> Loading... </div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
           if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard"/>
           } else {
            return <Redirect to="/user/dashboard"/>
           }
        }
        if (isAuthenticated()) {
            return <Redirect to="/"/>
        }
    }

    const signInForm = () => {
        return (
            <form>
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
        <Layout title="Sign In" description="Log please" className='container'>
            {showLoading()}
            {redirectUser()}
            {showError()}
            {signInForm()}
        </Layout>
    )
}

export default Signin;