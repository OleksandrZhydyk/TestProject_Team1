import styled from "styled-components";
import { useState } from "react";
import { ProductData } from "../../models/productModels";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addToCart } from "../../store/slices/cartSlice";

const Title = styled.h1<StyledProps>`
  font-size: ${(props) => props.font || "36px"};
  margin-bottom: 20px;
  max-width: 500px;
`;

const SelectContainer = styled.section`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  padding: 10px 15px;
  width: 250px;
  font-size: 24px;
  border-color: #021eab;
  outline: none;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #021eab;
  color: white;
  outline: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 24px;
`;

const CountCellBox = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 10px;
  font-size: 36px;
`;
const CountingCell = styled.div`
  cursor: pointer;
  user-select: none;
  width: 50px;
`;
const CountCell = styled.div`
  justify-content: center;
  width: 25%;
  border: 1xp solid #dde2e4;
`;

interface StyledProps {
  font: string;
}

interface Props {
  product: ProductData | null;
}

const ProductDescription = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.products);
  const allColors = product?.sizes?.map((color) => color.color);
  const allSizes = product?.sizes?.map((size) => size.size);
  const colors = allColors?.filter((element, index) => {
    return allColors.indexOf(element) === index;
  });
  const sizes = allSizes?.filter((element, index) => {
    return allSizes.indexOf(element) === index;
  });
  const [orderSize, setOrderSize] = useState("");
  const [orderColor, setOrderColor] = useState("");
  const [amount, setAmount] = useState(1);

  const handleAddToCart = () => {
    const isInCart = cart.find((item) => item.id === product?.id);
    if (product && !isInCart && orderColor && orderSize) {
      const { id, slug } = product;
      dispatch(
        addToCart({
          id,
          slug,
          quantity: amount,
          color: orderColor,
          size: orderSize,
        })
      );
    }
  };

  const handleChangeAmount = () => {
    if (amount > 1) setAmount((prev) => prev - 1);
  };

  return (
    <Wrapper>
      <Title font="36px">{product?.name}</Title>
      <Title font="24px">{product?.price}</Title>
      <SelectContainer>
        <StyledSelect onChange={(e) => setOrderColor(e.target.value)}>
          <option value="">Оберіть колір</option>
          {colors?.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect onChange={(e) => setOrderSize(e.target.value)}>
          <option value="">Оберіть розмір</option>
          {sizes?.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </StyledSelect>
      </SelectContainer>
      <CountCellBox>
        <CountingCell onClick={() => setAmount((prev) => prev + 1)}>
          +
        </CountingCell>
        <CountCell>{amount}</CountCell>
        <CountingCell onClick={handleChangeAmount}>-</CountingCell>
      </CountCellBox>
      <Button onClick={handleAddToCart}>Додати в корзину</Button>
      <Title font="24px">{product?.description}</Title>
    </Wrapper>
  );
};

export default ProductDescription;
