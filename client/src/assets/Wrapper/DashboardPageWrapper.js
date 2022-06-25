import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  background-color: transparent !important;

  .aside {
    width: 250px;
    height: fit-content;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    gap: 2rem;
    padding: 1rem;

    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    margin-bottom: 1rem;

    .select-date {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      input {
        /* width: fit-content; */
      }

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
    width: calc(100% - 300px);
  }
`;

export default Wrapper;
