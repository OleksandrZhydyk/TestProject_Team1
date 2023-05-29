import styled from "styled-components";
import { Products } from "../../../models/productModels";
import ItemCart from "../ItemCart";

const NewArrivalsList = styled.ul`
  display: flex;
  margin-bottom: 100px;
`;

interface Props {
  products: Products | null;
}

export const NewArrivals: React.FC<Props> = ({ products }) => {

  if (!products?.results || products.results.length === 0) {
    return <p>No New Arrivals found.</p>;
  }

  return (
    <NewArrivalsList>
      {products.results.slice(3, 5).map(product => <ItemCart key={product.id} product={product} />)}
    </NewArrivalsList>
  );
};