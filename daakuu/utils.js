function getSeason(month) {
	let season = null

	switch (month) {
		case 12:
		case 1:
		case 2:
			season = 'WINTER'
			break
		case 3:
		case 4:
		case 5:
			season = 'SPRING'
			break
		case 6:
		case 7:
		case 8:
			season = 'SUMMER'
			break
		case 9:
		case 10:
		case 11:
			season = 'FALL'
			break
		default:
			break;
	}

	return season
}

function getNextSeason(current, next) {
	let season = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
  	let currentIndex = season.indexOf(current)
  
	if(next <= season.length) {
		let total = (currentIndex + 1 ) + next
		if(total > 4) {
			total = (total - season.length)
		}
		return season[total - 1]
   	}

	let nextSeason = ''
  	let curentNext = next
  
  	for(let i = currentIndex + 1; i <= next; i++) {
		if(i < season.length) {
			nextSeason = season[i]
			curentNext--
		}else {
			i = 0
			nextSeason = season[i]
			curentNext--
			next = curentNext
		}
 	}
  
  	return nextSeason
}

function getCurrentDate() {
	let today = new Date();

	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	let year = today.getFullYear()
	let month = today.getMonth()
	let monthString = months[month]
	let season = getSeason(month + 1)
	let date = today.getDate()
	let day = days[today.getDay()]

	return {
		year,
		month,
		monthString,
		season,
		date,
		day
	}
}

module.exports = {
	getSeason,
	getCurrentDate,
	getNextSeason
}