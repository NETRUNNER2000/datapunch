import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from 'react'
import SearchEvents from "./SearchEvents";
import { Link, useNavigate } from 'react-router-dom'
import CreateNewDivision from "./CreateNewDivision";
import SearchFighters from "./SearchFighters";
import MedicalRecords from "./MedicalRecords";
import CreateNewFight from "./CreateNewFight";
import StyledTable from "./StlyedTable";
import { UserAuth } from '../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const {session, signOut, isAdmin, checkAdminStatus} = UserAuth();

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
    <Tabs defaultValue="tab-1" orientation="vertical" className="w-full h-full flex-row mt-4">
<TabsList className="flex-col justify-start rounded-none border-l bg-transparent p-0 pb-5 h-full">
  <TabsTrigger
    value="tab-1"
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
  >
    Overview
  </TabsTrigger>
  <TabsTrigger
    value="tab-2"
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
  >
    Events
  </TabsTrigger>
  <TabsTrigger
    value="tab-3"
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
  >
    Divisions
  </TabsTrigger>
  <TabsTrigger
    value="tab-4"
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
  >
    Fights
  </TabsTrigger>
  <TabsTrigger
    value="tab-5"
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
  >
    Clubs
  </TabsTrigger>
  <TabsTrigger
    value="tab-6"
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
  >
    Medical Records
  </TabsTrigger>
  
  {/* Logout TabTrigger with mt-auto to push it to the bottom */}
  <TabsTrigger
    onClick={handleSignOut}
    className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none mt-auto"
  >
    Logout
  </TabsTrigger>
</TabsList>

    <div className="grow rounded-md border text-start">
      <TabsContent value="tab-1">
        <h2>Upcoming Fights</h2>
        <p>Loading ...</p>
        <h2>Fighters</h2>
        <SearchFighters/>
        <Link to="/createfighter">Add A New Fighter</Link>
      </TabsContent>
      <TabsContent value="tab-2">
      <SearchEvents></SearchEvents>
      {isAdmin && (<Link to="/createevent">Create New Event</Link>)}
      </TabsContent>
      <TabsContent value="tab-3">
        <p>There is meant to be a list of divisions here...</p>
        {isAdmin && (<Link to="/createdivision">Create New Division</Link>)}
      </TabsContent>
      <TabsContent value="tab-4">
        <p>There is meant to be a list of fights here</p>
        {isAdmin && (<Link to="/createfight">Record New Fight</Link>)}
      </TabsContent>
      <TabsContent value="tab-5">
       <p>There is meant to be a list of clubs here...</p>
       {isAdmin && (<Link to="/createclub">Create New Club</Link>)}
      </TabsContent>
      <TabsContent value="tab-6">
       <MedicalRecords/>
      </TabsContent>
      
    </div>
  </Tabs>
  );
}


export default Sidebar;