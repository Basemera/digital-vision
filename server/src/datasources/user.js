const { DataSource } = require('apollo-datasource');
// const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }


  async validateUser({ username, password}) {
      //hash password
      let user = await this.store.users.findOne({ where: { username: username } });
      if (user) {
          return user;
      }
       [user] = await this.store.users.create( { username: username, password: password } );

      return user;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
//   async findOrCreateUser({ username: username, password: password} = {}) {
//     const user =
//       this.context && this.context.user ? this.context.user.email : emailArg;
//     if (!email || !isEmail.validate(email)) return null;

//     const users = await this.store.users.findOrCreate({ where: { email } });
//     return users && users[0] ? users[0] : null;
//   }

  async registerUser({ username, password }) {
    return this.validateUser({ username, password });
}

async login( { username, password }) {
     const user = await this.store.users.findOne({ where: { username: username, password: password } })
     return user;
}

async addShowToSchedule( showIds ) {
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
      where: { user: userId, showId: showId.showId, name: showId.name },
    });
    return res && res.length ? res[0].get() : false;
  }

  async setShowToWatched( showIds ) {
    const userId = this.context.user.id;
    if (!userId) return;
    let results =[];
    for (const showId of showIds.showIds) {
      const res = await this.addShowToWatched({ showId });
      if (res) results.push(res);
  }
    return results;
  }

  async addShowToWatched({ showId }) {
    const userId = this.context.user.id;
    const res = await this.store.shows.findOne({
      where: { user: userId, showId: showId.showId}
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

  async setFavouriteShow( showIds ) {
    const userId = this.context.user.id;
    if (!userId) return;
    let results = [];
    for (const showId of showIds.showIds) {
      const res = await this.favouriteWatchedShow({ showId });
      if (res) results.push(res);
  }
    return results;
  }

  async favouriteWatchedShow({ showId }) {
    const userId = this.context.user.id;
    const res = await this.store.shows.findOne({
      where: { user: userId, showId: showId.showId}
    });
    if (res && res.watched) {
      res.favourited = true;
      res.save();
      return res;
    } else {
      return false;
      // return `show ${ showId.showId } not added to user watch list`
    }
  }

  async findShow({ showId }) {
    // console.log(showId);
    const userId = this.context.user.id;
    const res = await this.store.shows.findOrCreate({
      where: { user: userId, showId: showId, },
    });
    // console.log(res[0].get())
    return res && res.length ? res[0].get() : false;
  }

  async postCommentsOnShow({ showId, commentText }) {
      const userId = this.context.user.id;
      // console.log(commentText);

      if (!userId) return;
      const show =  await this.findShow({ showId });
      console.log(commentText);

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
    console.log(res.length);
    return res && res.length ? res[0].get() : false;
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