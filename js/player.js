/**
 * Created by Phil on 4/25/16.
 */

/*
 * PLAYER CONSTRUCTOR
 * */


function Player(name, initialAmount) {

    this.hand         = [];
    this.name         = name;
    this.credits      = initialAmount;
    this.typeOfWin    = "";
    this.straight     = ZERO;
    this.flush        = ZERO;
    this.fourOfAKind  = ZERO;
    this.threeOfAKind = ZERO;
    this.twoPair      = ZERO;
    this.pair         = ZERO;

    this.replaceOneCard = function (position, deck) {

        var newCard         = deck.shift();
        this.hand[position] = newCard;

    };

    this.cleanHand = function () {

        for (var i = ZERO; i < NUM_CARDS_IN_HAND; i++) {

            this.hand.shift();
        }

        var playerACards = $('#' + this.name);
        playerACards.each(function () {
            $(this).remove();
        });
    };


    this.cleanAfterDiscard = function () {

        var playerACards = $('#' + this.name).find('li');
        playerACards.each(function () {
            $(this).remove();
        });
    };


    this.addCard = function (card) {
        this.hand.push(card);
    };


    this.getCard = function (n) {

        var formattedCard;

        formattedCard = '<li class="card" data-card-value="' + this.hand[n].number + '" data-card-num="' + n + '">' +
            '<img class="current-hand top" src="img/' + this.hand[n].number + " " + this.hand[n].suit + '.png"/>' +
            '<img class="current-hand bottom" src="img/top-of-card.png"/></li>';

        return formattedCard;
    };


    this.countSuitCards = function () {

        var arr = initializeArray(NUM_SUITS);

        for (var i = ZERO; i < NUM_CARDS_IN_HAND; i++) {

            switch (this.hand[i].suit) {
                case "D":
                    arr[0]++;
                    break;
                case "H":
                    arr[1]++;
                    break;
                case "C":
                    arr[2]++;
                    break;
                case "S":
                    arr[3]++;
                    break;
                default:
                    break;
            }
        }
        return arr;

        // learn .map, .filter, .reduce
    };


    this.countNumberCards = function () {

        var arr = initializeArray(15);

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {
            arr[this.hand[i].number]++;
        }
        return arr;
    };


    this.countHand = function () {

        this.straight     = this.hasStraight();
        this.flush        = this.hasFlush();
        this.fourOfAKind  = this.hasMoreThanOneNumber(FOUR_OF_A_KIND, 0);
        this.threeOfAKind = this.hasThreeOfAKind();
        this.twoPair      = this.hasTwoPair();
        this.pair         = this.hasMoreThanOneNumber(PAIR);

    };


    this.hasThreeOfAKind = function () {
        return this.countNumberCards().indexOf(THREE_OF_KIND);

    };

    this.hasFlush = function () {
        return this.countSuitCards().indexOf(FLUSH);
    };

    this.hasTwoPair = function () {

        this.pair = this.hasMoreThanOneNumber(PAIR, ZERO);
        return this.hasMoreThanOneNumber(PAIR, this.pair + 1);
    };

    this.hasMoreThanOneNumber = function (n, index) {
        return this.countNumberCards().indexOf(n, index);
    };

    this.hasStraight = function () {

        var arr = this.countNumberCards();


        for (var i = ZERO; i < 11; i++) {


            if (arr[i] != 1) {
                break;
            }
            if (arr[i + 1] == ZERO) {
                return NOT_FOUND;
            }
            if (arr[i + 2] == ZERO) {
                return NOT_FOUND;
            }
            if (arr[i + 3] == ZERO) {
                return NOT_FOUND;
            }
            if (arr[i + 4] == ZERO) {
                return NOT_FOUND;
            }
            return i;
        }
        return NOT_FOUND;
    };


    this.addCredits = function (numCredits) {
        this.credits += numCredits;
    };


    this.removeCredits = function (numCredits) {
        this.credits -= numCredits;
    };
}
