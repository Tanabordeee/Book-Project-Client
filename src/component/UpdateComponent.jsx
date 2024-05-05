import "./Addbook.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavbarComponent from "./Navbar";
import { useParams } from "react-router-dom";
import { getToken } from "../service/authorize";
const UpdateComponent = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: "",
        image: null
    });

    const { title, content, author, image } = state;
    const {title : oldTitle} = useParams();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/singlebook/${oldTitle}` , {
            headers: {
                authorization : `Bearer ${getToken()}`
            }
        }).then(res=>{
            const {title , content , author} = res.data[0];
            setState({...state , title, content, author});
        }).catch((err)=>alert(err))
    } ,[])

    const showForm = ()=>(
        <form encType="multipart/form-data" onSubmit={Updatebook}>
        <div className="form-group">
            <label className="lable-addbook">Title</label>
            <input type="text" className="form-control" value={title} onChange={handleInputChange('title')} />
        </div>
        <div className="form-group">
            <label className="lable-addbook">content</label>
            <input type="text" className="form-control" value={content} onChange={handleInputChange('content')} />
        </div>
        <div className="form-group">
            <label className="lable-addbook">Author</label>
            <input type="text" className="form-control" value={author} onChange={handleInputChange('author')} />
        </div>
        <div className="form-group">
            <label className="lable-addbook">Image</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn-add bg-success">Update</button>
        </form>
    )
    const handleInputChange = name => e => {
        setState({ ...state, [name]: e.target.value });
    };

    const handleImageChange = async e => {
        const selectedImage = e.target.files[0];
        const base64 = await convertToBase64(selectedImage);
        setState({ ...state, image: base64 });
    };


    const Updatebook = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/update/${oldTitle}`,{title , content , author , image} , {
                headers: {
                    authorization : `Bearer ${getToken()}`
                }
            }
            ).then(res=>{
                Swal.fire({
                    title: "Success",
                    text: "UpdateBOOK สำเร็จ",
                    icon: "success"
                })
            });
        } catch (err) {
            Swal.fire({
                title: "FAILED",
                text: "UpdateBOOK ไม่สำเร็จ",
                icon: "error"
            });
        }
    }

    return (
        <div className="body">
        <NavbarComponent></NavbarComponent>
        <div className="containerform">
            <h1>Updatebook</h1>
            {showForm()}
        </div>
        </div>
    )
}

export default UpdateComponent;

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=>{
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) =>{
        reject(err)
      }
    })
  }