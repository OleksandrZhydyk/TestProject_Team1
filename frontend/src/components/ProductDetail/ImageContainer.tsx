import { useState } from "react";
import styled from "styled-components";
import { Photo } from "../../models/productModels";

const StyledImageContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.img`
  width: 570px;
  height: 570px;
`;

const SecondaryImages = styled.div`
  display: flex;
  gap: 20px;
  max-width: 570px;
  margin: 20px 0;
`;

const SingleSecondaryImage = styled.img`
  height: 100px;
  width: 100px;
  cursor: pointer;
`;

interface Props {
  photos: Photo[] | undefined;
}

const ImageContainer = ({ photos }: Props) => {
  const mainImg = () => {
    if (photos) return photos[0].image;
  };
  const image = mainImg();
  const [mainImage, setMainImage] = useState(image);
  return (
    <StyledImageContainer>
      <MainImage src={mainImage} />
      <SecondaryImages>
        {photos?.map((photo) => (
          <SingleSecondaryImage
            key={photo.image}
            onClick={() => setMainImage(photo.image)}
            src={photo.image}
          />
        ))}
      </SecondaryImages>
    </StyledImageContainer>
  );
};

export default ImageContainer;
