import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const RegisterComponent = ()=>{
    const navigate = useNavigate();
    const [state , Setstate] = useState({
        username:"",
        password:""
    });
    const { username , password } = state;
    const inputValue =name=>e=>{
        Setstate({...state , [name]:e.target.value})
    }
    const Register = (e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/Register` , { username , password}).then(async res=>{ 
            await Swal.fire({
                title:"Success",
                text:"Register สำเร็จ",
                icon:"success"
            })
            if(res){
                navigate("/login");
            }
        }).catch(e=>{Swal.fire({title:"FAILED" , text:"Register ไม่สำเร็จ" , icon:"error"})})

    }
    return(
        <div className="d-flex align-items-center vh-100">
            <div className="login-container flex-column bg-light p-5 container shadow p-3 mb-5 bg-body rounded">

        <form action="" onSubmit={Register}>
            <h1 className="mb-4">Register</h1>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control"  value={username} onChange={inputValue("username")}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={inputValue("password")}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4 bg-success border-0" >สมัครสมาชิก</button>
        </form>
        </div>             
        </div>
    )
}

export default RegisterComponent;