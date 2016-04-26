/**
 * Created by Phil on 4/25/16.
 */
/*
 * DEALER CONSTRUCTOR
 * */

function Dealer(){
    this.deck = [];
    this.pot = 100;
    this.testHand = [];

    this.createDeck = function() {

        for (var i = 0; i < MAX_NUM_CARDS; i++) {
            switch (i % NUM_SUITS) {
                case DIAMONDS:
                    this.deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: "D"};
                    break;
                case HEARTS:
                    this.deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: "H"};
                    break;
                case CLUBS:
                    this.deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: "C"};
                    break;
                case SPADES:
                    this.deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: "S"};
                    break;
                default:
                    break;
            }
        }
    };

    this.dealTestHand = function(player){

        this.testHand[0] = {number: 8, suit: "H"};
        this.testHand[1] = {number: 8, suit: "D"};
        this.testHand[2] = {number: 8, suit: "S"};
        this.testHand[3] = {number: 8, suit: "C"};
        this.testHand[4] = {number: 9, suit: "H"};

        player.testerSetHand(this.testHand);
    }

    this.shuffleDeck = function(){

        var temp, randA, randB;

        var numShuffles = float2int(getRandomArbitrary(MAX_NUM_CARDS, MAX_SHUFFLE_LENGTH));

        for (var i = 0; i < numShuffles ; i++){
            randA = randomSlot();
            randB = randomSlot();

            while(randA === randB){
                randB = randomSlot();}

            temp = this.deck[randA];
            this.deck[randA] = this.deck[randB];
            this.deck[randB] = temp;
        }
    };

    this.dealNewHand = function(playerA, playerB){

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {
            playerA.addCard(this.deck.shift());
            playerB.addCard(this.deck.shift());
        }

    };

    this.displayDeck = function(){

        for(var i=0; i < MAX_NUM_CARDS; i++){
            var displayCard = '<img src="img/' + this.deck[i].number + " " + this.deck[i].suit + '.png" style="height: 75px"/>'
            $('.purple-rain').append(displayCard);
        }
        $('.purple-rain').append("<br>");

    };

    this.evaluateHands = function(playerA, playerB) {

        var playerAStraight         = playerA.hasStraight();
        var playerAFlush            = playerA.hasFlush();
        var playerAThreeOfAKind     = playerA.hasMoreThanOneNumber(THREE_OF_KIND);
        var playerAPair             = playerA.hasMoreThanOneNumber(PAIR);

        var playerBStraight         = playerB.hasStraight();
        var playerBFlush            = playerB.hasFlush();


        if((this.checkForStraightFlush(playerAStraight, playerAFlush, playerA, playerBStraight, playerBFlush, playerB)) ||
            (this.checkForFlushes(playerAFlush, playerA, playerBFlush, playerB)) ||
            (this.checkForStraights(playerAStraight, playerA, playerBStraight ,playerB)) ||
            (this.checkForFourOfAKind(playerA, playerB)) ||
            (this.checkForFullHouse())
        ){
            return;
        }


        console.log('flush no get here');

    };

    this.checkForFullHouse = function(playerAThreeOfAKind, playerAPair, playerA,  playerBThreeOfAKind, playerBPair, playerB){

    };


    this.checkForFourOfAKind = function(playerA, playerB){

        var playerAFourOfAKind = playerA.hasMoreThanOneNumber(FOUR_OF_A_KIND);
        var playerBFourOfAKind = playerB.hasMoreThanOneNumber(FOUR_OF_A_KIND);

        if(playerAFourOfAKind > playerBFourOfAKind){
            playerA.addCredits(this.pot);
            playerB.removeCredits(this.pot);
            console.log('hasmorethan one umber worked');
            return true;
        } else if(playerAFourOfAKind < playerBFourOfAKind){
            playerB.addCredits(this.pot);
            playerA.removeCredits(this.pot);
            console.log('hasmorethan one umber worked');
            return true;
        }
        return false;
    };

    this.checkForStraights = function(playerAStraight, playerA, playerBStraight ,playerB){

        if (playerAStraight || playerBStraight) {
            if(playerAStraight && playerBStraight){
                console.log('Draw,  both players have straights');
                return true;
            }

            if(playerAStraight){
                playerA.addCredits(this.pot);
                playerB.removeCredits(this.pot);
                console.log('Player A has a straight');
                return true;
            }else{
                playerB.addCredits(this.pot);
                playerA.removeCredits(this.pot);
                console.log('Player B has a straight');
                return true;
            }
        }
        return false;
    };


    this.checkForFlushes = function (playerAFlush, playerA, playerBFlush ,playerB){

        if (playerAFlush || playerBFlush) {
            if (playerAFlush && playerBFlush) {
                console.log('Draw,  both players have flushes');
                return true;
            }

            if (playerAFlush) {
                playerA.addCredits(this.pot);
                playerB.removeCredits(this.pot);
                return true;
            } else {
                playerB.addCredits(this.pot);
                playerA.removeCredits(this.pot);
                return true;
            }
        }
        return false;
    };

    this.checkForStraightFlush = function(playerAStraight, playerAFlush, playerA, playerBStraight, playerBFlush, playerB){

        if((playerAFlush && playerAStraight) || (playerBFlush && playerBStraight)){
            if((playerAFlush && playerAStraight) && (playerBFlush && playerBStraight)){
                console.log('tie,  ill need to code tie breaker later');
                return true;
            }

            if(playerAFlush && playerAStraight){
                playerA.addCredits(this.pot);
                playerB.removeCredits(this.pot);
                console.log('Player A has a straight Flush');
                return true;
            } else {
                playerB.addCredits(this.pot);
                playerA.removeCredits(this.pot);
                return true;
            }
        }
        return false;
    };
}
