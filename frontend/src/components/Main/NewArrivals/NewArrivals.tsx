import React from "react";
import { Products } from "../../../models/productModels";
import photo from "../../../images/no-image.jpg";
import sprite from "../../../images/svg-sprite/MenuSVG.svg";
import styled from "styled-components";
import { MenuSVG } from "../../Header/Header.styled";
import { Link } from "react-router-dom";

interface Props {
  products: Products | null;
}

export const NewArrivals: React.FC<Props> = ({ products }) => {
  if (!products?.results || products.results.length === 0) {
    return <p>No New Arrivals found.</p>;
  }
  console.log(products.results);
  return (
    <NewArrivalsList>
      {products.results.slice(2, 4).map(({ name, id, price }) => {
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
              <Image src={photo} width="422" height="300" />
            </ImageBlock>

            <ProductName>{name}</ProductName>
            <PriceBlock>
              <Price>{price} грн</Price>
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
  width: 422px;
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
