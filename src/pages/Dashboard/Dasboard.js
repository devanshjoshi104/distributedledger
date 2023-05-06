import React from 'react';
import bookImage from '../../assets/book.jpeg';
import './Dashboard.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [
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
    const { books, selectedUserId } = this.state;

    return (
      <div className='Dashboard-page'>
      <h2 className='Dashboard-page-Owners'>My Books</h2>
      <div className='Dashboard-books-container'>
        
      {books.map((user) => (<div className='Dashboard-books' key={user.id}>
         <img src={bookImage} alt="Book"  style={{ width: '176px', height: '205px' }}/>
         <h2 className='Dashboard-page-BookTitle'>Information </h2>
         </div>))}
      </div>
        <h2 className='Dashboard-page-Owners'>Your Requests</h2>
        <table className="Dashboard-page-format-wrapper">
          <tbody>
            <tr className='Dashboard-page-row1'>
              <td style={{"width": "10vw"}}>Name</td>
            
              <td style={{"width": "10vw"}}>enrollmentNo</td>
              
           
              <td style={{"width": "10vw"}}>Bhawan</td>
              <td style={{"width": "10vw"}}>Book Name</td>
           
             
            
              
           
              <td style={{"width": "10vw"}}>Requests</td>
            </tr>
          </tbody>
        </table>
        <ul>
          {books.map((user) => (
            <li key={user.id}>
              <table>
                <tbody>
                  <tr className='Dashboard-page-row'>
                    <td style={{"width": "10vw"}}onClick={() => this.handleUserClick(user.id)} >{user.name}</td>
                  
                    <td style={{"width": "10vw"}}>19114026</td>
                  
                    <td style={{"width": "10vw"}}>Ravindra</td>
                 
                    <td style={{"width": "10vw"}}>Infosec and Network Security </td>
                
                    
                    <td style={{"width": "10vw"}}><button onClick={() => this.handleRequestClick(user.id)}>Accept</button></td>
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

export default Dashboard;
