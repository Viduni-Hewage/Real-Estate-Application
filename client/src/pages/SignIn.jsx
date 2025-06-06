import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', res.status);
      
      const responseText = await res.text();
      console.log('Response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed data:', data);
        
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        
        dispatch(signInSuccess(data));
        navigate('/');
        
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
      
    } catch (error) {
      dispatch(signInFailure('Failed to connect to the server'));
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-2/3 mx-auto'>
        <input
          type="email"
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          required
          minLength={6}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 justify-center items-center'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  );
}