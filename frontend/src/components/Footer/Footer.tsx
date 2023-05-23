import React from "react";
import { Container } from "../styles/container.styled";
import { ContF, FooterP } from "./Footer.styled";
import { MobileApp } from "./MobileApp";
import { Information } from "./Information";
import { Contact } from "./Contact";
export const Footer: React.FC = () => {
  return (
    <FooterP>
      <Container>
        <ContF>
          <MobileApp />
          <Information />
          <Contact />
        </ContF>
      </Container>
    </FooterP>
  );
};
