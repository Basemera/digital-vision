


const fakeAuth  = {
    isAuthenticated: false,
    authenticate(cb){
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb){
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}
