module.exports.profile = function(request, response)
{
    //return response.end('<h1> user profile </h1>');
    return response.render('users', {
        title : "shashank"
    })
}