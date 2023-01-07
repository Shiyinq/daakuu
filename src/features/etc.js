const { textMenu } = require("../utils")
const { mediaDesc } = require("../anilist/media")

function closeDesc(ctx) {
	ctx.deleteMessage()
}

function readDesc(ctx, mediaId) {
	let variables = {
		id: mediaId
	}

	mediaDesc(ctx, variables)
}

function mainMenu(ctx) {
	ctx.editMessageText(textMenu())
}

module.exports = {
	closeDesc,
	readDesc,
	mainMenu
}