import styled from "styled-components";

import { Products } from "../../../models/productModels";
import ItemCart from "../ItemCart";

const BestsellersList = styled.ul`
  display: flex;
  margin-bottom: 100px;
`;

interface Props {
  products: Products | null;
}

export const Bestsellers: React.FC<Props> = ({ products }) => {

  if (!products?.results || products.results.length === 0) {
    return <p>No bestsellers found.</p>;
  }

  return (
    <BestsellersList>
      {products.results.slice(0, 3).map(product => <ItemCart key={product.id} product={product} />)}
    </BestsellersList>
  );
}