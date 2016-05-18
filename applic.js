// Object constructor
// to create an array of hours.
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var shopTable = document.getElementById('beans-table');
var baristaTable = document.getElementById('baristas-table');
//to create object pike place
var shopCenters = [];

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

CampfireCoffee.prototype.render = function() {
  this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
  this.calCupsPerHour();
  this.calBeansNeededForCupsPerHour();
  this.calPoundPackagesPerHour();
  this.calcBeansPerHour();
  // call all of the other methods that calc data

  this.makeRows();
};

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
//++++++++++
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
    tdElement.textContent = this.beansPerHour[i];//hrly total
    trElement.appendChild(tdElement);
  }
  shopTable.appendChild(trElement);
};
function makeTableBottom() {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'Total';
  trElement.appendChild(thElement);

  var thElement = document.createElement('th');
  thElement.textContent = parseFloat(this.dailyBeansNeeded.toFixed(1));
  trElement.appendChild(thElement);

  for(var i = 0; i < hours.length; i++){
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  shopTable.appendChild(trElement);
}

makeTableHeader();
var pike = new CampfireCoffee('Pike Market Place ', 14, 35, 1.2, 0.34);
pike.render();
var capitol = new CampfireCoffee('Capitol Hill ', 12,	28,	3.2, 0.03);
capitol.render();
var spl = new CampfireCoffee('Seattle Public Library ',9,	45,	2.6	,0.02);
spl.render();
var southlake = new CampfireCoffee('South Lake Union ',5,	18,	1.3,	0.04);
southlake.render();
var seatac = new CampfireCoffee('Sea-Tac Air Port', 28,	44,	1.1,	0.41);
seatac.render();
