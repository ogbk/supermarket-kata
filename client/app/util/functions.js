const getOnlyNumber = (value) => (
  Number(value.replace(/[^0-9+]/g, ''))
);

export { getOnlyNumber };
