import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
]);

function App() { 
  const {authUser} = useSelector(store=>store.user);
  const socketRef = useRef(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && !socketRef.current) {
      socketRef.current = io(BASE_URL, {
        query: {
          userId: authUser._id
        },
        withCredentials: true
      });

      socketRef.current.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center bg-gray-100">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
