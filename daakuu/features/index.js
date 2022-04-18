const { anilist, anilistAnime } = require('../anilist')

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
	let title = `📎 ANIME - POPULAR THIS SEASON 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"seasonYear": 2022, 
		"season": "SPRING",
		"sort": ["POPULARITY_DESC"]
	}

	anilist(ctx, title, variables, "popularAnime")
}

function upcomingAnime(ctx, page=0) {
	let title = `📎 ANIME - UPCOMING NEXT SEASON 📈\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"type": "ANIME",
		"seasonYear": 2022, 
		"season": "SUMMER",
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
	let title = `ANIME`
	let variables = {
		id: mediaId
	}

	anilistAnime(ctx, variables)
}

function closeAnimeDetail(ctx) {
	ctx.deleteMessage()
}

function readDescAnime(ctx, mediaId) {

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
	readDescAnime
}