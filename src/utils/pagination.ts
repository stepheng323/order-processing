export const getPaginationMetadata = ({
  perPage,
  page,
  total,
}: {
  perPage: number;
  page: number;
  total: number;
}) => {
  const lastPage = total > +perPage ? Math.ceil(total / +perPage) : page;
  const nextPage = Math.ceil(total / +perPage) <= page ? null : +page + 1;
  const previousPage = +page === 1 ? null : +page - 1;

  return {
    total,
    per_page: perPage,
    current_page: page,
    first_page: 1,
    last_page: lastPage,
    has_total: true,
    has_more_pages: page !== lastPage,
    next_page: nextPage,
    previous_page: previousPage,
    first_page_url: '/?page=1',
    last_page_url: `/?page=${lastPage}`,
    next_page_url: nextPage ? `/?page=${nextPage}` : null,
    previous_page_url: previousPage ? `/?page=${previousPage}` : null,
  };
};
