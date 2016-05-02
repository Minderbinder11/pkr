/**
 * Created by Phil on 4/23/16.
 */

$(document).ready(function () {




    function startUp() {

        var myDataRef = new Firebase('https://pkrapp.firebaseio.com');

        var dealer = new Dealer();

        var playerA = new Player("Morty", 500);
        var playerB = new Player("Rick", 400);

        dealer.addPlayer(playerA);
        dealer.addPlayer(playerB);


        $('.supporting').on('click', '.btn', function () {

            playerA.cleanHand();
            playerB.cleanHand();

            var playerACards = $('#' + playerA.name);
            var playerBCards = $('#' + playerB.name);

            playerACards.each(function(){$(this).remove();});
            playerBCards.each(function(){$(this).remove();});

            dealer.createDeck();
            dealer.shuffleDeck();
            dealer.dealNewHand();
            dealer.displayCards();
            dealer.evaluateHands();

            myDataRef.push(dealer.saveHand());

        });

    }

    startUp();

});