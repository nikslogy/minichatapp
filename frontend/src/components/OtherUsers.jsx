import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUsers = () => {
    useGetOtherUsers();

    const { otherUsers } = useSelector(store => store.user);

    const safeOtherUsers = Array.isArray(otherUsers) ? otherUsers : [];

    return (
        <div className='overflow-auto flex-1'>
            {safeOtherUsers.map((user) => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
