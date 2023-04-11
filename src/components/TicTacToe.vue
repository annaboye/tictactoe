<script setup lang="ts">
import SquaresForBoard from './SquaresForBoard.vue'
import StartForm from './StartForm.vue'
import { ref } from 'vue';
import {Player} from '../models/Player';

let beforeGame = ref(true);
let gameRunning = ref(false);
let players = ref<Player[]>([]);

let currentPlayer= ref<string>("X")




function handleStart(x: string, o: string){
  console.log(x,o)
players.value.push(new Player(x, false, false, "X"), new Player(o, true, false, "O") )
  currentPlayer.value = players.value[0].name;

  console.log(players);
  beforeGame.value= false;
  gameRunning.value= true;  
}

function squareClicked(n:number){
    togglePlayer(players.value)
    console.log(n)
}

function togglePlayer(players: Player[]){
players[0].currentPlayer = !players[0].currentPlayer
players[1].currentPlayer = !players[1].currentPlayer
currentPlayer
    
}

</script>

<template>
  <h1>TIC TAC TOE</h1>
  <StartForm v-if="beforeGame" @addPlayers="handleStart"></StartForm>
  <div  v-else class="board">
    <SquaresForBoard v-for="n in 9" :key="n" @click="squareClicked(n)"/>
  </div>
<div v-for="player, index in players"  :key="index" ><p v-if="player.currentPlayer">{{player.name}}: make your move</p> </div>
  
 

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

</style>