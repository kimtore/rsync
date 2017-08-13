export default (times: number, func: Function): any[] => {
  const results = [];
  for (let i = 0; i < times; i++) {
    results.push(func(i));
  }
  return results;
};
