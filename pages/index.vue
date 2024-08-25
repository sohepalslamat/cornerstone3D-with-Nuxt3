<template>
    <ClientOnly>
        <ShowImage />
    </ClientOnly>
</template>

<script setup lang="ts">
    import ShowImage from '~~/components/ShowImage.vue';

    // const image: Ref<null | string> = ref(null);
    // const canvas: Ref<null | HTMLCanvasElement> = ref(null);
    // const circle = ref({ x: 150, y: 150, radius: 30 });
    // let isDragging = ref(false);
    // let offsetX = ref(0);
    // let offsetY = ref(0);

    // const setImage = (imgUrl: string) => {
    //     image.value = imgUrl;
    //     drawImageOnCanvas(imgUrl);
    // };

    // const drawImageOnCanvas = (imgUrl: string) => {
    //     const img = new Image();
    //     img.src = imgUrl;
    //     console.log(img.src)
    //     img.onload = () => {
    //         if (canvas.value) {
    //             const ctx = canvas.value.getContext('2d');
    //             if (ctx) {
    //                 canvas.value.width = img.width;
    //                 canvas.value.height = img.height;
    //                 ctx.drawImage(img, 0, 0);
    //                 // drawCircle();
    //             }
    //         }
    //     };
    // };

    // const drawCircle = () => {
    //     if (!canvas.value) return;
    //     const ctx = canvas.value.getContext('2d');
    //     if (ctx) {
    //         ctx.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear canvas
    //         drawImageOnCanvas(image.value!); // Redraw the image
    //         ctx.beginPath();
    //         ctx.arc(circle.value.x, circle.value.y, circle.value.radius, 0, Math.PI * 2);
    //         ctx.lineWidth = 3;

    //         ctx.strokeStyle = 'green';
    //         ctx.stroke();
    //     }
    // };

    // const startDrag = (event: MouseEvent) => {
    //     const rect = canvas.value?.getBoundingClientRect();
    //     if (rect) {
    //         const mouseX = event.clientX - rect.left;
    //         const mouseY = event.clientY - rect.top;

    //         const dist = Math.sqrt(Math.pow(mouseX - circle.value.x, 2) + Math.pow(mouseY - circle.value.y, 2));

    //         if (dist <= circle.value.radius) {
    //             isDragging.value = true;
    //             offsetX.value = mouseX - circle.value.x;
    //             offsetY.value = mouseY - circle.value.y;
    //         }
    //     }
    // };

    // const dragging = (event: MouseEvent) => {
    //     if (isDragging.value) {
    //         const rect = canvas.value?.getBoundingClientRect();
    //         if (rect) {
    //             const mouseX = event.clientX - rect.left;
    //             const mouseY = event.clientY - rect.top;
    //             circle.value.x = mouseX - offsetX.value;
    //             circle.value.y = mouseY - offsetY.value;
    //             drawCircle();
    //         }
    //     }
    // };

    // const endDrag = () => {
    //     isDragging.value = false;
    // };

    // const resizeCircle = (event: WheelEvent) => {
    //     event.preventDefault(); // Prevent page scrolling
    //     if (event.deltaY < 0) {
    //         // Scroll up, increase radius
    //         circle.value.radius += 2;
    //     } else {
    //         // Scroll down, decrease radius
    //         if (circle.value.radius > 2) circle.value.radius -= 2;
    //     }
    //     drawCircle();
    // };
</script>
<style>
    img {
        max-width: 100%;
        height: auto;
    }

    canvas {
        display: block;
        margin-top: 10px;
    }
</style>