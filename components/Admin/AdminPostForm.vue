<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <!-- 3) Update the name of the property to just thumbnail. -->
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput
      control-type="textarea"
      v-model="editedPost.content">Content</AppControlInput>
    <!-- 4) Add a textarea input which will allow us to
    post and fetch a preview text-->
    <AppControlInput
      control-type="textarea"
      v-model="editedPost.previewText">Preview Text</AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
import AppControlInput from "@/components/UI/AppControlInput";
import AppButton from "@/components/UI/AppButton";

export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            /* 2) Change the name of the property thumbnailLink to 
            thumbnail. So that we´re in line with other components
            where we try to access this property. */
            thumbnail: "",
            content: "",
            /* 5) We nee to add the prveiw text
            filed we just added in the template
            to the editedPost object, so that
            we can send it to the database. */
            previewText: ""
          }
          /* 6) Go to firebase, delate the firt post
          and create a new one clickin on the create 
          post button in our app. Now if I manually 
          navigate back to the main page, I will see
          the new post I submitted.*/
    };
  },
  methods: {
    onSave() {
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      // Navigate back
      this.$router.push("/admin");
    }
  }
};
</script>
