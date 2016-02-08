var grid = $('#grid')
var whitePawn = $('#white-pawn')
var blackPawn = $('#black-pawn')
var playerTwoTurn = false
var gameIsOver = false
var intructions = $('#intructions')
var intructionScreen = $('#instruction-screen')
var closeButton = $('#close')

whitePawn.css({'-webkit-user-select': 'none'})
blackPawn.css({'-webkit-user-select': 'none'})

var whitePawnWallCount = $('#white-pawn-wall-num')
var blackPawnWallCount = $('#black-pawn-wall-num')
var currentPlayerTurn = $('#current-player-turn')

var winnerScreen = $('#winner-screen')
var restartButton = $('#restart')
var winnerScreenWhitePawn = $('#winner-screen-white-pawn')
var restartButtonWhitePawn = $('#restart-white-pawn')

restartButton.on('click', function(){
  location.reload();
})
restartButtonWhitePawn.on('click', function(){
  location.reload();
})

intructions.on('click', function(){
  intructionScreen.css({opacity: 0.9})
  intructionScreen.show(2000)
})
closeButton.on('click', function(){
  intructionScreen.css({opacity: 1.0})
  intructionScreen.hide(800)
})

var inputArray = []
var validInputWallArray = [
                           'a1','a2','a3','a4','a5','a6','a7','a8','a9',
                           'b1','b2','b3','b4','b5','b6','b7','b8','b9',
                           'c1','c2','c3','c4','c5','c6','c7','c8','c9',
                           'd1','d2','d3','d4','d5','d6','d7','d8','d9',
                           'e1','e2','e3','e4','e5','e6','e7','e8','e9',
                           'f1','f2','f3','f4','f5','f6','f7','f8','f9',
                           'g1','g2','g3','g4','g5','g6','g7','g8','g9',
                           'h1','h2','h3','h4','h5','h6','h7','h8','h9',
                           'i1','i2','i3','i4','i5','i6','i7','i8','i9'
                          ]


var validInputWallArrayVertical = [
                           'a1','a2','a3','a4','a5','a6','a7','a8',
                           'b1','b2','b3','b4','b5','b6','b7','b8',
                           'c1','c2','c3','c4','c5','c6','c7','c8',
                           'd1','d2','d3','d4','d5','d6','d7','d8',
                           'e1','e2','e3','e4','e5','e6','e7','e8',
                           'f1','f2','f3','f4','f5','f6','f7','f8',
                           'g1','g2','g3','g4','g5','g6','g7','g8',
                           'h1','h2','h3','h4','h5','h6','h7','h8'
                                  ]

var validInputWallArrayHorizontal = [
                           'a1','a2','a3','a4','a5','a6','a7','a8',
                           'b1','b2','b3','b4','b5','b6','b7','b8',
                           'c1','c2','c3','c4','c5','c6','c7','c8',
                           'd1','d2','d3','d4','d5','d6','d7','d8',
                           'e1','e2','e3','e4','e5','e6','e7','e8',
                           'f1','f2','f3','f4','f5','f6','f7','f8',
                           'g1','g2','g3','g4','g5','g6','g7','g8',
                           'h1','h2','h3','h4','h5','h6','h7','h8'
                                    ]


var barrierLog = []
var barrierLogVerticalPlusOne = []
var barrierLogHorizontalPlusNine = []

// validInputWallArray.indexOf(inputArray[0]) + 9
// validInputWallArray[validInputWallArray.indexOf(inputArray[0]) + 1]




var charsToIndex = {
                           a1:81,a2:71,a3:61,a4:51,a5:41,a6:31,a7:21,a8:11,a9:1,
                           b1:82,b2:72,b3:62,b4:52,b5:42,b6:32,b7:22,b8:12,b9:2,
                           c1:83,c2:73,c3:63,c4:53,c5:43,c6:33,c7:23,c8:13,c9:3,
                           d1:84,d2:74,d3:64,d4:54,d5:44,d6:34,d7:24,d8:14,d9:4,
                           e1:85,e2:75,e3:65,e4:55,e5:45,e6:35,e7:25,e8:15,e9:5,
                           f1:86,f2:76,f3:66,f4:56,f5:46,f6:36,f7:26,f8:16,f9:6,
                           g1:87,g2:77,g3:67,g4:57,g5:47,g6:37,g7:27,g8:17,g9:7,
                           h1:88,h2:78,h3:68,h4:58,h5:48,h6:38,h7:28,h8:18,h9:8,
                           i1:89,i2:79,i3:69,i4:59,i5:49,i6:39,i7:29,i8:19,i9:9
                  }


