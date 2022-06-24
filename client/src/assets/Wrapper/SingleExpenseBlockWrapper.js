import styled from 'styled-components';

const Wrapper = styled.details`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  summary {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-direction: column;

    @media (min-width: 600px) {
      flex-direction: row;
    }

    .title {
      width: 100%;
      margin-bottom: 0;
      align-self: flex-end;
    }
    .amount {
      color: var(--primary);
      margin-bottom: 0;

      @media (min-width: 600px) {
        width: 200px;
        flex-direction: row;
      }
    }
  }

  .info {
    display: grid;
    grid-template-columns: 1fr auto;
    border-top: 1px solid #ccc;
    padding-top: 1rem;
    ul {
      margin: auto 0;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
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
