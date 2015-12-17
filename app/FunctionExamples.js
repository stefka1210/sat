var Xray = require('x-ray');
var x = Xray();

/** TODO: Analystenmeinungen scrapen, siehe: "https://www.consorsbank.de/Wertpapierhandel/Aktien/Kurs-Snapshot/Analysen/Analystenmeinungen/DE0007664005-VOLKSWAGEN-AG;jsessionid=D7B92D30B878B7737FC03D6555C8C50A.app272" **/

function getKPIs(url, callback){
  x(url,
  {
    tables: x('article.KENNZAHLEN', {
      headers: x('thead', [{
        title: 'th',
        columnTitles: ['th.ZAHL']
      }]),
      contents: x('tbody', [{
        kpis: ['td.INFOTEXT'],
        values: ['td.ZAHL']
      }])
    })
  })(function(err, result) {
    var tables = result.tables;
    var headers = tables.headers;
    var contents = tables.contents;

    var years = [];
    for(var i=0;i<1/*headers.length*/;i++){
      var columnTitles = headers[i].columnTitles;
      for(var j=0;j<columnTitles.length;j++){
        var year = columnTitles[j].trim();
        years.push(year);
      }
    }

    var kpisPerYear = {};

    for(var i=0;i<contents.length;i++){
      var kpis = contents[i].kpis;
      var values = contents[i].values;
      var valuesPerKpi = values.length / kpis.length;


      for(var j=kpis.length-1; j>=0; j--){
        var kpi = kpis[j];

        for(var k=values.length-1; k>=j*valuesPerKpi; k--){
          var year = years[k-j*valuesPerKpi];
          if(year == undefined)
            continue;
          if(kpisPerYear[year] === undefined)
            kpisPerYear[year] = {};

          kpisPerYear[year][kpi] = values[k] && values[k].trim();

        }
      }
    }
    callback(kpisPerYear);
  });
}




function getRates(url, callback){
  x(url,
    {
      titles: ['th'],
      rows: x('tr', [{
        columns: x(['td'])
      }])
    }
  )(function(err, result) {
    var titles = result.titles;
    var rows = result.rows;

    var entriesPerDate = {};
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var columns = row.columns;

      var date = columns[0].trim();
      entriesPerDate[date] = {};
      for (var j = 1; j < columns.length; j++) {
        entriesPerDate[date][titles[j]] = columns[j].trim();
      }
    }

    callback(entriesPerDate);
  });
}



/********************************
Test
*********************************/

fs = require('fs');

getKPIs('http://www.onvista.de/aktien/fundamental/Volkswagen-VZ-Aktie-DE0007664039', function(result){
  //console.log(result);
  var output = JSON.stringify(result, null, 4);
  fs.writeFile('volkswagen.json', output , function (err) {
    if (err) return console.log(err);
  });
});

getKPIs('http://www.onvista.de/aktien/fundamental/ADCAPITAL-AG-Aktie-DE0005214506', function(result){
  //console.log(result);
  var output = JSON.stringify(result, null, 4);
  fs.writeFile('adcapital.json', output , function (err) {
    if (err) return console.log(err);
  });
});

getRates('http://www.onvista.de/onvista/times+sales/popup/historische-kurse/?notationId=9620569&dateStart=16.12.2014&interval=Y1&assetName=Volkswagen%20VZ&exchange=Tradegate', function(rates){
  console.log(rates);
});

