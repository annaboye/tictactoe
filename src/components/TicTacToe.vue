<script setup lang="ts">
import Board from './Board.vue'
import StartForm from './StartForm.vue'
import { ref } from 'vue';
let beforeGame = ref(true);

function handleStart(x: string, o: string){
  console.log(x,o)
  beforeGame.value= false;
  
}
</script>

<template>
  <h1>TIC TAC TOE</h1>
  <StartForm v-if="beforeGame" @addPlayers="handleStart"></StartForm>
  <Board v-else />

</template>

<style scoped>

</style>