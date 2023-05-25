import React from "react";
import { Menu } from "./DropdownMenu/Menu";
import { Container } from "../styles/container.styled";
import { DropdownMenu } from "./DropdownMenu/DropdownMenu";
import styled from "styled-components";
import { Bestsellers } from "./Bestsellers/Bestsellers";
import { Link } from "react-router-dom";

export const Main: React.FC = () => {
  return (
    <Section>
      <Container>
        <BlockTitle>
          <Title>БЕСТСЕЛЕРИ</Title>
          <ShowAll to="/">показати всі</ShowAll>
        </BlockTitle>
        <Block>
          <MenuBlock>
            {Menu.map((menu) => (
              <DropdownMenu key={menu.id} menu={menu} />
            ))}
          </MenuBlock>
          <div>
            <Bestsellers />
          </div>
        </Block>
      </Container>
    </Section>
  );
};

const BlockTitle = styled.div`
  margin-left: 275px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "NEXT-ART_BOLD";
  font-size: 40px;
  line-height: 56px;
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
  width: 275px;
`;
