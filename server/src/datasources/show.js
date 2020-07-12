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
        console.log(response);
        return Array.isArray(response)
            ? response.map(show => this.showReducer(show.show))
            : [];
    }

    async getShowByGenre({ genre }) {
        const response = await this.get('shows');
        return Array.isArray(response)
            // ? response.filter(show => this.queryByGenre(show, genre)) // this returns the response with the genre null
            
            ? response.map (show => this.queryByGenre(show, genre)) // this returns genre but also returns those that are null
            : [];
    }

    queryByGenre(show, genre) {
        if (show.genres.includes(genre)) {
            return this.showReducer(show);
        }
    }

    //implement show reducer
    showReducer(show){
        return {
            id: show.id || 0,
            url: show.url,
            name: show.name,
            type: show.type,
            genre: {name: show.genres},
            status: show.status,
            premiered: show.premiered,
            rating: show.rating,
            image: show.image,
            summary: show.summary,
        }
    }
}

module.exports = ShowAPI;