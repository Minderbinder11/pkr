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
        this.testHand[3] = {number: 6, suit: "C"};
        this.testHand[4] = {number: 9, suit: "H"};

        player.testerSetHand(this.testHand);
    };

    this.shuffleDeck = function() {


        for (var j = 0; j < 4; j++) {

            var arr = initializeArray(MAX_NUM_CARDS);
            var spotsFilled = 0;

            for (var i = 0; i < MAX_NUM_CARDS; i++) {

                randNum = randomSlot();

                while (arr[randNum] != 0) {

                    randNum = randomSlot();
                    if (spotsFilled == 51) {
                        randNum = arr.indexOf(0);
                    }
                }

                arr[randNum] = this.deck[i];
                spotsFilled++;
            }

            this.deck = arr;
        }

    };


    this.dealNewHand = function(playerA, playerB){

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {
            playerA.addCard(this.deck.shift());
            playerB.addCard(this.deck.shift());
        }
    };


    this.evaluateHands = function(playerA, playerB) {

        playerA.countHand();
        playerB.countHand();

        if((this.checkForStraightFlush(playerA, playerB))   || (this.checkForStraights(playerA, playerB)) ||
            (this.checkForFourOfAKind(playerA, playerB))    || (this.checkForFlushes(playerA, playerB)) ||
            (this.checkForFullHouse(playerA, playerB))      || (this.checkForThreeOfAKind(playerA, playerB)) ||
            (this.checkForTwoPair(playerA, playerB))        || (this.checkForPair(playerA, playerB))){
                return true;
            }
        console.log('Draw,  no winner');
        return false;
    };


    this.checkForPair = function(playerA, playerB){


        if(playerA.pair > playerB.pair){
            console.log(playerA.name + ' wins with a Pair ' + playerA.pair);
            this.payWinners(playerA, playerB);
            return true;
        } else if(playerA.pair < playerB.pair){
            console.log(playerB.name + ' wins with a pair ' + playerB.pair);
            this.payWinners(playerB, playerA);
            return true;
        }
        return false;

    };


    this.checkForTwoPair = function(playerA, playerB){

        if(playerA.twoPair > playerB.twoPair){
            console.log(playerA.name + ' wins with two pair ' + playerA.pair);
            this.payWinners(playerA, playerB);
            return true;
        }else if (playerA.twoPair > playerB.twoPair){
            console.log(playerB.name + ' wins with two pair ' + playerB.pair);
            this.payWinners(playerB, playerA);
            return true;
        }
        return false;
    };

    this.checkForThreeOfAKind = function(playerA, playerB){

        if(playerA.threeOfAKind > playerB.threeOfAKind){
            console.log(playerA.name + ' wins with a 3 of a Kind ' + playerA.threeOfAKind);
            this.payWinners(playerA, playerB);
            return true;
        } else if(playerA.threeOfAKind < playerB.threeOfAKind){
            console.log(playerB.name + ' wins with a 3 of a Kind ' + playerB.threeOfAKind);
            this.payWinners(playerB, playerA);
            return true;
        }
        return false;
    };

    this.checkForFullHouse = function(playerA, playerB){

        var aFullHouse = ((playerA.threeOfAKind >= ZERO) && (playerA.pair >= ZERO));
        var bFullHouse = ((playerB.threeOfAKind >= ZERO) && (playerB.pair >= ZERO));

        if((aFullHouse) || (bFullHouse)){
            if((aFullHouse) && (bFullHouse)){
                console.log('both are full house');
                return true;
            }

            if((aFullHouse)){
                this.payWinners(playerA, playerB);
            } else {
                this.payWinners(playerB, playerA);
            }
            return true;
        }
        return false;
    };


    this.checkForFourOfAKind = function(playerA, playerB){

        if(playerA.fourOfAKind > playerB.fourOfAKind){
            this.payWinners(playerA, playerB);
            return true;
        } else if(playerA.fourOfAKind < playerB.fourOfAKind){
            this.payWinners(playerB, playerA);
            return true;
        }
        return false;
    };


    this.checkForStraights = function(playerA, playerB){

        var aStraight = playerA.straight >= 0;
        var bStraight = playerB.straight >= 0;

        if (aStraight || bStraight) {

            if(playerA.straight > playerB.straight){
                this.payWinners(playerA, playerB);
                return true;
            }else if (playerA.straight < playerB.straight){
                this.payWinners(playerB, playerA);
                return true;
            } else if (playerA.straight == playerB.straight){
                console.log('players have equal straights');
                return true;
            }
        }
        return false;
    };


    this.checkForFlushes = function (playerA, playerB){


        var aFlush = playerA.flush >= ZERO;
        var bFlush = playerB.flush >= ZERO;

        if (aFlush || bFlush) {
            if (aFlush && bFlush) {
                console.log('Draw,  both players have flushes');
                return true;
            }

            if (aFlush) {
                this.payWinners(playerA, playerB);
            } else {
                this.payWinners(playerB, playerA);
            }
            return true;
        }
        return false;
    };


    this.checkForStraightFlush = function(playerA, playerB){

        var aStraightFlush   = (playerA.straight >= ZERO) && (playerA.flush >= ZERO);
        var bStraightFlush   = (playerB.straight >= ZERO) && (playerB.flush >= ZERO);

        if( aStraightFlush || bStraightFlush){
            if(aStraightFlush && bStraightFlush){
                if(playerA.straight > playerB.straight){
                    this.payWinners(playerA, playerB);
                    return true;
                } else if (playerA.straight < playerB.straight){
                    this.payWinners(playerB, playerA);
                    return true;
                }else if(playerA.straight == playerB.straight){
                    console.log('tie,  ill need to code tie breaker later\n' +
                        'player A: Boolean: ' + aStraightFlush + ' Straight variable : ' + playerA.straight + ' flush : ' + playerA.flush );
                    return true;
                }
            }

            if(aStraightFlush){
                this.payWinners(playerA, playerB);
            } else {
                this.payWinners(playerB, playerA);
            }
            return true;
        }
        return false;
    };


    this.payWinners = function(winner, looser){
        winner.addCredits(this.pot);
        looser.removeCredits(this.pot);
    };


}



/*  This shuffler is not fandom
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

 */