function createSearchUrl({
  title = '',
  sort = 'latest',
  category = 'all',
  incurred_on_from = '',
  incurred_on_to = '',
  amountFrom = 0,
  amountTo = 0,
  page = 1,
}) {
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
  return url;
}

export default createSearchUrl;
