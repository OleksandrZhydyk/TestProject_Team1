import styled from "styled-components";
import { useState } from "react";

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { IconButton } from "@mui/material";

import RegLogModal from "../container/RegLogModal";

const StyledNav = styled.nav`
  display: flex;
  align-items: centr;
  justify-content: centr;
  width: 100%;
  border: 1px solid;
`;

const Nav = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleClickOpen = () => {
    setIsOpenModal(true);
  };

  return (
    <StyledNav>
      Nav
      <IconButton onClick={handleClickOpen} aria-label="login">
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <RegLogModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </StyledNav>
  );
};

export default Nav;