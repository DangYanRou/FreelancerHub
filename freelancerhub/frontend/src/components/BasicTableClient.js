import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import BioCard from './BioCard';


const headerStyle = {
  backgroundColor: 'lightblue',
  fontFamily: 'Poppins',
  fontWeight: 'bold'
};

const cellStyle = {
  fontFamily: 'Poppins',
  cursor: 'pointer'
};

export default function BasicTableClient() {
  const [open, setOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [favouriteClientList, setFavouriteClientList] = useState([]);

  const handleClientClick = (client) => {
    console.log("client",client);
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFavouriteClientList = async () => {
    try {
      const userID = auth.currentUser.uid;
      const q = query(collection(db, "favouriteClient"), where("freelancerID", "==", userID));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavouriteClientList(filteredData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFavouriteClientList();
  }, []);

  return (
    <>
      <TableContainer component={Paper} className='font-poppin'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={headerStyle}>Name</TableCell>
              <TableCell align="right" style={headerStyle}>Email</TableCell>
              <TableCell align="right" style={headerStyle}>Phone Number</TableCell>
              <TableCell align="right" style={headerStyle}/>
            </TableRow>
          </TableHead>
          <TableBody>
          {favouriteClientList.length > 0 ? (
            favouriteClientList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleClientClick(row)}
                style={cellStyle}
              >
                <TableCell component="th" scope="row" style={cellStyle}>
                  {row.name}
                </TableCell>
                <TableCell align="right" style={cellStyle}>{row.email}</TableCell>
                <TableCell align="right" style={cellStyle}>{row.phone}</TableCell>
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
        {/* <BioCard client={ favouriteClientList} onClientClick={handleClientClick} selectedClientId={selectedClient ? selectedClient.id : null} />
         */}
        <BioCard client={ selectedClient}  />
      </Modal>
    </>
  );
}
