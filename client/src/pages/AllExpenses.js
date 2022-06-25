import { useState, useEffect } from 'react';
import { ExpensesContainer, SearchContainer } from '../components/';
import { useGetCategories, useGetExpenses } from '../hooks';
import createSearchUrl from '../utils/createSearchUrl';

const initState = {
  title: '',
  category: 'all',
  incurred_on_date_from: '',
  incurred_on_time_from: '',
  incurred_on_from: '',
  incurred_on_date_to: '',
  incurred_on_time_to: '',
  incurred_on_to: '',
  amountFrom: 0,
  amountTo: 0,
  sort: 'latest',
  page: 1,
};

const AllExpenses = () => {
  const [values, setValues] = useState(initState);

  const setPage = (page) => {
    setValues({ ...values, page });
  };
  const getExpenses = useGetExpenses();
  const getCategories = useGetCategories();

  const setBackToDefault = () => {
    setValues(initState);
  };

  const {
    title,
    category,
    sort,
    incurred_on_from,
    incurred_on_to,
    amountFrom,
    amountTo,
    page,
  } = values;
  useEffect(() => {
    const url = createSearchUrl(values);
    getExpenses(url);
    getCategories();
  }, [
    page,
    title,
    category,
    sort,
    incurred_on_from,
    incurred_on_to,
    amountFrom,
    amountTo,
  ]);

  return (
    <>
      <SearchContainer
        setPage={setPage}
        values={values}
        setValues={setValues}
        setBackToDefault={setBackToDefault}
      />
      <ExpensesContainer page={values.page} setPage={setPage} />
    </>
  );
};

export default AllExpenses;
