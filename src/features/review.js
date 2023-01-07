const { reviews, reviewDetail } = require("../anilist/reviews")

function reviewByUsers(ctx, page=0) {
	let title = `🗒 Reviews\n\n`
	let variables = {
		"page": page,
		"perPage": 10,
		"sort": "ID_DESC"
	}
	reviews(ctx, title, variables, "reviewByUsers")
}

function detailReviewByUser(ctx, reviewId) {
	reviewDetail(ctx, {id: reviewId})
}

module.exports = {
	reviewByUsers,
	detailReviewByUser
}