const { getCurrentDate, getNextSeason, textMenu } = require('../utils')
const { anilist, anilistDetail, anilistDesc } = require('../anilist')

function trendingAnime(ctx, page=0) {
	let title =  `📎 ANIME - TRENDING NOW 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"sort": ["TRENDING_DESC", "POPULARITY_DESC"]
	}

	anilist(ctx, title, variables, "trendingAnime")
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

	anilist(ctx, title, variables, "popularAnime")
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

	anilist(ctx, title, variables, "upcomingAnime")
}

function allTimePopulerAnime(ctx, page=0) {
	let title = `📎 ANIME - ALL TIME POPULAR 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"sort": ["POPULARITY_DESC"]
	}
	anilist(ctx, title, variables, "allTimePopulerAnime")
}

function top50Anime(ctx, page=0) {
	let title = `📎 ANIME - TOP 50 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"sort": ["SCORE_DESC"]
	}
	anilist(ctx, title, variables, "top50Anime")
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
	anilist(ctx, title, variables, "topMovies")
}

function detailAnime(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	anilistDetail(ctx, variables, 'ANIME')
}

function detailManga(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	anilistDetail(ctx, variables, 'MANGA')
}

function closeDesc(ctx) {
	ctx.deleteMessage()
}

function readDesc(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	anilistDesc(ctx, variables)
}

function trendingManga(ctx, page=0) {
	let title =  `📎 MANGA - TRENDING NOW 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"sort": ["TRENDING_DESC", "POPULARITY_DESC"]
	}

	anilist(ctx, title, variables, "trendingManga")
}

function allTimePopulerManga(ctx, page=0) {
	let title = `📎 MANGA - ALL TIME POPULAR 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"sort": ["POPULARITY_DESC"]
	}

	anilist(ctx, title, variables, "allTimePopulerManga")
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

	anilist(ctx, title, variables, "popularManhwa")
}

function top50Manga(ctx, page=0) {
	let title = `📎 MANGA - TOP 50 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "MANGA",
		"sort": ["SCORE_DESC"]
	}
	anilist(ctx, title, variables, "top50Manga")
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
	detailAnime,
	detailManga,
	closeDesc,
	readDesc,
	mainMenu,
	trendingManga,
	allTimePopulerManga,
	popularManhwa,
	top50Manga
}