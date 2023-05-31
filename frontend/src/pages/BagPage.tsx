import styled from "styled-components";
import { Container } from "../components/styles/container.styled";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearCart } from "../store/slices/cartSlice";
import { orderProduct } from "../store/slices/orderSlice";

const Header = styled.header`
  font-family: 'MontserratBold';
  font-size: 40px;
  line-height: 56px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #DDE2E4;
`;
const BagList = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #DDE2E4;
  padding: 2%;
`;
const Summary = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 2%;
`;

const BagPage = () => {

  const bagProducts = useAppSelector(
    (store) => store.cart.products
  );

  const dispatch = useAppDispatch();

  const summ = bagProducts.reduce((acc, next) => acc + +next.price, 0)

  const handleOrder = () => {
    const order = bagProducts.map(product => {
      
        return ({
          id: product.id,
          slug: product.slug,
          quantity: 1,
          color: product?.sizes?.[0].color || "Зелений",
          size: product?.sizes?.[0].size || "XS"
        })
    })

    dispatch(clearCart())
    dispatch(orderProduct(order))
  }

  return (
    <Container  >
      <Header>кошик</Header>

      <Main>
        <BagList>
          {bagProducts.map(bagProduct => <BagItem
            key={bagProduct.id}
            bagProduct={bagProduct}
          />)}
        </BagList>

        <Summary>
         <BagSummary summ={summ} handleOrder={handleOrder} />
        </Summary>
      </Main>
    </Container>
  );
};

export default BagPage;
