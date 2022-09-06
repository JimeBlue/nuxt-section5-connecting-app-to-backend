<template>
  <!-- EXPLANATION: I want to post data to my datbase. 
  I´m using firebase as a databse. To see how to create 
  a database in firebase, see video #55 in this tutorial.
  The user can add a new post only if he/she is an admin.
  So, in the new post page inside the admin section, we
  have the form where the user enters the data, which
  we want to send to our database. -->
  <div class="admin-new-post-page">
    <!-- 1) As I said before, the form is here in 
    the new-post page. But the form is a reusable
    component, AdminPostForm. So, next steps in that
    component. -->
    <section class="new-post-form">
      <!-- 4) Listen to the submit custom event
      commin from AdminPostForm and call the
      onSubmitted method in this component. -->
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
  /* 9) Import axios */
import axios from 'axios'
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    /* 5) In the onSubmitted, I add as an parameter the
    data comming from the custom event "submit" emitted
    by the AdminPostForm component. Here I call the parameter
    postData. */
    onSubmitted(postData) {
      /* 6) Send http request to firebase to store the
      data submitted by the user in firebade. */
      /* 7) Stop the local server temporarily. Install the axios
      library (npm install --save axios). Axios is a js library
      that makes very easy to sent http requests and which also
      runs on the server. */
      /* 8) Now run the development server again */

      /* 10) Use axios. Send a post request by using the post method.
      The first parameter is the url we want to sent the request to. To 
      the url we need to add a node in which we want to store the
      data in and add .json to the end of the node. This is a
      firebase thing. The second argument is the data we want to send. */
      axios.post('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
        /* 11) Add then block bacuse axios methos returns a promise.
        Here I just console log the result */
        .then(result => console.log(result))
        /* 12) catch errors. For now I just console log the error. */
        .catch(e => console.log(e))
    }
    /* 13) Now, I go to admin and click on the create post botton.
    Fill in the form and click save. On the console I can see the
    data. If I go to firebase, I will see the posts node I added and
    the id of my first post. Inside it I´ll see all the data I added */
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>

