module.exports = `
query ($page: Int, $perPage: Int, $type: MediaType, $seasonYear: Int, $season: MediaSeason, $format_in: [MediaFormat], $sort: [MediaSort]) {
	Page(page: $page, perPage: $perPage) {
		pageInfo {
			perPage
			currentPage
			hasNextPage
		}
		media(type: $type, seasonYear: $seasonYear, season: $season, format_in: $format_in, sort: $sort) {
			id
			title {
				romaji
				userPreferred
			}
		}
	}
}
`