export const keyMirror = (list) => {
    let newList= {};
    Object.keys(list).map(element => {
      var key = String(element);
      newList[key] = element
    });
  return newList
  }

   