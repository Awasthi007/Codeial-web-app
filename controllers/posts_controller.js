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
        let post = await Post.create({
            content: request.body.content,
            user: request.user._id
        });

        if(request.xhr){
            return response.status(200).json({
                data: {
                    post: post
                },
                message: 'post created!'
            });
        }


        request.flash('success', 'Post created succesfully');
        return response.redirect('back');
     }catch(error){
            request.flash('error', error);
            return response.redirect('back');
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
            
            if(request.xhr){
                return response.status(200).json({
                    data: {
                        post_id: request.params.id
                    },
                    message: 'post deleted'
                })
            }

            
            request.flash('warning', 'Post and associated comments deleted successfully');
            return response.redirect('back');
        }
        else{
            request.flash('error', 'cant delete post');
            return response.redirect('back');
        }
    }catch(error){
        request.flash('error', error);
        return response.redirect('back');
    }
    
}