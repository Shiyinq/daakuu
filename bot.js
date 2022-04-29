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


bot.command(['/start', '/menu'], (ctx) => {
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

bot.command(['/forum'], (ctx) => {
	ctx.reply('You can access forum on the web',  {
		"reply_markup":{
			"inline_keyboard": [[{"text":"Go to Forum", "url": 'https://anilist.co/forum/overview', "hide":false}]]
		}
	})
})

bot.command(['/about'], (ctx) => {
	ctx.replyWithMarkdown('DaAkuu (Daftar Anime Kuu) is unofficial anilis.co bot.\n\nYou can visit our [repository](https://github.com/Shiyinq/daakuu) to contribute or submit issue.',{ 
		disable_web_page_preview: true 
	})
})

bot.on('callback_query', (ctx) => {
	let dataQuery = ctx.callbackQuery.data
	let [callFunction, page] = dataQuery.split('-')
	
	eval(callFunction)(ctx, page)
})

bot.launch()