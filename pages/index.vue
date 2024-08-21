<template>
    <div>
        <h1>Medical Image Upload</h1>
        <FileUpload @image-uploaded="setImage" />
        <!-- <img v-if="image" :src="image" alt="Uploaded Medical Image" /> -->
        <canvas v-if="image" ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    import FileUpload from '~~/components/UploadFile.vue';

    const image: Ref<null | string> = ref(null);
    const canvas: Ref<null | HTMLCanvasElement> = ref(null);

    const setImage = (imgUrl: string) => {
        image.value = imgUrl;
        drawImageOnCanvas(imgUrl);
    };

    const drawImageOnCanvas = (imgUrl: string) => {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            if (!canvas.value) return
            const ctx = canvas.value.getContext('2d');
            if (ctx) {
                canvas.value.width = img.width;
                canvas.value.height = img.height;
                ctx?.drawImage(img, 0, 0);
                drawCircle(110, 150, 10); // Example circle
            }
        };
    };

    const drawCircle = (x: number, y: number, radius: number) => {
        const ctx = canvas.value?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'green';
            ctx.stroke();
        }
    };
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