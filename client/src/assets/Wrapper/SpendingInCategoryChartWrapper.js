import styled from 'styled-components';
const Wrapper = styled.div`
  margin-top: 1rem;

  .chart-legend {
    text-align: center;
    margin-bottom: 0;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    margin-bottom: 0;
    button {
      width: auto;
      height: fit-content;
    }

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }
`;
export default Wrapper;
