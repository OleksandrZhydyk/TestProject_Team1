import React from "react";
import {
  InformationDivCon,
  InformationItem,
  TitleFooter,
} from "./Footer.styled";

export const Information: React.FC = () => {
  return (
    <InformationDivCon>
      <TitleFooter>Інформація</TitleFooter>
      <ul>
        <InformationItem>Доставка та оплата</InformationItem>
        <InformationItem>Повернення та обмін</InformationItem>
        <InformationItem>Визначення розміру</InformationItem>
        <InformationItem>Політика конфіденційності</InformationItem>
      </ul>
    </InformationDivCon>
  );
};
