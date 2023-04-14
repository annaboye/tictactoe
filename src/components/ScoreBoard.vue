<script setup lang="ts">
import { ref } from '@vue/runtime-dom';
import { Player } from '../models/Player';


defineProps<{ 
    winner: string
    players: Player[]
    isTie: boolean
}>()
function reMatch(players:Player[]){
players[0].clickedSquares=[];
  players[1].clickedSquares=[];
  localStorage.setItem("currentGamePlayers", JSON.stringify(players))
    window.location.reload()
}
function newGame (){
localStorage.clear()
window.location.reload()
}




</script>

<template>
 
    <section class ="scores">
      <article v-if="!isTie"> Congratulation:<p class="winner"> {{ winner }}</p>  you are the winner! </article>
      <article v-else><p class="winner"> {{ winner }}</p></article>
      <article> {{ players[0].name }} VS {{ players[1].name }}</article>
      <article>{{ players[0].scores}} - {{ players[1].scores }}</article>
      <button @click="reMatch(players)">REMATCH</button>
      <button @click="newGame">START OVER</button>

    </section>

</template>

<style scoped>

.scores {
    width: 450px;
    height: auto;
    margin: 10px;
    
}
.winner{
    font-size: 2em;
}
</style>