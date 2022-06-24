import styled from 'styled-components';

const Wrapper = styled.details`
  width: 80%;
  border-radius: 0.5rem;
  background-color: #fff;

  margin: auto;
  margin-top: 1rem;
  padding: 3rem;

  .header {
    margin-bottom: 0;
    display: inline-block;
  }

  .new-category,
  .delete-category {
    .header {
      margin-bottom: 0.5rem;
    }

    form {
      display: flex;
      gap: 1rem;
    }
    button {
      width: auto;
    }
  }

  .update-category {
    .header {
      margin-bottom: 0.5rem;
    }

    .new-content {
      display: flex;
      gap: 1rem;
    }
    button {
      width: fit-content;
    }
  }
`;

export default Wrapper;
