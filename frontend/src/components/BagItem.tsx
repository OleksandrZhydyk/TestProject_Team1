
import styled from "styled-components";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ProductData } from "../models/productModels";

const CountCellBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 150px;
`;
const CountCellNum = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  border: 1px solid #DDE2E4;
  font-size: 1.4rem;
  align-items: center;
`;
const CountingCell = styled(CountCellNum)`
  width: 25%;
  border-right: none;
`;
const CountButton = styled.button`
  width: 100%;
  padding: 0;
  border: 0;
  background-color: white;
  font-size: 1.4rem;
  cursor: pointer;
`;

interface BagItemProps {
  bagProduct: ProductData;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
}

const BagItem: React.FC<BagItemProps> = ({ bagProduct, itemCount, setItemCount }) => {
  

  const hendlerIncrement = () => {
    setItemCount(prev=> prev + 1)
  }
  const hendlerDecrement = () => {
    setItemCount(prev => (prev < 2) ? prev : prev - 1)
  }
  
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'row',
      height: "177px",
      marginBottom: "2rem"
    }}>
      <CardMedia
        component="img"
        sx={{ width: "33%" }}
        image={bagProduct.photos[0].image}
      />
      
      
      <CardContent sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        width: "63%", p: 0
      }}>
          <Typography component="div" variant="h5">
            {bagProduct.name}
          </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{padding:"0 2rem"}}>
          {bagProduct.description}
          </Typography>
      </CardContent>
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        width: "33%"
      }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          кількість
        </Typography>
        <CountCellBox>
          <CountingCell>
            <CountButton onClick={hendlerIncrement}>+</CountButton>
          </CountingCell>
          <CountingCell>
          <CountButton onClick={hendlerDecrement}>-</CountButton>
          </CountingCell>
          <CountCellNum>{itemCount}</CountCellNum>
        </CountCellBox>
      </Box>
    </Card>
  );
};

export default BagItem;