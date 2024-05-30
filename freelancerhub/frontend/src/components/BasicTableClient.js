import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BioCard from './BioCardClient';
import Modal from '@mui/material/Modal';
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

function createData(name, email, phone_number, rating) {
  return { name, email, phone_number, rating};
}

const headerStyle = {
  fontFamily: 'Poppins',
  fontWeight: 'bold'
};

const cellStyle = {
  fontFamily: 'Poppins',
  cursor: 'pointer'
};

const rows = [
    createData('Google Inc.', 'google07@gmail.com', '221-126-6527', 4.5),
  createData('Elon Musk', 'elonmuskl@yale.edu', '106-134-7086', 4.5),
  createData('Randene Carreyette', 'rcarreyette2@myspace.com', '177-154-2391', 1.0),
  createData('Silvester Zuker', 'szuker3@jimdo.com', '758-470-5778', 1.0),
  createData('Harrison McGinlay', 'hmcginlay4@163.com', '169-241-0850', 4.6),
  createData('Cleon Beadman', 'cbeadman5@cnn.com', '120-883-7462', 3.8),
  createData('Micheil Antham', 'mantham6@yellowbook.com', '878-652-1421', 3.5),
  createData('Juan Matityahu', 'jmatityahu7@blogs.com', '911-125-5258', 5.0),
  createData('Kirstin Salatino', 'ksalatino8@pcworld.com', '526-290-3203', 2.6),
  createData('Ernesto Slee', 'eslee9@etsy.com', '863-178-1504', 1.1),
  createData('Sayre Plait', 'splaita@twitpic.com', '114-134-8132', 1.9),
  createData('Retha Hebson', 'rhebsonb@multiply.com', '566-900-1516', 0.8),
  createData('Damien Mynott', 'dmynottc@businesswire.com', '729-856-9678', 4.6),
  createData('Emmit Cairney', 'ecairneyd@storify.com', '587-621-3775', 3.9),
  createData('Morey Cutler', 'mcutlere@comsenz.com', '255-284-1994', 0.1),
  createData('Calv Gravie', 'cgravief@sohu.com', '787-587-6495', 2.2),
  createData('Rob Carle', 'rcarleg@tiny.cc', '372-819-8954', 4.2),
  createData('Annora McKeurton', 'amckeurtonh@sciencedirect.com', '959-168-2472', 1.9),
  createData('Alana Chaffe', 'achaffei@wikipedia.org', '699-471-0693', 2.2),
  createData('Ferrell MacMorland', 'fmacmorlandj@illinois.edu', '706-589-9795', 0.5),
  createData('Bamby Barnby', 'bbarnbyk@issuu.com', '133-967-5785', 1.7),
  createData('Sollie Tock', 'stockl@gravatar.com', '982-117-4365', 3.1),
  createData('Michal Warman', 'mwarmanm@yahoo.co.jp', '788-532-8136', 4.1),
  createData('Huntington Bernli', 'hbernlin@globo.com', '883-549-0185', 1.6),
  createData('Moselle Pougher', 'mpoughero@whitehouse.gov', '871-246-2362', 4.7),
  createData('Myrilla Danilchik', 'mdanilchikp@tinypic.com', '379-448-5594', 1.7),
  createData('Benetta Phalip', 'bphalipq@jiathis.com', '713-390-9173', 2.5),
  createData('Shaylynn Kobes', 'skobesr@biglobe.ne.jp', '935-122-1220', 2.8),
  createData('Pen Crebbin', 'pcrebbins@cnbc.com', '508-258-2588', 1.6),
  createData('Stanfield Wedderburn', 'swedderburnt@yolasite.com', '408-354-8644', 0.4)
];



export default function BasicTableClient() {

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [favouriteClientList, setFavouriteClientList] = useState([]);
  
  const favouriteClientRef = collection(db, "favouriteClient");
  
  const getFavouriteClientList = async () => {
      try {
        const data = await getDocs(favouriteClientRef);
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
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Name</TableCell>
            <TableCell align="right" style={headerStyle}>Email</TableCell>
            <TableCell align="right" style={headerStyle}>Phone Number</TableCell>
            <TableCell align="right" style={headerStyle}>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {favouriteClientList.map((row) => (
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
              <TableCell align="right" style={cellStyle}>{row.phoneNumber}</TableCell>
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
