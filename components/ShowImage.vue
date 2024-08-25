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
  import * as cornerstoneTools from '@cornerstonejs/tools';
  import { PlanarFreehandContourSegmentationTool, segmentation, SegmentationDisplayTool, SegmentSelectTool } from '@cornerstonejs/tools';
  import { addMockContourSegmentation, addRLEFreehandSegmentation } from '~/utils/addMockContourSegmentation';
  import addManipulationBindings from '~/utils/addManipulationBindings';

  const {
    init: csTools3dInit,
    PlanarFreehandROITool,
    ProbeTool,
    ToolGroupManager,
    Enums: csToolsEnums,
  } = cornerstoneTools
  const { KeyboardBindings } = cornerstoneTools.Enums;
  const { ViewportType } = Enums;
  const { MouseBindings } = csToolsEnums;
  const renderingEngineId = 'myRenderingEngine';
  const viewportId = 'CT_STACK';
  const toolGroupId = 'STACK_TOOL_GROUP_ID';

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

    // cornerstoneTools.addTool(PlanarFreehandROITool);
    // cornerstoneTools.addTool(ProbeTool);
    cornerstoneTools.addTool(SegmentationDisplayTool);
    cornerstoneTools.addTool(SegmentSelectTool);
    cornerstoneTools.addTool(PlanarFreehandContourSegmentationTool);

    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
    // toolGroup?.addTool(ProbeTool.toolName);
    toolGroup?.addTool(PlanarFreehandContourSegmentationTool.toolName);
    toolGroup?.setToolActive(PlanarFreehandContourSegmentationTool.toolName, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary, // Shift + Left Click
          modifierKey: KeyboardBindings.Shift,
        },
      ],
    });
    // Set the tool as active
    // toolGroup?.setToolActive(ProbeTool.toolName, {
    //   bindings: [
    //     {
    //       mouseButton: MouseBindings.Primary,
    //     },
    //   ],
    // });
    // toolGroup?.setToolActive(PlanarFreehandROITool.toolName, {
    //   bindings: [
    //     {
    //       mouseButton: MouseBindings.Primary, // Left Click
    //     },
    //   ],
    // });

    // Create rendering engine and set up the viewport

    renderingEngineRef.value = new RenderingEngine(renderingEngineId);

    const viewportInput = [
      {
        viewportId: viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
          background: <Types.Point3>[0.2, 0, 0.2],
        },
      },
    ];

    // Set the tool group on the viewport
    toolGroup?.addViewport(viewportId, renderingEngineId);
    addManipulationBindings(toolGroup);

    // Segmentation Tools
    toolGroup?.addTool(SegmentationDisplayTool.toolName);
    toolGroup?.addTool(SegmentSelectTool.toolName);

    toolGroup?.setToolEnabled(SegmentationDisplayTool.toolName);
    toolGroup?.setToolActive(SegmentSelectTool.toolName);

    // Set viewports
    renderingEngineRef.value.setViewports(viewportInput);
  }

  const setImage = async (file: File) => {
    // Convert uploaded file to a URL for Cornerstone
    const imageId = wadouri.fileManager.add(file);

    // Register the file with Cornerstone
    // const viewport = renderingEngineRef.value!.getViewport(viewportId) as Types.IStackViewport;
    const viewport = <Types.IStackViewport>(
      renderingEngineRef.value!.getViewport(viewportId)
    );

    await prefetchMetadataInformation([imageId]);
    const stack = convertMultiframeImageIds([imageId]);

    await viewport.setStack(stack);
    cornerstoneTools.utilities.stackContextPrefetch.enable(viewport.element);

    const segmentationId = 'contour_segmentation';

    segmentation.addSegmentations([
      {
        segmentationId,
        representation: {
          type: csToolsEnums.SegmentationRepresentations.Contour,
        },
      },
    ]);


    // const rleMaskData = `"324033 38 325215 44 326397 50 327580 53 328764 55 329948 56 331130 62 332314 64 333497 69 334679 74 335862 77 337046 78 338230 80 339415 80 340599 82 341784 83 342968 84 344152 86 345336 88 346521 88 347705 90 348890 90 350075 90 351259 92 352444 92 353629 93 354814 93 355999 93 357184 93 358368 94 359553 94 360737 95 361922 95 363107 95 364292 95 365477 95 366662 95 367847 95 369032 95 370217 95 371402 95 372587 95 373772 95 374957 95 376142 95 377327 94 378513 93 379698 92 380884 91 382069 90 383254 90 384440 88 385625 87386811 86 387997 84 389182 84 390368 82 391553 82 392739 80 393927 77 395114 74 396300 72 397487 69 398673 66 399861 62 401049 57 402237 51 403425 47 404614 40 405800 38 406988 34 408174 31 409362 25`; // Your RLE mask string
      const rleMaskData = [{x:200,y:200},{x:250,y:180},{x:280,y:200},{x:300,y:260},{x:270,y:270},{x:250,y:300},{x:190,y:270},{x:170,y:250},{x:200,y:200}]
    addRLEFreehandSegmentation({
      segmentationId,
      rleMask: rleMaskData,
      viewport: renderingEngineRef.value!.getViewport(viewportId),
    });
    // addMockContourSegmentation({
    //   segmentationId,
    //   viewport: renderingEngineRef.value!.getViewport(viewportId),
    //   contours: [
    //     {
    //       segmentIndex: 1,
    //       radius: 60,
    //     },
    //   ],
    // });

    // Add the segmentation representation to the toolgroup
    await segmentation.addSegmentationRepresentations(
      toolGroupId,
      [
        {
          segmentationId,
          type: csToolsEnums.SegmentationRepresentations.Contour,
        },
      ]
    );

    segmentation.config.setToolGroupSpecificConfig(toolGroupId, {
      renderInactiveSegmentations: true,
      representations: {
        CONTOUR: {
          outlineWidthActive: 2,
          outlineDashActive: '5, 10',
        },
      },
    });

    // Use the appropriate method to set the image stack
    // viewport.setStack(stack).then(() => {

    // })
    viewport.render();
  }
</script>

<style scoped>
  #content {
    width: 100%;
    height: 100%;
  }
</style>