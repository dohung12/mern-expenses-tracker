import styled from 'styled-components';

const Wrapper = styled.section`
  margin-bottom: 0;
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .dashboard-page > :first-child {
    background-color: #fff;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }

  .dashboard > div {
    background-color: #e6f3f2;
  }
`;
export default Wrapper;
