<script setup lang="ts">

defineProps<{ 
    squareText: string
}>()


</script>

<template>
    <button class ="square" >{{ squareText }}</button>
</template>

<style scoped>


.square {
    width: 30%;
    height: 30%;
    font-size: xx-large;
    border: 1px solid rgb(64, 60, 60);;
}
.square:disabled{
    color: black;
}
</style>
