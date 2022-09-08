<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
       <!-- 2)Send posts to component where they
      will be displayed as prop. Next step in the _postId page. -->
      <PostList isAdmin :posts="loadedPosts"/>
    </section>
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import AppButton from '@/components/UI/AppButton'
/* EXPLANATION: the assignment: get all the posts from the
store and send them to the PostList component, where they
will be displayed. Also, in the _postId page,
fetch all the posts using asyncDdata*/
export default {
  layout: 'admin',
  components: {
    PostList,
    AppButton
  },
  /* 1) Get posts from store */
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
   
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>

