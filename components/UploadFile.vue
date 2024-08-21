<template>
  <input type="file" @change="onFileChange" accept="image/*" />
</template>

<script setup lang="ts">

  const emit = defineEmits(['image-uploaded']);
  const imgUrl: Ref<null | string> = ref(null);

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      imgUrl.value = URL.createObjectURL(file);
      emit('image-uploaded', imgUrl.value);
    }
  };
</script>