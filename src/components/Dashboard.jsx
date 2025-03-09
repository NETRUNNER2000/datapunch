import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import Posts from './Posts';
import SearchFighters from './SearchFighters';
import SearchEvents from './SearchEvents';
import CompetitionTiers from './CompetitionTiers';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const {session, signOut, isAdmin, checkAdminStatus} = UserAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    checkAdminStatus();
  }, [])

  const handleSignOut = async (e) =>{
      e.preventDefault();
      try{
          await signOut();
          navigate('/')
      }
      catch(error){
          console.error('Error signing out: ', error);
      }
  }
  return (
    <div className="w-full h-screen pt-16">
      <Sidebar></Sidebar>
      {/* Dashboard
      <p>Welcome, {session.user?.email}</p>
      <SearchFighters></SearchFighters>
      <Link to="/createfighter">Add A New Fighter</Link>

      <SearchEvents></SearchEvents>
      <Link to="/createevent">Create New Event</Link>

      <br></br>

      <Link to="/createdivision">Create New Division</Link>

      <br></br>

      <Link to="/createfight">Record New Fight</Link>

      <p onClick={handleSignOut}>Sign Out</p>
      <button onClick={checkAdminStatus}>Check admin</button>
      <p>{isAdmin ? "You are an admin" : "you are not an admin"}</p>

      <Link to="/medicalrecords">View Medical Records</Link> */}
    </div>
  )
}

export default Dashboard
