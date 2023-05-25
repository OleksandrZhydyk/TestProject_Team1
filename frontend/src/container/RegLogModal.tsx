import styled from "styled-components";

import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import img from "../images/loginImg.svg";
import RegistrationForm from "../components/RegistrationForm";
import { useState } from "react";
import LoginForm from "../components/LoginForm";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #4285F4;
`;

const LeftContainer = styled.div`
  width: 36%;
`;

const RightContainer = styled.div`
  width: 64%;
  border:0px solid;
  border-radius: 40px 0 0 40px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;
  
type ModalProps = {
  isOpenModal: boolean,
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RegLogModal:React.FC<ModalProps> = ({ isOpenModal, setIsOpenModal }) => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState<boolean>(false)

  const handleClose = () => {
    setIsOpenLoginForm(false);
    setIsOpenModal(false);
  };

  return (
    <Dialog open={isOpenModal} onClose={handleClose}>
      <MainContainer>
        <LeftContainer>
          <DialogContent>
            <DialogTitle sx={{ color: "#FFFFFF", padding: 0 }}>MM13</DialogTitle>
            <DialogContentText fontSize={12} sx={{ color: "#FFFFFF"}}>
              Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci
            </DialogContentText>
            <CardMedia 
              component="img"
              height="100%"
              image={img}
              alt="Paella dish"
            />
            <DialogContentText
              fontSize={12}
              sx={{ color: "#FFFFFF" }}
            >
              The Walt Disney Company
            </DialogContentText>
          </DialogContent>
        </LeftContainer>

        <RightContainer>
          {!isOpenLoginForm && <RegistrationForm
            setIsOpenModal={setIsOpenModal}
            setIsOpenLoginForm={setIsOpenLoginForm}
          />}
          {isOpenLoginForm && <LoginForm
            setIsOpenModal={setIsOpenModal}
            setIsOpenLoginForm={setIsOpenLoginForm}
          />}
        </RightContainer>
      </MainContainer>
    </Dialog>
  );
}

export default RegLogModal;