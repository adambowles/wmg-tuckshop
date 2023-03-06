const formatCost = (value: number = 0): string => {
  return `£${(value / 100).toFixed(2)}`;
};

export default formatCost;
