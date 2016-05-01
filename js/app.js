/**
 * Created by Phil on 4/23/16.
 */

$(document).ready(function () {


    function startUp() {
        var dealer = new Dealer();

        dealer.createDeck();
        dealer.shuffleDeck();

        var playerA = new Player("Morty", 500);
        var playerB = new Player("Rick", 400);

        dealer.addPlayer(playerA);
        dealer.addPlayer(playerB);

        dealer.dealNewHand();

        dealer.displayCards();
       // dealer.dealTestHand(playerA);
       // playerA.displayHand();
       // playerB.displayHand();

        dealer.evaluateHands(playerA, playerB);

    }



    startUp();

});