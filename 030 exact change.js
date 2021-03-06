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

	;

	// Total number of bills in register
	// Used to avoid infinite loop if change can't be returned'
	var billsInRegister = cid100.reduce(function (prev, curr) {
		return prev + curr[1] / coinVal[curr[0]];
	}, 0);

	var totalCashInRegister = cid.reduce(function (prev, curr) {
		return prev + Math.round(curr[1] * 100);
	}, 0);


	var changeAmount = Math.round(cash * 100) - Math.round(price * 100);


	if (changeAmount > totalCashInRegister) {
		return "Insufficient Funds";
	} else if (changeAmount === totalCashInRegister) {
		return "Closed";
	} else {
		var changeRemains = changeAmount;

		// main logic
		var l = 0;
		while (changeRemains > 0 && l <= billsInRegister + 1) {
			l++;

			for (var i = cid100.length - 1; i >= 0; i--) {
				if (changeRemains >= coinVal[cid100[i][0]] && cid100[i][1] > 0) {
					changeRemains -= coinVal[cid100[i][0]];

					cid100[i][1] -= coinVal[cid100[i][0]];

					var found = false;

					for (var j = 0; j < change.length; j++) {
						if (change[j][0] == cid100[i][0]) {
							change[j][1] += coinVal[change[j][0]] / 100;
							found = true;
							break;
						}
					}
					if (!found) {
						change.push([cid100[i][0], coinVal[cid100[i][0]] / 100]);
					}


					break;
				} else {
					continue;
				}
			}
		}
		if (billsInRegister < l) {
			change = [];
			return "Insufficient Funds";
		}
	}

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


console.log(checkCashRegister(19.50, 20.00, [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.10],
	["QUARTER", 4.25],
	["ONE", 90.00],
	["FIVE", 55.00],
	["TEN", 20.00],
	["TWENTY", 60.00],
	["ONE HUNDRED", 100.00]
]));

/*
console.log(checkCashRegister(19.50, 20.00, [
	["PENNY", 0.01],
	["NICKEL", 0],
	["DIME", 0],
	["QUARTER", 0],
	["ONE", 1.00],
	["FIVE", 0],
	["TEN", 0],
	["TWENTY", 0],
	["ONE HUNDRED", 0]
]));
*/