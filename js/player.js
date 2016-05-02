/**
 * Created by Phil on 4/25/16.
 */

/*
 * PLAYER CONSTRUCTOR
 * */

function Player(name, initialAmount) {

    this.hand = [];
    this.name = name;
    this.credits = initialAmount;
    this.straight = ZERO;
    this.flush = ZERO;
    this.fourOfAKind = ZERO;
    this.threeOfAKind = ZERO;
    this.twoPair = ZERO;
    this.pair = ZERO;


    this.cleanHand = function () {

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {

            this.hand.shift();
        }
    };

    this.addCard = function (card) {
        this.hand.push(card);
    };

    this.getCard = function (n) {

        var formattedCard;

        formattedCard = '<li class="card" data-card-position="' + n + '"><img src="img/' + this.hand[n].number + " " + this.hand[n].suit + '.png"/></li>';
        return formattedCard;
    };


    this.highlight = function () {
        // chage the css on the wrapper div or image to change positon and maybe opacity

    }

    this.countSuitCards = function () {

        var arr = initializeArray(NUM_SUITS);

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {

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

        this.straight = this.hasStraight();
        this.flush = this.hasFlush();
        this.fourOfAKind = this.hasMoreThanOneNumber(FOUR_OF_A_KIND);
        this.threeOfAKind = this.hasMoreThanOneNumber(THREE_OF_KIND);
        this.twoPair = this.hasTwoPair();
        this.pair = this.hasMoreThanOneNumber(PAIR);

    };


    this.hasFlush = function () {
        return this.countSuitCards().indexOf(FLUSH);
    };

    this.hasTwoPair = function () {

        var firstPair = this.hasMoreThanOneNumber(PAIR);
        return this.hasMoreThanOneNumber(PAIR, firstPair + 1);
    };

    this.hasMoreThanOneNumber = function (n, index) {
        return this.countNumberCards().indexOf(n, index);
    };

    this.hasStraight = function () {

        var arr = this.countNumberCards();

        // only need to run the for loop to 11 (Jack, because cant have straight past 11)
        // can use indexof and then test next 4 cards.

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

    this.testerSetHand = function (cards) {
        this.hand = cards;

    };


    this.addCredits = function (numCredits) {

        this.credits += numCredits;
        console.log("Winner!!! " + this.name + " has: " + this.credits + " credits");
    };

    this.removeCredits = function (numCredits) {

        this.credits -= numCredits;
        console.log("Looser!!! " + this.name + " has: " + this.credits + " credits");
    };
}
