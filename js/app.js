var grid = $('#grid')
var pawnOne = $('#pawn-one')
var pawnTwo = $('#pawn-two')
var blackPawnTurn = false

for (var i = 0; i < 81; i += 1) {
  if (i % 9 === 0) {
    grid.append('<br>')
  }
  if (i === 4) {
    grid.append('<div class="square" id="start-pos-white"></div>')
  } else if (i === 76) {
    grid.append('<div class="square" id="start-pos-black"></div>')
  } else {
    grid.append('<div class="square"></div>')
  }
}
var playerOne = grid.children('#start-pos-white').append(pawnTwo.attr('src', 'assets/white-pawn.png').css({'height': '63px', 'width': '40px', 'display': 'block', 'position': 'absolute', 'vertical-align': 'middle', 'margin-left': '16px', 'margin-top': '6px'}))
var playerTwo = grid.children('#start-pos-black').append(pawnOne.attr('src', 'assets/black-pawn.png').css({'height': '65px', 'width': '43px', 'display': 'block', 'position': 'absolute', 'vertical-align': 'middle', 'margin-left': '15px', 'margin-top': '6px'}))
//var blackPawnIndex = grid.children('#start-pos-black').index()
var blackPawnIndex = 85
var whitePawnIndex = 5
pawnTwo.draggable({
  revert: 'invalid'
})
pawnOne.draggable({
  revert: 'invalid'
})

// function initialRtSquares(){
//   grid.children()[blackPawnIndex + 1].className += ' rtSquare'
//   grid.children()[blackPawnIndex - 1].className += ' rtSquare'
//   grid.children()[blackPawnIndex - 10].className += ' rtSquare'
//   grid.children()[whitePawnIndex + 1].className += ' rtSquare'
//   grid.children()[whitePawnIndex - 1].className += ' rtSquare'
//   grid.children()[whitePawnIndex + 10].className += ' rtSquare'
// }

// var pawnPosition = { old: null, current: null }
// function updatePawnPosition(pawn) {
//   pawnPosition.old = pawnPosition.current
//   pawnPosition.current = grid.children('.contains-pawn')
// }

//initialRtSquares()
var positions = {}
var startPositionsBlackPawn = {}
var startPositionsWhitePawn = {}
// white pawn start index: 4
// black pawn start index: 76
// function validInitialPositions(initialPawn, pawnStartIndex) {
//   if (initialPawn === pawnTwo) {
//     startPositionsWhitePawn = {currPawn: 'whitePawn', currPos: grid.children('.square')[pawnStartIndex], rtPos: grid.children('.square')[pawnStartIndex - 1], lfPos: grid.children('.square')[pawnStartIndex + 1], topPos: grid.children('.square')[pawnStartIndex + 9]}
//     startPositionsWhitePawn.currPos.className += ' valid-move turn-purple'
//     startPositionsWhitePawn.rtPos.className += ' valid-move turn-red'
//     startPositionsWhitePawn.lfPos.className += ' valid-move turn-red'
//     startPositionsWhitePawn.topPos.className += ' valid-move turn-red'
//     return startPositionsWhitePawn
//   }
//   else if (initialPawn === pawnOne) {
//     startPositionsBlackPawn = {currPawn: 'blackPawn', currPos: grid.children('.square')[pawnStartIndex], rtPos: grid.children('.square')[pawnStartIndex + 1], lfPos: grid.children('.square')[pawnStartIndex - 1], topPos: grid.children('.square')[pawnStartIndex- 9]}
//     startPositionsBlackPawn.currPos.className += ' valid-move turn-yellow'
//     startPositionsBlackPawn.rtPos.className += ' valid-move turn-green'
//     startPositionsBlackPawn.lfPos.className += ' valid-move turn-green'
//     startPositionsBlackPawn.topPos.className += ' valid-move turn-green'
//     return startPositionsBlackPawn
//   }
//
// }
// function validPositions(pawn, pawnIndex) {
//   if (pawn === pawnOne) {
//     positions = {currPawn: 'blackPawn', currPos: grid.children('.square')[pawnIndex], rtPos: grid.children('.square')[pawnIndex + 1], lfPos: grid.children('.square')[pawnIndex - 1], topPos: grid.children('.square')[pawnIndex- 9], botPos: grid.children('.square')[pawnIndex + 9]}
//     positions.currPos.className = 'square'
//     positions.currPos.className += ' valid-move turn-yellow'
//     positions.rtPos.className += ' valid-move turn-green'
//     positions.lfPos.className += ' valid-move turn-green'
//     positions.topPos.className += ' valid-move turn-green'
//     if (pawnIndex < 71) {
//       positions.botPos.className += ' valid-move turn-green'
//     }
//   } else {
//     positions = {currPawn: 'whitePawn', currPos: grid.children('.square')[pawnIndex], rtPos: grid.children('.square')[pawnIndex - 1], lfPos: grid.children('.square')[pawnIndex + 1], topPos: grid.children('.square')[pawnIndex + 9], botPos: grid.children('.square')[pawnIndex - 9]}
//     positions.currPos.className = 'square'
//     positions.currPos.className += ' valid-move turn-purple'
//     positions.rtPos.className += ' valid-move turn-red'
//     positions.lfPos.className += ' valid-move turn-red'
//     positions.topPos.className += ' valid-move turn-red'
//     if (pawnIndex > 8) {
//       positions.botPos.className += ' valid-move turn-red'
//     }
//   }
//   return positions
// }
var whitePawnSquare;
var blackPawnSqaure;
var startRound = 0



