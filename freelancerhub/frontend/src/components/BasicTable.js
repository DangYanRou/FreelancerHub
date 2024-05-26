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

function createData(name, email, job_title, rating) {
  return { name, email, job_title, rating};
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
  createData('Elon Musk','elonmusk@gmail.com','Software Engineer', 4.0),
  createData('Ollie Bearman','ollie38@gmail.com','Software Engineer', 5.0),
  createData('Charles Leclerc','charles16@gmail.com','Data Science Engineer', 4.5),
  createData('Carlos Sainz','sainz55@gmail.com','Frontend Developer', 4.0),
    createData('Max Verstappen','max1@gmail.com','Backend Developer', 5.0),
    createData('Lewis Hamilton','lewis44@gmail.com','Full Stack Developer', 5.0),
];

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
          {rows.map((row) => (
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
              <TableCell align="right" style={cellStyle}>{row.job_title}</TableCell>
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
