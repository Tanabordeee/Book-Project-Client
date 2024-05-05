import React, { useEffect, useState } from 'react';
import { getToken } from "../service/authorize.js";
import NavbarComponent from '../component/Navbar.jsx';
import axios from 'axios';
import "./Delete_Update_book.css"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const Delete_Update_component = ()=>{
    const [books, setBooks] = useState([]);

    const fetchData = () => {
      axios.get(`${process.env.REACT_APP_API}/books`)
        .then(res => {
          setBooks(res.data);
        })
        .catch(err => console.log(err));
    }
  
    useEffect(() => {
      fetchData();
    }, []);
    const [Search, Setsearch] = useState("");
  
  const inputValue =(e)=>{
      Setsearch(e.target.value);
  }
  const fetchData_Search = (e)=>{
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_API}/search` , {Search}).then(res =>{
        setBooks(res.data)
      }).catch(err=>console.log(err))
    }
  const Delete = (title) =>{
    Swal.fire({
        title:"คุณต้องการลบหนังสือหรือไม่",
        icon:"warning",
        showCancelButton:true
      }).then(result =>{
        if(result.isConfirmed){
          axios.delete(`${process.env.REACT_APP_API}/delete/${title}` , {
            headers: {
                authorization : `Bearer ${getToken()}`
            }
        }).then(res=>{
            Swal.fire("Deleted!" , "ลบบทหนังสือ" , "success")
            fetchData()
          }).catch(err=>{console.log(err)});
        }
      })
  }
    return (
      <div>
        <NavbarComponent />
        {getToken() && (
          <div className='container-fluid vh-100 d-flex flex-column'>
            <div className="App d-flex justify-content-center">
              <h1>BOOK SHELF</h1>
            </div>
            <form className='container-search' onSubmit={fetchData_Search}>
              <input type="text" placeholder='search-book' className='input-search' onChange={inputValue}/>
              <button className='search-btn'>search</button>
            </form>
            <div className='content'>
              {books.map((book, index) => (
                <div key={index} className='shadow p-3 mb-5 bg-body rounded box container-book'>
                  <div>
                    <img src={book.image} alt="" />
                    <label htmlFor="" className='d-block mt-3'>ชื่อหนังสือ : {book.title}</label>
                    <label htmlFor="" className='d-block mt-1'>เนื้้อหาโดยย่อ : {book.content}</label>
                    <label htmlFor="" className='d-block mt-1'>ผู้แต่ง : {book.author}</label>
                  </div>
                  <div className='mainbtn'>
                    <button className='btn-submit-delete'onClick={()=>{Delete(book.title)}}>ลบ</button>
                    <Link to={`/update/${book.title}`} className='btn-submit-update'>อัพเดต</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

export default Delete_Update_component;