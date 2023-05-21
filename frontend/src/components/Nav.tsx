import styled from "styled-components";

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { IconButton } from "@mui/material";

import LoginForm from "./LoginForm";
import { useState } from "react";

const StyledNav = styled.nav`
  display: flex;
  align-items: centr;
  justify-content: centr;
  width: 100%;
  border: 1px solid;
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  return (
    <StyledNav>
      Nav
      <IconButton onClick={handleClickOpen} aria-label="login">
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <LoginForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledNav>
  );
};

export default Nav;