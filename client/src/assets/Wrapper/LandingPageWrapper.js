import styled from 'styled-components';

const Wrapper = styled.main`
  padding-top: 90px;

  img {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }
`;

export default Wrapper;
