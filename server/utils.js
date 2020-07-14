const SQL = require('sequelize');
const {Sequelize} = require('sequelize');


module.exports.createStore = () => {
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './store.sqlite'
      });
    
    // const Op = SQL.Op;
    // const operatorsAliases = {
    //     $in: Op.in,
    //   };
    // const db = new SQL('database', 'username', 'password', {
    // dialect: 'sqlite',
    // storage: './store.sqlite',
    // operatorsAliases,
    // logging: false,
    // });

    const users = db.define('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        // createdAt: Sequelize.DATE,
        // updatedAt: Sequelize.DATE,
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
      });

    const shows = db.define('shows', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: SQL.STRING,
        showId: SQL.INTEGER,
        // url: SQL.STRING,
        // dateOfPremier: SQL.DATE,
        // status: {
        //     type: SQL.INTEGER
        // },
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

    // const genre = db.define('genre', {
    //     id:  {
    //         type: SQL.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true,
    //     },
    //     name: SQL.STRING,
    // }
    // );

    // const status = db.define('status', {
    //     id:  {
    //         type: SQL.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true,
    //     },
    //     name: SQL.STRING,
    // }
    // );
    // Sequelize.sync();   
    db.sync(
        {
            // force: true
        }
    );

    return { db, users, shows, comments, };
}
