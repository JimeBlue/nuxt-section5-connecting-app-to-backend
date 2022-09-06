import Vuex from "vuex";
/* 1) Import axios */
import axios from "axios";

/* EXPLANATION: I want to fetch the data I have
send to the database, containing the info the
user filled in the form, here in the store, so
that it is available to all the components. */

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        /* 2) We fetch the data inside the nuxtServerInit method.
        In reality, we rarely want to fetch all posts in one step.
        We might just want to fetch a slice and then re fetch them
        as the user navigates around the app. In our app, it is ok
        to fetch all the posts at once. */
        /* 3) return get http request. The first parameter is the url
        from which I want to fetch inclusing .json at the end beacause
        this is firebase.*/
        return axios.get('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
        /* 4) In the then block I get the response with the data. But from firebase
        I get an object containing all my posts not an array. So I have to 
        convert it to an array. Lets do that in the next steps... */
          .then(res => {
            /* 5) create an empty array */
            const postsArray = []
            /* 6) Loop through all the keys of the data object
            we get back from the database.  */
            for (const key in res.data) {
              /* 7) Push the values of each key into the 
              postsArray array: postsArray.push(res.data[key]) */
              /* 8) We can store the actual id by pushing a new object
              where we use the spread operator to pull out all 
              the properties we have in that data object we´re 
              fetcing for a given key. The we can add the id
              property. */
              postsArray.push({ ...res.data[key], id: key })
            }
            /* 9) Commit the postsArray to the setPosts in the
            mutations property. */
            vuexContext.commit('setPosts', postsArray)
          })
          /* 10) Catch errors */
          .catch(e => context.error(e));
          /* 11) Now If I go to my main page. I will see the
          first post I added. I will get an error in the console
          bacause of the thumbnail and the PostPreview, which we´ll
          fix in the next branch. */
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
