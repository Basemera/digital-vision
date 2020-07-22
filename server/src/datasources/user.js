const { DataSource } = require('apollo-datasource');
const { RESTDataSource } = require('apollo-datasource-rest');

const bcrypt = require('bcryptjs');

hashPassword = function ({ password }) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

validatePassword = function (unHashedPassword, userHashedPassword) {
  return bcrypt.compareSync(unHashedPassword, userHashedPassword);
}

class UserAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
    this.baseURL = 'https://api.tvmaze.com/'
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  // initialize(config) {
  //   this.context = config.context;
  // }


  async validateUser({ username, password }) {

    let user = this.store.users.findOne({ where: { username: username } });
    if (user) {
      return user;
    }
    let hashedPassword = hashPassword(password);
    [user] = await this.store.users.create({ username: username, password: hashedPassword });

    return user
  }


  async registerUser({ username, password }) {
    let [user, created] = await this.store.users.findOrCreate( {where: { username },
      defaults: {
        password: hashPassword({password})
      }
    })
    if(!created){
      return user;
    }
    return user;
  }


  async login({ username, password }) {
    const user = await this.store.users.findOne({ where: { username: username  } })
    return  user && validatePassword(password, user.password) ? user : undefined;
  }

  async addShowToSchedule(showIds) {
    const userId = this.context.user.id;
    if (!userId) return;

    let results = [];

    for (const showId of showIds.showIds) {
      const res = await this.addShow({ showId });
      if (res) results.push(res);
    }
    return results;
  }

  async addShow({ showId }) {
    const userId = this.context.user.id;
    const res = await this.store.shows.findOrCreate({
      where: { user: userId, showId: showId.showId, name: showId.name, url: showId.url },
    });
    return res && res.length ? res[0].get() : false;
  }

  async setShowToWatched(showIds) {
    const userId = this.context.user.id;
    if (!userId) return;
    let results = [];
    for (const showId of showIds.showIds) {
      const res = await this.addShowToWatched({ showId });
      if (res) results.push(res);
    }
    return results;
  }

  async addShowToWatched({ showId }) {
    const userId = this.context.user.id;
    const res = await this.store.shows.findOne({
      where: { user: userId, showId: showId.showId }
    });
    if (res) {
      res.watched = true;
      res.save();
      return res;
    } else {
      return false;
      // return `show ${ showId.showId } not added to user watch list`
    }
  }

  async setFavouriteShow(showIds) {
    const userId = this.context.user.id;
    if (!userId) return;
    let results = [];

    for (const showId of showIds.showIds) {
      const res = await this.favouriteWatchedShow({ showId });
      // let s = this.showReducer(res)
      let s = {
        id: res.id,
        name: res.name,
        url: res.url,
        user: res.user,
        fav: res.favourite
      };
      if (res) results.push(s);

    }
    return results;
}

  async favouriteWatchedShow({ showId }) {
    const userId = this.context.user.id;
    const res = await this.store.shows.findOne({
      where: { user: userId, showId: showId.showId }
    });
    if (res && res.dataValues.watched) {
      res.dataValues.favourite = true;
      res.save();
      return res;
    } else {
      return false;
      // return `show ${ showId.showId } not added to user watch list`
    }

  }

  async findShow({ showId }) {
    const userId = this.context.user.id;
    const res = await this.store.shows.findOrCreate({
      where: { user: userId, showId: showId, },
    });
    return res && res.length ? res[0].get() : false;
  }

  async postCommentsOnShow({ showId, commentText }) {
    const userId = this.context.user.id;
    if (!userId) return;
    const show = await this.findShow({ showId });

    if (show.watched) {
      const comment = await this.addComment({ showId, commentText });
      if (comment) {
        const res = this.commentReducer(comment, userId);
        return res;
      }
    }
    else {
      const res = this.commentReducer([]);
      return res;
    }
    const res = this.commentReducer([]);
    return res;
  }

  async addComment({ showId, commentText }) {
    const userId = this.context.user.id;
    const res = await this.store.comments.findOrCreate({
      where: { commentor: userId, show: showId, comment: commentText },
    });
    return res && res.length ? res[0].get() : false;
  }


  async getUserScheduledShows() {
    const userId = this.context.user.id;
    if (!userId) return;
    const shows = await this.store.shows.findAll({
      where: {
        user: userId
      }
    });
    return Array.isArray(shows)
      ? shows.map(show=> this.getShowDetails(show))
      : [];
}

async getUserFavouriteShows() {
  const userId = this.context.user.id;
  if (!userId) return;
  const shows = await this.store.shows.findAll({
    where: {
      user: userId,
      favourite: true
    }
  });
  return Array.isArray(shows)
    ? shows.map(show=> this.getShowDetails(show))
    : [];
}

async getShowDetails(show) {
  const url = show.dataValues.url;
  const response = await this.get(url);
  let res = [];
  res =  response ? this.showReducer(response) : [];
  res.showId = show.id;
  return res ? res : [];
}

//implement show reducer
showReducer(show){
  return {
      id: show.id || 0,
      showId: show.showId || 0,
      url: show.url,
      name: show.name,
      type: show.type,
      genre: show.genres,
      status: show.status,
      dateOfPremier: show.premiered,
      rating: {
          average: {
              average: show.rating ? show.rating.average : null
          }
      },
      // show.rating,
      images: {
          medium: show.image && show.image.medium ? show.image.medium : null,
          original: show.image && show.image.original ? show.image.original : null
      } || null,
      // show.image,
      summary: show.summary || null,
  }
}

  //comment reducer
  commentReducer(comment, user) {
    return {
      text: comment.comment || null,
      user: user,
      show: comment.show || null,
      message: comment && comment.id ? 'Comment added' : 'Comment couldnot be added'
    }
  }
}



module.exports = UserAPI;