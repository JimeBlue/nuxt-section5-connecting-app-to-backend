<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  methods: {
      /* 12) Dispatch the action addPost to the store,
      passing the postData. Since I return axios in the store,
      I can chain .then to be inform when this async action
      is finished. So, once I´m done, I execute an arrow
      function in which I redirect the user to the admin page.   */
    onSubmitted(postData) {
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push("/admin");
      });
    }
  }
  /* 13) Now test it. If we go to the app and add a new post,
  we'll be redirected to the admin section where We'll
  see the post we've just added in the list. Next step in
  the store */
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

