import Vuex from "vuex";
import axios from "axios";
/* EXPLANATION: right now our store is not in
sync with the data on the server becasue we're fetching
new data from the server only when we reload the page or
when we visit the app for the first time. We're not fetching
data from the server when we edit the data. The solution
is to maniupate our store so that if we add a new post, we want
to add it to the edit and if we edit a new post we
want to edit it in the store.  */

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
  mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      
      /* 5) push the edited post to the loadedPosts array */
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      /* 1) Add an editPost method to mutations.Here
      I want to replace an existing post with an edited
      version. */
      editPost(state, editedPost) {
        /* 2) I have to find the index of the
        existing post in the loadedPosts array(the
        data I got from the database). I will store
        that index in postIndex. Now, I have to use
        the findIndex method, which will search the array
        for a given post and returns me an index of that. I
        pass a function in the findIndex method. This function
        will return true if it is the post I was looking
        for or returns false otherwiese. */
          /* 3) If the post has an id that is equal to
          the id in the editedPost I´m receiving
          as payload, return true.  */
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        /* 4) Now I get the post in the loadedPosts array
        which has that index I was looking for, and set it
        equal to editedPost. With this approach I'm replacing
        the post the user edits directly in the store.   */

        state.loadedPosts[postIndex] = editedPost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e));
      },
      /* 6) Now add an addPost action to commit our mutation,
      Here we get vuexContext and the post that should be added */
      addPost(vuexContext, post) {
        /* 7) We put the post request that we had in the 
        new-post page here. But we need to change it a bit. */
        /* 8) We create a new constant and we store the object I´m sending
        to the backend using the spread operator*/
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios
        /* 9) The newly create constant createdPost is sent with the
        post request */
        .post("https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts.json", createdPost)
           /* 10) The newly create constant createdPost is also commited to
        the store, specifically to the addPost mutation. The problem is that 
        that createdPost has an id assigned by the backend and we have to
        pass it to the store as well. To access the id we use id: result.data.name.
        (detail explanation in the video.) */
        .then(result => {
          vuexContext.commit('addPost', {...createdPost, id: result.data.name})
        })
        .catch(e => console.log(e));
      },
        /* 11) We want to redirect users to the admin page. To do that,
        I have to make sure to return axios and next step in new-post page. */
        /* 14) Now in the editPost action I also want to perform an http request.
        So, I will grab the put request code, located in the onSubmitted 
        method in the postID file, and paste it here. I will return the
        the put request so that I can handle the redirection to the admin page.
        Next steps in postId page. */
       editPost(vuexContext, editedPost) {
        return axios
        /* 16) Send the editedPost received from the postId page
        to the backend. To send the post id, go to the postId page. */
          .put(
            "https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts/" + editedPost.id + ".json",
            editedPost
          )
          /* 18) Update the store commiting this action to
          the editPost mutation and passing the editedPost. */
          .then((res) => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch((e) => console.log(e));
      },
     /* 19) Now test it. If we go the admin page,
     click on a post and edit it. When click on 
     save we should be redirected to the admin page
     and be able to see our edited post. */
       
      
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
