import styled from 'styled-components';

const Wrapper = styled.main`
  margin-top: 2rem;

  .img-block {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }

  hgroup {
    text-align: center;
    margin: auto;
  }
`;
export default Wrapper;
