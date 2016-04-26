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

    this.addCard = function (card) {
        this.hand.push(card);
    };

    this.getCard = function (cardNum) {
        return this.hand[cardNum];
    };

    this.addCredits = function (numCredits){

        this.credits += numCredits;
        console.log("Winner!!! " + this.name + " has: " + this.credits + " credits");
    };

    this.removeCredits = function (numCredits){

        this.credits -= numCredits;
        console.log("Looser!!! " + this.name + " has: " + this.credits + " credits");
    };

    this.displayHand = function () {
        $('.purple-rain').append(this.name + "'s hand is <br>");

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {
            var displayCard = '<img src="img/' + this.hand[i].number + " " + this.hand[i].suit + '.png" style="height: 75px"/>'
            $('.purple-rain').append(displayCard);
        }

        $(".wrapper-div img").click(this.highlight)

        $('.purple-rain').append("<br>");
    };

    this.highlight = function () {
        // chage the css on the wrapper div or image to change positon and maybe opacity

    }

    this.countSuitCards = function () {

        var arr;
        arr = [];

        for (var j = 0; j < NUM_SUITS; j++) {
            arr[j] = 0;
        }

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

    };

    this.countNumberCards = function () {

        var arr;
        arr = [];

        for (var j = 0; j < 15; j++) {
            arr[j] = 0;
        }

        for (var i = 0; i < NUM_CARDS_IN_HAND; i++) {
            arr[this.hand[i].number]++;
        }
        return arr;
    };

    this.hasFlush = function () {
        return this.countSuitCards().includes(FLUSH);
    };

    this.hasMoreThanOneNumber = function(n){
        return this.countNumberCards().indexOf(n);
    };

    this.hasFourOfAKind = function () {
        return this.countNumberCards().indexOf(FOUR_OF_A_KIND);
    };

    this.hasThreeOfAKind = function () {
        return this.countNumberCards().indexOf(THREE_OF_KIND);
    };

    this.hasPair = function () {
        return this.countNumberCards().indexOf(PAIR);
    };

    this.hasStraight = function () {

        var arr = this.countNumberCards();
        for (var i = 0; i < 15; i++) {
            if (arr[i] == 1) {
                if (arr[i + 1] == 0) {
                    return false;
                }
                if (arr[i + 2] == 0) {
                    return false;
                }
                if (arr[i + 3] == 0) {
                    return false;
                }
                if (arr[i + 4] == 0) {
                    return false;
                }
                return true;
            }
        }
    };

    this.testerSetHand = function(cards){
        this.hand = cards;

    };
}
