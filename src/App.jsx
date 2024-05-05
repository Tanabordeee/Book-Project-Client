import React, { useEffect, useState } from 'react';
import './App.css';

import { getToken, getUser } from "./service/authorize.js";
import NavbarComponent from './component/Navbar.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
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
    axios.post(`${process.env.REACT_APP_API}/search` , {Search} ,{
      headers:{
        authorization:`Bearer ${getToken()}`
      }
    }).then(res =>{
      setBooks(res.data)
    }).catch(err=>console.log(err))
  }
  const borrowing = (title, username) => {
    axios.put(
      `${process.env.REACT_APP_API}/borrowing/${title}/${username}`,
      {}, // empty object as request body
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    )
      .then(res => {
        fetchData();
        Swal.fire({
          title: "Success",
          text: "ยืมหนังสือ สำเร็จ",
          icon: "success"
        });
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <NavbarComponent />
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
              {getToken() && (  
                <div className='mainbtn'>
                  <button className='btn-submit' type="submit" onClick={() => borrowing(book.title, getUser())} disabled={book.borrowing == "Already" ? true : false} style={{ backgroundColor: book.borrowing === "Already" ? "red" : "green" }}>ยืมหนังสือ</button>
                </div>
              )}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}


export default App;
