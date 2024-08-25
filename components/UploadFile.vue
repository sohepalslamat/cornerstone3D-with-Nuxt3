<template>
  <div class="upload-container">
    <h2>Upload Your DICOM File</h2>
    <input type="file" @change="onFileChange" accept=".dcm,image/dicom" class="file-input" />
    <p class="file-info">Only .dcm, image/dicom</p>
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
<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #007bff;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: #333;
}

.file-input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
}

.file-input:hover {
  background-color: #e7f1ff;
}

.file-info {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}
</style>