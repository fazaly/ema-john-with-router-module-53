import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState(null);

    const {createUser} = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm.value;
        console.log(email, password, confirmPassword);

        if(password.length < 6){
            setError('Password should be 6 characters or more.');
            return;
        }

        if(password !== confirmPassword){
            setError('Your password did not match.');
            return;
        }

        createUser(email, password)
            .then( result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch( error => {
                console.error(error);
            })
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='form-text'>Already have an account? <Link className='link' to='/login'><span>Login</span></Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;