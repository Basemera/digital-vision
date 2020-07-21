const SQL = require('sequelize');
const { Sequelize } = require('sequelize');


module.exports.createStore = () => {
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './store.sqlite'
    });

    let users = db.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
    },
    );

    const shows = db.define('shows', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: SQL.STRING,
        showId: SQL.INTEGER,
        comments: {
            type: SQL.INTEGER
        },
        favourite: {
            type: SQL.BOOLEAN
        },
        watched: {
            type: SQL.BOOLEAN
        },
        user: {
            type: SQL.INTEGER
        },
        url: {
            type: SQL.STRING
        }
    },
    );

    const comments = db.define('comments', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        commentor: SQL.INTEGER,
        show: SQL.INTEGER,
        comment: SQL.TEXT
    })

    db.sync({ force: false }).then(() => { db.close });

    return { db, users, shows, comments, };
}
