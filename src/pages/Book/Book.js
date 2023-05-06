import { useEffect, useState } from 'react';
import bookImage from '../../assets/book.jpeg';
import './Book.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';

const Book = () => {
  const location = useLocation()
  console.log(location.state.data)
  const data = location.state.data;

  const { token, contract, wallet } = useSelector((state) => state.user)

  const [users, setUsers] = useState([])

  const handleRequestClick = async (id) => {
    try {
      console.log(contract)
      console.log(`Request button clicked for User ID: ${id}`);

      await contract.methods
        .requestBook(id)
        // .call().then((res)=>{console.log(res);});
        .send({ from: wallet }, (err, res) => {
          if (err) {
            console.log("An error occured", err);
            return;
          }
        })
        .once("receipt", (receipt) => {
          console.log(receipt);
        });

    } catch (e) {
      console.log(e)
    }
    // Handle the request button click for a specific user
  };

  const getHoldersData = async () => {
    try {
      // data.book_owner.forEach(async (user) => {
      //   const res = await axios.get(API_URL + '/findUser/' + user);
      //   console.log(res)
      // });
      const res = await axios.get(API_URL + '/findUser/' + data.book_owner, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setUsers([res.data])

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getHoldersData();
  }, [])


  return (
    <>
      <Navbar />
      <div className='Book-page'>
        <div className='Book-page-img'>
          <img src={bookImage} alt="Book" style={{ width: '300px', height: 'auto' }} />
          <h2 className='Book-page-BookTitle'>{location.state.data.book_name}</h2></div>

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
                    <td >{user.name}</td>

                    <td>{user.enrollmentNo}</td>

                    <td>{user.BhawanName}</td>

                    <td>{user.Branch}</td>

                    <td>{user.Year}</td>
                    {data.book_owner !== wallet && <td><button onClick={() => handleRequestClick(data.id)}>Request this book</button></td>}
                    {data.book_owner === wallet && <td><button disabled>You own this book</button></td>}
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


export default Book;
