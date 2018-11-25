export default class CsvHelper {

  static CSVtoArray(csv) {
    const objPattern = new RegExp((
      // Delimiters.
      '(\\' + ',' + '|\\r?\\n|\\r|^)' +
      // Quoted fields.
      '(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|' +
      // Standard fields.
      '([^\"\\' + ',' + '\\r\\n]*))'), 'gi');
    const arrData = [[]];
    let arrMatches = null;
    while (arrMatches = objPattern.exec(csv)) {
      const strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && (strMatchedDelimiter !== ',')) {
        arrData.push([]);
      }
      let strMatchedValue;
      if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(
          new RegExp('\"\"', 'g'), '\"');
      } else {
        strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    if (arrData[arrData.length - 1].length === 0) {
      arrData.splice(arrData.length - 1, 1);
    }
    return arrData;
  }
}
