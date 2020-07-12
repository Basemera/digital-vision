const { RESTDataSource } = require('apollo-datasource-rest');

class ShowAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'https://api.tvmaze.com/'
    }

    //get all shows
    async getAllShows() {
        const response = await this.get('shows');

        return Array.isArray(response)
            ? response.map(show => this.showReducer(show))
            : [];
    }

    async getShowByName({ name }) {
        const response = await this.get(`search/shows`, { q: name });
        return Array.isArray(response)
            ? response.map(show => this.showReducer(show.show))
            : [];
    }

    

    //implement show reducer
    showReducer(show){
        return {
            id: show.id || 0,
            url: show.url,
            name: show.name,
            type: show.type,
            genre: show.genre,
            status: show.status,
            premiered: show.premiered,
            rating: show.rating,
            image: show.image,
            summary: show.summary,
        }
    }
}

module.exports = ShowAPI;