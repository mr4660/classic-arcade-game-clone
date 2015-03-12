frontend-nanodegree-arcade-game
===============================

Summary
-------
This arcade game was enhanced from the classic version published by “batmanimal” authored on Nov 12 2014.  In this game, you win by navigating a girl from a Safe Zone, through a Danger zone, into a "Whoo Hoo!" zone, and back to the "Safe zone" without colliding with bugs.

Geographic Landscape
--------------------
To launch, simply launch the provided Index.Html from your browser of choice.  You might be asked whether to allow the execution "of ActiveX controls".  When presented with that question, select "Allow".  Almost immediately a canvas is displayed showing three geographic zones:  a) Safe Zone (two decks of green grass plots), b) Danger Zone (three decks of concrete blocks), and c) "Whoo Hoo!" zone (1 deck of water).  Two types of characters are displayed:  a) a girl who starts in the Safe zone must cross the Danger Zone, and who must navigate herself into the "Whoo Hoo!" zone, and b) four enemy bugs who occupy the Danger Zone.

Characters
----------
The girl can navigate vertically or horizontally to any available, adjacent block.  Initially, she is positioned on the lowest & middle deck of the Safe zone.  You move her vertically up or down, by pressing the arrow-up or arrow-down keyboard keys.  The keyboard arrow-left or arrow-right keys move her left or right, to the next available block.  She is restricted from moving beyond the canvas’s edges.

The enemy bugs restrict themselves to the Danger Zone.  They randomly move left and right, with varying speeds & accelerations.  They, unlike the girl, are allowed to move beyond the canvass' edges, but only horizontally.  Once either bug crosses an edge, it randomly selects either concrete path and continues its journey on the opposite horizontal edge from which it flew over.  Eventually, you'll see none, one, or more bugs occupying the same concrete path, each randomly changing directions, speeds & accelerations.

Warning!
--------
As the girl diligently navigates to the "Whoo Hoo!" zone, the bugs might randomly land on the same block as the girl.  Should this conflict occur, an "Oww! Collision!!" titled "OK" dialog-message is displayed; simply press "OK" button to continue.  After you press the button, the girl is moved to the second deck of the Safe Zone on the same column where the collision had occurred; thereafter, the game continues into perpetuity.

Sorry, but the only way to stop the game is to terminate the web-page.  Fancier mechanisms are forth-coming.
