const { getCurrentDate, getNextSeason } = require('../utils')
const { anilist, anilistAnime, anilistAnimeDesc } = require('../anilist')

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

	anilistAnime(ctx, variables)
}

function closeAnimeDetail(ctx) {
	ctx.deleteMessage()
}

function readAnimeDesc(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	anilistAnimeDesc(ctx, variables)
}

function mainMenu(ctx) {
	ctx.editMessageText(`
	Welcome To DaAKu

	/trending_anime
	/popular_anime
	/upcoming_anime
	/all_time_populer_anime
	/top_50_anime
	/top_movies
	`)
}

module.exports = {
	trendingAnime,
	popularAnime,
	upcomingAnime,
	allTimePopulerAnime,
	top50Anime,
	topMovies,
	detailAnime,
	closeAnimeDetail,
	readAnimeDesc,
	mainMenu
}