import React from "react";
import {
  ContactItem,
  ContactList,
  SocialSVG,
  TitleFooter,
} from "./Footer.styled";
import { Link } from "react-router-dom";
import { LogoSVG } from "../Header/Header.styled";
import spriteLogo from "../../images/svg-sprite/MenuSVG.svg";
import spriteSocial from "../../images/svg-sprite/social.svg";

export const Contact: React.FC = () => {
  return (
    <div>
      <TitleFooter>Контакти</TitleFooter>
      <ContactList>
        <ContactItem>
          <SocialSVG>
            <use href={spriteSocial + "#icon-instagram"}></use>
          </SocialSVG>
        </ContactItem>
        <ContactItem>
          <SocialSVG>
            <use href={spriteSocial + "#icon-facebook"}></use>
          </SocialSVG>
        </ContactItem>
        <ContactItem>
          <SocialSVG>
            <use href={spriteSocial + "#icon-tiktok"}></use>
          </SocialSVG>
        </ContactItem>
        <ContactItem>
          <SocialSVG>
            <use href={spriteSocial + "#icon-telegram"}></use>
          </SocialSVG>
        </ContactItem>
        <ContactItem>
          <SocialSVG>
            <use href={spriteSocial + "#icon-whatsapp"}></use>
          </SocialSVG>
        </ContactItem>
        <ContactItem>
          <SocialSVG>
            <use href={spriteSocial + "#icon-viber"}></use>
          </SocialSVG>
        </ContactItem>
      </ContactList>

      <Link to="/">
        <LogoSVG>
          <use href={spriteLogo + "#logo"}></use>
        </LogoSVG>
      </Link>
    </div>
  );
};
