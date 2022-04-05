const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.create = function(request, response)
// {
//      Post.create({
//         content: request.body.content,
//         user: request.user._id
//     }, function(error, post){
//         if(error){
//             console.log('error in creating a post');
//             return;
//         }
//         return response.redirect('back');
//     });
// }

// changed the above to asynchronous code...

module.exports.create = async function(request, response)
{
     try{
        await Post.create({
            content: request.body.content,
            user: request.user._id
        });
        return response.redirect('back');
     }catch(error){
            console.log(error);
            return;
     }
}


// module.exports.destroy = function(request, response){
//     Post.findById(request.params.id, function(error, post){
//         if(error)
//         {
//             console.log('cant find the post to be deleted');
//             return;
//         }
//         // .id means converting the object id into string
//         if(post.user == request.user.id){
//             post.remove(); 
//             Comment.deleteMany({post: request.params.id}, function(error){
//                 return response.redirect('back');
//             });

//         }
//         else{
//             return response.redirect('back');
//         }
//     });
// }

// changed the above code to the asynchronous 

module.exports.destroy = async function(request, response){

    try{
        let post = await Post.findById(request.params.id);

    
        if(post.user == request.user.id){
            post.remove(); 
            await Comment.deleteMany({post: request.params.id});
            return response.redirect('back');
        }
        else{
            return response.redirect('back');
        }
    }catch(error){
        console.log(error);
        return;
    }
    
}