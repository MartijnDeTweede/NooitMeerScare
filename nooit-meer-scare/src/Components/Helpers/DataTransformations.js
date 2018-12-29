export const stringToFloat = (string) => {
  const result = parseFloat(string);

  if(result) {
    return result;
  }

return 0.00;
}

export const getCatagoriesWithSubCatagories = (entries) => {
  let catagories = {};
  console.log('entries in getCatagoriesWithSubCatagories: ', entries);
  entries.forEach(entry => {
    if(catagories[entry.category]) {
      catagories[entry.category] = [...catagories[entry.category], { type: entry.type, subcategory: entry.subcategory, selected: entry.selected, value: entry.value}];
    } else {
      catagories[entry.category] = [{type: entry.type, subcategory: entry.subcategory, selected: entry.selected, value: entry.value}]
    }
  });
return catagories;
}