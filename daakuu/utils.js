function getSeason(month) {
	let season = null

	switch (month) {
		case 12:
		case 1:
		case 2:
			season = "WINTER"
			break
		case 3:
		case 4:
		case 5:
			season = "SPRING"
			break
		case 6:
		case 7:
		case 8:
			season = "SUMMER"
			break
		case 9:
		case 10:
		case 11:
			season = "FALL"
			break
		default:
			break;
	}

	return season
}

function getNextSeason(current, next) {
	let season = ["WINTER", "SPRING", "SUMMER", "FALL"]
  	let currentIndex = season.indexOf(current)
  
	if(next <= season.length) {
		let total = (currentIndex + 1 ) + next
		if(total > 4) {
			total = (total - season.length)
		}
		return season[total - 1]
   	}

	let nextSeason = ""
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

function getMonthString(month) {
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	return month ? months[month - 1] : "-"
}

function getDays(date) {
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	return date ? days[date] : "-"
}

function getCurrentDate() {
	let today = new Date();

	let year = today.getFullYear()
	let month = today.getMonth() + 1
	let monthString = getMonthString(month)
	let season = getSeason(month)
	let date = today.getDate()
	let day = getDays(today.getDay())

	return {
		year,
		month,
		monthString,
		season,
		date,
		day
	}
}

function getArgs(text) {
	text = text.trim().split(" ")
	text.splice(0, 1)
	text = text.join(" ")

	return text.replace(/\s+/g, " ")
}

function toCapitalize(string) {
	if (string == null){
		return "-"
	}
	
    string = string.replace(/_/g, " ").split(" ")
    let capitalize = []

    for(let i = 0; i < string.length; i++) {
        capitalize[i] = string[i][0].toUpperCase() + string[i].slice(1).toLowerCase()
    }
    
	return capitalize.join(" ")
}

function textMenu() {
	let menu = `
	📍Welcome to DaAKu
	
	🧭 Explore
	/search_anime <title>
	/search_manga <title>
	/recommendations
	/genres (soon)

	📺 Anime
	/trending_anime
	/popular_anime
	/upcoming_anime
	/all_time_populer_anime
	/top_50_anime
	/top_movies

	📚 Manga
	/trending_manga
	/all_time_populer_manga
	/popular_manhwa
	/top_50_manga
	
	😎 Figure
	/staff (soon)
	/characters (soon)

	🌐 Other
	/forum
	/reviews

	🏠 DaAKuu
	/menu
	/about

	source: anilist.co
	`
	return menu
}

module.exports = {
	getSeason,
	getCurrentDate,
	getNextSeason,
	getMonthString,
	getArgs,
	toCapitalize,
	textMenu
}