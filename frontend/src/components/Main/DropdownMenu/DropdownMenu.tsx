import React, { useState } from "react";
import styled from "styled-components";
import sprite from "../../../images/svg-sprite/MenuSVG.svg";

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border: 0px;
  padding: 10px 10px;
  cursor: pointer;
  width: 100%;
  font-family: "MontserratRegular";
  font-size: 20px;
  line-height: 28px;
`;

const ArrowSVG = styled.svg`
  width: 40px;
  height: 40px;
`;

const MenuContainer = styled.div`
  width: 275px;
`;

const Menu = styled.div`
  background-color: #ffffff;
  border: transparet;
  padding: 10px;
  font-family: "MontserratRegular";
  font-size: 20px;
  line-height: 28px;
`;

const MenuItem = styled.div`
  padding: 5px 0;
  cursor: pointer;
`;

interface MenuItem {
  id: number;
  label: string;
}

interface Menu {
  id: number;
  label: string;
  items: MenuItem[];
}

interface DropdownMenuProps {
  menu: Menu;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleMenu}>
        {menu.label}
        <ArrowSVG>
          {isOpen ? (
            <use href={sprite + "#ChevronDown"}></use>
          ) : (
            <use href={sprite + "#ChevronRight"}></use>
          )}
        </ArrowSVG>
      </Button>
      {isOpen && (
        <MenuContainer hidden={!isOpen}>
          <Menu>
            {menu.items.map((item) => (
              <MenuItem key={item.id}>
                <input type="checkbox" />
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </MenuContainer>
      )}
    </>
  );
};
