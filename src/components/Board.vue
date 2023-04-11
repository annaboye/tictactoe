<script setup lang="ts">


</script>

<template>
  <div class="board">
    <div class ="square" v-for="n in 9" :key="n"></div>
  </div>
</template>

<style scoped>
.board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
   background-color: rgb(169, 205, 169);
    height:350px;
    width: 350px;
    margin: 0 auto;
}
.square {
    width: 30%;
    height: 30%;
    
    border: 1px solid rgb(64, 60, 60);;
}
</style>
