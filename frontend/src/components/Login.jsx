import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <>
      <div className="min-w-96 mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-white">Quick Chat</h1>
        <div className='w-full p-6 rounded-lg shadow-md bg-white bg-opacity-80 backdrop-filter backdrop-blur-md'>
          <h1 className='text-3xl font-bold text-center text-gray-800'>Login</h1>
          <form onSubmit={onSubmitHandler} action="">
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-700'>Username</span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className='w-full input input-bordered h-10'
                type="text"
                placeholder='Username' />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-700'>Password</span>
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className='w-full input input-bordered h-10'
                type="password"
                placeholder='Password' />
            </div>
            <p className='text-center my-2 text-gray-700'>Don't have an account? <Link to="/signup" className='text-blue-500'> signup </Link></p>
            <div>
              <button type="submit" className='btn btn-block btn-sm mt-2 bg-blue-500 text-white'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login