import styled from 'styled-components';
const Wrapper = styled.main`
  margin-top: 2rem;
  height: calc(100vh - 4rem);
  overflow: hidden;

  .img-block {
    img {
      height: 50%;
      margin: auto;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
  }

  hgroup {
    text-align: center;
    margin: auto;
  }
`;
export default Wrapper;
