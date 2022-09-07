<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <!-- 5) Here we have a problem. The loadedPost wants to output the
        updatedDate property. But in our form we don't have that property
        and we're not sending it to the database. Next step in new-post
        page. -->
        <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a
          href="mailto:feedback@my-awesome-domain.com">feedback@my-awesome-domain.com</a>.</p>
    </section>
  </div>
</template>

<script>
/* 1) Import axios */
import axios from 'axios'

export default {
  /* EXPLANATION: here we're fetching a single post using
  asyncData () instead of calling our store. The idea
 behind this is that in our store we may not have all 
 posts. We may have a slice of all posts in the database.
 Imagine there're 1000 posts. We don't want to show all
 of them in the main page, just a few. So in my store 
 I may have 10 post. But here I want to access all the
 posts in the database to show the post with the specific
 ID the user clicks on.*/
  async asyncData(context) {
    /* 2) Return the http get request using axios.
   the parameter of the get method must be the url of my datbase,
   like we did when we fetch all posts, but this time it should
   contain the specific id for the post requested by the user.
   So, to get the id, we access context.params.id . At the end we
   need to add .json because that´s something firebase requires.  */
    return await axios.get('https://nuxt-blog-abebd-default-rtdb.europe-west1.firebasedatabase.app/posts/' +  context.params.id  + '.json')
      /* 3) In the then block, we get the response with the
     data we fetch. So, set that data to the
     loadedPost propery I'm going to use in the template to 
     output the data.*/
      .then(res => {
        return {
          loadedPost: res.data
        }
      })
      /* 4) Catch an error. If we catch an error, 
     I use context.error and call that method to
     call the error page. */

      .catch(e => context.error(e))
  }
/* 5) Now, go to firebase and delete the exisiting post.
Enter a new post from the app and go to firebase again.
In the post entry the property updatedDate is available.
Now, go to the main page or the posts page, click on a 
post and the data enter for that is displayed.
 */
};
</script>





<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
