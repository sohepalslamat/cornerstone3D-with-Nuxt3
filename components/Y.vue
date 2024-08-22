<template>
  <div>
    <h1>Medical Image Upload</h1>
    <FileUpload @image-uploaded="setImage" />
    <div id="content"></div>
  </div>
</template>

<script setup lang="ts">
  import FileUpload from '@/components/UploadFile.vue';
  import { wadouri } from '@cornerstonejs/dicom-image-loader';
  import {
    RenderingEngine,
    Enums,
    init as csInit,
    type Types,
  } from '@cornerstonejs/core';
  import { init as csTools3dInit } from '@cornerstonejs/tools';

  const renderingEngineRef = ref<RenderingEngine | null>(null);
  initCornerstoneDICOMImageLoader()

  onMounted(() => {
    const content = document.getElementById('content');

    const element = document.createElement('div');
    element.id = 'cornerstone-element';
    element.style.width = '500px';
    element.style.height = '500px';

    content?.appendChild(element);

    setup(element);
  });

  async function setup(element: HTMLDivElement) {
    // Initialize Cornerstone
    await csInit();
    csTools3dInit();

    // Create rendering engine and set up the viewport
    const renderingEngineId = 'myRenderingEngine';
    renderingEngineRef.value = new RenderingEngine(renderingEngineId);

    const viewportInput = [
      {
        viewportId: 'CT_STACK',
        type: Enums.ViewportType.STACK,
        element,
        defaultOptions: {
          background: <Types.Point3>[0.2, 0, 0.2],
        },
      },
    ];

    // Set viewports
    renderingEngineRef.value.setViewports(viewportInput);
  }

  const setImage = async (file: File) => {
    // Convert uploaded file to a URL for Cornerstone
    const imageId = wadouri.fileManager.add(file);

    // Register the file with Cornerstone
    const viewport = renderingEngineRef.value!.getViewport('CT_STACK') as Types.IStackViewport;
    await prefetchMetadataInformation([imageId]);
    const stack = convertMultiframeImageIds([imageId]);
    // Set the stack on the viewport

    // Use the appropriate method to set the image stack
    viewport.setStack(stack).then(() => {
      viewport.render();
    })
  };
</script>

<style scoped>
  #content {
    width: 100%;
    height: 100%;
  }
</style>