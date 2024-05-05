import "./Addbook.css";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import NavbarComponent from "./Navbar";
import { getToken } from "../service/authorize";
const AddbookComponent = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: "",
        image: null
    });

    const { title, content, author, image } = state;

    const handleInputChange = name => e => {
        setState({ ...state, [name]: e.target.value });
    };

    const handleImageChange = async e => {
        const selectedImage = e.target.files[0];
        const base64 = await convertToBase64(selectedImage);
        setState({ ...state, image: base64 });
    };


    const Add_book = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('image', image);
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/add_book`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization : `Bearer ${getToken()}`
                }
            });
            Swal.fire({
                title: "Success",
                text: "ADDBOOK สำเร็จ",
                icon: "success"
            });
        } catch (err) {
            Swal.fire({
                title: "FAILED",
                text: "ADDBOOK ไม่สำเร็จ",
                icon: "error"
            });
        }
    }

    return (
        <div className="body">
        <NavbarComponent></NavbarComponent>
        <div className="containerform">
            <h1>Addbook</h1>
            <form encType="multipart/form-data" onSubmit={Add_book}>
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
                <button type="submit" className="btn-add bg-success">ADD</button>
            </form>
        </div>
        </div>
    )
}

export default AddbookComponent;

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