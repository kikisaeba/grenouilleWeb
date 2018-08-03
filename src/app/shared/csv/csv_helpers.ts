export default class CsvHelper {

  static CSVtoArray(csv) {
    let objPattern = new RegExp((
      // Delimiters.
      "(\\" + "," + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + "," + "\\r\\n]*))"), "gi");
    let arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(csv)) {
      var strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && (strMatchedDelimiter != ",")) {
        arrData.push([]);
      }
      if (arrMatches[2]) {
        let strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"), "\"");
      } else {
        var strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    if (arrData[arrData.length - 1].length == 0) {
      arrData.splice(arrData.length - 1, 1);
    }
    return arrData;
  }
}
