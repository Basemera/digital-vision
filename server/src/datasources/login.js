const isEmail = require('isemail');

class login {
    async authenticateUser(req) {
        // simple auth check on every request
    const auth = req.headers && req.headers.authorization || '';
    
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] || null;
    return { user: { ...user.dataValues } };
    }
}