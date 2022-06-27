import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  border-radius: 0.5rem;
  background-color: #fff;
  width: 80%;
  margin: auto;
  text-transform: capitalize;
  h2 {
    margin-bottom: 1rem;
  }
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

export default Wrapper;
