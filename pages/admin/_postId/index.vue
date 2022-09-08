<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
/* 3) Import axios */
import axios from 'axios'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  /* 4) fetch all posts from database using asyncData and getting
  the specific id. */
  asyncData(context) {
    return  axios.get('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts/' +  context.params.postId  + '.json')
      .then(res => {
        return {
          loadedPost: res.data
        }
      })

      .catch(e => context.error(e))
  }
}
/* 5) Now, if I go to my app and navigate to
the admin section I will be able to see the 
post. When clicking on it I'll see the form
to edit it. */
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
