require("dotenv").config()

const { getArgs, textMenu } = require("./src/utils")
const { closeDesc, readDesc, mainMenu } = require("./src/features/etc")
const { reviewByUsers, detailReviewByUser } = require("./src/features/review")
const { suggestions, detailSuggestion } = require("./src/features/recomendations")
const { trendingManga, allTimePopulerManga, popularManhwa, top50Manga, searchManga, detailManga } = require("./src/features/manga")
const  { trendingAnime, popularAnime, upcomingAnime, allTimePopulerAnime, top50Anime, topMovies, searchAnime, detailAnime } = require("./src/features/anime")

const { Telegraf } = require("telegraf")
const express = require('express')

const app = express()
const port = process.env.PORT
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command(["/start", "/menu"], (ctx) => {
    ctx.reply(textMenu())
})

bot.command(["/trending_anime", "/ta"], (ctx) => {
	trendingAnime(ctx, 0)
})

bot.command(["/popular_anime", "/pa"], (ctx) => {
	popularAnime(ctx, 0)
})

bot.command(["/upcoming_anime", "/ua"], (ctx) => {
	upcomingAnime(ctx, 0)
})

bot.command(["/all_time_populer_anime", "/atpa"], (ctx) => {
	allTimePopulerAnime(ctx, 0)
})

bot.command(["/top_50_anime", "/t50a"], (ctx) => {
	top50Anime(ctx, 0)
})

bot.command(["/top_movies", "/tm"], (ctx) => {
	topMovies(ctx, 0)
})

bot.command(["/trending_manga", "/tma"], (ctx) => {
	trendingManga(ctx, 0)
})

bot.command(["/all_time_populer_manga", "/atpm"], (ctx) => {
	allTimePopulerManga(ctx, 0)
})

bot.command(["/popular_manhwa", "/pmh"], (ctx) => {
	popularManhwa(ctx, 0)
})

bot.command(["/top_50_manga", "/t50m"], (ctx) => {
	top50Manga(ctx, 0)
})

bot.command(["/search_anime", "/sa"], (ctx) => {
	searchAnime(ctx, 0, getArgs(ctx.message.text))
})

bot.command(["/search_manga", "/sm"], (ctx) => {
	searchManga(ctx, 0, getArgs(ctx.message.text))
})

bot.command(["/recommendations", "/rcm"], (ctx) => {
	suggestions(ctx, 0, getArgs(ctx.message.text))
})

bot.command(["/reviews", "/rvs"], (ctx) => {
	reviewByUsers(ctx, 0)
})

bot.command(["/forum"], (ctx) => {
	ctx.reply("You can access forum on the web",  {
		"reply_markup":{
			"inline_keyboard": [[{"text":"Go to Forum", "url": "https://anilist.co/forum/overview"}]]
		}
	})
})

bot.command(["/about"], (ctx) => {
	ctx.replyWithMarkdown("DaAkuu (Daftar Anime Kuu) is unofficial anilis.co bot.\n\nYou can visit our repository on GitHub to contribute or submit issue.",{ 
		disable_web_page_preview: true,
		"reply_markup":{
			"inline_keyboard": [[{"text":"Open GitHub", "url": "https://github.com/Shiyinq/src"}]]
		}
	})
})

bot.on("callback_query", (ctx) => {
	let dataQuery = ctx.callbackQuery.data
	let [callFunction, page, search] = dataQuery.split("-")

	eval(callFunction)(ctx, page, search)
})

bot.launch()

app.get('/', (_, res) => {
	res.send('Bipp bipp!')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})