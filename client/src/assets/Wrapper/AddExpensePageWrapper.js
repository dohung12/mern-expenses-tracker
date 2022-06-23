import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 3rem;
  border-radius: 0.5rem;
  background-color: #fff;
  width: 80%;
  margin: auto;
  label {
    text-transform: capitalize;
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

export default Wrapper;
