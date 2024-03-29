module.exports = `
query ($id: Int, $page: Int, $perPage: Int, $sort: [ReviewSort] = ID_DESC) {
	Page(page: $page, perPage: $perPage) {
	  pageInfo {
		total
		perPage
		currentPage
		lastPage
		hasNextPage
	  }
	  reviews(id:$id, sort: $sort) {
		id
		rating
		ratingAmount
		summary
		media {
		  id
		  title {
			romaji
		  }
		  type
		  bannerImage
		}
		user {
		  id
		  name
		}
	  }
	}
}
`