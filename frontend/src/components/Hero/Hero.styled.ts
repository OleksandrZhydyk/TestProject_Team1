import styled from "styled-components";
import photoWebp from "../../images/hero/main-img.webp";
import photoJpg from "../../images/hero/main-img.jpg";

export const HeroSection = styled.section`
  padding-top: 200px;
  padding-bottom: 200px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  background-color: #d9d9d9;
  background-image: url(${photoWebp}), url(${photoJpg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const HeroLogo = styled.h1`
  font-family: "NEXT-ART_BOLD";
  font-size: 64px;
  line-height: 90px;
  color: #ffffff;
`;

export const HeroDescription = styled.p`
  font-family: "MontserratRegular";
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const ButtonText = styled.p`
  font-family: "MontserratRegular";
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`;
