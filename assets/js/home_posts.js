{
    // method to create post 

    let createPost = function () {

        let newPostForm = $('#new-post-form');
        //console.log('hellovgg');

        newPostForm.submit(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));  // what happened here
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });

    }

    // method to create post in dom

    let newPostDom = function (post) {
        return $(`<li id='post-${post.id}'>
                                <p>
                                    
                                                <small>
                                                        <a class='delete-post-button' href="/posts/destroy/${post._id}">Delete</a>
                                                </small>
                                                
                                                        ${post.content}
                                                                <br>
                                                                ${post.user.name} 

                                </p>
                                <div class='post-comments'>
                                    
                                                <form action="/comments/create" method="post">
                                                        <input type="text" name="content" placeholder="comment" required>
                                                        <input type="hidden" name='post' value='${post._id}'>
                                                        <input type="submit" value="add comment">
                                                </form>
                                                

                                                        <div id='post-comment-list'>
                                                                <ul id='post-comment-${post._id}'>
                                                                        <% for(comment of post.comments){ %>

                                                                                <%- include('_comment.ejs') -%>

                                                                                        <%}%>

                                                                </ul>
                                                        </div>
                                </div>
                        </li>`)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),  // this is how you get href value from A tag
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }
    createPost();
}