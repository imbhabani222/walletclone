const SearchAndFilter = (data = {}, listData = []) => {
    if (Object.keys(data)?.length > 0 && listData?.length > 0) {
      const filterObject = { ...data };
      const { searchByKeyword = "" } = filterObject;
      const filteredArray = listData?.filter((rowData = {}) => {
        const record = { ...rowData };
        let shouldReturn = false;
        shouldReturn = Object.keys(filterObject)?.every(key => {
          if (
            record?.hasOwnProperty(key) &&
            Array.isArray(filterObject[key]) &&
            filterObject[key]?.length > 0
          ) {
            const isTrue = filterObject[key]?.includes(record[key]);
            return isTrue;
          }
          if (
            !record?.hasOwnProperty(key) &&
            Array.isArray(filterObject[key]) &&
            filterObject[key]?.length > 0
          ) {
            return false;
          }
          return true;
        });
        if (shouldReturn && searchByKeyword && searchByKeyword !== "") {
          const searchValue = searchByKeyword?.toString()?.toUpperCase()?.trim();
          shouldReturn = Object.keys(record)?.some(columnKey =>
            record[columnKey]?.toString()?.toUpperCase()?.includes(searchValue)
          );
        }
        return shouldReturn;
      });
      return filteredArray;
    }
    return [];
  };
  
  export default SearchAndFilter;