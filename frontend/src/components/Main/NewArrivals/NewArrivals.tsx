import React from "react";
import { Products } from "../../../models/productModels";
import sprite from "../../../images/svg-sprite/MenuSVG.svg";
import styled from "styled-components";
import { MenuSVG } from "../../Header/Header.styled";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { getProductDetail } from "../../../store/slices/productsSlice";

interface Props {
  products: Products | null;
}

export const NewArrivals: React.FC<Props> = ({ products }) => {
  const dispatch = useAppDispatch();
  if (!products?.results || products.results.length === 0) {
    return <p>No New Arrivals found.</p>;
  }
  return (
    <NewArrivalsList>
      {products.results.slice(3, 5).map(({ name, id, price, slug, photos }) => {
        return (
          <NewArrivalsItem key={id}>
            <ImageBlock>
              <HeartBlock>
                <Link to="/">
                  <MenuSVG>
                    <use href={sprite + "#Heart"}></use>
                  </MenuSVG>
                </Link>
              </HeartBlock>
              <RedirectLink
                onClick={() => dispatch(getProductDetail(slug))}
                to={`/product/${slug}`}
              >
                <Image src={photos[0].image} width="300" height="275" />
              </RedirectLink>
            </ImageBlock>

            <ProductName>{name}</ProductName>
            <PriceBlock>
              <RedirectLink
                onClick={() => dispatch(getProductDetail(slug))}
                to={`/product/${slug}`}
              >
                <Price>{price} грн</Price>
              </RedirectLink>
              <Link to="/">
                <MenuSVG>
                  <use href={sprite + "#Bag"}></use>
                </MenuSVG>
              </Link>
            </PriceBlock>
          </NewArrivalsItem>
        );
      })}
    </NewArrivalsList>
  );
};

const RedirectLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const NewArrivalsList = styled.ul`
  display: flex;
  margin-bottom: 100px;
`;

const NewArrivalsItem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const HeartBlock = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
`;

const Image = styled.img`
  min-width: 422px;
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
