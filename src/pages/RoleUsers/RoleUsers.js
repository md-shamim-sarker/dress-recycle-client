import React from 'react';
import {useLoaderData} from 'react-router-dom';

const RoleUsers = () => {
    const roleUsers = useLoaderData();
    console.log(roleUsers);
    return (
        <div>
            Role Users
        </div>
    );
};

export default RoleUsers;