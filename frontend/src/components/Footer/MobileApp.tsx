import React from "react";
import sprite from "../../images/svg-sprite/MobileAppSVG.svg";
import googlePlay from "../../images/svg-sprite/googleplay.svg";
import { MobileAppSVG, MobileDivCon, TitleFooter } from "./Footer.styled";

export const MobileApp: React.FC = () => {
  return (
    <MobileDivCon>
      <TitleFooter>Мобільний додаток</TitleFooter>
      <ul>
        <li>
          <img src={googlePlay} alt="googleplay" />
        </li>
        <li>
          <MobileAppSVG>
            <use href={sprite + "#appstore"}></use>
          </MobileAppSVG>
        </li>
        <li>
          <MobileAppSVG>
            <use href={sprite + "#appgallery"}></use>
          </MobileAppSVG>
        </li>
      </ul>
    </MobileDivCon>
  );
};
