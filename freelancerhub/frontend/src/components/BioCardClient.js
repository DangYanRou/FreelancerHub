import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useHistory } from 'react-router-use-history';

export default function BioCardClient({ freelancer }) {

  const navigate = useNavigate();
  const history = useHistory();

  const removeFreelancer =async(id)=>{
	try{
		const freelancerDoc= doc(db,"favouriteFreelancer",id);
    await deleteDoc(freelancerDoc);
    window.location.reload();
	}catch(error){
		console.log(error.message);
	}
}
const handleAvatarClick = (event, freelancerID) => {
  history.push('client-view-profile', { freelancerID: freelancerID });
};

  return (
    
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'lg',
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar style={{cursor: 'pointer'}} onClick={(event) => handleAvatarClick(event,freelancer.uid)} src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: '3px solid',
            borderColor: 'background.surface',
          }}
        >
          To Profile
        </Chip>
        <Typography onClick={(event) => handleAvatarClick(event,freelancer.uid)}  level="title-lg">{ freelancer.username}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          { freelancer.aboutDescription}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            '& > button': { 
            borderRadius: '2rem',
            width: 'auto'},
          }}
        >
          
        </Box>
      </CardContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button onClick={() => removeFreelancer(freelancer.id)}>Remove</Button>
            <Button 
              onClick={() => window.location.href = `mailto:${freelancer.email}`}
            >
              Message
            </Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}