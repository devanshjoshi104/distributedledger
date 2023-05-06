import React, { useEffect, useState } from 'react';
import bookImage from '../../assets/book.jpeg';
import './Home.css'
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {

  const { user, contract } = useSelector((state) => state.user)
  const [books, setBooks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login', {
        replace: true,
      })
    }
  }, [user])

  useEffect(() => {
    if (contract) {
      getBooks()
    }
  }, [contract])

  const getBooks = async () => {
    console.log("running=============")
    try {
      await contract.methods.getAllBooks().call().then((data_schemes) => { setBooks(data_schemes.slice(1)) });
    } catch (e) {
      console.log(e)
    }
  }



  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Navbar />
      <div className="Home-page">
        <input className='Home-book-search' type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search Book..." />

        <div className='Home-books-container'>

          {filteredBooks.map((user) => (
            <div className='Dashboard-books' key={user.id} onClick={() => {
              navigate('/book/' + user.book_id, { state: { data: user } })
            }}>
              <img src={bookImage} alt="Book" style={{ width: '176px', height: '205px' }} />
              <h2 className='Dashboard-page-BookTitle'>{user.book_name} </h2>
            </div>
          ))}
        </div>


      </div>
    </>
  );
};

export default Home;
