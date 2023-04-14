<script setup lang="ts">
import { ref } from '@vue/runtime-dom';
import { Player } from '../models/Player';


defineProps<{ winner: string }>()

let highscores:Player[]= JSON.parse(localStorage.getItem("highscore")|| "[]");
let players =ref<Player[]>(highscores)



</script>

<template>
 
    <section class ="scores">
      <article> Congratulation:<p class="winner"> {{ winner }}</p>  you are the winner! </article>
      <article v-for="player in players" :key="player.name">{{player.name}}</article>  
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