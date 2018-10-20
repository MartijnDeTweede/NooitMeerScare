export const stringToFloat = (string) => {
  const result = parseFloat(string);

  if(result) {
    return result;
  }

return 0.00;
}

export const getCatagoriesWithSubCatagories = (balanceMutation) => {
  let catagories = {};

  balanceMutation.forEach(mutation => {
    if(catagories[mutation.category]) {
      catagories[mutation.category] = [...catagories[mutation.category], {subcategory: mutation.subcategory, selected: mutation.selected, value: mutation.value}];
    } else {
      catagories[mutation.category] = [{subcategory: mutation.subcategory, selected: mutation.selected, value: mutation.value}]
    }
  });
return catagories;
}