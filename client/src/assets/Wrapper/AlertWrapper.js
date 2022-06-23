import styled from 'styled-components';

const Wrapper = styled.div`
  .alert {
    padding: 0.375rem 0.75rem;
    margin-bottom: 1rem;
    border-color: transparent;
    border-radius: var(--border-radius);
    text-align: center;
  }

  .alert-danger {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .alert-success {
    color: var(--green-dark);
    background: var(--green-light);
  }
`;
export default Wrapper;
