import { Route, Routes } from "react-router-dom";
import { ReactElement } from "react";
import UserSettings from "./pages/UserSettings";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";


const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/user" element={<UserSettings />} />
      <Route path="/genres" element={<Categories />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
