<template>
  <!-- 2) When we submit the form we call the 
  onSave method, which is here in this component. -->
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>
    <AppControlInput
      control-type="textarea"
      v-model="editedPost.content">Content</AppControlInput>
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
            thumbnailLink: "",
            content: ""
          }
    };
  },
  methods: {
    /* 3) Here in the onSve method we have to 
    emit a custom event that allows us to handle
    the form submission in whichever component the
    AdmiPostForm component is (in this app, it is
    in the new-post page inside the admin section.) 
    When I emit I include the name of the even 
    I´m emiting, I this case I choose the name
    'submit'. I also, pass the data I want to
    emit. In this case, I want to emit the data the
    user enters, which is editedPost in the data()
    of this component. Here I could add validation
    but I´m just going to focus in the submission.
    Next step in the new-post page*/
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