var updatePlease = function(){
  //console.log(this)
  validInitialPositions(pawnOne, grid.children('.square').index(this))
}

//$('.turn-green').on('drop', updatePlease)
function validInitialPositions(initialPawn, pawnStartIndex) {
  if (initialPawn === pawnTwo) {
    startPositionsWhitePawn = {currPawn: 'whitePawn', currPos: grid.children('.square')[pawnStartIndex], rtPos: grid.children('.square')[pawnStartIndex - 1], lfPos: grid.children('.square')[pawnStartIndex + 1], topPos: grid.children('.square')[pawnStartIndex + 9]}
    startPositionsWhitePawn.currPos.className += ' turn-purple'
    startPositionsWhitePawn.rtPos.className += ' turn-red'
    startPositionsWhitePawn.lfPos.className += ' turn-red'
    startPositionsWhitePawn.topPos.className += ' turn-red'
    return startPositionsWhitePawn
  }
  else if (initialPawn === pawnOne) {
    if (startRound > 0) {
      if ($(startPositionsBlackPawn.currPos).hasClass('turn-yellow')) {
        // if($(startPositionsBlackPawn.currPos).hasClass('ui-droppable-disabled')) {
        //   console.log('before class name', startPositionsBlackPawn.currPos.className)
        //   $(startPositionsBlackPawn.currPos).removeClass('ui-droppable-disabled')
        //   $(startPositionsBlackPawn.currPos).addClass('ui-droppable')
        //   $(startPositionsBlackPawn.currPos).droppable('enable')
        //   console.log('after class name', startPositionsBlackPawn.currPos.className)
        // }



  }
    $('.turn-green').droppable()
    startPositionsBlackPawn.currPos.className = 'square'
    startPositionsBlackPawn.rtPos.className = 'square'
    startPositionsBlackPawn.lfPos.className = 'square'
    startPositionsBlackPawn.topPos.className = 'square'
    $(startPositionsBlackPawn.topPos).droppable('disable')
    $(startPositionsBlackPawn.rtPos).droppable('disable')
    $(startPositionsBlackPawn.lfPos).droppable('disable')
    //$(startPositionsBlackPawn.currPos).droppable('disable')
  }
    //console.log('before new positions', startPositionsBlackPawn)
    startPositionsBlackPawn = {currPawn: 'blackPawn', currPos: grid.children('.square')[pawnStartIndex], rtPos: grid.children('.square')[pawnStartIndex + 1], lfPos: grid.children('.square')[pawnStartIndex - 1], topPos: grid.children('.square')[pawnStartIndex- 9]}
    startPositionsBlackPawn.currPos.className += ' turn-yellow'
    startPositionsBlackPawn.rtPos.className += ' turn-green'
    startPositionsBlackPawn.lfPos.className += ' turn-green'
    startPositionsBlackPawn.topPos.className += ' turn-green'
    $('.turn-green').on('drop', updatePlease)
    $(startPositionsBlackPawn.topPos).droppable({tolerance: 'fit'})
    $(startPositionsBlackPawn.rtPos).droppable({tolerance: 'fit'})
    $(startPositionsBlackPawn.lfPos).droppable({tolerance: 'fit'})
    $(startPositionsBlackPawn.currPos).droppable({tolerance: 'fit'})
    //console.log('after new positions', startPositionsBlackPawn)
    startRound += 1

    return startPositionsBlackPawn
  }

}

validInitialPositions(pawnTwo, 4)
validInitialPositions(pawnOne, 76)

