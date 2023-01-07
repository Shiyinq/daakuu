const api = require("./api")
const query = require("../query/queryReviews")

function reviews(ctx, title, variables, paging) {
	let { page } = variables

	api(query, variables)
		.then(( {Page: {pageInfo: {currentPage, perPage, hasNextPage}, reviews} }) => {

			let reviewsInfo = title
			let buttonDetailInfo = [ [], [], [] ]

			reviews.forEach((r , i) => {
				let number = i + 1 
				let listNumber = page == 1 || page == 0 ? i + 1 : ((page - 1) * perPage) + (i + 1)

				let template = {"text": `${listNumber}`, "callback_data":  `detailReviewByUser-${r.id}`, "hide": false}
				reviewsInfo += `${listNumber}. ${r.media.title.romaji} - 👍 +${r.rating}\n`
				reviewsInfo += `by: ${r.user.name}\n\n`

				if(number <= 5) {
					buttonDetailInfo[0].push(template)
				}else if(number > 5 && number <= 10) {
					buttonDetailInfo[1].push(template)
				}
			})

			reviewsInfo += `\nPage: ${currentPage}`

			if(currentPage != 1) {
				buttonDetailInfo[2].push({"text": `⬅️ Prev Page ${currentPage - 1}`, "callback_data": `${paging}-${currentPage - 1}`, "hide": false})
			}

			buttonDetailInfo[2].push({"text": `🗒 Main Menu`, "callback_data": `mainMenu`, "hide": false})

			if(hasNextPage) {
				buttonDetailInfo[2].push({"text": `Next Page ${currentPage + 1} ➡️`, "callback_data": `${paging}-${currentPage + 1}`, "hide": false})
			}

			if(page == 0) {
				ctx.reply(reviewsInfo, {
					"reply_markup":{
						"inline_keyboard": buttonDetailInfo
					}
				})
			}else {
				ctx.editMessageText(reviewsInfo, {
					"reply_markup":{
						"inline_keyboard": buttonDetailInfo
					}
				})
			}
		})
		.catch(err => {
			console.error(err)
			ctx.reply("Error when get data")
		})
}

function reviewDetail(ctx, variables) {
	api(query, variables)
		.then(( {Page: {reviews} }) => {
			detail = `${reviews[0].media.title.romaji} - 👍 +${reviews[0].rating}\n\nSummary:\n${reviews[0].summary}\n\nby:${reviews[0].user.name}`
			ctx.reply(
				detail,
				{
					"reply_markup":{
						"inline_keyboard":[
							[{"text":"🖇 Read On Web", "url": "https://anilist.co/review/" + reviews[0].id, "hide":false}],
							[{"text":"❌ Close", "callback_data": "closeDesc", "hide":false}]
						]}
				}
			)
		})
		.catch(err => {
			console.error(err)
			ctx.reply("Error when detail get data")
		})
}

module.exports = {
	reviews,
	reviewDetail
}