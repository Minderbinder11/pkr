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
    this.players = [];


    // create a DOM element with the class name including the name of the player
    // insert it into the DOM
    // insert ul and li's of cards into the DOM


    this.displayCards = function(){

        for (var i = 0; i < this.players.length; i++){

            var id = '#'+ this.players[i].name;
            var handContainer =     '<div class="purple-rain" id="' + this.players[i].name + '" data-player-number="'+ i + '">' +
                '<ul class="beret"> </ul>' +
                '</div>';
            var playerName = '<h3>' +this.players[i].name + '</h3>'

            $('.header').append(handContainer);
            $(id).prepend(playerName);

            for (var j = 0; j < 5; j++){
                var insertHere = $(id).find('ul');
                var newCard = this.players[i].getCard(j);
                insertHere.append(newCard);
            }
        }
    };


    $(document).on('mouseover','.card', function(){

        $(this).addClass('highlight');

    });

    $(document).on('mouseleave','.card', function(){

        $(this).removeClass('highlight');

    });

    this.addPlayer = function(player){
        this.players.push(player);
    };

/*
*
* ====================== DEALING, SHUFFLING, CREATING THE DEAK ===========================
*
 *  */
    this.createDeck = function() {

        for (var i = ZERO; i < MAX_NUM_CARDS; i++) {
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


    /*
    * Deck Shuffler,  previous algorithm of swapping two items did not see to introduce enough randomness into
    * the deal,  so i reverted back to this method.
    * */

    this.shuffleDeck = function() {


        for (var j = ZERO; j < 4; j++) {

            var arr = initializeArray(MAX_NUM_CARDS);
            var spotsFilled = ZERO;

            for (var i = ZERO; i < MAX_NUM_CARDS; i++) {

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


    /*
     *  Used to test hands.
     */

    this.dealTestHand = function(player){

        this.testHand[0] = {number: 8, suit: "H"};
        this.testHand[1] = {number: 8, suit: "D"};
        this.testHand[2] = {number: 8, suit: "S"};
        this.testHand[3] = {number: 6, suit: "C"};
        this.testHand[4] = {number: 9, suit: "H"};

        player.testerSetHand(this.testHand);
    };

    /*
    * Deals cards to each player
    *
    * */

    this.dealNewHand = function(){

        for (var i = ZERO; i < NUM_CARDS_IN_HAND; i++) {

            for (var j = 0; j < this.players.length; j++) {
                this.players[j].addCard(this.deck.shift());
                this.players[j].addCard(this.deck.shift());
            }
        }
    };

/*
*
* =============================  FUNCTIONS FOR EVALUATING HANDS ====================================
*
* */

    /*
    * This checks each hand in a big OR statement.  When it finds the first winning hand,  the rest of the OR
    * statement is short circuited.  if none of the hands exist,  it returns false;
    * */

    this.evaluateHands = function() {

        for(var i = ZERO; i < this.players.length; i++) {
            this.players[i].countHand();
        }


        if((this.checkForStraightFlush())   || (this.checkForStraights()) ||
            (this.checkForFourOfAKind())    || (this.checkForFlushes()) ||
            (this.checkForFullHouse())      || (this.checkForThreeOfAKind()) ||
            (this.checkForTwoPair())        || (this.checkForPair())){
                return true;
            }
        console.log('Draw,  no winner');
        return false;
    };


    /*
     * PAIR - Hand Evaluation Logic
     * compares who has the higher position for a pair.  If the hand doesn't exist,  the variable is -1
     * */

    this.checkForPair = function(){


        if(this.players[0].pair > this.players[1].pair){
            console.log(this.players[0].name + ' wins with a pair');
            this.payWinners(this.players[0], this.players[1]);
            return true;
        } else if(this.players[0].pair < this.players[1].pair){
            console.log(this.players[1].name + ' wins with a pair');
            this.payWinners(this.players[1], this.players[0]);
            return true;
        }
        return false;

    };

    /*
     * TWO PAIR - Hand Evaluation Logic
     * compares who has the higher position for a two pair.  If the hand doesn't exist,  the variable is -1
     * */

    this.checkForTwoPair = function(){

        if(this.players[0].twoPair > this.players[1].twoPair){
            console.log(this.players[0].name + ' wins with two pair');
            this.payWinners(this.players[0], this.players[1]);
            return true;
        }else if (this.players[0].twoPair < this.players[1].twoPair){
            console.log(this.players[1].name + ' wins with two pair');
            this.payWinners(this.players[1], this.players[0]);
            return true;
        }
        return false;
    };


    /*
     * THREE OF A KIND - Hand Evaluation Logic
     * compares who has the higher position for 3 of a kind.  if no 4 of a kind,  the variable is -1
     * */

    this.checkForThreeOfAKind = function(){

        if(this.players[0].threeOfAKind > this.players[1].threeOfAKind){
            console.log(this.players[0].name + ' wins with a 3 of a kind');
            this.payWinners(this.players[0], this.players[1]);
            return true;
        } else if(this.players[0].threeOfAKind < this.players[1].threeOfAKind){
            console.log(this.players[1].name + ' wins with a 3 of a kind');
            this.payWinners(this.players[1], this.players[0]);
            return true;
        }
        return false;
    };


    /*
    * FULL HOUSE - Hand Evaluation Logic
    * need to perform the boolean tests at the top to transform an array position into a boolean value
    * */

    this.checkForFullHouse = function(){

        var aFullHouse = ((this.players[0].threeOfAKind >= ZERO) && (this.players[0].pair >= ZERO));
        var bFullHouse = ((this.players[0].threeOfAKind >= ZERO) && (this.players[1].pair >= ZERO));

        if((aFullHouse) || (bFullHouse)){
            if((aFullHouse) && (bFullHouse)){
                console.log('both are full house');
                return true;
            }

            if((aFullHouse)){
                console.log(this.players[0].name + ' wins with an Uncle Jesse');
                this.payWinners(this.players[0], this.players[1]);
            } else {
                console.log(this.players[1].name + ' wins with an Uncle Jesse');
                this.payWinners(this.players[1], this.players[0]);
            }
            return true;
        }
        return false;
    };

    /*
     * FOUR OF A KIND - Hand Evaluation Logic
     * compares who has the higher position for a four of a kind.  if no 4 of a kind,  the variable is -1
     * */

    this.checkForFourOfAKind = function(){

        if(this.players[0].fourOfAKind > this.players[1].fourOfAKind){
            console.log(this.players[0].name + ' wins with 4 of a kind');
            this.payWinners(this.players[0], this.players[1]);
            return true;
        } else if(this.players[0].fourOfAKind < this.players[1].fourOfAKind){
            console.log(this.players[1].name + ' wins with 4 of a kind');
            this.payWinners(this.players[1], this.players[0]);
            return true;
        }
        return false;
    };


    /*
     * STRAIGHT - Hand Evaluation Logic
     * need to perform the boolean tests at the top to transform an array position into a boolean value
     *
     * *&*(&(*&(*&(&)(&*)(&*)(*&)(* Check logic for Straights
     * */

    this.checkForStraights = function(){

        var aStraight = this.players[0].straight >= ZERO;
        var bStraight = this.players[1].straight >= ZERO;

        if (aStraight || bStraight) {

            if(this.players[0].straight > this.players[0].straight){
                console.log(this.players[0].name + ' wins with a straight');
                this.payWinners(this.players[0], this.players[1]);
                return true;
            }else if (this.players[0].straight < this.players[0].straight){
                console.log(this.players[1].name + ' wins with a straight');
                this.payWinners(this.players[1], this.players[0]);
                return true;
            } else if (this.players[0].straight == this.players[0].straight){
                console.log('players have equal straights');
                return true;
            }
        }
        return false;
    };

    /*
     * FLUSH - Hand Evaluation Logic
     * need to perform the boolean tests at the top to transform an array position into a boolean value
     * */
    this.checkForFlushes = function (){


        var aFlush = this.players[0].flush >= ZERO;
        var bFlush = this.players[1].flush >= ZERO;

        if (aFlush || bFlush) {
            if (aFlush && bFlush) {
                console.log('Draw,  both players have flushes');
                return true;
            }

            if (aFlush) {
                console.log(this.players[0].name + ' has a flushes');
                this.payWinners(this.players[0], this.players[1]);
            } else {
                console.log(this.players[1].name + ' has a flushes');
                console.log('Draw,  both players have flushes');
                this.payWinners(this.players[1], this.players[0]);
            }
            return true;
        }
        return false;
    };


    this.checkForStraightFlush = function(playerA, playerB){

        var aStraightFlush   = (this.players[0].straight >= ZERO) && (this.players[1].flush >= ZERO);
        var bStraightFlush   = (this.players[1].straight >= ZERO) && (this.players[1].flush >= ZERO);

        if( aStraightFlush || bStraightFlush){
            if(aStraightFlush && bStraightFlush){
                if(this.players[0].straight > this.players[1].straight){
                    this.payWinners(this.players[0], this.players[1]);
                    return true;
                } else if (this.players[0].straight < this.players[1].straight){
                    this.payWinners(this.players[1], this.players[0]);
                    return true;
                }else if(this.players[0].straight == this.players[1].straight){
                    return true;
                }
            }

            if(aStraightFlush){
                this.payWinners(this.players[0], this.players[1]);
            } else {
                this.payWinners(this.players[1], this.players[0]);
            }
            return true;
        }
        return false;
    };


    this.payWinners = function(winner, looser){
        winner.addCredits(this.pot);
        looser.removeCredits(this.pot);
        console.log(winner.name + ' wins!');
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