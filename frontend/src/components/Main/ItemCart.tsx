import React from "react";
import { ProductData } from "../../models/productModels";
import sprite from "../../images/svg-sprite/MenuSVG.svg";

import styled from "styled-components";
import { MenuSVG } from "../Header/Header.styled";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProductDetail } from "../../store/slices/productsSlice";
import { addToCart } from "../../store/slices/cartSlice";

const BestsellersItem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;
const RedirectLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const HeartBlock = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
`;
const Image = styled.img`
  min-width: 275px;
  height: 300px;
`;
const ImageBlock = styled.div`
  position: relative;
`;
const ProductName = styled.p`
  font-family: "MontserratRegular";
  font-size: 16px;
  line-height: 22px;
  margin-top: 10px;
`;
const PriceBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Price = styled.p`
  font-family: "NEXT-ART_BOLD";
  font-size: 16px;
  line-height: 22px;
  margin-top: 9px;
`;

interface Props {
  product: ProductData;
}

const ItemCart: React.FC<Props> = ({ product }) => {

  const dispatch = useAppDispatch();
  const bagCart = useAppSelector((state) => state.cart.products);

  return (
    <BestsellersItem key={product.id}>
      <ImageBlock>
        <HeartBlock>
          <Link to="/">
            <MenuSVG>
              <use href={sprite + "#Heart"}></use>
            </MenuSVG>
          </Link>
        </HeartBlock>
        <RedirectLink
          onClick={() => dispatch(getProductDetail(product.slug))}
          to={`/product/${product.slug}`}
        >
          <Image src={product.photos[0].image} width="300" height="275" />
        </RedirectLink>
      </ImageBlock>
      <RedirectLink
        onClick={() => dispatch(getProductDetail(product.slug))}
        to={`/product/${product.slug}`}
      >
        <ProductName>{product.name}</ProductName>
      </RedirectLink>
      <PriceBlock>
        <Price>{product.price} грн</Price>
        <MenuSVG
          onClick={() => {
            const isInCart = bagCart.find((item) => item.id === product.id);
            if (product.id && !isInCart) dispatch(addToCart(product));
          }}>
            <use href={sprite + "#Bag"}></use>
          </MenuSVG>
      </PriceBlock>
    </BestsellersItem>
  );
};

export default ItemCart