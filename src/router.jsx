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
import CreateNewClub from "./components/CreateNewClub";

const isProduction = process.env.NODE_ENV === 'production';

export const router = createBrowserRouter([
    {path: "/", element: <Signin/>},
    {path: "/signup", element: <Signup/>},
    {path: "/signin", element: <Signin/>},
    {path: "/dashboard", element:  <Dashboard/> },
    {path: "/medicalrecords", element: <PrivateRoute> <MedicalRecords/> </PrivateRoute>},
    {path: "/eventinfo", element: <PrivateRoute> <Event/> </PrivateRoute>},
    {path: "/fighterinfo", element: <PrivateRoute> <FighterInformation/> </PrivateRoute>},
    {path: "/createevent", element: <PrivateRoute protectedRoute={true}> <CreateNewEvent/> </PrivateRoute>},
    {path: "/createfighter", element: <PrivateRoute protectedRoute={false}> <CreateNewFighter/> </PrivateRoute>},
    {path: "/createdivision", element: <PrivateRoute protectedRoute={true}> <CreateNewDivision/> </PrivateRoute>},
    {path: "/createfight", element: <PrivateRoute protectedRoute={true}> <CreateNewFight/> </PrivateRoute>},
    {path: "/createclub", element: <PrivateRoute protectedRoute={true}> <CreateNewClub/> </PrivateRoute>},
],
{
    basename: isProduction ? '/data-punch' : '/',
}
)