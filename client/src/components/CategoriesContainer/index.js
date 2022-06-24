import React from 'react';
import CreateCategoryBlock from './CreateCategoryBlock';
import Wrapper from '../../assets/Wrapper/CategoriesContainerWrapper';
const CategoriesContainer = () => {
  return (
    <Wrapper>
      <summary>
        <h2 className='header'>Categories</h2>
      </summary>
      {/* add new category block */}
      <CreateCategoryBlock />
    </Wrapper>
  );
};

export default CategoriesContainer;
