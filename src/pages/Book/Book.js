import React from 'react';
import bookImage from '../../assets/book.jpeg';
import './Book.css'

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        { id: 1, name: 'User 1', profile: 'User 1 Profile' },
        { id: 2, name: 'User 2', profile: 'User 2 Profile' },
        { id: 3, name: 'User 3', profile: 'User 3 Profile' },
        { id: 4, name: 'User 4', profile: 'User 4 Profile' },
      ],
      selectedUserId: null,
    };
  }

  handleRequestClick = (userId) => {
    // Handle the request button click for a specific user
    console.log(`Request button clicked for User ID: ${userId}`);
  };

  handleUserClick = (userId) => {
    // Set the selected user ID in the state
    this.setState({ selectedUserId: userId });
  };

  render() {
    const { users, selectedUserId } = this.state;

    return (
      <div className='Book-page'>
      <div className='Book-page-img'>
      <img src={bookImage} alt="Book"  style={{ width: '300px', height: 'auto' }}/>
      <h2 className='Book-page-BookTitle'>Book Name</h2></div>
      
        <h2 className='Book-page-Owners'>Current Book Owners</h2>
        <table className="Book-page-format-wrapper">
          <tbody>
            <tr className='Book-page-row1'>
              <td>Name</td>
            
              <td>enrollmentNo</td>
           
              <td>Bhawan</td>
           
              <td>Branch</td>
            
              <td>Year</td>
           
              <td>Request</td>
            </tr>
          </tbody>
        </table>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <table>
                <tbody>
                  <tr className='Book-page-row'>
                    <td onClick={() => this.handleUserClick(user.id)}>{user.name}</td>
                  
                    <td>enrollmentNo</td>
                  
                    <td>Bhawan</td>
                 
                    <td>Branch</td>
                
                    <td>4</td>
                    <td><button onClick={() => this.handleRequestClick(user.id)}>Request</button></td>
                  </tr>
                </tbody>
              </table>
              
            </li>
          ))}
        </ul>
      
       
      </div>
    );
  }
}

export default Book;
