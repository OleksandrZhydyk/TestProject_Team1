import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderP = styled.header`
  padding: 40px 0;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const NavLis = styled.ul`
  display: flex;
`;

export const NavListItem = styled.li`
  margin-right: 36px;
`;

export const FilterA = styled(Link)`
  position: relative;
  text-decoration:none;
  color:#000;
  display: flex;
  align-items: center;


  &:hover::after{
    content:"";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #707070;
    margin-top: 30px;
  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1);

  }
}
`;

export const LogoSVG = styled.svg`
  display: inline-block;
  width: 144px;
  height: 28px;
`;

export const Menu = styled.ul`
  display: flex;
`;

export const MenuItem = styled.li`
  padding-right: 15px;
  margin-right: 15px;
  border-right: 1px solid;
  &:last-child {
    border-right: 0;
    padding-right: 0;
    margin-right: 0;
  }
`;

export const MenuSVG = styled.svg`
  display: inline-block;
  width: 40px;
  height: 40px;
`;
