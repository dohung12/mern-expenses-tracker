import styled from 'styled-components';
const Wrapper = styled.details`
  padding: 2rem 2.5rem;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 5px;
  margin-bottom: 2rem;
  text-transform: capitalize;

  summary {
    border-bottom: 2px solid var(--primary);
    .header {
      display: inline-block;
      margin-bottom: 1rem;
    }
    ::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons  Inc. --%3E%3Cpath d='M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM358.6 278.6l-112 112c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L290.8 256L201.4 166.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l112 112C364.9 239.6 368 247.8 368 256S364.9 272.4 358.6 278.6z'/%3E%3C/svg%3E");
      background-size: 1.5rem auto;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .header,
  form {
    margin-bottom: 0;
  }
`;

export default Wrapper;
