const Post = require('../models/post');


module.exports.home = function(request, response){
    console.log(request.cookies);

    
// used to serve the users posts to the home page where we have used for loop to display them
    // Post.find({}, function(error, posts){
    //     return response.render('home', {
    //         title: "codeial | home",
    //         posts: posts
    //     });
    // });

    // this is used to populate the user as well so that we can display the user property along side
    Post.find().populate('user').exec(function(error, posts){
        console.log(posts);
        return response.render('home', {
            title: 'codeial | home',
            posts: posts
        });
    })

    
}

// module.exports.actionName = function(req,res){};  Format

