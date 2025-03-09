import React from 'react'
import { UserAuth } from '../context/AuthContext';

const Header = () => {
    const {session} = UserAuth();
  return (
    <div className="fixed top-0 left-0 w-full h-16 flex flex-row justify-between items-center m-2">
      <h1>DataPunch</h1>
      <div className='flex flex-row justify-center items-center'>
          <p>Welcome {session?.user.email}</p>
      </div>
    </div>
  )
}

export default Header
