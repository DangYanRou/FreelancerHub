import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BioCard from './BioCard';
import Modal from '@mui/material/Modal';
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';


const headerStyle = {
  fontFamily: 'Poppins',
  fontWeight: 'bold'
};

const cellStyle = {
  fontFamily: 'Poppins',
  cursor: 'pointer'
};

export default function BasicTable() {

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [favouriteFreelancerList, setFavouriteFreelancerList] = useState([]);
  
  const favouriteFreelancerRef = collection(db, "favouriteFreelancer");
  
  const getFavouriteFreelancerList = async () => {
  try {
    const userID = auth.currentUser.uid;
    const q = query(favouriteFreelancerRef, where("clientID", "==", userID));

    const data = await getDocs(q);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFavouriteFreelancerList(filteredData);
  } catch (error) {
    console.log(error.message);
  }
};

  useEffect(() => {  
    getFavouriteFreelancerList();
  }, []);

  return (
    <>
    <TableContainer component={Paper} className='font-poppin ml-[70px] ' style={{maxWidth:1500}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Name</TableCell>
            <TableCell align="right" style={headerStyle}>Email</TableCell>
            <TableCell align="right" style={headerStyle}>Job Title</TableCell>
            <TableCell align="right" style={headerStyle}>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {favouriteFreelancerList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(row)}
              style={cellStyle}
            >
              <TableCell component="th" scope="row" style={cellStyle}>
                {row.name}
              </TableCell>
              <TableCell align="right" style={cellStyle}>{row.email}</TableCell>
              <TableCell align="right" style={cellStyle}>{row.job}</TableCell>
              <TableCell align="right" style={cellStyle}>{row.rating}</TableCell>
            </TableRow>
          ))}
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
    <BioCard row={selectedRow} />
  </Modal>
  </>
  );
}
