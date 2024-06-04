import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BioCardClient from './BioCardClient';
import Modal from '@mui/material/Modal';
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Loading from './Loading';
import { useUser } from '../context/UserContext';
import { useHistory } from 'react-router-use-history';


const headerStyle = {
  backgroundColor: 'lightblue',
  fontFamily: 'Poppins',
  fontWeight: 'bold'
};

const cellStyle = {
  fontFamily: 'Poppins',
  cursor: 'pointer'
};

export default function BasicTable() {

  const [open, setOpen] = React.useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  const handleFreelancerClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [favouriteFreelancerList, setFavouriteFreelancerList] = useState([]);
  
  const favouriteFreelancerRef = collection(db, "favouriteFreelancer");
  
  useEffect(() => {
    const fetchFavouriteFreelancers = async () => {
      try {
        if (!user) return;
        setLoading(true);
        const userID = user.id;
        console.log(userID);
        const favouriteFreelancerRef = collection(db, "favouriteFreelancer");
        const q = query(favouriteFreelancerRef, where("clientID", "==", userID));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFavouriteFreelancerList(filteredData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteFreelancers();
  }, [user]);


  if(loading)
    {
      return (<Loading></Loading>);
    }
  

  return (
    <>
    <TableContainer component={Paper} className='font-poppin ml-[70px] ' style={{maxWidth:1500}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Name</TableCell>
            <TableCell align="right" style={headerStyle}>Email</TableCell>
              <TableCell align="right" style={headerStyle}>Job Title</TableCell>
              <TableCell style={headerStyle} />
          </TableRow>
        </TableHead>
          <TableBody >
          {favouriteFreelancerList.length > 0 ? (
          favouriteFreelancerList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleFreelancerClick(row)}
              style={cellStyle}
            >
              <TableCell component="th" scope="row" style={cellStyle}>
                {row.username}
              </TableCell>
              <TableCell align="right" style={cellStyle}>{row.email}</TableCell>
              <TableCell align="right" style={cellStyle}>{row.job}</TableCell>
              <TableCell align="right" style={cellStyle}>{row.rating}</TableCell>
            </TableRow>
          ))
          ) : (
               <TableRow>
              <TableCell style={cellStyle} component="th" scope="row" colSpan={4} align="center">
                No favourite collaborator at the moment
              </TableCell>
            </TableRow> 
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
        <BioCardClient freelancer={ selectedFreelancer} />
  </Modal>
  </>
  );
}
