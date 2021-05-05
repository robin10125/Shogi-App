let boardState = [
['lance1','knight1','sgeneral1','ggeneral1','king1','ggeneral1','sgeneral1','knight1','lance1',],
['','rook1','','','','','','bishop1','',],
['pawn1','pawn1','pawn1','pawn1','pawn1','pawn1','pawn1','pawn1','pawn1',],
['','','','','','','','','',],
['','','','','','','','','',],
['','','','','','','','','',],
['pawn2','pawn2','pawn2','pawn2','pawn2','pawn2','pawn2','pawn2','pawn2',],
['','bishop2','','','','','','rook2','',],
['lance2','knight2','sgeneral2','ggeneral2','king2','ggeneral2','sgeneral2','knight2','lance2',]
]
let player1Reserves = []
let player2Reserves = []
let player = 1
//globalPositioningHelper stores last turn's coordinates
let globalPositioningHelper
//globalTokenHelper stores last turn's token
let globalTokenHelper
let movementList
let hasClicked = false
let hasClickedReserve = false
//--Functions--//

function checkOpen(coOrdinates, player){
  //check if on board
  if (coOrdinates[0] > 8 || coOrdinates[0] < 0 || coOrdinates[1] > 8|| coOrdinates[1] < 0) return "notOpen"
  //get token player number
  let tokenPlayer
  tokenPlayer = boardState[coOrdinates[0]][coOrdinates[1]]
  tokenPlayer = tokenPlayer.split("")
  tokenPlayer = tokenPlayer[tokenPlayer.length - 1]
  //check if friendly piece
  if (player == 1 && tokenPlayer == "1") return "notOpen"
  if (player == -1 && tokenPlayer == "2") return "notOpen"
  //check if opponent piece
  if (player == 1 && tokenPlayer == "2") return "opposingPiece"
  if (player == -1 && tokenPlayer == "1") return "opposingPiece"
  //else open
  else {
    return "open"
  }
}
function movement(legalMoveList){
  movementList = []
  let squareId
  let helperSquare
  //adjust CSS of each square
  //add to movementList (global scope variable) elements of legalMoveList (returned from other function) that gets passed to it.
  for (eachSquare of legalMoveList){
    movementList.push(eachSquare)
    squareId = `${eachSquare[0]},${eachSquare[1]}`
    helperSquare = document.getElementById(squareId)
    helperSquare.style.backgroundColor = "beige"
  }
}
function moveToken(tokenType, tokenCoOrdinates, player){
  let legalMoveList
  if (tokenType == 'pawn') {legalMoveList = movePawn(tokenCoOrdinates, player)}
  if (tokenType == 'rook') {legalMoveList = moveRook(tokenCoOrdinates, player)}
  if (tokenType == 'bishop') {legalMoveList = moveBishop(tokenCoOrdinates, player)}
  if (tokenType == 'knight') {legalMoveList = moveKnight(tokenCoOrdinates, player)}
  if (tokenType == 'lance') {legalMoveList = moveLance(tokenCoOrdinates, player)}
  if (tokenType == 'sgeneral') {legalMoveList = moveSilverGeneral(tokenCoOrdinates, player)}
  if (tokenType == 'ggeneral') {legalMoveList = moveGoldGeneral(tokenCoOrdinates, player)}
  if (tokenType == 'king') {legalMoveList = moveKing(tokenCoOrdinates, player)}
  if (tokenType == 'dragonKing') {legalMoveList = moveDragonKing(tokenCoOrdinates, player)}
  if (tokenType == 'dragonHorse') {legalMoveList = moveDragonHorse(tokenCoOrdinates, player)}
  if (tokenType == 'promotedPawn') {legalMoveList = movePromotedPawn(tokenCoOrdinates, player)}
  if (tokenType == 'promotedKnight') {legalMoveList = movePromotedKnight(tokenCoOrdinates, player)}
  if (tokenType == 'promotedLance') {legalMoveList = movePromotedLance(tokenCoOrdinates, player)}
  return legalMoveList
}
//moveToken functions input token co ordinates, and player (1 or -1), and returns a list of co ordinates that are legal to move to by calling appropriate move function for that token
function movePawn(pawnCoOrdinates, player){
  //pawn moves 1 forward.  Player is 1 or -1.
  let legalMoveList = []
  let helperSquare = [pawnCoOrdinates[0] + player, pawnCoOrdinates[1]]
  if (checkOpen(helperSquare, player) == "open" || checkOpen(helperSquare,player) == "opposingPiece") legalMoveList.push(helperSquare)
  return legalMoveList
}
function moveRook(rookCoOrdinates, player){
  let legalMoveList = []
  let intersecting = false
  let helperSquare = rookCoOrdinates.map((x)=>x)
  let squareState
  //up
  while (!intersecting){
    helperSquare[0] += 1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    }else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  //down
  helperSquare = rookCoOrdinates.map((x)=>x)
  intersecting = false
  while (!intersecting){
    helperSquare[0] += -1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    }else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  //left
  helperSquare = rookCoOrdinates.map((x)=>x)
  intersecting = false
  while (!intersecting){
    helperSquare[1] += -1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    }else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  //right
  helperSquare = rookCoOrdinates.map((x)=>x)
  intersecting = false
  while (!intersecting){
    helperSquare[1] += 1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    }else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  return legalMoveList
}
function moveBishop(bishopCoOrdinates, player){
  
  let legalMoveList = []
  let intersecting = false
  let helperSquare = bishopCoOrdinates.map((x) => x)
  let squareState
  //up right vector
  while (!intersecting){
    helperSquare[0] += 1
    helperSquare[1] += 1
    squareState = checkOpen(helperSquare, player)
    
    if (squareState == "notOpen") {
      intersecting = true
    } else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else {
      legalMoveList.push([helperSquare[0], helperSquare[1]])
      }
  }
  //down right vector
  helperSquare = bishopCoOrdinates.map((x) => x)
  intersecting = false
  while (!intersecting){
    helperSquare[0] += -1
    helperSquare[1] += 1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    } else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else {
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    }
  }
  //up left
  helperSquare = bishopCoOrdinates.map((x) => x)
  intersecting = false
  while (!intersecting){
    helperSquare[1] += -1
    helperSquare[0] += 1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    } else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  //down left
  helperSquare = bishopCoOrdinates.map((x) => x)
  intersecting = false
  while (!intersecting){
    helperSquare[1] += -1
    helperSquare[0] += -1
    squareState = checkOpen(helperSquare, player)
    if (squareState == "notOpen") {
      intersecting = true
    } else if (squareState == "opposingPiece") {
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  return legalMoveList
}
function moveKnight(knightCoOrdinates, player){
  let legalMoveList = []
  let helperSquare = knightCoOrdinates.map((x)=>x)
  helperSquare[0] += (2 * player)
  helperSquare[1] += 1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  return legalMoveList
}
function moveLance(lanceCoOrdinates, player){
  let intersecting = false
  let helperSquare = lanceCoOrdinates.map((x)=>x)
  let legalMoveList = []
  while (!intersecting){
    helperSquare[0] += player
    if (checkOpen(helperSquare, player) == "notOpen") intersecting = true
    else if (checkOpen(helperSquare, player) == "opposingPiece"){
      intersecting = true
      legalMoveList.push([helperSquare[0], helperSquare[1]])
    } else legalMoveList.push([helperSquare[0], helperSquare[1]])
  }
  return legalMoveList
}
function moveSilverGeneral(silverGeneralCoOrdinates, player){
  let legalMoveList = []
  let helperSquare = silverGeneralCoOrdinates.map((x)=>x)
  //forward movements
  helperSquare[0] += player
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += 2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //backwards movements
  helperSquare[0] += -2 * player
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  return legalMoveList
} 
function moveGoldGeneral(goldGeneralCoOrdinates, player){
  let legalMoveList = []
  let helperSquare = goldGeneralCoOrdinates.map((x)=>x)
  //forward movements
  helperSquare[0] += player
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += 2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //sideways movements
  helperSquare[0] += -player
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //backwards movement
  helperSquare = goldGeneralCoOrdinates
  helperSquare[0] += -player
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])

  return legalMoveList
}
function moveKing(kingCoOrdinates, player){
  let legalMoveList = []
  let helperSquare = kingCoOrdinates.map((x)=>x)
  //forward movements
  helperSquare[0] += 1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += 2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //sideways movements
  helperSquare[0] += -1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //backwards movements
  helperSquare[0] += -1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += 1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += 1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  
  return legalMoveList
}
function moveDragonKing(dragonKingCoOrdinates, player){
  let legalMoveList = moveRook(dragonKingCoOrdinates, player)
  let helperSquare = dragonKingCoOrdinates.map((x)=>x)
  //forward movements
  helperSquare[0] += 1
  helperSquare[1] += 1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //backwards movements
  helperSquare[0] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  helperSquare[1] += 2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  return legalMoveList
}
function moveDragonHorse(dragonHorseCoOrdinates, player){
  let legalMoveList = moveBishop(dragonHorseCoOrdinates, player)
  let helperSquare = dragonHorseCoOrdinates.map((x)=>x)
  //forward movements
  helperSquare[0] += 1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //backwards movement
  helperSquare[0] += -2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //left movement
  helperSquare[0] += 1
  helperSquare[1] += -1
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  //right movements
  helperSquare[1] += 2
  if (checkOpen(helperSquare, player) !== "notOpen") legalMoveList.push([helperSquare[0], helperSquare[1]])
  return legalMoveList
}
function movePromotedPawn(promotedPawnCoOrdinates, player){
  return moveGoldGeneral(promotedPawnCoOrdinates, player)
}
function movePromotedLance(promotedLanceCoOrdinates, player){
  return moveGoldGeneral(promotedLanceCoOrdinates, player)
}
function movePromotedKnight(promotedKnightCoOrdinates, player){
  return moveGoldGeneral(promotedKnightCoOrdinates, player)
}
function promote(coOrdinates, token){
  //format token to get player and token type
  let splitToken = token.split("")
  let player1or2 = splitToken[splitToken.length -1]
  splitToken.splice(-1, 1)
  let tokenName = splitToken.join("")
  let promotedPiece
  if (tokenName == "pawn"){
    promotedPiece = `promotedPawn${player1or2}`
    boardState[coOrdinates[0]][coOrdinates[1]] = promotedPiece
  }
  if (tokenName == "lance"){
    promotedPiece = `promotedLance${player1or2}`
    boardState[coOrdinates[0]][coOrdinates[1]] = promotedPiece
  }
  if (tokenName == "knight"){
    promotedPiece =`promotedKnight${player1or2}`
    boardState[coOrdinates[0]][coOrdinates[1]] = promotedPiece
  }
  if (tokenName == "sgeneral"){
    promotedPiece = `ggeneral${player1or2}`
    boardState[coOrdinates[0]][coOrdinates[1]] = promotedPiece
  }
  if (tokenName == "rook"){
    promotedPiece = `dragonKing${player1or2}`
    boardState[coOrdinates[0]][coOrdinates[1]] = promotedPiece
  }
  if (tokenName == "bishop"){
    promotedPiece = `dragonHorse${player1or2}`
    boardState[coOrdinates[0]][coOrdinates[1]] = promotedPiece
  }
}
function render(){
  for (i=8; i>-1; i--){
    for (j=0; j<9; j++){
      let square = document.getElementById(`${i},${j}`)
      square.innerText = boardState[i][j]
      square.style.backgroundColor = "#ffd480"
      createImg(square, '30')
    }
  }
  //render tokens onto appropriate reserve square
  let squareCount = 0
  for (eachElement1 of player1Reserves){
    let reserveSquare1 = document.getElementById(`${squareCount}1`)
    reserveSquare1.innerText = eachElement1
    squareCount += 1
  }
  squareCount = 0
  for (eachElement2 of player2Reserves){
    let reserveSquare2 = document.getElementById(`${squareCount}2`)
    reserveSquare2.innerText = eachElement2
    squareCount += 1
  }
  
}
function createImg(square, size){
  let newImg
  let token = square.innerText
  if (token == "pawn1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogipawn-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
    }
  if (token == "rook1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogirook-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "bishop1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogibishop-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "lance1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogilance-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "knight1"){
    newImg = document.createElement('img')
    newImg.src = 'https://chessvariants.com/piececlopedia.dir/shogihorse-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "sgeneral1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/silver-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "ggeneral1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/gold-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "king1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogiking-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "dragonKing1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/prook-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "dragonHorse1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/pbishop-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "promotedPawn1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/ppawn-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "promotedLance1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/plance-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  if (token == "promotedKnight1"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/phorse-piece.gif'
    newImg.height = size
    square.appendChild(newImg)
  }
  
  if (token == "pawn2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogipawn-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "rook2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogirook-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "bishop2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogibishop-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "lance2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogilance-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "knight2"){
    newImg = document.createElement('img')
    newImg.src = 'https://chessvariants.com/piececlopedia.dir/shogihorse-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "sgeneral2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/silver-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "ggeneral2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/gold-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "king2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/shogiking-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "promotedKnight2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/phorse-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "promotedLance2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/plance-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "promotedPawn2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/ppawn-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "dragonKing2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/prook-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  if (token == "dragonHorse2"){
    newImg = document.createElement('img')
    newImg.src = 'https://www.chessvariants.com/piececlopedia.dir/pbishop-piece.gif'
    newImg.height = size
    newImg.style.transform = 'rotate(180deg)'
    square.appendChild(newImg)
  }
  //todo: make logic to do above in less code
}
function init(){
  
  let initMainDiv = document.getElementById("board")
  for (i=8; i>-1; i--){
    for (j=0; j<9; j++){
        let square = document.createElement("div")
        square.className = "square"
        square.id = `${i},${j}`
        initMainDiv.appendChild(square)
        
    }
  //init reserve grids
  } 
  let reserve1 = document.getElementById("reserve1")
  let reserve2 = document.getElementById("reserve2")
  for (k = 0; k < 36; k++){
    let reserveSquare1 = document.createElement("div")
    reserveSquare1.id = `${k}1`
    reserveSquare1.className = "reserve-square"
    reserveSquare1.style.margin = "1px"
    reserveSquare1.innerText = `${k}`
    reserve1.appendChild(reserveSquare1)
    
    let reserveSquare2 = document.createElement("div")
    reserveSquare2.id = `${k}2`
    reserveSquare2.className = "reserve-square"
    reserveSquare2.style.margin = "1px"
    reserveSquare2.innerText = `${k}`
    reserve2.appendChild(reserveSquare2)
  }
  render()
}
function checkWin(){
  let winNotice = document.getElementById("win-notice")
  if (player1Reserves.includes("king2")) {
    winNotice.style.display = 'block'
    winNotice.innerText = "Player 1 Wins!"
    setTimeout(() => {
      winNotice.style.display = "none";
    }, 3000)
  }
  
  if (player2Reserves.includes("king1")) {
    winNotice.style.display = "block"
    winNotice.innerText = "Player 2 Wins!"
    setTimeout(() => {
      winNotice.style.display = "none"
    }, 3000)
  }
}
//set up board grid, with unique id for each space that is a string co-ordinate, 
let mainDiv = document.getElementById("board")
init()
//event listener for spaces
mainDiv.addEventListener("click", function(evt){
  //get id (string of co ordinates, convert to int
  let squareSelect = evt.target
  let coOrdinates = squareSelect.id
  let tokenPlayer 
  let legalMoveList

  coOrdinates = coOrdinates.split(",")
  coOrdinates[0] = parseInt(coOrdinates[0])
  coOrdinates[1] = parseInt(coOrdinates[1])
  //access game state using co ordinates
  let tokenSelect = boardState[coOrdinates[0]][coOrdinates[1]]

  if (hasClickedReserve && tokenSelect == ""){
    boardState[coOrdinates[0]][coOrdinates[1]] = globalTokenHelper
    if (player == 1) player1Reserves.splice(globalPositioningHelper, 1)
    if (player == -1) player2Reserves.splice(globalPositioningHelper, 1)
    player = player * -1
    hasClickedReserve = false
    render()
  }

  if (hasClicked == true){
    for (eachSquare of movementList){
      if (eachSquare[0] == coOrdinates[0] && eachSquare[1] == coOrdinates[1]){
        //push taken token to reserve
        if (boardState[coOrdinates[0]][coOrdinates[1]] !== ""){
          if (player == 1) player1Reserves.push(boardState[coOrdinates[0]][coOrdinates[1]])
          else player2Reserves.push(boardState[coOrdinates[0]][coOrdinates[1]])
        }
        //update game state
        let localTokenHelper = globalTokenHelper
        boardState[coOrdinates[0]][coOrdinates[1]] = localTokenHelper
        //delete old position 
        boardState[globalPositioningHelper[0]][globalPositioningHelper[1]] = ""

        if (coOrdinates[0] == 4 + 4*player){
          promote(coOrdinates, localTokenHelper)
        }
        player = player * -1
      }
    }
    hasClicked = false
    //display not legal move popup
    //display return button and have it return to base
    
    render()
    checkWin()
  }else{
    globalTokenHelper = tokenSelect
    globalPositioningHelper = [coOrdinates[0], coOrdinates[1]] 
    tokenSelect = tokenSelect.split("")
      
    tokenPlayer = tokenSelect[tokenSelect.length - 1]

    tokenSelect.splice(-1,1)
    tokenSelect = tokenSelect.join("")
    //Run movements
    if (player == 1 && tokenPlayer == "1") {
      hasClicked = true      
      legalMoveList = moveToken(tokenSelect, coOrdinates, player)
      movement(legalMoveList)
      }
    if (player == -1 && tokenPlayer == "2"){
      hasClicked = true      
      legalMoveList = moveToken(tokenSelect, coOrdinates, player)
      movement(legalMoveList)
    }
  }
})

