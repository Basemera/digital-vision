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
        let resultSet = []
        const shows =  await this.get('shows')
        if(Array.isArray(shows)){
            shows.map(show => show.genres.filter(item => {
                console.log(item)
                if(item == genre){
                    resultSet.push(this.showReducer(show))
                }
            }))
            return resultSet
        }
        else {
            return resultSet
        }
    }

    async getShowByRating({ rating }) {
        let resultSet = []
        const shows =  await this.get('shows')
        if(Array.isArray(shows)){
            shows.map(show => {
                if (show.rating.average === rating) {
                    resultSet.push(this.showReducer(show));
                }
            })
            return resultSet
        }
        else {
            return resultSet
        }
    }


    async getShowByPremiereDate({ premiere }) {
        let resultSet = []
        const shows =  await this.get('shows')
        if(Array.isArray(shows)){
            shows.map(show => {
                if (show.premiered === premiere) {
                    resultSet.push(this.showReducer(show));
                }
            })
            return resultSet
        }
        else {
            return resultSet
        }
    }


    async getShowByStatus({ status }) {
        let resultSet = []
        const shows =  await this.get('shows')
        if(Array.isArray(shows)){
            shows.map(show => {
                if (show.status === status) {
                    resultSet.push(this.showReducer(show));
                }
            })
            return resultSet
        }
        else {
            return resultSet
        }
    }
    

    async getShowUsingMultipleFilters(...args) { // to be implemented

    }

    //implement show reducer
    showReducer(show){
        return {
            id: show.id || 0,
            url: show.url,
            name: show.name,
            type: show.type,
            genre: show.genres,
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
            } || null,
            // show.image,
            summary: show.summary,
        }
    }
}

module.exports = ShowAPI;