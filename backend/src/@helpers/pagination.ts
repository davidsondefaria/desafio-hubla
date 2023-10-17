export interface PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: { field: string; by: 'ASC' | 'DESC' };
}

export function getDefaultPagination(query): PaginateQuery {
  let sortBy;
  if (query.sortBy) {
    const _sortBy = query.sortBy.split(':');
    sortBy = { field: _sortBy[0], by: _sortBy[1].toUpperCase() };
  }
  return {
    page: +query.page || 1,
    limit: +query.limit || 10,
    ...(query.sortBy && { sortBy }),
  };
}
