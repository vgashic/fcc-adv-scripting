/*
Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).
*/

function symDiff(arr1, arr2) {
	"use strict";

	var res = [];


	// Get all element from arr1 which don't exists in arr2
	for (var i = 0; i < arr1.length; i++) {

		if (arr2.indexOf(arr1[i]) == -1) {
			res.push(arr1[i]);
		}
	}

	// And vice versa
	for (var j = 0; j < arr2.length; j++) {

		if (arr1.indexOf(arr2[j]) == -1) {
			res.push(arr2[j]);
		}
	}

	return res;
}


function sym() {
	"use strict";

	var arr = Array.from(arguments);

	//console.log(arr);

	var res = arr.reduce(function (prev, curr) {
		return symDiff(prev, curr);
	});

	return res;
}

console.log(sym([1, 2, 5], [2, 3, 5], [3, 4, 5]));