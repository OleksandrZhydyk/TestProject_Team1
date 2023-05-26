import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  margin: 25px 352px;
  padding: 20px;
`;

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
