import { useState } from 'react';
import { FormRow } from './index';

import styled from 'styled-components';
const Wrapper = styled.div`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 5px;
  margin-bottom: 2rem;
`;

const initState = {
  search: '',
  category: '',
};

const SearchContainer = () => {
  return (
    <Wrapper>
      <header>
        <h2>Search Form</h2>
      </header>

      <form action=''>
        <FormRow />
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
