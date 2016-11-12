/*
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.
*/

function updateInventory(currentStock, newDelivery) {
	"use strict";

	var newInventory = currentStock;

	// get list of items in stock
	var currentItemsList = currentStock.map(function (x) {
		return x[1];
	});

	// help array
	var newDeliveryItemsList = newDelivery.map(function (x) {
		return x[1];
	});

	// first update existing items
	for (var i = 0; i < newDeliveryItemsList.length; i++) {
		if (currentItemsList.indexOf(newDeliveryItemsList[i]) > -1) {
			newInventory[currentItemsList.indexOf(newDeliveryItemsList[i])][0] +=
				newDelivery[newDeliveryItemsList.indexOf(newDeliveryItemsList[i])][0];
		} else {
			continue;
		}
	}

	// then add missing items
	for (i = 0; i < newDelivery.length; i++) {
		if (currentItemsList.indexOf(newDelivery[i][1]) === -1) {
			newInventory.push(newDelivery[i]);
		} else {
			continue;
		}
	}

	// sort list
	newInventory = newInventory.sort(function (a, b) {
		return a[1] > b[1] ? 1 : -1;
	});

	// All inventory must be accounted for or you're fired!
	return newInventory;
}

// Example inventory lists
var curInv = [
	[21, "Bowling Ball"],
	[2, "Dirty Sock"],
	[1, "Hair Pin"],
	[5, "Microphone"]
];

var newInv = [
	[2, "Hair Pin"],
	[3, "Half-Eaten Apple"],
	[67, "Bowling Ball"],
	[7, "Toothpaste"]
];

console.log(updateInventory(curInv, newInv));