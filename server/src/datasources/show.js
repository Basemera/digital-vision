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
            ? response.filter(show => this.queryByGenre(show, genre)) // this returns the response with the genre null
            
            // ? response.map (show => this.queryByGenre(show, genre)) // this returns genre but also returns those that are null
            : [];
    }

    queryByGenre(show, genre) {
        if (show.genres.includes(genre)) {
            return this.showReducer(show);
        }
    }

    async getShowByRating({ rating }) {
        const response = await this.get('shows');
        return Array.isArray(response)
            ? response.map(show => this.queryByRating(show, rating)) // returns nulls as well should probably use filter or reduce but not sure how to
            : [];
    }

    queryByRating(show, rating) {
        if (show.rating.average == rating) {
            // console.log()
            return this.showReducer(show);
        }
    }


    async getShowByPremiereDate({ premiere }) {
        const response = await this.get('shows');
        return Array.isArray(response)
            ? response.map(show => this.queryByPremiereDate(show, premiere)) // returns nulls as well should probably use filter or reduce but not sure how to
            : [];
    }

    queryByPremiereDate(show, premiere) {
        var D1 = Date.parse(show.premiered);
        var D2 = Date.parse(premiere);

        if (D1 == D2) {
            return this.showReducer(show);
        }
    }


    async getShowByStatus({ status }) {
        const response = await this.get('shows');
        return Array.isArray(response)
            ? response.map(show => this.queryByStatus(show, status)) // returns nulls as well should probably use filter or reduce but not sure how to
            : [];
    }

    queryByStatus(show, status) {
        // console.log(show.status);

        if (show.status == status) {
            // console.log(status);

            // console.log()
            return this.showReducer(show);
        }
    }

    async getShowUsingMultipleFilters(...args) { // to be implemented

    }

    //implement show reducer
    showReducer(show){
        console.log(show.image.medium);
        return {
            id: show.id || 0,
            url: show.url,
            name: show.name,
            type: show.type,
            genre: {name: show.genres},
            status: show.status,
            dateOfPremier: show.premiered,
            rating: {
                average: {
                    average: show.rating.average
                }
            },
            // show.rating,
            images: {
                medium: show.image.medium,
                original: show.image.original
            },
            // show.image,
            summary: show.summary,
        }
    }
}

module.exports = ShowAPI;