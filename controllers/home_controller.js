module.exports.home = function(request, response){
    console.log(request.cookies);  // doing this because cookie comes under the request
    response.cookie('user_id' , 35);// but when it comes to change the cookie then we need to that in the response part because we will send it using the response
    return response.render('home', {
        title: "home"
    });
}

// module.exports.actionName = function(req,res){};  Format

