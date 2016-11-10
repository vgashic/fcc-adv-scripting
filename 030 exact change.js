/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.
*/

var coinVal = {
	PENNY: 1,
	NICKEL: 5,
	DIME: 10,
	QUARTER: 25,
	FIVE: 500,
	ONE: 100,
	TEN: 1000,
	TWENTY: 2000,
	"ONE HUNDRED": 10000,
};

function checkCashRegister(price, cash, cid) {
	"use strict";

	var change = [];

	var cid100 = cid.map(function (x) {
		return [x[0], Math.round(x[1] * 100)];
	});

	//console.log(cid100);

	// Because of some rounding errors (e.g. 2.05 is like 2.04999999)
	var cashInRegister = cid.map(function (x) {
		return Math.round(x[1] * 100);
	});

	// todo: check how to properly reduce 2d array
	var totalCashInRegister = cashInRegister.reduce(function (prev, curr) {
		return prev + curr;
	}, 0);

	// debug
	//  console.log(cashInRegister);
	//  console.log(totalCashInRegister);

	var changeAmount = Math.round(cash * 100) - Math.round(price * 100);

	// debug
	console.log(changeAmount);
	// console.log(cid);

	if (changeAmount > totalCashInRegister) {
		return "Insufficient funds";
	} else if (changeAmount === totalCashInRegister) {
		return "Closed";
	} else {
		var changeRemains = changeAmount;
		// console.log(changeRemains > 0);

		while (changeRemains > 0) {
			for (var i = cid100.length - 1; i >= 0; i--) {
				//console.log(coinVal[cid[i][0]]);
				if (changeRemains >= coinVal[cid100[i][0]] && cid100[i][1] > 0) {
					changeRemains -= coinVal[cid100[i][0]];

					cid100[i][1] -= coinVal[cid100[i][0]];

					change.push([cid100[i][0], 1]);

					//console.log(changeRemains);
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