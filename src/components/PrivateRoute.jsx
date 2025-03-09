import React, {useEffect, useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children, protectedRoute = false}) => {
    const {session, isAdmin, checkAdminStatus } = UserAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const checkStatus = async () => {
        await checkAdminStatus();
        setLoading(false);
      };
      checkStatus();
    }, []);

    if (loading) {
      return <div className="w-full h-screen pt-16 flex justify-center items-center">Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
    }

  return (
    <>{session ? !protectedRoute ? <> {children} </> : isAdmin ? <>{children}</> : <Navigate to="/"/> : <Navigate to="/"/>}</>
  )
}

export default PrivateRoute
