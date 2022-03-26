const User = require('../models/user');



module.exports.profile = function(request, response)
{
    //return response.end('<h1> user profile </h1>');
    return response.render('profile', {
        title : "shashank"
    })
}

module.exports.login = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('users/profile');
    }
    return response.render('user_login',{
            title: "user login"
    });
}


module.exports.signup = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('users/profile');
    }
    return response.render('user_signup',{
            title: "user signup"
    });
}

// get the sign up data

module.exports.create = function(request, response){
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }
    User.findOne({email : request.body.email}, function(error, user){
        if(error)
        {
            console.log('error in finding user in signing up');
            return;
        }
        
        if(!user){
            User.create(request.body , function(error, user){
                if(error){
                    console.log("error in creating the user");
                    return;
                }
                return response.redirect('/users/login');
            })
        }
        else{
            return response.redirect('/users/login');
        }
    });

} 
// get the login credentials and create sesion
module.exports.createSession = function(request, response){
    //todo later
    return response.redirect('/');
}

module.exports.destroySession = function(request, response){
    request.logout();
    return response.redirect('/');
}