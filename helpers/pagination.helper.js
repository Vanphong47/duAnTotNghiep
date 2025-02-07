module.exports = (limitItem, query, count) => {
  const objectPagination = {
    currentPage: 1,
    limitItems: limitItem,
  };

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;
  objectPagination.sumPage = Math.ceil(count / objectPagination.limitItems);

  return objectPagination;
};
