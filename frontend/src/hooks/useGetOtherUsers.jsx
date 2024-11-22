import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                
                if (res.data) {
                    console.log("Fetched users:", res.data);
                    if (Array.isArray(res.data)) {
                        dispatch(setOtherUsers(res.data));
                    } else {
                        console.error("Invalid response format:", res.data);
                        dispatch(setOtherUsers([]));
                    }
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                if (error?.response?.status === 401) {
                    dispatch(setOtherUsers([]));
                }
            }
        };

        fetchOtherUsers();
    }, [dispatch]);
};

export default useGetOtherUsers;