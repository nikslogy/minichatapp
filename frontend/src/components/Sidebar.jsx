import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-gray-300 p-4 flex flex-col bg-gray-50'>
          <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2 mb-4'>
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className='input input-bordered rounded-md flex-grow' type="text"
              placeholder='Search...'
            />
            <button type='submit' className='btn bg-blue-500 text-white hover:bg-blue-600'>
              <BiSearchAlt2 className='w-6 h-6 outline-none'/>
            </button>
          </form>
          <OtherUsers/> 
          <div className='mt-4'>
            <button onClick={logoutHandler} className='btn btn-sm bg-red-500 text-white hover:bg-red-600'>Logout</button>
          </div>
        </div>
      )
}

export default Sidebar