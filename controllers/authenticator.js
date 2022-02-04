module.exports.login = function(request, response){
    return response.render('user_login',{
            title: "user login",
    });
}