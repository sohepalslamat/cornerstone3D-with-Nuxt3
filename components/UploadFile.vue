<template>
  <div>
    <input type="file" @change="onFileChange" accept=".dcm,image/dicom" />
    <p>Only .dcm, image/dicom</p>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'image-uploaded', file: File): void;
}>();

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit('image-uploaded', file);
  }
};
</script>