const User = require('../models/user');
const fs = require('fs');
const path = require('path');



module.exports.profile = function(request, response)
{
    //return response.end('<h1> user profile </h1>');
    User.findById(request.params.id, function(error, user){
        if(error){
            console.log(error);
            return;
        }
        return response.render('profile', {
            title : "User profile",
            profile_user: user
        });
    });
    
}

// module.exports.update = function(request, response){
//     if(request.user.id == request.params.id){
//         User.findOneAndUpdate(request.params.id, request.body, function(error, user){
//             request.flash('success', 'Name and email updated successfully');
//             return response.redirect('back');
//         })
//     }else{
//         return response.status(401).send('Unauthorized');
//     }
// }

// converting to async

module.exports.update = async function(request, response){
    if(request.user.id == request.params.id){
        try{
            let user = await User.findById(request.params.id);
            User.uploadedAvatar(request, response, function(error){
                    if(error){
                        console.log('********multererror', error);
                    }
                    user.name = request.body.name;
                    user.email = request.body.email;

                    if(request.file){

                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }

                        // this is saving the path of the uploaded file into the avatar field in the user
                        user.avatar = User.avatarPath + '/' + request.file.filename;
                    }
                    user.save();
                    console.log(request.file);
                    return response.redirect('back');
            });
        }catch(error){
            request.flash('error', error);
            return response.redirect('back');
        }
    }else{
        request.flash('error', 'Unauthorized');
        return response.status(401).send('Unauthorized');
    }
}

module.exports.login = function(request, response){
    if(request.isAuthenticated()){
        
        const h = (request.user.id).trim();
        console.log('//////////////////////////////////////////////////////////////');
        console.log(h);
        return response.redirect("/users/profile/<%= h %>");
    }
    return response.render('user_login',{
            title: "user login"
    });
}


module.exports.signup = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('/users/profile/:id');
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
    request.flash('success', 'Logged in Successfully.!')
    return response.redirect('/');
}

module.exports.destroySession = function(request, response){
    request.logout();
    request.flash('warning', 'You have logged out!');
    return response.redirect('/');
}