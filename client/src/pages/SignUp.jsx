import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      console.log('Submitting form data:', formData);
      
      const res = await fetch('/api/auth/sign-up', {
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
          setError(data.message);
          setLoading(false);
          return;
        }
        
        setLoading(false);
        navigate('/sign-in');
        
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        setError('Something went wrong with the server response');
        setLoading(false);
      }
      
    } catch (error) {
      setLoading(false);
      setError('Failed to connect to the server');
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-2/3 mx-auto'>
        <input 
          type="text" 
          placeholder='Username' 
          className='border p-3 rounded-lg' 
          id='username' 
          onChange={handleChange}
          required
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 justify-center items-center'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}