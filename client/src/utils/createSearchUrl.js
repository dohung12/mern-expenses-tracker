function createSearchUrl({
  title,
  sort,
  category,
  incurred_on_from,
  incurred_on_to,
  amountFrom,
  amountTo,
  page,
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
