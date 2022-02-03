module.exports.profile = function(request, response)
{
    //return response.end('<h1> user profile </h1>');
    return response.render('users', {
        title : "shashank"
    })
}

module.exports.login = function(request, response){
    return response.render('user_login',{
            title: "user login"
    });
}


module.exports.signup = function(request, response){
    return response.render('user_signup',{
            title: "user signup"
    });
}

// get the sign up data

module.exports.create = function(request, response){
    //todo later
}