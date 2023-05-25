import React from "react";
import { HeroSection, HeroLogo, HeroDescription } from "./Hero.styled";
import { Container } from "../styles/container.styled";
import { Button } from "@mui/material";

export const Hero: React.FC = () => {
  return (
    <HeroSection>
      <Container>
        <HeroLogo>MM13</HeroLogo>
        <HeroDescription>simple. aesthetic. minimalistic.</HeroDescription>
        <Button
          size="large"
          variant="text"
          type="button"
          style={{
            backgroundColor: "#021EAB",
            fontFamily: "MontserratRegular",
            fontSize: "16px",
            lineHeight: "22px",
            color: "#ffffff",
            padding: "10px 20px",
            textTransform: "none",
          }}
        >
          перейти до каталогу
        </Button>
      </Container>
    </HeroSection>
  );
};
