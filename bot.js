require('dotenv').config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const { 
	trendingAnime, 
	popularAnime, 
	upcomingAnime,
	allTimePopulerAnime,
	top50Anime,
	topMovies,
	detailAnime,
	closeAnimeDetail,
	readAnimeDesc,
	mainMenu
} = require('./daakuu/features')


bot.start((ctx) => {
    ctx.reply(`
	Welcome To DaAKu

	/trending_anime
	/popular_anime
	/upcoming_anime
	/all_time_populer_anime
	/top_50_anime
	/top_movies
	`)
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

bot.on('callback_query', (ctx) => {
	let dataQuery = ctx.callbackQuery.data
	let [callFunction, page] = dataQuery.split('-')
	
	eval(callFunction)(ctx, page)
})

bot.launch()