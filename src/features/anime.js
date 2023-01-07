const { getCurrentDate, getNextSeason } = require("../utils")
const { media, mediaDetail } = require("../anilist/media")

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

function detailAnime(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	mediaDetail(ctx, variables, "ANIME")
}

module.exports = {
	trendingAnime,
	popularAnime,
	upcomingAnime,
	allTimePopulerAnime,
	top50Anime,
	topMovies,
	searchAnime,
	detailAnime
}