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
    if(catagories[mutation.catagory]) {      
      catagories[mutation.catagory] = [...catagories[mutation.catagory], {subcatagory: mutation.subcatagory, selected: mutation.selected}];
    } else {
      catagories[mutation.catagory] = [{subcatagory: mutation.subcatagory, selected: mutation.selected}]
    }
  });
return catagories;
}