const { mediaDetail } = require("../anilist/media")
const { recommendations } = require("../anilist/recommendations")

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

module.exports = {
	suggestions,
	detailSuggestion
}