var barrierInput = $('#barrier-input')
var barrierSubmit= $('#barrier-submit')
var dropDown = $('#drop-down')

barrierInput.on('keypress', function(event){
  if (event.which === 13) {
    event.preventDefault()

  }
})

for (var i = 0; i < 81; i += 1) {
  if (i % 9 === 0) {
    grid.append('<br>')
  }
    grid.append('<div class="square"></div>')
}

var allSquares = grid.children('.square')

var pawnDragOptions = {
  opacity: 0.4,
  cursor: 'move',
  revert: 'invalid',
  scope: 'validSquare'
}
var squareDropOptions = {
  addClasses: false,
  tolerance: 'fit',
  scope: 'validSquare'
}

// console.log($(grid.children()[1]).css('border-top-color'))
var whitePawnStartingSquarePosition = $(grid.children('.square')[76])
whitePawnStartingSquarePosition.html(whitePawn)
whitePawnStartingSquarePosition.addClass('contains-white-pawn')
var blackPawnStartingSquarePosition = $(grid.children('.square')[4])
blackPawnStartingSquarePosition.html(blackPawn)
blackPawnStartingSquarePosition.addClass('contains-black-pawn')

//console.log(grid.children('.contains-white-pawn').index())
var divOfWhitePawn = grid.children('.contains-white-pawn').index()
var divOfBlackPawn = grid.children('.contains-black-pawn').index()

//console.log(grid.children()[charsToIndex.i6])

whitePawn.draggable(pawnDragOptions)
blackPawn.draggable(pawnDragOptions)

whitePawn.on('dragstart', function(event, ui) {
  if (!gameIsOver) {
    //console.log('started dragging the white pawn')
    $(this).parent().removeClass('contains-white-pawn')
  } else if(!gameIsOver) {
    //console.log('it is not white pawn\'s turn. player two turn =', playerTwoTurn)
  }
})

blackPawn.on('dragstart', function(event, ui) {
  if (!gameIsOver) {
    //console.log('started dragging the black pawn')
    $(this).parent().removeClass('contains-black-pawn')
  } else if (!gameIsOver) {
    //console.log('it is not black pawn\'s turn. player two turn =', playerTwoTurn)
  }

})

