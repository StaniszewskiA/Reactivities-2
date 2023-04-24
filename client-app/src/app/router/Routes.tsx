import { RouteObject } from "react-router";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/dashboard/details/ActivityDetails";
import ActivityForm from "../../features/activities/dashboard/form/ActivityForm";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";
import TestErrors from "../../features/Errors/TestError";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'activities', element: <ActivityDashboard/>},
                {path: 'activities/:id', element: <ActivityDetails/>},
                {path: 'createActivity', element: <ActivityForm key='create'/>},
                {path: 'manage/:id', element: <ActivityForm key='manage'/>},
                {path: 'profiles/:username', element: <ProfilePage/>},
                {path: 'errors', element: <TestErrors/>},
            ]},
            {path: 'not-found', element: <NotFound/>},
            {path: '*', element: <Navigate replace to={'/not-found'}/>},
            {path: 'server-error', element: <ServerError/>},
        ]
    }
]

export const router = createBrowserRouter(routes);