import styled from 'styled-components';

const Wrapper = styled.article`
  margin-top: 0;
  width: 60%;
  margin: auto;
  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    button {
      width: fit-content;
    }
  }
`;
export default Wrapper;
