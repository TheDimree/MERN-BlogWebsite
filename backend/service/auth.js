

//* This function will create tokens.
function setUser(user) {
    // const payload = {
    //     ...user,
    // }
    return jwt.sign(user, secret)
}

function getUser(id) {
    return(sessionId)
}