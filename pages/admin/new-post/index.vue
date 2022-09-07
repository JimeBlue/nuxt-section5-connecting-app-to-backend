<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      /* 6) Here I'm sending to the database the new post the user 
      entered in the form. The new post is received from the AdminPostForm
      in the property postData. */
      /* 7) Instead of just sending postData to the database, let's send
      a new object. Use the spread operator to spread all the data
      from postData and we add a new property, updatedDate: new Date(),
      which we set to new Date() */
      axios.post('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts.json', {...postData, updatedDate: new Date()})
        .then(result => console.log(result))
        .catch(e => console.log(e))
    }
  }
  /* 8) Go to firebase, remove the post crated
  earlier and then go to the app and add a new
  post. Go to firebase again. In the post entry the 
  property updatedDate is available.
  IMPORTANT: the date field is not included
  in the form. It will be seen in the database
  with the date the user entered the post.
  Now, go to the main page or the posts page, click on a 
  post and the data enter for that is displayed.
 */ 
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

