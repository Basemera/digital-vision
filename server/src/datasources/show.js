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

    async getShowByParameter({ ...args }){
        const{ name, genre, rating, premier, status } = args;
        if(name !== undefined){
            return await this.getShowByName({name})
        }

        if(genre !== undefined){
            return await this.getShowByGenre({ genre })
        } 

        if(rating !== undefined){
            return await this.getShowByRating({ rating })
        }

        if(status !== undefined){
            return await this.getShowByStatus({ status })
        }

        if (premier !== undefined){
            return await this.getShowByPremiereDate({ premiere })
        }

        if( name === undefined && genre === undefined && rating === undefined && status === undefined && premier === undefined){
            return await this.getAllShows()
        }
    }

    async getShowByName({name}) {
        const response = await this.get(`search/shows`, { q: name });
        // console.log(response);
        return Array.isArray(response)
            ? response.map(show => this.showReducer(show.show))
            : [];
    }

    async getShowByGenre({genre}) {
        let resultSet = []
        const shows =  await this.get('shows')
        if(Array.isArray(shows)){
            shows.map(show => show.genres.filter(item => {
                // console.log(item)
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

    async getShowByRating({rating}) {
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


    async getShowByPremiereDate({premiere}) {
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


    async getShowByStatus({status}) {
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
                medium: show.image && show.image.medium ? show.image.medium : null,
                original: show.image && show.image.original ? show.image.original : null
            } || null,
            // show.image,
            summary: show.summary,
        }
    }
}

module.exports = ShowAPI;