const api = require("./api")
const query = require("../query/queryMedia")
const { getMonthString, toCapitalize } = require("../utils")
const TurndownService = require("turndown")
const  turndownService = new TurndownService()

function media(ctx, title, variables, paging) {
	let { page, type, search } = variables

	api(query, variables)
		.then(( {Page: {pageInfo: {currentPage, perPage, hasNextPage}, media} }) => {

			let mediaInfo = title
			let buttonDetailInfo = [ [], [], [] ]

			media.forEach((m , i) => {
				let number = i + 1 
				let listNumber = page == 1 || page == 0 ? i + 1 : ((page - 1) * perPage) + (i + 1)
				
				type = type.toLowerCase()
				type = type.charAt(0).toUpperCase() + type.slice(1)

				let template = {"text": `${listNumber}`, "callback_data":  `detail${type}-${m.id}`, "hide": false}
				mediaInfo += `${listNumber}. ${m.title.romaji} ${m.meanScore ? "- Score: " + m.meanScore + "%" : ""}\n`

				if(number <= 5) {
					buttonDetailInfo[0].push(template)
				}else if(number > 5 && number <= 10) {
					buttonDetailInfo[1].push(template)
				}
			})

			mediaInfo += `\nPage: ${currentPage}`

			if(currentPage != 1) {
				buttonDetailInfo[2].push({"text": `⬅️ Prev Page ${currentPage - 1}`, "callback_data": `${paging}-${currentPage - 1}-${search}`, "hide": false})
			}

			buttonDetailInfo[2].push({"text": `🗒 Main Menu`, "callback_data": `mainMenu`, "hide": false})

			if(hasNextPage) {
				buttonDetailInfo[2].push({"text": `Next Page ${currentPage + 1} ➡️`, "callback_data": `${paging}-${currentPage + 1}-${search}`, "hide": false})
			}

			if(page == 0) {
				ctx.reply(mediaInfo, {
					"reply_markup":{
						"inline_keyboard": buttonDetailInfo
					}
				})
			}else {
				ctx.editMessageText(mediaInfo, {
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

function mediaDetail(ctx, variables, type) {
	api(query, variables)
		.then(( { Page: { media } }) => {
			let [{
				id,
				title: { romaji }, 
				coverImage: { extraLarge }, 
				format,
				episodes,
				duration,
				status,
				startDate: {year, month, day},
				chapters, 
				season,
				meanScore,
				studios: { nodes }, 
				source,
				genres,
				siteUrl
			}] = media

			let detail = ""
			switch (type) {
				case "ANIME":
					detail = `
					📌 ${romaji}\n\nFormat: ${format}\nEpisodes: ${episodes ? episodes : "-"}\nDuration: ${duration ? duration : "-"}\nStatus: ${toCapitalize(status)}\nRelease Date : ${getMonthString(month)}${day ? " "+day : ""}, ${year ? year : ""}\nSeason: ${toCapitalize(season)}\nMean Score: ${meanScore ? meanScore + "%" : "-"}\nStudios: ${nodes.length > 0 ? nodes[0].name : "-"}\nSource: ${toCapitalize(source)}\nGenres: ${genres.join(",")}
					`
					break;
				case "MANGA":
					detail = `
					📌 ${romaji}\n\nFormat: ${toCapitalize(format)}\nChapters: ${chapters ? chapters : "-"}\nStatus: ${toCapitalize(status)}\nRelease Date : ${getMonthString(month)}${day ? " "+day : ""}, ${year ? year : ""}\nSource: ${toCapitalize(source)}\nGenres: ${genres.join(",")} 
					`
					break;
				default:
					break;
			}
		
			ctx.replyWithPhoto({ url: extraLarge },
				{
					caption: detail,
					"reply_markup":{
						"inline_keyboard":[
							[{"text":"📖 Read Description", "callback_data": `readDesc-${id}`, "hide":false}],
							[{"text":"🖇 Open On Web", "url": siteUrl, "hide":false}],
							[{"text":"❌ Close", "callback_data": "closeDesc", "hide":false}]
						]}
				}
			)
		})
		.catch(err => {
			console.log(err)
			ctx.reply("Error when get Anime")
		})
}

function mediaDesc(ctx, variables) {
	api(query, variables)
		.then(( { Page: { media } }) => {
			let [{
				title: { romaji },
				siteUrl,
				description
			}] = media

			ctx.reply(
				romaji + "\n\n" + turndownService.turndown(description),
				{
					"reply_markup":{
						"inline_keyboard":[
							[{"text":"🖇 Open On Web", "url": siteUrl, "hide":false}],
							[{"text":"❌ Close", "callback_data": "closeDesc", "hide":false}]
						]}
				}
			)
		})
		.catch(err => {
			console.log(err)
			ctx.reply("Error when get Description")
		})
}

module.exports = {
	media,
	mediaDetail,
	mediaDesc
}