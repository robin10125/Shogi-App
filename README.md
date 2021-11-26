# Shogi-Game
Shogi Game project

Shogi is the Japanese variant of the well known strategy game chess.  The origins of chess reaches far back into history, developed in North India perhaps as early as the classical era.  Armies clashed with great divisions of chariots, war elephants, and the familiar calvalry and infantry at this time.  We see these divisions in the various types of pieces.  Our rooks and bishops were then chariots and elephants, and their eminence on the battlefield at this time is reflected in them being the most powerful pieces on the board.  Later in the 15th century in Europe, the general became the queen and was greatly empowered.   

Shogi differs from chess in two major ways.  Firstly, all units upgrade upon reaching the opposite end of the board, as opposed to just pawns.  Secondly, captured pieces switch sides and can be placed on the new owner's side for their turn.  It is theorized that this arises from the late medieval Japanese practice of mercenaries switching sides upon defeat.  There are minor variations to the pieces as well.  There are only one rook and bishop per side, and there are new pieces: the lance, which moves only forward any number of spaces; and the general is split into 2 gold generals and silver generals.  Pawns move and conquer fowards, rather than moving forward and conquering on a diagonal.  Knights only move forward 2, orthoganal 1, rather than any direction 2, orthoganal 1. 

When placing captured pieces, one may not place them in a position where further movement is illegal, on the opposite edge, nor can one place a pawn to put the opponent in check or checkmate.  If there is already a friendly pawn in any particular row, another pawn cannot be placed in this row.  

Pawns, knights, lances, and silver generals, upon promotion, replace their moveset with that of the golden general.  Bishops and rooks, upon promotion, can move in their regular vectors as well as to all surrounding squares.  

![image](https://git.generalassemb.ly/robin10125/Shogi-Game/blob/gh-pages/Assets/Shogi_Screenshot.png)


Development technologies: HTML, CSS, Javascript.

* [Link](https://pages.git.generalassemb.ly/robin10125/Shogi-Game/)
* Make sure to click the square around the token image, and not the token image, as the game is not yet programmed to handle clicks on token images, and results in a bug where nothing happens

Next steps:
    0.  Fix bug: when clicking on token instead of square, nothing happens and the JS throws an error.  Fix by programming click listener to return coordiantes when token is clicked, rather than only returning coordiantes when square around token is clicked.
    1.  Check legality of placing tokens from reserve board
    2.  Check for check and checkmate rather than king deletion, and check illegal moves pertaining to check and checkmate.
    3.  Make intersting graphical features
    4.  Integrate ai player 2.
    5.  Encapsulate more of the code.
