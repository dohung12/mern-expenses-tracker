import { useState, useEffect } from 'react';
import { ExpensesContainer, SearchContainer } from '../components/';
import { useGetCategories, useGetExpenses } from '../hooks';

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
};

const AllExpenses = () => {
  const [page, setPage] = useState(1);
  const [values, setValues] = useState(initState);

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
  } = values;
  useEffect(() => {
    let url = `/expenses?page=${page}&title=${title}&category=${category}&sort=${sort}`;
    if (incurred_on_from) {
      url += `&incurred_on_from=${incurred_on_from}`;
    }
    if (incurred_on_to) {
      url += `&incurred_on_to=${incurred_on_to}`;
    }
    if (amountFrom) {
      url += `&amount_from=${amountFrom}`;
    }
    if (amountTo) {
      url += `&amount_to=${amountTo}`;
    }

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
      <ExpensesContainer page={page} setPage={setPage} />
    </>
  );
};

export default AllExpenses;
