const query = require("./query/query")
const api = require('./api')
const { Markup } = require('telegraf')

function anilist(ctx, title, variables, paging) {
	let { page, type } = variables

	api(query, variables)
		.then(data => {
			let {Page: {pageInfo, media} } = data
			let {currentPage, perPage, hasNextPage} = pageInfo

			let anilists = title
			let buttonDetailInfo = [ [], [], [] ]

			media.forEach((m , i) => {
				let number = i + 1 
				let listNumber = page == 1 || page == 0 ? i + 1 : ((page - 1) * perPage) + (i + 1)
				
				let template = Markup.button.callback(`${listNumber}`, `detail-${m.id}`)
				anilists += `${listNumber}. ${m.title.romaji}\n`

				if(number <= 5) {
					buttonDetailInfo[0].push(template)
				}else if(number > 5 && number <= 10) {
					buttonDetailInfo[1].push(template)
				}
			})

			anilists += `\nPage: ${currentPage}`

			if(currentPage != 1) {
				buttonDetailInfo[2].push(Markup.button.callback(`Prev Page ${currentPage - 1}`, `${paging}-${currentPage - 1}`))
			}

			if(hasNextPage) {
				buttonDetailInfo[2].push(Markup.button.callback(`Next Page ${currentPage + 1}`, `${paging}-${currentPage + 1}`))
			}

			if(page == 0) {
				ctx.reply(anilists, Markup.inlineKeyboard(buttonDetailInfo))
			}else {
				ctx.editMessageText(anilists, Markup.inlineKeyboard(buttonDetailInfo))
			}
		})
		.catch(err => {
			console.error(err)
			ctx.reply('Error when get data')
		})
}

module.exports = {
	anilist
}