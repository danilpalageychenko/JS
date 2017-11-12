
function getFriendlyNumbers(start,end) { 
	if (typeof start != "number" || typeof end != "number" || start < 0 || end < 0 || start > end) {
		return false;
	}
    else {       
        start = Math.floor(start);
        end = Math.floor(end);
    }
    
    function FriendlyNumbers(number) { 
        let s = 1; 
        let i = 1; 
        for (i = 2; i <= number/2; i++) {
            if ( number % i == 0) {
                s += i 
            }
        } 
        return s;
    }
    
    let arrFriendlyNumbers = []; 
    for (let j = start; j <= end; j++) {
        let k = FriendlyNumbers(j)
        if (k >= start && k <= end) {
            if (FriendlyNumbers(k) == j && k > j) {
                arrFriendlyNumbers.push([j,k])
            } 
        } 
    }
    return arrFriendlyNumbers;
}

module.exports = {
    firstName: 'Danil',
    secondName: 'Palageychenko',
    task: getFriendlyNumbers
}
