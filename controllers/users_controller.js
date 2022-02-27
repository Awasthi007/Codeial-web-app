const User = require('../models/user');



module.exports.profile = function(request, response)
{
    //return response.end('<h1> user profile </h1>');
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id, function(error, user){
            if(user){
                return response.render('users',{
                    title: "user profile",
                    user: user
                })
            }
            return response.redirect('/users/sign-in');
        });
    }else{
        return response.redirect('/users/sign-in');
    }
    /*
    return response.render('users', {
        //title : "shashank"
        title: request.body.name
    })
    */
}

module.exports.login = function(request, response){
    return response.render('user_login',{
            title: "codeial | user login"
    });
}


module.exports.signup = function(request, response){
    return response.render('user_signup',{
            title: "codeial | user signup"
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



// sign out functionality


module.exports.signOut = function(request, response){
    console.log(request.cookies.user_id);
    if(request.cookies.user_id){
        if(true){
            var delete_cookie = function(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };
            delete_cookie(request.cookies.user_id);
        }
    }
    
    return response.redirect('users/login');
}    


// get the login credentials and create sesion
module.exports.createSession = function(request, response){
    // find the user
    User.findOne({email: request.body.email}, function(error, user){
        if(error){
            console.log("error in finding the user sign in");
            return;
        }
        if(user){
                if(user.password != request.body.password){
                    return response.redirect('back');
                }

                response.cookie('user_id', user.id);
                return response.redirect('/users/profile');
        }else{
            return response.redirect('back');
        }
    });

    // handle user found

        // handle passwoed which dont match

        // handle session creation

    //handle user not found
}