// Bonus Questions
// Given an array arr of positive integers sorted in a strictly increasing order
// and an integer k. Return the kth positive integer that is missing from array.
// Input: arr = [2,3,4,7,11], k = 5   Output: 9
const findKthPositive = function (arr, k) {
    let missingCount = 0;
    let currentNum = 1;
    let arrIndex = 0;
    while (missingCount < k) {
        if (arr[arrIndex] === currentNum) {
            arrIndex++;
        } else {
            missingCount++;
        }
        currentNum++;
    }
    return currentNum - 1;
};
console.log(findKthPositive([1, 2, 3, 4], 2)); // 6