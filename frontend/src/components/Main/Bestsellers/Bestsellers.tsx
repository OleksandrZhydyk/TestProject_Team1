import React from "react";
import { Products } from "../../../models/productModels";
import sprite from "../../../images/svg-sprite/MenuSVG.svg";

import styled from "styled-components";
import { MenuSVG } from "../../Header/Header.styled";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProductDetail } from "../../../store/slices/productsSlice";
import { addToCart } from "../../../store/slices/cartSlice";

interface Props {
  products: Products | null;
}

export const Bestsellers: React.FC<Props> = ({ products }) => {

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.products);

  if (!products?.results || products.results.length === 0) {
    return <p>No bestsellers found.</p>;
  }

  return (
    <BestsellersList>
      {products.results.slice(0, 3).map(product => {
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
                  const isInCart = cart.find((item) => item.id === product.id);
                  if (product.id && !isInCart) dispatch(addToCart(product));
                }}>
                  <use href={sprite + "#Bag"}></use>
                </MenuSVG>
            </PriceBlock>
          </BestsellersItem>
        );
      })}
    </BestsellersList>
  );
};

const BestsellersList = styled.ul`
  display: flex;
  margin-bottom: 100px;
`;

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
