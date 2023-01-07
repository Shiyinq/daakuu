const { media, mediaDetail } = require("../anilist/media")

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

function detailManga(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	mediaDetail(ctx, variables, "MANGA")
}

module.exports = {
	trendingManga,
	allTimePopulerManga,
	popularManhwa,
	top50Manga,
	searchManga,
	detailManga
}