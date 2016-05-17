/**
 * Created by Phil on 4/25/16.
 *
 *
 * to do this weekend:
 *
 * highlight history wins - put info in the database - DONE
 * learn to use the pop method to put info in history when window is open.
 * player selection of cards to discard - DONE
 * bettiing
 * Better graphics - can now cover cards,  gotta work on highlighting history
 * routing
 * more intuitive buttons
 *
 * behavior of hitting evaluate too many times
 *
 */

/**================= DEALER CONSTRUCTOR ========================= **/

function Dealer() {

    this.deck    = [];
    this.pot     = 100;
    this.players = [];
    this.winner  = '';


    /**================= START A GAME ========================= **/

    this.startAGame = function () {

        this.deck = initializeArray(MAX_NUM_CARDS);
        this.deck = createDeck(this.deck);
        this.deck = shuffleDeck(this.deck);

        this.dealNewHand();
        this.getInitialBets(50,50);

        this.displayCards();
        this.displayScores();
        $('#alert-panel').toggleClass('transparent');
    };

    this.getInitialBets = function(betA, betB){

        this.players[0].bet = betA;
        this.players[0].credits -= this.players[0].bet;


        this.players[1].bet = betB;
        this.players[1].credits -= this.players[1].bet;

        this.pot += this.players[0].bet + this.players[1].bet;
    };


    /**================= ADDS A PLAYER ========================= **/

    this.addPlayer = function (player) {
        this.players.push(player);
    };


    this.displayScores = function (){

        $('#score1').text(this.players[0].credits);
        $('#score2').text(this.players[1].credits);

        $('#bet1').text(this.players[0].bet);
        $('#bet2').text(this.players[1].bet);

        $('#pot1').text(this.pot);
    };

    /** ============= DEALS HANDS AND SORTS HAND ================= */

    this.dealNewHand = function () {

        for (var i = ZERO; i < NUM_CARDS_IN_HAND; i++) {
            this.players[0].addCard(this.deck.shift());
            this.players[1].addCard(this.deck.shift());
        }

        this.players[0].hand = quicksort(this.players[0].hand, 0, 4);
        this.players[1].hand = quicksort(this.players[1].hand, 0, 4);
    };


    /** ====================  DISPLAY FUNCTIONS ==================== */

    this.displayCards = function () {

        for (var i = ZERO; i < this.players.length; i++) {

            var id            = '#' + this.players[i].name;
            var handContainer = HTMLCurrentHand.replace('%name%', this.players[i].name).replace('%number%', i);
            var playerName    = HTMLPlayerName.replace('%name%', this.players[i].name);

            $('.header').append(handContainer);
            $(id).prepend(playerName);
            this.displayNewCards(this.players[i]);

        }

        window.setTimeout(function () {
            $('.card .bottom').toggleClass('transparent');
        }, 1000);

    };


    /** ====================  DISPLAY AFTER DISCARD ==================== */

    this.displayNewCards = function (currentPlayer, n) {

        var id;
        id = '#' + currentPlayer.name;

        for (var j = ZERO; j < NUM_CARDS_IN_HAND; j++) {
            var insertHere = $(id).find('ul');
            var newCard    = currentPlayer.getCard(j);
            insertHere.append(newCard);
        }
    };


    /** ====================  DISCARD CARDS ==================== */

    this.discardCards = function () {

        var position = [];


        $('#Rick').find('.card').filter('.highlight').each(function (index, elem) {
            var place       = { cardplace   : elem.dataset.cardNum,
                                suit        : elem.dataset.cardSuit,
                                number      : elem.dataset.cardValue};
            position[index] = place;
        });

        var list='';

        for (var i = 0; i < position.length; i++) {
            this.players[1].replaceOneCard(position[i], this.deck);
            list += position[i].number + " "+ position[i].suit + " ";
            var card = '<img class="discard" style="height: 40px" src="img/' + position[i].number + " " + position[i].suit + '.png"/>';
            $('#alert-panel').parent('li').append(card);
        }

        $('#alert-panel').text('Rick discards');
        $('#alert-panel').toggleClass('transparent');

        this.players[1].hand = quicksort(this.players[1].hand, 0, 4);
        this.players[1].cleanAfterDiscard();

        this.displayNewCards(this.players[1]);
        $('#Rick .card').find('.bottom').toggleClass('transparent');
    };


    /** ====================  DISPLAY ONE HAND OF HISTORY ==================== */

    this.displayHistory = function (db) {

        var counter = 0;

        db.on('value', function (item) {

            item.forEach(function (game) {

                var historyHeader = PlayerHistoryHeader.replace('%data%', 'left');
                var handWrapper   = HandBox.replace('%data%', 'left').replace('%round%', counter);
                // var button = PlayerAccountButton.replace('%data%', game.val().hands[0].accountBalance);
                var leftPic = LeftHandUserPic.replace('%data%', 'img/susimai.jpeg').replace('%side%', 'left');
                var cardBox = CardBox.replace('%data%', 'right');

                var outPutA = historyHeader + handWrapper + leftPic + cardBox /* + button */;

                $('.media-list').prepend(outPutA);

                for (var i = ZERO; i < NUM_CARDS_IN_HAND; i++) {

                    var oneCardA = HistoryCard.replace(/%dataNum%/gi, game.val().hands[0].cards[i].number)
                        .replace('%dataSuit%', game.val().hands[0].cards[i].suit)
                        .replace('%size%', "data-winCard=" + game.val().hands[0].cards[i].winCard);

                    $('.hand-history ul').first().append(oneCardA);
                }


                historyHeader = PlayerHistoryHeader.replace('%data%', 'right');
                handWrapper   = HandBox.replace('%data%', 'right').replace('%round%', counter);
                //button = PlayerAccountButton.replace('%data%', game.val().hands[1].accountBalance);
                cardBox = CardBox.replace('%data%', 'right');
                leftPic = LeftHandUserPic.replace('%data%', 'img/Christiano Ronaldo.jpg').replace('%side%', 'right');

                var outPutB = historyHeader + handWrapper  /* + button */ + cardBox + leftPic;

                $('.media-list').prepend(outPutB);

                for (var j = ZERO; j < NUM_CARDS_IN_HAND; j++) {

                    var oneCardB = HistoryCard.replace(/%dataNum%/gi, game.val().hands[1].cards[j].number)
                        .replace('%dataSuit%', game.val().hands[1].cards[j].suit)
                        .replace('%size%', "data-winCard=" + game.val().hands[1].cards[j].winCard);
                    $('.media-body ul').first().append(oneCardB);

                }
                $('.hand-history ul').find('img').filter('[data-winCard="1"]').addClass('winner');
                counter++;
                $('.media-list').prepend('<div class="ui fitted divider"></div>');
            });
        });
        $('.hand-history ul').find('img').filter('[data-winCard="1"]').addClass('highlight');
    };


    /** ====================  GAME HAND EVALUATIONS ==================== */


    this.evaluateHands = function () {

        for (var i = ZERO; i < this.players.length; i++) {
            this.players[i].countHand();
        }


        if ((this.checkForStraightFlush()) ||
            (this.checkForStraights()) ||
            (this.checkNumbers(this.players[0].fourOfAKind, this.players[1].fourOfAKind, FOUR_OF_A_KIND_WIN)) ||
            (this.checkForFlushes()) ||
            (this.checkForFullHouse()) ||
            (this.checkNumbers(this.players[0].threeOfAKind, this.players[1].threeOfAKind, THREE_OF_KIND_WIN)) ||
            (this.checkNumbers(this.players[0].twoPair, this.players[1].twoPair, TWO_PAIR_WIN)) ||
            (this.checkNumbers(this.players[0].pair, this.players[1].pair, PAIR_WIN))) {
            return true;
        }

        $('#alert-panel').text("Draw");
        $('#alert-panel').toggleClass('transparent');

        console.log('Draw,  no winner');
        this.winner = "";
        return false;
    };

    this.checkNumbers = function (varA, varB, type) {

        if (varA > varB) {
            return this.winnerAccounting(this.players[0], this.players[1], type);
        } else if (varA < varB) {
            return this.winnerAccounting(this.players[1], this.players[0], type);
        }

        return false;
    };





    /** ====================  EVALUATES A FULL HOUSE ==================== */

    this.checkForFullHouse = function () {

        var aFullHouse = ((this.players[0].threeOfAKind >= ZERO) && (this.players[0].pair >= ZERO));
        var bFullHouse = ((this.players[0].threeOfAKind >= ZERO) && (this.players[1].pair >= ZERO));

        if ((aFullHouse) || (bFullHouse)) {
            if ((aFullHouse) && (bFullHouse)) {

                // here i need to check who has the higher full house
                this.winner = "";
                return true;
            }

            if ((aFullHouse)) {
                return this.winnerAccounting(this.players[0], this.players[1], FULL_HOUSE_WIN);
            } else {
                return this.winnerAccounting(this.players[1], this.players[0], FULL_HOUSE_WIN);
            }
        }
        return false;
    };


    /** ====================  EVALUATES A STRAIGHT ==================== */

    this.checkForStraights = function () {

        var aStraight = this.players[0].straight >= ZERO;
        var bStraight = this.players[1].straight >= ZERO;

        if (aStraight || bStraight) {

            if (this.players[0].straight > this.players[1].straight) {
                return this.winnerAccounting(this.players[0], this.players[1], STRAIGHT_FLUSH_WIN);
            } else if (this.players[0].straight < this.players[1].straight) {
                return this.winnerAccounting(this.players[1], this.players[0], STRAIGHT_FLUSH_WIN);
            } else if (this.players[0].straight == this.players[1].straight) {
                return true;
            }
        }
        return false;
    };


    /** ====================  EVALUATES A FLUSH ==================== */

    this.checkForFlushes = function () {


        var aFlush = this.players[0].flush >= ZERO;
        var bFlush = this.players[1].flush >= ZERO;

        if (aFlush || bFlush) {
            if (aFlush && bFlush) {
                return true;
            }

            if (aFlush) {
                return this.winnerAccounting(this.players[0], this.players[1], FLUSH_WIN);
            } else {
                return this.winnerAccounting(this.players[1], this.players[0], FLUSH_WIN);
            }
        }
        return false;
    };

    /** ====================  EVALUATES A STRAIGHT FLUSH ==================== */

    this.checkForStraightFlush = function () {

        var aStraightFlush = (this.players[0].straight >= ZERO) && (this.players[1].flush >= ZERO);
        var bStraightFlush = (this.players[1].straight >= ZERO) && (this.players[1].flush >= ZERO);

        if (aStraightFlush || bStraightFlush) {
            if (aStraightFlush && bStraightFlush) {

                if (this.players[0].straight > this.players[1].straight) {
                    return this.winnerAccounting(this.players[0], this.players[1], STRAIGHT_FLUSH_WIN);
                } else if (this.players[0].straight < this.players[1].straight) {
                    return this.winnerAccounting(this.players[1], this.players[0], STRAIGHT_FLUSH_WIN);
                }

                if (aStraightFlush) {
                    return this.winnerAccounting(this.players[0], this.players[1], STRAIGHT_FLUSH_WIN);
                } else {
                    return this.winnerAccounting(this.players[1], this.players[0], STRAIGHT_FLUSH_WIN);
                }
            }
            return false;
        }
    };


    /** ====================  ACCOUNTS FOR ALL THE CLEANUP AFTER A WIN ==================== */

    this.winnerAccounting = function (winner, looser, type) {

        winner.typeOfWin = type;
        looser.typeOfWin = "";
        this.winner      = winner.name;

        this.highlightWinningCards(winner, type);
        this.markWinnerCards(winner, type);
        this.payWinners(winner, looser, type);
        $('#' + looser.name + ' .card').find('.bottom').toggleClass('transparent');

        return true;

    };


    this.highlightWinningCards = function(winner, type){

        if (type === PAIR_WIN) {
            this.highlightTheCard(winner.name, winner.pair);

        } else if (type === THREE_OF_KIND_WIN) {
            this.highlightTheCard(winner.name, winner.threeOfAKind);

        } else if (type === TWO_PAIR_WIN) {
            $('#' + winner.name).find('.card').filter('[data-card-value="' + winner.pair + '"]').addClass('winner');
            $('#' + winner.name).find('.card').filter('[data-card-value="' + winner.twoPair + '"]').addClass('winner');
            $('#' + winner.name).find('.card').not('.winner').find('img').css('height', '75px');

        } else if (type === FOUR_OF_A_KIND_WIN) {

            this.highlightTheCard(winner.name, winner.fourOfAKind);
        }
    };

    this.highlightTheCard = function(winnerName, winningCards){

        $('#' + winnerName).find('.card').filter('[data-card-value="' + winningCards + '"]').addClass('winner');
        $('#' + winnerName).find('.card').not('.winner').find('img').css('height', '75px');
    };


    this.markWinnerCards = function(winner, type){

        winner.hand.map(function (each) {

            if (type === PAIR_WIN) {
                if (winner.pair == each.number) {
                    each.winCard = 1;
                }
            } else if (type === THREE_OF_KIND_WIN) {
                if (winner.threeOfAKind == each.number) {
                    each.winCard = 1;
                }
            } else if (type === TWO_PAIR_WIN) {
                if (winner.twoPair == each.number || winner.pair == each.number) {
                    each.winCard = 1;
                }
            } else {
                each.winCard = 1;
            }
        });

    };

    /** ====================  PAYS THIS WINNERS ==================== */

    this.payWinners = function (winner, looser, type) {

        winner.typeOfWin = type;
        looser.typeOfWin = "";


        winner.addCredits(this.pot);
        looser.removeCredits(this.pot);
        this.winner = winner.name;
        this.displayScores();


        $('#alert-panel').text(winner.name +" wins a pot of " + this.pot + " credits with a " + type);
        $('#alert-panel').toggleClass('transparent');

        this.pot = ZERO;
    };


    /** ====================  CREATES THE OBJECT STORED IN FIREBASE ==================== */

    this.saveHand = function () {

        return {
            winner : this.winner,
            potSize: this.pot,
            hands  : [
                {
                    playerAName   : this.players[0].name,
                    cards         : this.players[0].hand,
                    typeOfWin     : this.players[0].typeOfWin,
                    accountBalance: this.players[0].credits
                }, {
                    playerAName   : this.players[1].name,
                    cards         : this.players[1].hand,
                    typeOfWin     : this.players[1].typeOfWin,
                    accountBalance: this.players[1].credits
                }]
        };
    };
}

<!--
var handleDashboardGritterNotification = function() {
    $(window).load(function() {
        setTimeout(function() {
            $.gritter.add({
                title: 'Welcome back, Admin!',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lacus ut lectus rutrum placerat.',
                image: 'assets/img/user-2.jpg',
                sticky: true,
                time: '',
                class_name: 'my-sticky-class'
            });
        }, 1000);
    });
};

-->