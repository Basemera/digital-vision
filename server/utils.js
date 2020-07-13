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

    // const movies = db.define('movies', {
    //     id: {
    //         type: SQL.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true,
    //     },
    //     name: SQL.STRING,
    //     url: SQL.STRING,
    //     image: {
    //         type: SQL.ARRAY,
    //     },
    //     genre: {
    //         type: SQL.INTEGER,
    //     },
    //     rating: SQL.INTEGER,
    //     dateOfPremier: SQL.DATE,
    //     status: {
    //         type: SQL.INTEGER
    //     },
    //     comments: {
    //         type: SQL.INTEGER
    //     },
    //     favourite: {
    //         type: SQL.BOOLEAN
    //     },
    //     watched: {
    //         type: SQL.BOOLEAN
    //     },
    //     user: {
    //         type: SQL.INTEGER
    //     }
    // },  
    // );

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

    return { db, users, };
}
