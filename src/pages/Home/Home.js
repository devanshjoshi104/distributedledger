import React, { useState } from 'react';
import bookImage from '../../assets/book.jpeg';
import './Home.css'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const books = [
    { id: 1, name: 'Book 1' },
    { id: 2, name: 'Book 2' },
    { id: 3, name: 'Book 9' },
    { id: 4, name: 'Book 4' },
    { id: 5, name: 'Book me' },
    { id: 6, name: 'Book me2' },

    // Add more books as needed
  ];

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Home-page">
      <input className='Home-book-search' type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search Book..." />
      
      <div className='Home-books-container'>
        
      {filteredBooks.map((user) => (<div className='Dashboard-books' key={user.id}>
         <img src={bookImage} alt="Book"  style={{ width: '176px', height: '205px' }}/>
         <h2 className='Dashboard-page-BookTitle'>{user.name} </h2>
         </div>))}
      </div>
      
      
    </div>
  );
};

export default Home;
