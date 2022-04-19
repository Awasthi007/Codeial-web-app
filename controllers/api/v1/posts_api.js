const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(request, response){
    
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return response.json(200, {
        message : "List of posts",
        posts: posts
    })
}


module.exports.destroy = async function(request, response){

    try{
        let post = await Post.findById(request.params.id);

    
        //if(post.user == request.user.id){
            post.remove(); 
            await Comment.deleteMany({post: request.params.id});
            
            return response.json(200, {
                message: "post and associated comments deleted succesfully"
            });
        // }
        // else{
        //     request.flash('error', 'cant delete post');
        //     return response.redirect('back');
        // }
    }catch(error){
        console.log(error);
        return response.json(500, {
            messeage: "internal server error"
        });
    }
    
}