<script setup lang="ts">
import SquaresForBoard from './SquaresForBoard.vue'
import StartForm from './StartForm.vue'
import { ref, onMounted} from 'vue';
import {Player} from '../models/Player';
import ScoreBoard from './ScoreBoard.vue';

let beforeGame = ref<boolean>();
let players = ref<Player[]>(JSON.parse(localStorage.getItem("currentGamePlayers") || "[]"));
let endGame= ref<boolean>(false)
let winner = ref<string>("");
let isTie= ref<boolean>(false);
let board =  ref([
          '', '', '',
          '', '', '',
          '', '', ''
        ]);

if (players.value.length<1){
beforeGame.value=true
}
else {
beforeGame.value= false;
}
function clickedSquaresInLs(){
  players.value.forEach(player => {
    player.clickedSquares.forEach(clickedSquare => {
     if(clickedSquare<9){
      board.value[clickedSquare]= player.type
     }
    });  
  });
};
onMounted(()=>{
    if (beforeGame.value=== false){
      clickedSquaresInLs()
    }} )

function handleStart(xName: string, oName: string){
players.value.push(new Player(xName, false, 0, "X", []), new Player(oName, true, 0, "O",[]) )
beforeGame.value= false;
}
 
const checkTie =()=>{
  if(players.value[0].clickedSquares.length + players.value[1].clickedSquares.length===9){
  isTie.value=true
  endGame.value=true
  winner.value="It's a tie"}
  if(isTie.value){
    players.value[0].clickedSquares=[];
    players.value[1].clickedSquares=[];
  }
}
const calculateWinner = (clickedSquares: number[], player: Player) => {
        const winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
       
			for (let i = 0; i < winnerLines.length; i++) {
				let winnerCells= winnerLines[i]
        let countMatches= 0;

        for (let y= 0; y < clickedSquares.length; y++) {
          if (winnerCells[0] === clickedSquares[y] || winnerCells[1]=== clickedSquares[y] || winnerCells[2]=== clickedSquares[y])
           {
            countMatches++; 
          }
          if (countMatches===3){
            winner.value = player.name;
            player.scores++;
            winner.value = player.name;
            players.value[0].clickedSquares=[];
            players.value[1].clickedSquares=[];
            return true
          }
        }
      }

    
    return false
};

function togglePlayer(){
players.value[0].currentPlayer = !players.value[0].currentPlayer
players.value[1].currentPlayer = !players.value[1].currentPlayer
}

function eachMove(i:number){
  players.value.forEach(player => {
        if(player.currentPlayer){
         player.clickedSquares.push(i)
         board.value[i]= player.type
         endGame.value=calculateWinner(player.clickedSquares, player)
         
        }
    });
    checkTie();
    togglePlayer()
    localStorage.setItem("currentGamePlayers", JSON.stringify(players.value))
   
}

function startOver(){
  localStorage.clear()
  window.location.reload()
}
</script>

<template>
  <h1>TIC TAC TOE</h1>
  <ScoreBoard :is-tie="isTie" :players="players" :winner="winner" v-if="endGame"></ScoreBoard>
  <div v-if="!beforeGame&&!endGame">
   <div>{{ players[0].name }} VS {{ players[0].name }} </div>
   <div v-for="player, index in players" :key="index" ><p v-if="player.currentPlayer">{{player.name}}--{{player.type }}: make your move</p>
   </div>
  </div>
  <StartForm v-if="beforeGame" @addPlayers="handleStart"></StartForm>
  <div  v-else class="board" >
    <SquaresForBoard v-for="square, index in board" :key="index" :disabled="square.length>0 || endGame"  @click.once="eachMove(index)" :squareText="square" />
  </div>
  <button class="restart" v-if="!beforeGame&&!endGame" @click="startOver">Start Over</button>

 

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
.restart{
  margin: 10px;
}

</style>