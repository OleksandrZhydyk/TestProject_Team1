import { styled } from "@mui/system";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {TableFooter} from '@mui/material';
import {TableRow, Button} from '@mui/material';

const StyledTableCell = styled(TableCell)`
  font-family: 'MontserratRegular';
  font-size: 16px;
  line-height: 140%;
  color: #000000;
`;
const StyledTableCellSumm = styled(StyledTableCell)`
  font-size: 20px;
`;

interface BagSummaryProps {
  summ: number;
  handleOrder: () => void;
}

const BagSummary: React.FC<BagSummaryProps> = ({ summ, handleOrder }) => {
  
  //some rundom calculate
  const deliveryCoast = (summ * 0.02).toFixed(2)
  const bankCommission = (summ * 0.01).toFixed(2)
  const summAll = (summ + +deliveryCoast + +bankCommission).toFixed(2)
  
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Сумма товару
                </TableCell>
                <TableCell align="right">{`${summ.toFixed(2)} грн.`}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell component="th" scope="row">
                  Доставка
                </TableCell>
                <TableCell align="right">{`${deliveryCoast} грн.`}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell component="th" scope="row">
                  Коміссія банку
                </TableCell>
                <TableCell align="right">{`${bankCommission} грн.`}</TableCell>
              </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCellSumm>До сплати</StyledTableCellSumm>
              <StyledTableCellSumm align="right">{`${summAll} грн.`}</StyledTableCellSumm>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      
      <Button
        variant="contained"
        onClick={handleOrder}
      >
        Сплатити
      </Button>
    </>
  );
};

export default BagSummary;