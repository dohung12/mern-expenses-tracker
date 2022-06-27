import React from 'react';
import CreateCategoryBlock from './CreateCategoryBlock';
import Wrapper from '../../assets/Wrapper/CategoriesContainerWrapper';
import DeleteCategoryBlock from './DeleteCategoryBlock';
import UpdateCategoryBlock from './UpdateCategoryBlock';

const CategoriesContainer = () => {
  return (
    <Wrapper open={true}>
      <summary>
        <h2 className='header'>Categories</h2>
      </summary>
      <CreateCategoryBlock />
      <DeleteCategoryBlock />
      <UpdateCategoryBlock />
    </Wrapper>
  );
};

export default CategoriesContainer;
