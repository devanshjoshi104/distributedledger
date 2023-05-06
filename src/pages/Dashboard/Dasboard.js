import React, { useState, useEffect } from 'react';
import bookImage from '../../assets/book.jpeg';
import './Dashboard.css'
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { API_URL } from '../../config';

const Dashboard = () => {

  const { user, contract, wallet, token } = useSelector((state) => state.user)
  const [books, setBooks] = useState([])
  const [requests, setRequests] = useState([])
  const [allBooks, setAllBooks] = useState([])

  const handleRequestClick = async(userId) => {
    // Handle the request button click for a specific user
      try{
    console.log(`Request button clicked for User ID: ${userId}`);
    await contract.methods
        .purchaseBook(userId)
        // .call().then((res)=>{console.log(res);});
        .send({ from: wallet }, (err, res) => {
          if (err) {
            console.log("An error occured", err);
            return;
          }
        })
        .once("receipt", (receipt) => {
          console.log(receipt);
        });}
        catch(e){
          console.log(e)
        }
  };

  const handleUserClick = (userId) => {
    // Set the selected user ID in the state
    this.setState({ selectedUserId: userId });
  };

  useEffect(() => {
    if (contract) {
      getBooks();
      getRequests();
    }
  }, [contract])

  useEffect(() => {
    console.log(requests)
  }, [requests])


  const getBooks = async () => {
    console.log("running=============")
    try {
      await contract.methods.getAllBooks().call().then((data_schemes) => {
        setAllBooks(data_schemes);
        setBooks(data_schemes.filter(book => book.book_owner === wallet));
      });

    } catch (e) {
      console.log(e)
    }
  }
  const getRequests = async () => {
    console.log("running=============")
    try {
      var noOfRequests = 0;
      await contract.methods.requests_wrapper(wallet).call().then((data_schemes) => { noOfRequests = data_schemes; });

      for (let i = 1; i <= noOfRequests; i++) {
        await contract.methods.getRequest(i).call().then(async (data_schemes) => {
          await getHoldersData(data_schemes.owner, data_schemes.id,i)
        });

      }

    } catch (e) {
      console.log(e)
    }
  }
  // console.log(token)

  const getHoldersData = async (id, bookid,requestid) => {
    try {
      const res = await axios.get(API_URL + '/findUser/' + id, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      let temp = res.data;
      temp.bookId = bookid;
      temp.requestid = requestid;
      setRequests([...requests, temp]);
      console.log(requests)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Navbar />
      <div className='Dashboard-page'>
        <h2 className='Dashboard-page-Owners'>My Books</h2>
        <div className='Dashboard-books-container'>

          {books.map((user) => (<div className='Dashboard-books' key={user.id}>
            <img src={bookImage} alt="Book" style={{ width: '176px', height: '205px' }} />
            <h2 className='Dashboard-page-BookTitle'>{user.book_name} </h2>
          </div>))}
        </div>
        <h2 className='Dashboard-page-Owners'>Your Requests</h2>
        <table className="Dashboard-page-format-wrapper">
          <tbody>
            <tr className='Dashboard-page-row1'>
              <td style={{ "width": "10vw" }}>Name</td>

              <td style={{ "width": "10vw" }}>enrollmentNo</td>


              <td style={{ "width": "10vw" }}>Bhawan</td>
              <td style={{ "width": "10vw" }}>Book Name</td>

              <td style={{ "width": "10vw" }}>Requests</td>
            </tr>
          </tbody>
        </table>
        <ul>
          {allBooks && requests.map((user) => (
            <li key={user.id}>
              <table>
                <tbody>
                  <tr className='Dashboard-page-row'>
                    <td style={{ "width": "10vw" }}  >{user.name}</td>

                    <td style={{ "width": "10vw" }}>{user.enrollmentNo}</td>

                    <td style={{ "width": "10vw" }}>{user.BhawanName}</td>

                    <td style={{ "width": "10vw" }}>{allBooks.filter(book => book.id === user.bookId)['0'].book_name} </td>


                    <td style={{ "width": "10vw" }}><button onClick={() => handleRequestClick(user.requestid)}>Accept</button></td>
                  </tr>
                </tbody>
              </table>

            </li>
          ))}
        </ul>


      </div>
    </>
  );
}


export default Dashboard;
