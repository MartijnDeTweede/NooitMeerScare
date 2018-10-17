export const stringToFloat = (string) => {
  const result = parseFloat(string);

  if(result) {
    return result;
  }

return 0.00;
}