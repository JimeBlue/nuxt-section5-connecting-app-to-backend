<template>
  <!-- EXPLANATION: when the user clicks on a post in 
  the admin page, a form opens, where I can edit a 
post. When I click on save I want to save the changes
the user made to the backend, to the database. -->
  <div class="admin-post-page">
    <section class="update-form">
      <!-- 1) Listen to the custom event "submit" sent
      from the AdminPostForm and call the onSubmitted
    method in this component. -->
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

import axios from 'axios'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },

  asyncData(context) {
    return  axios.get('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts/' +  context.params.postId  + '.json')
      .then(res => {
        return {
          loadedPost: res.data
        }
      })

      .catch(e => context.error(e))
  },
  /* 2) Add the onSubmitted method and receive the editedPost
  property comming from  AdminPostForm */
    methods: {
    onSubmitted(editedPost) {
      /* 3) Make a put request using axios to put whatever
      the user edits in the place of the old post. */
      /* 4) I don't get the postId from the context but
      from this.$route. This is because we're not running
      on the server now, the component has been created, 
      the route has been injected and we can access it with
      $route. */
      /* 5) The first argument in the put request is the
      url of my database + the specific id. The second
      argument is the data we want to send to the database.
      In this case editedPost, which will replace the data
      that was entered before.*/
      axios
      .put(
        "https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts/" +
          this.$route.params.postId +
          ".json", editedPost
      )
      /* 9) Instead of console log the response,
      redirect the user to the admin page, once the
      edition is finished. */
      .then(res => {
       this.$router.push("/admin")
      })
      /* 10) Now, when we click on save, we get
      redirected to the admin page. But the problem
      is that we can't see the latest edion, unless we
      reload the page. The post is not updated. The reason
      for this is that we'rw getting the data from the store,
      where the data is not updated. We got the data in the
      initial run in the store, but if the data gets
      manipulated it won't update. We have to do it
      ourselves. I´ll do that in the next branch. */
      /* 7) Catch an error and just log it to the consol.
      If we want to handle it, for example, to show a message,
      we can do it here. But we can´t load the error page 
      because we're not running on the server. */
      .catch(e => console.log(e));
    }
    /* 8) Now I go to my app, click on a post
    in the admin area and edit it. Click save.
    If I go to the admin page again, I'll see
    the post with my edition. In firebase I'll
    see my edition too. */
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
