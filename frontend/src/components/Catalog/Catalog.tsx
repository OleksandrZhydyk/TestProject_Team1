import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "../styles/container.styled";
import { useAppDispatch } from "../../store/store";
import { Products } from "../../models/productModels";
import sprite from "../../images/svg-sprite/MenuSVG.svg";
import { MenuSVG } from "../Header/Header.styled";
import {
  getProductDetail,
  getProductsList,
} from "../../store/slices/productsSlice";

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Products | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await dispatch(getProductsList()).unwrap();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (!products?.results || products.results.length === 0) {
    return <p>No bestsellers found.</p>;
  }

  return (
    <Container>
      <BestsellersList>
        {products.results.map(({ name, id, price, photos, slug }) => {
          return (
            <BestsellersItem key={id}>
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
              <RedirectLink
                onClick={() => dispatch(getProductDetail(slug))}
                to={`/product/${slug}`}
              >
                <ProductName>{name}</ProductName>
              </RedirectLink>
              <PriceBlock>
                <Price>{price} грн</Price>
                <Link to="/">
                  <MenuSVG>
                    <use href={sprite + "#Bag"}></use>
                  </MenuSVG>
                </Link>
              </PriceBlock>
            </BestsellersItem>
          );
        })}
      </BestsellersList>
    </Container>
  );
};

const BestsellersList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
`;

const BestsellersItem = styled.li`
  margin-right: 20px;
  margin-bottom: 40px;
  &:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }
  &:nth-child(3n) {
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
