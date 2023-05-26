import React, { useState, useEffect } from "react";
import { Menu } from "./DropdownMenu/Menu";
import { Container } from "../styles/container.styled";
import { DropdownMenu } from "./DropdownMenu/DropdownMenu";
import styled from "styled-components";
import { Bestsellers } from "./Bestsellers/Bestsellers";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { getProductsList } from "../../store/slices/productsSlice";
import { Products } from "../../models/productModels";
import { NewArrivals } from "./NewArrivals/NewArrivals";
import { Email } from "./Email/Email";

export const Main: React.FC = () => {
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

  return (
    <Section>
      <Container>
        <BestSellersTitle>
          <Title>БЕСТСЕЛЕРИ</Title>
          <ShowAll to="/">показати всі</ShowAll>
        </BestSellersTitle>
        <Block>
          <MenuBlock>
            {Menu.map((menu) => (
              <DropdownMenu key={menu.id} menu={menu} />
            ))}
          </MenuBlock>
          <div>
            <Bestsellers products={products} />
            <NewArrivalsTitle>
              <Title>НОВИНКИ</Title>
              <ShowAll to="/">в каталог</ShowAll>
            </NewArrivalsTitle>
            <NewArrivals products={products} />
            <Title>
              Підпишись, щоб першим дізнаватись про акції та новинки
            </Title>
            <Email />
          </div>
        </Block>
      </Container>
    </Section>
  );
};

const BestSellersTitle = styled.div`
  margin-left: 275px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NewArrivalsTitle = styled.div`
  position: relative;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-family: "NEXT-ART_BOLD";
  font-size: 40px;
  line-height: 56px;
  text-align: center;
`;

const ShowAll = styled(Link)`
  display:flex;
  position:relative;
  font-family: "MontserratRegular";
  font-size: 16px;
  line-height: 22px;
  color: #021eab;
  text-decoration:none;
  &::after{
    content:"";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #021eab;
    margin-top: 30px;

`;

const Section = styled.section`
  padding-top: 100px;
`;

const Block = styled.div`
  display: flex;
`;

const MenuBlock = styled.div`
  min-width: 275px;
`;
