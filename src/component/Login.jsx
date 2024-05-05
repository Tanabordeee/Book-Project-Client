import axios from "axios";
import { useState } from "react";
import { authenticate } from "../service/authorize";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";
const LoginComponent = () => {
    const navigate = useNavigate();
    const [state, Setstate] = useState({
        username: "",
        password: ""
    });
    const { username, password } = state;

    const inputValue = name => e => {
        Setstate({ ...state, [name]: e.target.value });
    };

    const Login = e => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then(res => {
                Swal.fire({
                    title: "Success",
                    text: "Login สำเร็จ",
                    icon: "success"
                });
                authenticate(res, () => navigate("/"));
            })
            .catch(err => {
                Swal.fire({
                    title: "FAILED",
                    text: "Login ไม่สำเร็จ",
                    icon: "error"
                });
            });
    };

    return (
        <div className="d-flex align-items-center vh-100">
            <div className="login-container flex-column bg-light p-5 container shadow p-3 mb-5 bg-body rounded">
                <form onSubmit={Login}>
                    <h1 className="mb-4">LOGIN</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" value={username} onChange={inputValue("username")} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={inputValue("password")} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-4 bg-success border-0">เข้าสู่ระบบ</button>
                </form>
                <div className="d-flex mt-3">
                    <Link to="/register" className=" text-decoration-none border btn btn-register">Register</Link>
                </div>

            </div>
        </div>
    );
};

export default LoginComponent;
