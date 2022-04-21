module.exports = `
query ($page: Int, $perPage: Int, $id: Int, $search: String, $type: MediaType, $countryOfOrigin: CountryCode, $seasonYear: Int, $season: MediaSeason, $format_in: [MediaFormat], $sort: [MediaSort]) {
	Page(page: $page, perPage: $perPage) {
		pageInfo {
			perPage
			currentPage
			hasNextPage
		}
		media(id: $id, search: $search, type: $type, countryOfOrigin: $countryOfOrigin, seasonYear: $seasonYear, season: $season, format_in: $format_in, sort: $sort) {
			id
			title {
			  romaji
			  userPreferred
			}
			coverImage {
			  extraLarge
			  large
			  medium
			  color
			}
			description
			format
			chapters
			episodes
			duration
			status
			startDate {
			  year
			  month
			  day
			}
			season
			meanScore
			studios {
			  nodes {
				name
			  }
			}
			source
			genres
			siteUrl
		}
	}
}
`