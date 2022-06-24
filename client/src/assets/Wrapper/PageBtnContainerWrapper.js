import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0;
  .btn-container {
    background: #dfe8ee;
    border-radius: 0.5rem;
    display: flex;
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary);
    transition: var(--transition);
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
  .active {
    background: var(--primary);
    color: #fff;
  }
  .prev-btn,
  .next-btn {
    height: 40px;
    background: #fff;
    border-color: transparent;
    border-radius: 0.5rem;
    color: var(--primary);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    margin: 0;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary);
    color: #fff;
  }
`;
export default Wrapper;
