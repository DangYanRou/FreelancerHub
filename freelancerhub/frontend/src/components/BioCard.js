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

export default function BioCard({ client}) {
  const navigate = useNavigate();
  const history = useHistory();

  const removeClient =async(id)=>{
	try{
		const clientDoc= doc(db,"favouriteClient",id);
    await deleteDoc(clientDoc);
    window.location.reload();
	}catch(error){
		console.log(error.message);
	}
}

const handleAvatarClick = (clientID) => {
  history.push('freelancer-view-profile', { clientID: clientID });
};

  return (
    <div>
      

      <Card
          // key={blog.id}
          sx={{
            width: 320,
            maxWidth: '100%',
            boxShadow: 'lg',
            mb: 2,
          }}
        >
          <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Avatar onClick={handleAvatarClick(client.uid)} src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
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
              PRO
            </Chip>
            {/* <div className={`card ${selectedClientId === blog.id ? 'selected' : ''}`} onClick={() => onClientClick(blog)}> */}
              <Typography level="title-lg">{client.username}</Typography>
              <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                {client.aboutDescription}
              </Typography>
            {/* </div> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                '& > button': {
                  borderRadius: '2rem',
                  width: 'auto'
                },
              }}
            >
              <IconButton size="sm" variant="plain" color="neutral">
                <SvgIcon>
                  {/* SVG Icon */}
                </SvgIcon>
              </IconButton>
              {/* Additional IconButtons */}
            </Box>
          </CardContent>
          <CardOverflow sx={{ bgcolor: 'background.level1' }}>
            <CardActions buttonFlex="1">
              <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                <Button onClick={()=>removeClient(client.id)}>Remove</Button>
                <Button 
                              onClick={() => window.location.href = `mailto:${client.email}`}
                            >
                              Message
                            </Button>
              </ButtonGroup>
            </CardActions>
          </CardOverflow>
        </Card>
    </div>
  );
}
