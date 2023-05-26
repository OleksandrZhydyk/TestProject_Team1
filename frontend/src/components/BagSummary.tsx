import styled from "styled-components";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import {TableRow, Button} from '@mui/material';

const StyledTableFooter = styled(TableFooter)`
font-family: 'MontserratRegular';
font-size: 24px;
line-height: 33px;
`;

const BagSummary = () => {


  
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Сумма товару
                </TableCell>
                <TableCell align="right">{`${1000} грн.`}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell component="th" scope="row">
                  Доставка
                </TableCell>
                <TableCell align="right">{`${800} грн.`}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell component="th" scope="row">
                  Коміссія банку
                </TableCell>
                <TableCell align="right">{`${30} грн.`}</TableCell>
              </TableRow>
          </TableBody>
          <StyledTableFooter>
            <TableRow>
              <TableCell>До сплати</TableCell>
              <TableCell align="right">{`${4119} грн.`}</TableCell>
            </TableRow>
          </StyledTableFooter>
        </Table>
      </TableContainer>
      
      <Button
        variant="contained"
      >
        Сплатити
      </Button>
    </>
  );
};

export default BagSummary;