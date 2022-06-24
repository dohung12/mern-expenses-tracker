import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  hgroup {
    .amount {
      color: var(--primary);
      margin-bottom: 0;
    }
    .title {
      width: 100%;
      height: 3rem;
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    padding-top: 1rem;
    ul {
      margin: auto 0;
    }
    .btn-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      div {
        padding: 8px;
        height: fit-content;
      }
    }
  }
`;

export default Wrapper;