allSquares.droppable(squareDropOptions)
allSquares.on('dropover', function(event,ui){
  if (playerTwoTurn) {
    if ((event.target === grid.children()[divOfBlackPawn + 1]) || (event.target === grid.children()[divOfBlackPawn - 1]) || (event.target === grid.children()[divOfBlackPawn - 10]) || (event.target === grid.children()[divOfBlackPawn + 10])) {
      //console.log(event.target)
      if ($(grid.children()[divOfBlackPawn]).css('border-top-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier uptop black pawn ahead black pawn!!!')
        $(grid.children()[divOfBlackPawn - 10]).droppable('option', 'disabled', 'true')
        if ($(grid.children()[divOfBlackPawn + 10]).css('border-top-color') !== 'rgb(73, 49, 28)') {
          //console.log('barrier onbottom below watch out black pawn!!!')
          $(grid.children()[divOfBlackPawn + 10]).droppable('option', 'disabled', 'true')
        }
        if ($(grid.children()[divOfBlackPawn]).css('border-right-color') !== 'rgb(73, 49, 28)') {
          //console.log('barrier to the right ahead watch out black pawn!!!')
          $(grid.children()[divOfBlackPawn + 1]).droppable('option', 'disabled', 'true')
        }
        if ($(grid.children()[divOfBlackPawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
          //console.log('barrier to the left behind you watch out black pawn!!!')
          $(grid.children()[divOfBlackPawn - 1]).droppable('option', 'disabled', 'true')
        }
      } else if ($(grid.children()[divOfBlackPawn]).css('border-right-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier to the right ahead watch out black pawn!!!')
        $(grid.children()[divOfBlackPawn + 1]).droppable('option', 'disabled', 'true')
        if ($(grid.children()[divOfBlackPawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
          //console.log('barrier to the left behind you watch out black pawn!!!')
          $(grid.children()[divOfBlackPawn - 1]).droppable('option', 'disabled', 'true')
        }
        if ($(grid.children()[divOfBlackPawn + 10]).css('border-top-color') !== 'rgb(73, 49, 28)') {
          //console.log('barrier onbottom below watch out black pawn look out!!!')
          $(grid.children()[divOfBlackPawn + 10]).droppable('option', 'disabled', 'true')
        }
      } else if ($(grid.children()[divOfBlackPawn + 10]).css('border-top-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier onbottom below watch out black pawn look out!!!')
        $(grid.children()[divOfBlackPawn + 10]).droppable('option', 'disabled', 'true')
        if ($(grid.children()[divOfBlackPawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
          //console.log('barrier to the left behind you watch out black pawn!!!')
          $(grid.children()[divOfBlackPawn - 1]).droppable('option', 'disabled', 'true')
        }
      } else if ($(grid.children()[divOfBlackPawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier to the left behind you watch out!!!')
        $(grid.children()[divOfBlackPawn - 1]).droppable('option', 'disabled', 'true')
      }
      //console.log(grid.children()[divOfBlackPawn])
      else {
        //console.log(this)
        $(this).droppable('option', 'enable', 'true')
      }
    } else {
      //console.log(event.target)
      $(this).droppable('option', 'disabled', 'true')
    }
  } else if (!playerTwoTurn) {
  if ((event.target === grid.children()[divOfWhitePawn + 1]) || (event.target === grid.children()[divOfWhitePawn - 1]) || (event.target === grid.children()[divOfWhitePawn - 10]) || (event.target === grid.children()[divOfWhitePawn + 10])) {
    //console.log(event.target)

    if ($(grid.children()[divOfWhitePawn]).css('border-top-color') !== 'rgb(73, 49, 28)') {
      //console.log('barrier uptop ahead white pawn!!!')
      $(grid.children()[divOfWhitePawn - 10]).droppable('option', 'disabled', 'true')
      if ($(grid.children()[divOfWhitePawn + 10]).css('border-top-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier onbottom below watch out white pawn!!!')
        $(grid.children()[divOfWhitePawn + 10]).droppable('option', 'disabled', 'true')
      }
      if ($(grid.children()[divOfWhitePawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier to the left behind you watch out white pawn!!!')
        $(grid.children()[divOfWhitePawn - 1]).droppable('option', 'disabled', 'true')
      }
      if ($(grid.children()[divOfWhitePawn]).css('border-right-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier to the right ahead!!!')
        $(grid.children()[divOfWhitePawn + 1]).droppable('option', 'disabled', 'true')
      }
    } else if ($(grid.children()[divOfWhitePawn]).css('border-right-color') !== 'rgb(73, 49, 28)') {
      //console.log('barrier to the right ahead!!!')
      $(grid.children()[divOfWhitePawn + 1]).droppable('option', 'disabled', 'true')
      if ($(grid.children()[divOfWhitePawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier to the left behind you watch out white pawn!!!')
        $(grid.children()[divOfWhitePawn - 1]).droppable('option', 'disabled', 'true')
      }
      if ($(grid.children()[divOfWhitePawn + 10]).css('border-top-color') !== 'rgb(73, 49, 28)') {
       //console.log($(grid.children()[divOfWhitePawn]).css('border-top-color'))
       //console.log('barrier onbottom below watch out white pawn!!!')
       $(grid.children()[divOfWhitePawn + 10]).droppable('option', 'disabled', 'true')
     }
    } else if ($(grid.children()[divOfWhitePawn + 10]).css('border-top-color') !== 'rgb(73, 49, 28)') {
      //console.log($(grid.children()[divOfWhitePawn]).css('border-top-color'))
      //console.log('barrier onbottom below watch out white pawn!!!')
      $(grid.children()[divOfWhitePawn + 10]).droppable('option', 'disabled', 'true')
      if ($(grid.children()[divOfWhitePawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
        //console.log('barrier to the left behind you watch out white pawn!!!')
        $(grid.children()[divOfWhitePawn - 1]).droppable('option', 'disabled', 'true')
      }
    } else if ($(grid.children()[divOfWhitePawn - 1]).css('border-right-color') !== 'rgb(73, 49, 28)') {
      //console.log('barrier to the left behind you watch out white pawn!!!')
      $(grid.children()[divOfWhitePawn - 1]).droppable('option', 'disabled', 'true')
    }
    else {

      $(this).droppable('option', 'enable', 'true')
    }


  } else {
    //console.log(event.target)
    $(this).droppable('option', 'disabled', 'true')
  }
}
})


allSquares.on('drop', function(event, ui){
  if (playerTwoTurn) {
    $(this).html(blackPawn)
    $(this).addClass('contains-black-pawn')
    divOfBlackPawn = grid.children('.contains-black-pawn').index()

    $(grid.children()[divOfBlackPawn]).droppable('option', 'disabled', true)
    // if ($(grid.children()[divOfBlackPawn - 1]).droppable('option', 'disabled') || $(grid.children()[divOfBlackPawn + 1]).droppable('option', 'disabled') || $(grid.children()[divOfBlackPawn + 10]).droppable('option', 'disabled') || $(grid.children()[divOfBlackPawn - 10]).droppable('option', 'disabled')) {
    //   console.log('this is good kinda')
    // }

    $(grid.children()[divOfBlackPawn + 10]).droppable('option', 'disabled', false)
    $(grid.children()[divOfBlackPawn - 10]).droppable('option', 'disabled', false)
    $(grid.children()[divOfBlackPawn -1]).prop('nodeName')
    $(grid.children()[divOfBlackPawn + 1]).prop('nodeName')
    if ($(grid.children()[divOfBlackPawn - 1]).prop('nodeName') === 'DIV') {
      $(grid.children()[divOfBlackPawn - 1]).droppable('option', 'disabled', false)
    }
    if ($(grid.children()[divOfBlackPawn + 1]).prop('nodeName') === 'DIV') {
      $(grid.children()[divOfBlackPawn + 1]).droppable('option', 'disabled', false)
    }
    //console.log(this)
    playerTwoTurn = false
    currentPlayerTurn.html('White Pawn')
    // blackPawn.draggable('option', 'disabled', 'true')
    // whitePawn.draggable('option', 'disabled', 'false')
    // whitePawn.draggable('option', 'enable', 'true')
    //console.log('dropped black pawn!!!!')
  } else if (!playerTwoTurn){
    // playerTwoTurn = false
    $(this).html(whitePawn)
    $(this).addClass('contains-white-pawn')
    divOfWhitePawn = grid.children('.contains-white-pawn').index()

    // $(grid.children()[divOfWhitePawn]).droppable('option', 'disabled', true)

    $(grid.children()[divOfWhitePawn]).droppable('option', 'disabled', true)

    $(grid.children()[divOfWhitePawn + 10]).droppable('option', 'disabled', false)
    $(grid.children()[divOfWhitePawn - 10]).droppable('option', 'disabled', false)
    $(grid.children()[divOfWhitePawn - 1]).prop("nodeName")
    $(grid.children()[divOfWhitePawn + 1]).prop("nodeName")
    if ($(grid.children()[divOfWhitePawn - 1]).prop('nodeName') === 'DIV') {
      $(grid.children()[divOfWhitePawn - 1]).droppable('option', 'disabled', false)
    }
    if ($(grid.children()[divOfWhitePawn + 1]).prop('nodeName') === 'DIV') {
      $(grid.children()[divOfWhitePawn + 1]).droppable('option', 'disabled', false)
    }
    playerTwoTurn = true
    currentPlayerTurn.html('Black Pawn')
 }
  checkForWinner()
})



function checkForWinner(){
  for (y = 1; y < 10; y += 1) {
    if ($(grid.children()[y]).hasClass('contains-white-pawn')) {
      console.log('white pawn made it to the other side. white pawn wins!!!!')
      // alert('Player One made it to the other side. Player One (White Pawn) Wins!!!')
      whitePawn.draggable('option', 'disabled', 'true')
      blackPawn.draggable('option', 'disabled', 'true')
      winnerScreenWhitePawn.css({opacity: 0.9})
      winnerScreenWhitePawn.slideDown(2000)
      gameIsOver = true
      return
    }
  }
  for (t = 81; t < 90; t += 1) {
    if ($(grid.children()[t]).hasClass('contains-black-pawn')) {
      console.log('black pawn made it to the other side. black pawn wins!!!!')
      // alert('Player Two made it to the other side. Player Two (Black Pawn) Wins!!!')
      whitePawn.draggable('option', 'disabled', 'true')
      blackPawn.draggable('option', 'disabled', 'true')
      winnerScreen.css({opacity: 0.9})
      winnerScreen.slideDown(2000)
      gameIsOver = true
      return
    }
  }
  // console.log('no winner yet')
}

var playerOneBarriers = 10
var playerTwoBarriers = 10
barrierSubmit.on('click', function(){
  if (playerTwoTurn && playerTwoBarriers === 0) {
    alert('Player Two (Black Pawn) has no barriers left')
  } else if (!playerTwoTurn && playerOneBarriers === 0) {
    alert('Player One (White Pawn) has no barriers left')
  } else {
  var inputFromUser = barrierInput.val().toLowerCase()
  if ((validInputWallArray.includes(inputFromUser) && validInputWallArrayVertical.includes(inputFromUser) && !barrierLog.includes(inputFromUser)) || (validInputWallArray.includes(inputFromUser) && validInputWallArrayHorizontal.includes(inputFromUser) && !barrierLog.includes(inputFromUser))) {
    inputArray = [inputFromUser, dropDown.val()]
    // console.log(objTest[inputFromUser])
    if (inputArray[1] === 'veritcal' && !barrierLogVerticalPlusOne.includes(inputArray[0])) {
      //console.log('vertical selected')
      //console.log(inputFromUser)
      var topDivNum = charsToIndex[inputFromUser] - 10
      var currDiv = grid.children()[charsToIndex[inputArray[0]]]
      var topDiv = grid.children()[topDivNum]
      $(topDiv).css({'border-right-color':'#BC8F8F'})
      $(currDiv).css({'border-right-color':'#BC8F8F'})
      barrierLogVerticalPlusOne.push(validInputWallArray[validInputWallArray.indexOf(inputArray[0]) + 1])
      barrierLogVerticalPlusOne.push(validInputWallArray[validInputWallArray.indexOf(inputArray[0]) - 1])
      if (playerTwoTurn) {
        playerTwoBarriers -= 1
        blackPawnWallCount.html(playerTwoBarriers)
        playerTwoTurn = false
        currentPlayerTurn.html('White Pawn')

      } else if (!playerTwoTurn) {
        playerOneBarriers -= 1
        whitePawnWallCount.html(playerOneBarriers)
        playerTwoTurn = true
         currentPlayerTurn.html('Black Pawn')

      }
      barrierLog.push(inputFromUser)
      //console.log(inputArray)
    } else if (inputArray[1] === 'horizontal' && !barrierLogHorizontalPlusNine.includes(inputArray[0])) {
      //console.log('horizontal selected')
      //console.log(inputFromUser)
      var rightDivNum = charsToIndex[inputFromUser] + 1
      var currDiv = grid.children()[charsToIndex[inputArray[0]]]
      var rightDiv = grid.children()[rightDivNum]
      $(currDiv).css({'border-top-color':'#BC8F8F'})
      $(rightDiv).css({'border-top-color':'#BC8F8F'})
      barrierLogHorizontalPlusNine.push(validInputWallArray[validInputWallArray.indexOf(inputArray[0]) + 9])
      barrierLogHorizontalPlusNine.push(validInputWallArray[validInputWallArray.indexOf(inputArray[0]) - 9])
      if (playerTwoTurn) {
        playerTwoBarriers -= 1
        blackPawnWallCount.html(playerTwoBarriers)
        playerTwoTurn = false
        currentPlayerTurn.html('White Pawn')
      } else {
        playerOneBarriers -= 1
        whitePawnWallCount.html(playerOneBarriers)
        playerTwoTurn = true
        currentPlayerTurn.html('Black Pawn')
      }
      barrierLog.push(inputFromUser)
      //console.log(inputArray)
    }

  } else {
    alert('enter valid input please')
  }
  if (inputArray[1] === 'horizontal' && barrierLogHorizontalPlusNine.includes(inputArray[0])) {
    alert('enter valid input please side')
  }
  if (inputArray[1] === 'veritcal' && barrierLogVerticalPlusOne.includes(inputArray[0])) {
    alert('enter valid input please vert')
  }
}
  barrierInput.val('')
})
