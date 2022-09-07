<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <!-- 1) We have the form with all 
      the info the user enters, which we
    post to the database in the AdminPostForm
    component. So next step there. -->
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>
<!-- EXPLANATION: currently we get an error in the
console because in the main page we display a
post link and a preview text. But when we add
a new post we´re not sending this information 
to the database. So we need to chane the data
we fetch and the data we store. -->

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
      axios.post('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
        .then(result => console.log(result))
        .catch(e => console.log(e))
    }
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

