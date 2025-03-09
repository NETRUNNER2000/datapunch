import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import MedicalRecords from "./components/MedicalRecords";
import FighterInformation from "./components/FighterInformation";
import CreateNewEvent from "./components/CreateNewEvent";
import CreateNewFighter from "./components/CreateNewFighter";
import CreateNewDivision from "./components/CreateNewDivision";
import Event from "./components/Event";
import CreateNewFight from "./components/CreateNewFight";

export const router = createBrowserRouter([
    {path: "/", element: <Signin/>},
    {path: "/signup", element: <Signup/>},
    {path: "/signin", element: <Signin/>},
    {path: "/dashboard", element: <PrivateRoute> <Dashboard/> </PrivateRoute>},
    {path: "/medicalrecords", element: <PrivateRoute> <MedicalRecords/> </PrivateRoute>},
    {path: "/eventinfo", element: <PrivateRoute> <Event/> </PrivateRoute>},
    {path: "/fighterinfo", element: <PrivateRoute> <FighterInformation/> </PrivateRoute>},
    {path: "/createevent", element: <PrivateRoute> <CreateNewEvent/> </PrivateRoute>},
    {path: "/createfighter", element: <PrivateRoute> <CreateNewFighter/> </PrivateRoute>},
    {path: "/createdivision", element: <PrivateRoute> <CreateNewDivision/> </PrivateRoute>},
    {path: "/createfight", element: <PrivateRoute> <CreateNewFight/> </PrivateRoute>},
    

])