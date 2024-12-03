import React from 'react'
import users from './users.json';
import UserItem from './UserItem';
import AverageAge from './AverageAge';

const UserList = () => {
   const userRole = users.filter(({ role }) => role === 'user');
   const adminRole = users.filter(({ role }) => role === 'admin');
   const averageAgeAdmin = adminRole.reduce((acc, curr) => acc + curr.age, 0) / adminRole.length;

   return (<div>
      {userRole.map(({ name }) => <UserItem name={name} />)}
      {<AverageAge average={averageAgeAdmin} />}
   </div>)
}

export default UserList
