import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/store";
import Wrapper from "../components/ProductDetail/Wrapper";
import ImageContainer from "../components/ProductDetail/ImageContainer";
import ProductDescription from "../components/ProductDetail/ProductDescription";
import { useEffect } from "react";
import { getProductDetail } from "../store/slices/productsSlice";
import { useParams } from "react-router-dom";

const ProductCard = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const product = useAppSelector((state) => state.products.productDetail);
  const loading = useAppSelector((state) => state.products.loading);
  useEffect(() => {
    if (!product && slug) dispatch(getProductDetail(slug));
  }, [product, dispatch, slug]);
  if (loading) return <Loading>Loading...</Loading>;
  return (
    <Wrapper>
      <ImageContainer photos={product?.photos} />
      <ProductDescription product={product} />
    </Wrapper>
  );
};

export default ProductCard;

const Loading = styled.div`
  text-align: center;
  margin: 100px;
  font-size: 64px;
`;
