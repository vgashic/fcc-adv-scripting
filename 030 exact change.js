/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.
*/

var coinVal = {
	PENNY: 0.01,
	NICKEL: 0.05,
	DIME: 0.10,
	FIVE: 5.00,
	ONE: 1.00,
	TEN: 10.00,
	QUARTER: 0.25,
	TWENTY: 20.00,
	"ONE HUNDRED": 100.00,
};

function checkCashRegister(price, cash, cid) {
	"use strict";

	var change = [];

	// Because of some rounding errors (e.g. 2.05 is like 2.04999999)
	var cashInRegister = cid.map(function (x) {
		return Math.round(x[1] * 100);
	});

	// todo: check how to properly reduce 2d array
	var totalCashInRegister = cashInRegister.reduce(function (prev, curr) {
		return prev + curr;
	}, 0);

	// debug
	// console.log(cashInRegister);
	// console.log(totalCashInRegister);

	var changeAmount = cash - price;

	// debug
	// console.log(changeAmount);
	// console.log(cid);

	if (changeAmount > totalCashInRegister) {
		return "Insufficient funds";
	} else if (changeAmount === totalCashInRegister) {
		return "Closed";
	} else {
		var changeRemains = changeAmount;
		// console.log(changeRemains > 0);

		while (changeRemains > 0) {
			for (var i = cid.length - 1; i >= 0; i--) {
				//console.log(coinVal[cid[i][0]]);
				if (changeRemains >= coinVal[cid[i][0]]) {
					changeRemains -= coinVal[cid[i][0]];

					cid[i][1] -= coinVal[cid[i][0]];

					change.push([cid[i][0], 1]);
					console.log(changeRemains);
					break;
				} else {
					continue;
				}
			}
		}
	}

	// Here is your change, ma'am.
	console.log(change);
	//console.log(cid);
	return change;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

/*
checkCashRegister(19.50, 20.00, [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.10],
	["QUARTER", 4.25],
	["ONE", 90.00],
	["FIVE", 55.00],
	["TEN", 20.00],
	["TWENTY", 60.00],
	["ONE HUNDRED", 100.00]
]);
*/

checkCashRegister(3.26, 100.00, [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.10],
	["QUARTER", 4.25],
	["ONE", 90.00],
	["FIVE", 55.00],
	["TEN", 20.00],
	["TWENTY", 60.00],
	["ONE HUNDRED", 100.00]
])