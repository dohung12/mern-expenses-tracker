import styled from 'styled-components';

const Wrapper = styled.details`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  summary {
    display: grid;
    grid-template-columns: 200px 1fr auto;
    gap: 1rem;
    .title {
      margin-bottom: 0;
    }
    .amount {
      color: var(--primary);
      margin-bottom: 0;
    }
  }

  .info {
    display: grid;
    grid-template-columns: 1fr auto;
    border-top: 1px solid #ccc;
    padding-top: 1rem;
    ul {
      margin-bottom: 0;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 0.5rem;

      div {
        padding: 8px;
        height: fit-content;
      }
    }
  }
`;

export default Wrapper;
