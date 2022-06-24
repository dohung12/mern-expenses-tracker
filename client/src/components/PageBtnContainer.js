import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/Wrapper/PageBtnContainerWrapper';

const PageBtnContainer = ({ page, numOfPages, changePage }) => {
  const pages = Array.from(
    {
      length: numOfPages,
    },

    (_, index) => {
      return index + 1;
    }
  );

  const toPrevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }

    changePage(newPage);
  };

  const toNextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }

    changePage(newPage);
  };

  return (
    <Wrapper>
      <div
        role={'button'}
        className='prev-btn'
        onClick={() => {
          toPrevPage();
        }}
      >
        <HiChevronDoubleLeft color='#5d8aa8' />
        prev
      </div>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          // RENDER PAGE NUMBER WHEN
          const isRender =
            pageNumber <= 2 ||
            (pageNumber > page - 2 && pageNumber < page + 2) ||
            pageNumber > numOfPages - 2;

          if (isRender) {
            return (
              <button
                className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                key={pageNumber}
                onClick={() => {
                  changePage(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === page - 2 || pageNumber === page + 2) {
            return (
              <button className={'pageBtn'} key={pageNumber}>
                ...
              </button>
            );
          }
        })}
      </div>
      <div
        role={'button'}
        className='next-btn'
        onClick={() => {
          toNextPage();
        }}
      >
        <HiChevronDoubleRight color='#5d8aa8' />
        next
      </div>
    </Wrapper>
  );
};

export default PageBtnContainer;
