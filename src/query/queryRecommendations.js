module.exports = `
query ($page: Int, $perPage: Int, $sort: [RecommendationSort] ) {
	Page(page: $page, perPage: $perPage) {
		pageInfo {
			perPage
			currentPage
			hasNextPage
		}
    recommendations(sort: $sort ) {
      id
      media {
        id
        title {
          romaji
          native
        }
      }
      mediaRecommendation {
        id
        title {
          romaji
          native
        }
      }
      rating
    }
	}
}
`