import React from "react";
import { FilterA, NavLis, NavListItem } from "./Header.styled";

export const NavList: React.FC = () => {
  return (
    <NavLis>
      <NavListItem>
        <FilterA to="/">він</FilterA>
      </NavListItem>
      <NavListItem>
        <FilterA to="/">вона</FilterA>
      </NavListItem>
      <NavListItem>
        <FilterA to="/">діти</FilterA>
      </NavListItem>
    </NavLis>
  );
};
