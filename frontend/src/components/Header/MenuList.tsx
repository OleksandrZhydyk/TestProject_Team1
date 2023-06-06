import React, { useState } from "react";
import { Menu, MenuItem, MenuSVG } from "./Header.styled";
import sprite from "../../images/svg-sprite/MenuSVG.svg";
import { Link } from "react-router-dom";
import RegLogModal from "../../container/RegLogModal";

export const MenuList: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const isLogged = localStorage.getItem("access") !== null && localStorage.getItem("access") !== "";

  const handleClickOpen = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Menu>
      <MenuItem>
        <Link to="">
          <MenuSVG>
            <use href={sprite + "#Search"}></use>
          </MenuSVG>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link to="/">
          <MenuSVG>
            <use href={sprite + "#Heart"}></use>
          </MenuSVG>
        </Link>
      </MenuItem>

      <MenuItem onClick={handleClickOpen}>
        <RegLogModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
        <Link to="/">
          <MenuSVG style={{backgroundColor: isLogged ? "lightgreen" : ""}}>
            <use href={sprite + "#User"}></use>
          </MenuSVG>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link to="bag">
          <MenuSVG>
            <use href={sprite + "#Bag"}></use>
          </MenuSVG>
        </Link>
      </MenuItem>
    </Menu>
  );
};
