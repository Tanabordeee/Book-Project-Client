import React, { useEffect, useState } from 'react';
import { getToken, getUser } from "../service/authorize.js";
import NavbarComponent from '../component/Navbar.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./Manage.css";
function Manage() {
  const [books, setBooks] = useState([]);
  const user = getUser();
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API}/borrowed/${user}` , {
        headers: {
            authorization : `Bearer ${getToken()}`
        }
    })
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

const giveback = (title)=>{
  axios.put(`${process.env.REACT_APP_API}/giveback/${title}` ,{} , {
    headers: {
        authorization : `Bearer ${getToken()}`
    }
}).then(res=>{
    fetchData();
    Swal.fire({
      title: "Success",
      text: "คืนหนังสือ สำเร็จ",
      icon: "success"
  })
  }).catch(err=>console.log(err));
}
  return (
    <div>
      <NavbarComponent />
        <div className='container-fluid vh-100 d-flex flex-column'>
          <div className="App d-flex justify-content-center">
            <h1>BOOK SHELF</h1>
          </div>
          <div className='content'>
            {books.map((book, index) => (
              <div key={index} className='shadow p-3 mb-5 bg-body rounded box container-book'>
                <div>
                  <img src={book.image} alt="" />
                  <label htmlFor="" className='d-block mt-3'>ชื่อหนังสือ : {book.title}</label>
                  <label htmlFor="" className='d-block mt-1'>เนื้้อหาโดยย่อ : {book.content}</label>
                  <label htmlFor="" className='d-block mt-1'>ผู้แต่ง : {book.author}</label>
                </div>
              {getToken() && (  
                <div className='mainbtn'>
                  <button className='btn-submit-giveback' type="submit" onClick={() => giveback(book.title)}>คืน</button>
                </div>
              )}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}


export default Manage;
