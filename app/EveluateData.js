/**
 * Created by stefka1210 on 17.12.15.
 */

var data = require('./adcapital.json');
var sumPoints;

/** TODO: Kurs heute gegen 6 Monate, gegen 1 Jahr, Kursmomentum, Analystemeinungen (datum für Q-Bericht), siehe examples/Aspiranten.jpg **/

/** check Eigenkapitalrendite und vergib entsprechende Punktzahl **/
if(data.hasOwnProperty('2014','Eigenkapitalrendite')){
    console.log('Eigenkapitalrendite = ' + data['2014']['Eigenkapitalrendite']);
    var ekr = data['2014']['Eigenkapitalrendite'];
    var ekrPoint = 0;

    ekr = parseFloat(ekr.replace(',','.', '%',''));

    console.log(ekr);

    if (ekr > 20) {
        ekrPoint = 1;
    } else if (ekr < 10) {
        ekrPoint = -1;
    } else {
        ekrPoint = 0;
    }
    console.log('Eigenkapitalrendite hat ' + ekrPoint + ' Punkt');
}
else {
    console.log('no ekr data');
}

/** check EBIT-Marge und vergib entsprechende Punktzahl **/
if(data.hasOwnProperty('2014','KGV')){
    console.log('EBIT-Marge = ' + data['2014']['EBIT-Marge']);
    var ebit = data['2015e']['EBIT-Marge'];
    var ebitPoint = 0;

    ebit = parseFloat(ebit.replace(',','.'));

    if (ebit > 12) {
        ebitPoint = 1;
    } else if (ebit < 6) {
        ebitPoint = -1;
    } else {
        ebitPoint = 0;
    }
    console.log('Ebit-Marge hat ' + ebitPoint + ' Punkt');
}
else {
    console.log('no ebit data');
}

/** check Eigenkapitalquote und vergib entsprechende Punktzahl **/
if(data.hasOwnProperty('2014','Eigenkapitalquote')){
    console.log('Eigenkapitalquote = ' + data['2014']['Eigenkapitalquote']);
    var ekq = data['2014']['Eigenkapitalquote'];
    var ekqPoint = 0;

    ekq = parseFloat(ekq.replace(',','.', '%',''));

    if (ekq > 25) {
        ekqPoint = 1;
    } else if (ekq < 15) {
        ekqPoint = -1;
    } else {
        ekqPoint = 0;
    }
    console.log('Eigenkapitalquote hat ' + ekqPoint + ' Punkt');
}
else {
    console.log('no ebit data');
}

/** check KGV und vergib entsprechende Punktzahl **/
if(data.hasOwnProperty('2015e','KGV')){
    console.log('KGV = ' + data['2015e']['KGV']);
    var kgv = data['2015e']['KGV'];
    var kgvPoint = 0;

    kgv = parseFloat(kgv.replace(',','.'));

    if (kgv < 12) {
        kgvPoint = 1;
    } else if (kgv > 16) {
        kgvPoint = -1;
    } else {
        kgvPoint = 0;
    }
    console.log('KGV hat ' + kgvPoint + ' Punkt');
}
else {
    console.log('no kgv data');
}

/** KGV-Durchschnitt, alle vorhanden KGVs addieren und durch Anzahl der vorhandenen KGVs teilen**/

var kgvAllFive = [data['2015e']['KGV'], data['2014']['KGV'], data['2013']['KGV'], data['2012']['KGV'], data['2011']['KGV']];

var kgvAllNumber = 0 ;
var kgvCount = 0;

for(var i=0;i<kgvAllFive.length;i++){
    if (kgvAllFive[i] != '-') {
        kgvAllFive[i] = parseFloat(kgvAllFive[i].replace(',','.'));
        kgvAllNumber = kgvAllNumber + kgvAllFive[i];
        kgvCount += 1;
    }
}

var kgvAverage = 0;
kgvAverage = kgvAllNumber / kgvCount;
var kgvAveragePoint = 0;

if (kgvAverage < 12) {
    kgvAveragePoint = 1;
} else if (kgvAverage > 16) {
    kgvAveragePoint = -1;
} else {
    kgvAveragePoint = 0;
}

console.log(kgvAllNumber + '/' + kgvCount + '=' + kgvAverage + 'Punktzahl: ' + kgvAveragePoint);

/** Gesamtpunktzahl **/
sumPoints = ekrPoint + ebitPoint + ekqPoint + kgvAveragePoint + kgvPoint;
console.log("Gesamtpunktzahl: " + sumPoints);




