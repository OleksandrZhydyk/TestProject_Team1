import styled from "styled-components";
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

  return (
    <Wrapper>
      <Title font="36px">{product?.name}</Title>
      <Title font="24px">{product?.price}</Title>
      <SelectContainer>
        <StyledSelect>
          {colors?.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect>
          {sizes?.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </StyledSelect>
      </SelectContainer>
      <Button
        onClick={() => {
          const isInCart = cart.find((item) => item.id === product?.id);
          if (product && !isInCart) dispatch(addToCart(product));
        }}
      >
        Додати в корзину
      </Button>
      <Title font="24px">{product?.description}</Title>
    </Wrapper>
  );
};

export default ProductDescription;
