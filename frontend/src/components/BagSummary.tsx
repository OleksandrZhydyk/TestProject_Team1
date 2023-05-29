import { styled } from "@mui/system";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {TableFooter} from '@mui/material';
import {TableRow, Button} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../store/store";
import { orderProduct } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";

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
  itemCount: number;
}

const BagSummary: React.FC<BagSummaryProps> = ({ summ, itemCount }) => {

  const dispatch = useAppDispatch();
  const bagProducts = useAppSelector(
    (store) => store.cart.products
  );
  
  const deliveryCoast = (summ * 0.02).toFixed(2)
  const bankCommission = (summ * 0.01).toFixed(2)
  const summAll = (summ + +deliveryCoast + +bankCommission).toFixed(2)

  const handleOrder = () => {
    const order = bagProducts.map(product => {
      
        return ({
          id: product.id,
          slug: product.slug,
          quantity: itemCount,
          color: product?.sizes?.[0].color || "Зелений",
          size: product?.sizes?.[0].size || "XS"
        })
    })

    dispatch(clearCart())
    dispatch(orderProduct(order))
  }
  
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