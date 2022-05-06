const { getCurrentDate, getNextSeason, textMenu } = require("../utils")
const { media, mediaDetail, mediaDesc } = require("../anilist/media")
const { recommendations } = require("../anilist/recommendations")

function trendingAnime(ctx, page=0) {
	let title =  `📎 ANIME - TRENDING NOW 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"sort": ["TRENDING_DESC", "POPULARITY_DESC"]
	}

	media(ctx, title, variables, "trendingAnime")
}

function popularAnime(ctx, page=0) {
	let { year, season } = getCurrentDate()
	let title = `📎 ANIME - POPULAR THIS SEASON - (${season} ${year})📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"seasonYear": year, 
		"season": season,
		"sort": ["POPULARITY_DESC"]
	}

	media(ctx, title, variables, "popularAnime")
}

function upcomingAnime(ctx, page=0) {
	let { year, season } = getCurrentDate()
	season = getNextSeason(season, 1)
	let title = `📎 ANIME - UPCOMING NEXT SEASON - (${season} ${year})📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"seasonYear": year, 
		"season": season,
		"sort": ["POPULARITY_DESC"]
	}

	media(ctx, title, variables, "upcomingAnime")
}

function allTimePopulerAnime(ctx, page=0) {
	let title = `📎 ANIME - ALL TIME POPULAR 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"sort": ["POPULARITY_DESC"]
	}
	media(ctx, title, variables, "allTimePopulerAnime")
}

function top50Anime(ctx, page=0) {
	let title = `📎 ANIME - TOP 50 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"sort": ["SCORE_DESC"]
	}
	media(ctx, title, variables, "top50Anime")
}

function topMovies(ctx, page=0) {
	let title = `📎 ANIME - TOP MOVIE 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"format_in": ["MOVIE"],
		"sort": ["SCORE_DESC"]
	}
	media(ctx, title, variables, "topMovies")
}

function trendingManga(ctx, page=0) {
	let title =  `📎 MANGA - TRENDING NOW 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"sort": ["TRENDING_DESC", "POPULARITY_DESC"]
	}

	media(ctx, title, variables, "trendingManga")
}

function allTimePopulerManga(ctx, page=0) {
	let title = `📎 MANGA - ALL TIME POPULAR 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"sort": ["POPULARITY_DESC"]
	}

	media(ctx, title, variables, "allTimePopulerManga")
}

function popularManhwa(ctx, page=0) {
	let title = `📎 MANHWA - POPULAR 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"countryOfOrigin": "KR",
		"sort": ["SCORE_DESC"]
	}

	media(ctx, title, variables, "popularManhwa")
}

function top50Manga(ctx, page=0) {
	let title = `📎 MANGA - TOP 50 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"sort": ["SCORE_DESC"]
	}
	media(ctx, title, variables, "top50Manga")
}

function searchAnime(ctx, page=0, search) {
	if(search) {
		let title = `🔍 Search Anime: ${search}\n\n`
		let variables = {
			"page": page,
			"perPage": 10,
			"type": "ANIME",
			"sort": "SEARCH_MATCH",
			"search": search
		};
		media(ctx, title, variables, "searchAnime")
	}else {
		ctx.reply("Please input the title after command\nexample: /search_anime steins gate")
	}
}

function searchManga(ctx, page=0, search) {
	if(search){
		let title = `🔍 Search Manga: ${search}\n\n`
		let variables = {
			"page": page,
			"perPage": 10,
			"type": "MANGA",
			"sort": "SEARCH_MATCH",
			"search": search
		}
		media(ctx, title, variables, "searchManga")
	}else {
		ctx.reply("Please input the title after command\nexample: /search_manga one piece")
	}
}

function suggestions(ctx, page=0) {
	let title = `🗒 Recommendations\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"sort": "RATING_DESC"
	}
	recommendations(ctx, title, variables, "suggestions")
}

function detailSuggestion(ctx, mediaId) {
	mediaId = mediaId.split("|")

	for (let id of mediaId) {
		mediaDetail(ctx, { id: id }, "ANIME")
	}
}

function detailAnime(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	mediaDetail(ctx, variables, "ANIME")
}

function detailManga(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	mediaDetail(ctx, variables, "MANGA")
}

function closeDesc(ctx) {
	ctx.deleteMessage()
}

function readDesc(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	mediaDesc(ctx, variables)
}

function mainMenu(ctx) {
	ctx.editMessageText(textMenu())
}

module.exports = {
	trendingAnime,
	popularAnime,
	upcomingAnime,
	allTimePopulerAnime,
	top50Anime,
	topMovies,	
	trendingManga,
	allTimePopulerManga,
	popularManhwa,
	top50Manga,
	searchAnime,
	searchManga,
	suggestions,
	detailSuggestion,
	detailAnime,
	detailManga,
	closeDesc,
	readDesc,
	mainMenu
}