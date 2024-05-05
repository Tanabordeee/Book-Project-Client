import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "./App";
import LoginComponent from "./component/Login";
import RegisterComponent from "./component/Register";
import AddbookComponent from "./component/Add_book";
import Delete_Update_component from "./component/Delete_Update_book";
import UpdateComponent from "./component/UpdateComponent";
import Manage from "./component/Manage";
const MainRoutes = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<LoginComponent/>}></Route>
                <Route path="/register" element={<RegisterComponent/>}></Route>
                <Route path="/" element={<App/>}></Route>
                <Route path="/Addbook" element={<AddbookComponent/>}></Route>
                <Route path="/DeleteUpdate" element={<Delete_Update_component/>}></Route>
                <Route path="/Update/:title" element={<UpdateComponent/>}></Route>
                <Route path="/Manage" element={<Manage/>}></Route>
            </Routes>
        </Router>
    )
}

export default MainRoutes;