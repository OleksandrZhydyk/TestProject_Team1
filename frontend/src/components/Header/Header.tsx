import React from "react";
import sprite from "../../images/svg-sprite/MainSVG.svg";
import { LogoSVG, HeaderP, Nav } from "./Header.styled";
import { Container } from "../styles/container.styled.js";
import { Link } from "react-router-dom";
import { NavList } from "./NavList.tsx";
import { MenuList } from "./MenuList.tsx";

export const Header: React.FC = () => {
  return (
    <HeaderP>
      <Container>
        <Nav>
          <Link to="/">
            <LogoSVG>
              <use href={sprite + "#logo"}></use>
            </LogoSVG>
          </Link>
          <NavList />
          <MenuList />
        </Nav>
      </Container>
    </HeaderP>
  );
};
