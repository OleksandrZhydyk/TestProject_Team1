import styled from "styled-components";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CountCellBox = styled.div`
  display: flex;
  flex-direction: row;
  
  width: 150px;
  font-size: 20px;
`;
const CountingCell = styled.div`
  width: 50%;
`;
const CountCell = styled.div`
  justify-content: center;
  width: 25%;
  border: 1xp solid #DDE2E4;
`;

const BagItem = () => {
  
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row' }}>
      <CardMedia
        component="img"
        sx={{ width: "33%" }}
        image="/static/images/cards/live-from-space.jpg"
      />
      
      
        <CardContent sx={{ display: 'flex', justifyContent: "center", flexDirection: 'column', width: "63%", p: 0 }}>
          <Typography component="div" variant="h5">
            {"qwer"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
      </CardContent>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width: "33%"}}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          кількість
        </Typography>
        <CountCellBox>
          <CountingCell>+</CountingCell>
          <CountingCell>-</CountingCell>
          <CountCell>{ "25"}</CountCell>
        </CountCellBox>
      </Box>
    </Card>
  );
};

export default BagItem;