// var nowPositionsUpdate = function(event, ui){
//   positions.rtPos.className = 'square'
//   positions.lfPos.className = 'square'
//   positions.currPos.className = 'square'
//   positions.botPos.className = 'square'
//   positions.topPos.className = 'square'
//   $(positions.rtPos).droppable('disable')
//   $(positions.lfPos).droppable('disable')
//   $(positions.currPos).droppable('disable')
//   $(positions.botPos).droppable('disable')
//   $(positions.topPos).droppable('disable')
//   validPositions(pawnOne, grid.children('.square').index(this))
//
//   console.log(positions)
// }

// $(startPositionsBlackPawn.topPos).droppable()
// $(startPositionsBlackPawn.rtPos).droppable()
// $(startPositionsBlackPawn.lfPos).droppable()
// $(startPositionsBlackPawn.currPos).droppable()
// $(startPositionsBlackPawn.topPos).on('drop', function(event, ui){
//   // console.log('dropped!!!!')
//   // console.log(grid.children('.square').index(this))
//   startPositionsBlackPawn.rtPos.className = 'square'
//   startPositionsBlackPawn.lfPos.className = 'square'
//   startPositionsBlackPawn.currPos.className = 'square'
//   $(startPositionsBlackPawn.rtPos).droppable('disable')
//   $(startPositionsBlackPawn.lfPos).droppable('disable')
//   $(startPositionsBlackPawn.currPos).droppable('disable')
//   //console.log(startPositionsBlackPawn.currPos.className)
//   validPositions(pawnOne, grid.children('.square').index(this))
//   $(positions.topPos).droppable()
//   $(positions.rtPos).droppable()
//   $(positions.lfPos).droppable()
//   $(positions.currPos).droppable()
//   $(positions.botPos).droppable()
//   console.log(positions.topPos.className)
//   $(positions.topPos).on('drop', nowPositionsUpdate)
// })





//   for (var movePawn = 0; movePawn < grid.children('.square').length; movePawn += 1) {
//     if (grid.children('.square')[movePawn].className === 'square turn-red') {
//         grid.children('.square')[movePawn].className += ' okay-drop'
//         $(".okay-drop").droppable({
//           drop: function(event, ui) {
//           console.log('dropped white pawn')
//           }
//         })
//         console.log(grid.children('.square')[movePawn].className)
//     }
//   }




// grid.children().droppable({
//   drop: function(event, ui) {
//     console.log($(this))
//     if ($(this).hasClass('valid-move')) {
//       console.log('something was dropped to me!')
//       if (blackPawnTurn) {
//         $(this).append(pawnOne)
//         blackPawnSquare = pawnOne.parent()[0]
//         if (grid.children('.turn-yellow').length === 1) {
//           console.log('yellow length is this', grid.children('.turn-yellow').length)
//           grid.children('.square').removeClass('turn-yellow turn-green')
//         }
//         validPositions(pawnOne, grid.children('.square').index(blackPawnSquare))
//         blackPawnTurn = false
//       } else {
//
//         $(this).append(pawnTwo)
//         whitePawnSquare = pawnTwo.parent()[0]
//         if (grid.children('.turn-purple').length === 1) {
//           console.log('purple length is this', grid.children('.turn-purple').length)
//           grid.children('.square').removeClass('turn-purple turn-red')
//         }
//         validPositions(pawnTwo, grid.children('.square').index(whitePawnSquare))
//         blackPawnTurn = true
//       }
//       changeTurns()
//       checkForWinner()
//     } else {
//       if (blackPawnTurn) {
//         pawnOne.draggable({
//           revert: true
//         })
//       } else {
//         pawnTwo.draggable({
//           revert: true
//         })
//       }
//
//     }
//   }
// })



function checkForWinner(){
  for (var r = 0; r < 9; r += 1) {
    if (pawnOne.parent()[0] === grid.children('.square')[r]) {
      console.log('black pawn wins!!!!')
      pawnOne.draggable('disable')
      pawnTwo.draggable('disable')
    }
  }
  for (var e = 72; e < 81; e += 1) {
    if (pawnTwo.parent()[0] === grid.children('.square')[e]) {
      pawnOne.draggable('disable')
      pawnTwo.draggable('disable')
      console.log('white pawn wins!!!!')
    }
  }
}

function changeTurns(){
  if (!blackPawnTurn) {
    pawnOne.draggable('disable')
    pawnTwo.draggable('enable')
  } else {
    pawnTwo.draggable('disable')
    pawnOne.draggable('enable')
  }
}
