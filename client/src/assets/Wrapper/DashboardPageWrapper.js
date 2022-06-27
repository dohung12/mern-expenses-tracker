import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  background-color: transparent !important;
  flex-direction: column;

  .aside {
    background-color: #fff;
    border-radius: 0.5rem;
    height: fit-content;
    padding: 1rem;

    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 2rem;

    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    margin-bottom: 1rem;

    .select-date {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      flex-wrap: wrap;
      form,
      button {
        margin-bottom: 0;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: fit-content;
      .header {
        font-size: 5rem;
        margin-bottom: 0;
      }
      .total {
        color: var(--primary);
      }
      hgroup,
      hgroup > :last-child {
        margin-bottom: 0;
      }

      border-bottom: 1px solid var(--primary);
    }
  }

  .expenses {
    width: 100%;
  }

  @media (min-width: 992px) {
    flex-direction: row;

    .expenses {
      width: calc(100% - 300px);
    }

    .aside {
      width: 250px;
      flex-direction: column;

      .select-date {
        flex-direction: column;
      }
    }
  }
`;

export default Wrapper;
