//.Global variables
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var shopTable = document.getElementById('beans-table');
var baristaTable = document.getElementById('baristas-table');
var shopCenters = [];
//object constuctor
function CampfireCoffee (locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundsPerCustomer) {
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundsPerCustomer = avgPoundsPerCustomer;
  this.customersPerHour = [];
  this.cupsPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.poundPackagesPerHour = [];
  this.beansPerHour = [];
  this.baristaPerHour = [];
  this.dailyCustomersTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeeded = 0;

  shopCenters.push(this);
};
//generating metoods
CampfireCoffee.prototype.calcCustomersPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i ++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.customersPerHour.push(customers);
    this.dailyCustomersTotal += customers;
  }
};
CampfireCoffee.prototype.calCupsPerHour = function(){
  for (var i = 0; i < hours.length; i ++) {
    var numCups = parseFloat((this.avgCupsPerCustomer * this.customersPerHour[i]).toFixed(1));
    this.cupsPerHour.push(numCups);
    this.dailyCupsTotal += numCups;
  }
};
CampfireCoffee.prototype.calBeansNeededForCupsPerHour = function(){
  for(var i = 0; i < hours.length; i ++){
    var beansNeeded = parseFloat((this.cupsPerHour[i] / 16).toFixed(1));
    this.beansNeededForCupsPerHour.push(beansNeeded);
  }
};
CampfireCoffee.prototype.calPoundPackagesPerHour = function(){
  for (var i = 0; i < hours.length; i++){
    var numBeans = parseFloat((this.avgPoundsPerCustomer * this.customersPerHour[i]).toFixed(1));
    console.log(numBeans);
    this.poundPackagesPerHour.push(numBeans);
    this.dailyPoundPackagesTotal += numBeans;
  }
};
CampfireCoffee.prototype.calcBeansPerHour = function(){
  for(var i = 0; i < hours.length; i ++){
    var beans = parseFloat((this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]).toFixed(1));
    this.beansPerHour.push(beans);
    this.dailyBeansNeeded += beans;
  }
};
CampfireCoffee.prototype.calcBaristaPerHour = function(){
  for(var i = 0; i < hours.length; i ++){
    var barista = Math.ceil(parseFloat(((this.cupsPerHour[i] * 2 + this.beansPerHour[i] * 2)) / 60).toFixed(1));//hrly total
    this.baristaPerHour.push(barista);
  }
};
CampfireCoffee.prototype.render = function() {
  this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
  this.calCupsPerHour();
  this.calBeansNeededForCupsPerHour();
  this.calPoundPackagesPerHour();
  this.calcBeansPerHour();
  this.makeRows();
};
// making table 1
function makeTableHeader() {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Total ';
  trElement.appendChild(thElement);

  for(var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  shopTable.appendChild(trElement);
}

CampfireCoffee.prototype.makeRows = function() {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.locationName;
  trElement.appendChild(tdElement);

  var tdElement = document.createElement('td');
  tdElement.textContent = parseFloat(this.dailyBeansNeeded.toFixed(1)); //Daily-Total
  console.log(this);
  trElement.appendChild(tdElement);

  for(var i = 0; i < hours.length; i++){
    var tdElement = document.createElement('td');
    tdElement.textContent = this.beansPerHour[i];
    trElement.appendChild(tdElement);
  }
  shopTable.appendChild(trElement);
};

function makeTotalsRow(){
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Total';
  trElement.appendChild(tdElement);

  var grandTotal = 0;
  for(var i = 0; i < shopCenters.length; i++ ){
    var grandSumTotal = Math.round(shopCenters[i].dailyBeansNeeded);
    grandTotal += grandSumTotal;
  }
  var tdElement = document.createElement('td');
  tdElement.textContent = grandTotal;
  trElement.appendChild(tdElement);

  var dTotal = 0;
  for(var i = 0; i < hours.length; i++){
    for(var j = 0; j < shopCenters.length; j++ ){
      dTotal += Math.round(shopCenters[j].beansPerHour[i]);
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = dTotal;
    trElement.appendChild(tdElement);
  }
  shopTable.appendChild(trElement);
}
var pike = new CampfireCoffee('Pike Market Place ', 14, 35, 1.2, 0.34);
var capitol = new CampfireCoffee('Capitol Hill ', 12,	28,	3.2, 0.03);
var spl = new CampfireCoffee('Seattle Public Library ',9,	45,	2.6	,0.02);
var southlake = new CampfireCoffee('South Lake Union ',5,	18,	1.3,	0.04);
var seatac = new CampfireCoffee('Sea-Tac Air Port', 28,	44,	1.1,	0.41);

makeTableHeader();
pike.render();
capitol.render();
spl.render();
southlake.render();
seatac.render();
makeTotalsRow();

//Making table 2
CampfireCoffee.prototype.render2 = function() {
  this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
  this.calCupsPerHour();
  this.calBeansNeededForCupsPerHour();
  this.calPoundPackagesPerHour();
  this.calcBeansPerHour();
  this.calcBaristaPerHour();
  this.makeBaristaRows();
};

function makeBaristaTableHeader() {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Total';
  trElement.appendChild(thElement);

  for(var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  baristaTable.appendChild(trElement);
}
CampfireCoffee.prototype.makeBaristaRows = function() {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.locationName;
  trElement.appendChild(tdElement);

  var tdElement = document.createElement('td');
  tdElement.textContent = Math.ceil(((parseFloat(this.dailyCupsTotal * 2) + parseFloat(this.dailyBeansNeeded * 2)) / 60).toFixed(1)) ; //Daily-Total
  console.log(this);
  trElement.appendChild(tdElement);

  for(var i = 0; i < hours.length; i++){
    var tdElement = document.createElement('td');
    tdElement.textContent = Math.ceil(parseFloat(((this.cupsPerHour[i] * 2 + this.beansPerHour[i] * 2)) / 60).toFixed(1));//hrly total
    trElement.appendChild(tdElement);
  }
  baristaTable.appendChild(trElement);
};

// /====================
function makeBaristaTotalsRow(){
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Total';
  trElement.appendChild(tdElement);

  var grandTotal = 0;
  for(var i = 0; i < shopCenters.length; i++ ){
    var grandSumTotal = Math.round((shopCenters[i].dailyCupsTotal + shopCenters[i].dailyBeansNeeded) / 60);
    grandTotal += grandSumTotal;
  }
  var tdElement = document.createElement('td');
  tdElement.textContent = grandTotal;
  trElement.appendChild(tdElement);

  var dTotal = 0;
  for(var i = 0; i < hours.length; i++){
    for(var j = 0; j < shopCenters.length; j++ ){
      dTotal += Math.round(shopCenters[j].beansPerHour[i]);
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = dTotal;
    trElement.appendChild(tdElement);
  }
  baristaTable.appendChild(trElement);
}
//=================
var pike = new CampfireCoffee('Pike Market Place ', 14, 35, 1.2, 0.34);
var capitol = new CampfireCoffee('Capitol Hill ', 12,	28,	3.2, 0.03);
var spl = new CampfireCoffee('Seattle Public Library ',9,	45,	2.6	,0.02);
var southlake = new CampfireCoffee('South Lake Union ',5,	18,	1.3,	0.04);
var seatac = new CampfireCoffee('Sea-Tac Air Port', 28,	44,	1.1,	0.41);

makeBaristaTableHeader();
pike.render2();
capitol.render2();
spl.render2();
southlake.render2();
seatac.render2();
makeBaristaTotalsRow();
