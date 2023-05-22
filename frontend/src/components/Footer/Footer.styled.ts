import styled from "styled-components";

export const FooterP = styled.footer`
  background: #e9e9e9;
  padding-bottom: 100px;
`;

export const ContF = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MobileDivCon = styled.div`
  margin-right: 150px;
`;

export const MobileAppSVG = styled.svg`
  width: 204px;
  height: 60px;
`;

export const InformationDivCon = styled.div`
  flex-grow: 1;
`;

export const TitleFooter = styled.h3`
  padding-top: 100px;
  font-family: "MontserratBold";
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 20px;
`;

export const InformationItem = styled.li`
  font-family: "MontserratRegular";
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ContactList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 160px;
  height: 100px;
  margin-bottom: 74px;
`;

export const ContactItem = styled.li`
  margin-right: 20px;

  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export const SocialSVG = styled.svg`
  width: 40px;
  height: 40px;
`;