//use global helpers to interact with other event listener to place down piece
let reserveDiv1 = document.getElementById("reserve1")
let reserveDiv2 = document.getElementById("reserve2")
reserveDiv1.addEventListener("click", function(evt){
  if (hasClicked == false && player == 1){
    selectToken = evt.target
    selectToken = selectToken.id
    selectToken = selectToken.split("")
    let reserveIndex = parseInt(selectToken[0])
    let tokenType = player1Reserves[reserveIndex]
    //convert token type to player 1 token
    if (tokenType !== undefined){
      tokenType = tokenType.split("")
      tokenType.splice(-1,1)
      tokenType = tokenType.join("")
      tokenType = `${tokenType}1`
      globalTokenHelper = tokenType
      globalPositioningHelper = reserveIndex
      hasClickedReserve = true
    }
  } 
})
reserveDiv2.addEventListener("click", function(evt){
  if (hasClicked == false && player == -1){
    selectToken = evt.target
    selectToken = selectToken.id
    selectToken = selectToken.split("")
    let reserveIndex = parseInt(selectToken[0])
    let tokenType = player2Reserves[reserveIndex]
    //convert token type to player 1 token
    if (tokenType !== undefined){
      tokenType = tokenType.split("")
      tokenType.splice(-1,1)
      tokenType = tokenType.join("")
      tokenType = `${tokenType}2`
      globalTokenHelper = tokenType
      globalPositioningHelper = reserveIndex
      hasClickedReserve = true
    }
  }
})

let resetButton = document.getElementById("reset")
resetButton.addEventListener("click", function(evt){
  boardState = [
    ['lance1','knight1','sgeneral1','ggeneral1','king1','ggeneral1','sgeneral1','knight1','lance1',],
    ['','rook1','','','','','','bishop1','',],
    ['pawn1','pawn1','pawn1','pawn1','pawn1','pawn1','pawn1','pawn1','pawn1',],
    ['','','','','','','','','',],
    ['','','','','','','','','',],
    ['','','','','','','','','',],
    ['pawn2','pawn2','pawn2','pawn2','pawn2','pawn2','pawn2','pawn2','pawn2',],
    ['','bishop2','','','','','','rook2','',],
    ['lance2','knight2','sgeneral2','ggeneral2','king2','ggeneral2','sgeneral2','knight2','lance2',]
  ]
  player1Reserves = []
  player2Reserves = []
  player = 1
  hasClicked = false
  hasClickedReserve = false
  render()
})
//todo: reserve grid is not updating visuals after placing token, instead updates after conquering token
//implement reset button thatresets all values