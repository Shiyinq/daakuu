require('dotenv').config()
const { textMenu } = require('./daakuu/utils')
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const { 	
	trendingAnime, 
	popularAnime, 
	upcomingAnime,
	allTimePopulerAnime,
	top50Anime,
	topMovies,
	trendingManga,
	allTimePopulerManga,
	popularManhwa,
	top50Manga,
	detailAnime,
	detailManga,
	closeDesc,
	readDesc,
	mainMenu,
} = require('./daakuu/features')


bot.start((ctx) => {
    ctx.reply(textMenu())
})

bot.command(['/trending_anime', '/ta'], (ctx) => {
	trendingAnime(ctx, 0)
})

bot.command(['/popular_anime', '/pa'], (ctx) => {
	popularAnime(ctx, 0)
})

bot.command(['/upcoming_anime', '/ua'], (ctx) => {
	upcomingAnime(ctx, 0)
})

bot.command(['/all_time_populer_anime', '/atpa'], (ctx) => {
	allTimePopulerAnime(ctx, 0)
})

bot.command(['/top_50_anime', '/t50a'], (ctx) => {
	top50Anime(ctx, 0)
})

bot.command(['/top_movies', '/tm'], (ctx) => {
	topMovies(ctx, 0)
})

bot.command(['/trending_manga', '/tma'], (ctx) => {
	trendingManga(ctx, 0)
})

bot.command(['/all_time_populer_manga', '/atpm'], (ctx) => {
	allTimePopulerManga(ctx, 0)
})

bot.command(['/popular_manhwa', '/pmh'], (ctx) => {
	popularManhwa(ctx, 0)
})

bot.command(['/top_50_manga', '/t50m'], (ctx) => {
	top50Manga(ctx, 0)
})

bot.on('callback_query', (ctx) => {
	let dataQuery = ctx.callbackQuery.data
	let [callFunction, page] = dataQuery.split('-')
	
	eval(callFunction)(ctx, page)
})

bot.launch()