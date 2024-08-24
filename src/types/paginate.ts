export type PaginationMetaData = {
  per_page: number;
  current_page: number;
  first_page: number;
  last_page: number;
  has_total: boolean;
  has_more_pages: boolean;
  next_page: number;
  previous_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  previous_page_url: string;
};
