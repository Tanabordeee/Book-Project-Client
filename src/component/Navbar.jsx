import { Link , useNavigate} from "react-router-dom";
import { getToken , logout  , getAdmin} from "../service/authorize";
import "./Navbar.css";
const NavbarComponent = ()=>{
    const navigate = useNavigate();
    return(
        <nav>
            <ul className="nav nav-tab">
                {getToken() &&(
                    <li className="nav-sec">
                    <Link to="/" className="nav-link main">หน้าแรก</Link>
                </li>
                )
                }
                {
                    getAdmin() && (
                        <li className="nav-sec">
                        <Link to="/addbook" className="nav-link addbook">เพิ่มหนังสือ</Link>
                        </li>
                    )
                }
                {
                    !getToken() && (
                    <li className="nav-sec">
                        <Link to="/login" className="nav-link login">เข้าสู่ระบบ</Link>
                    </li>
                    )
                }
                {
                    getAdmin() && (
                        <li className="nav-sec">
                        <Link to="/DeleteUpdate" className="nav-link addbook">ลบ / อัพเดต หนังสือ</Link>
                        </li>
                    )
                }
                {getToken() &&(
                    <li className="nav-sec">
                    <Link to="/Manage" className="nav-link main">Manage</Link>
                </li>
                )
                }
                {
                    getToken() && (
                    <li className="nav-sec">
                        <button className="nav-link logout" onClick={()=>logout(()=>navigate("/login"))}>ออกจากระบบ</button>
                    </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default NavbarComponent;