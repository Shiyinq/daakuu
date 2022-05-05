const api = require("./api")
const query = require("../query/queryRecommendations")

function recommendations(ctx, title, variables, paging) {
	let { page } = variables

	api(query, variables)
		.then(( {Page: {pageInfo: {currentPage, perPage, hasNextPage}, recommendations} }) => {

			let recommendationInfo = title
			let buttonDetailInfo = [ [], [], [] ]

			recommendations.forEach((r , i) => {
				let number = i + 1 
				let listNumber = page == 1 || page == 0 ? i + 1 : ((page - 1) * perPage) + (i + 1)

				let template = {"text": `${listNumber}`, "callback_data":  `detailSuggestion-${r.media.id}|${r.mediaRecommendation.id}`, "hide": false}
				recommendationInfo += `${listNumber}. Rating: +${r.rating}\n`
				recommendationInfo += `‣ ${r.media.title.romaji}\n`
				recommendationInfo += `‣ ${r.mediaRecommendation.title.romaji}\n\n`

				if(number <= 5) {
					buttonDetailInfo[0].push(template)
				}else if(number > 5 && number <= 10) {
					buttonDetailInfo[1].push(template)
				}
			})

			recommendationInfo += `\nPage: ${currentPage}`

			if(currentPage != 1) {
				buttonDetailInfo[2].push({"text": `⬅️ Prev Page ${currentPage - 1}`, "callback_data": `${paging}-${currentPage - 1}`, "hide": false})
			}

			buttonDetailInfo[2].push({"text": `🗒 Main Menu`, "callback_data": `mainMenu`, "hide": false})

			if(hasNextPage) {
				buttonDetailInfo[2].push({"text": `Next Page ${currentPage + 1} ➡️`, "callback_data": `${paging}-${currentPage + 1}`, "hide": false})
			}

			if(page == 0) {
				ctx.reply(recommendationInfo, {
					"reply_markup":{
						"inline_keyboard": buttonDetailInfo
					}
				})
			}else {
				ctx.editMessageText(recommendationInfo, {
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

module.exports = {
	recommendations
}