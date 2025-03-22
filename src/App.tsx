import { useSelector } from "react-redux";
import { RootState } from "./store";
import { LoginForm } from "./components/LoginForm";
import React from "react";
import {Route, Routes} from "react-router"
import { DataTable } from "./components/DataTable";

 function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
       <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
              token ? <DataTable /> : <LoginForm/>
          }
        />
      </Routes>
     
  );
}
export default App;
