import styled from 'styled-components';

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  .btn {
    height: fit-content;
    width: fit-content;
  }
  .grid {
    justify-items: center;
    @media (min-width: 992px) {
      grid-template-columns: auto 1fr;
    }
  }
`;

export default Wrapper;
