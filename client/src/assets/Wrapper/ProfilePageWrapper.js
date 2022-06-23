import styled from 'styled-components';
const Wrapper = styled.section`
  padding: 3rem;
  width: 600px;
  margin: auto;
  background-color: #fff;
  border-radius: 0.5rem;

  .img-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    gap: 1rem;
    img {
      width: 50%;
      border-radius: 0.5rem;
      border: 1px solid #ccc;
    }
  }

  #email {
    cursor: not-allowed;
  }
`;
export default Wrapper;
