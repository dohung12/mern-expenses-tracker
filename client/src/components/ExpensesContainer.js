import { useAppContext } from '../context/appContext';
import { SingleExpense } from './index';
import { PageBtnContainer } from './index';
import Wrapper from '../assets/Wrapper/ExpensesContainerWrapper';

const ExpensesContainer = ({ page, setPage }) => {
  const { state } = useAppContext();
  return (
    <>
      {state.count === 0 && <h1>No expenses to display</h1>}
      <h4>
        {state.count} Expense{state.count > 1 ? 's' : ''} Found
      </h4>
      <PageBtnContainer
        numOfPages={state.numOfPages}
        page={page}
        changePage={setPage}
      />
      <Wrapper>
        {state.count > 0 &&
          state.expenses.map((expense) => {
            return <SingleExpense key={expense._id} {...expense} />;
          })}
      </Wrapper>
    </>
  );
};

export default ExpensesContainer;
