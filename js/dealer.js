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
 */

/**================= DEALER CONSTRUCTOR ========================= **/

function Dealer() {

    this.deck    = [];
    this.pot     = 100;
    this.players = [];
    this.winner = '';


    /**================= START A GAME ========================= **/

    this.startAGame = function () {

        this.deck = initializeArray(MAX_NUM_CARDS);
        this.deck = createDeck(this.deck);
        this.deck = shuffleDeck(this.deck);

        this.dealNewHand();
        this.displayCards();
    };

    /**================= ADDS A PLAYER ========================= **/

    this.addPlayer = function (player) {
        this.players.push(player);
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

            for (var j = ZERO; j < NUM_CARDS_IN_HAND; j++) {
                var insertHere = $(id).find('ul');
                var newCard    = this.players[i].getCard(j);
                insertHere.append(newCard);
            }
        }

        window.setTimeout(function () {
            $('.card .bottom').toggleClass('transparent');
        }, 3000);

    };

    /** ====================  DISCARD CARDS ==================== */

    this.discardCards = function () {

        var position = [];

        $('#Rick').find('.card').filter('.highlight').each(function (index, elem) {
            var place       = elem.dataset.cardNum;
            position[index] = place;
        });

        console.log(position);

        for (var i = 0; i < position.length; i++) {
            this.players[1].replaceOneCard(position[i], this.deck);
        }


        this.players[1].hand = quicksort(this.players[1].hand, 0, 4);
        this.players[1].cleanAfterDiscard();
        this.displayNewCards(1);
    };

    /** ====================  DISPLAY AFTER DISCARD ==================== */

    this.displayNewCards = function (n) {

        var id;
        id = '#' + this.players[n].name;

        for (var j = ZERO; j < NUM_CARDS_IN_HAND; j++) {
            var insertHere = $(id).find('ul');
            var newCard    = this.players[n].getCard(j);
            insertHere.append(newCard);
        }

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

    /*
     * This checks each hand in a big OR statement.  When it finds the first winning hand,  the rest of the OR
     * statement is short circuited.  if none of the hands exist,  it returns false;
     * */

    this.evaluateHands = function () {

        for (var i = ZERO; i < this.players.length; i++) {
            this.players[i].countHand();
        }


        if ((this.checkForStraightFlush()) ||
            (this.checkForStraights()) ||
            (this.checkForPairs(this.players[0].fourOfAKind, this.players[1].fourOfAKind)) ||
            (this.checkForFlushes()) ||
            (this.checkForFullHouse()) ||
            (this.checkForThreeOfAKind(this.players[0].threeOfAKind, this.players[1].threeOfAKind)) ||
            (this.checkForTwoPair(this.players[0].twoPair, this.players[1].twoPair)) ||
            (this.checkForPairs(this.players[0].pair, this.players[1].pair))) {
            return true;
        }
        console.log('Draw,  no winner');
        this.winner = "";
        return false;
    };

    /** ====================  EVALUATES A 3 OF A KIND ==================== */

    this.checkForThreeOfAKind = function (varA, varB) {

        if (varA > varB) {
            this.payWinners(this.players[0], this.players[1], THREE_OF_KIND_WIN);

            this.players[0].hand.map(function (each) {
                if (each.number == varA) {
                    each.winCard = 1;
                }
            });
            $('#Rick .card').find('.bottom').toggleClass('transparent');
            $('#Morty').find('.card').filter('[data-card-value="' + varA + '"]').addClass('winner');
            $('#Morty').find('.card').not('.winner').find('img').css('height', '75px');
            return true;
        } else if (varA < varB) {
            this.payWinners(this.players[1], this.players[0], THREE_OF_KIND_WIN);

            this.players[1].hand.map(function (each) {
                if (each.number == varB) {
                    each.winCard = 1;
                }
            });
            $('#Morty .card').find('.bottom').toggleClass('transparent');
            $('#Rick').find('.card').filter('[data-card-value="' + varB + '"]').addClass('winner');
            $('#Rick').find('.card').not('.winner').find('img').css('height', '75px');
            return true;
        }
        return false;
    };

    /** ====================  EVALUATES PAIRS ==================== */

    this.checkForPairs = function (varA, varB) {

        if (varA > varB) {


            return this.winnerAccounting(this.players[0], this.players[1], PAIR_WIN);
            /*
             this.payWinners(this.players[0], this.players[1], PAIR_WIN);


             this.players[0].hand.map(function(each){
             if(each.number == varA){
             each.winCard = 1;
             }
             });

             $('#Rick .card').find('.bottom').toggleClass('transparent');
             $('#Morty').find('.card').filter('[data-card-value="' + varA + '"]').addClass('winner');
             $('#Morty').find('.card').not('.winner').find('img').css('height', '75px');
             return true;*/
        } else if (varA < varB) {

            return this.winnerAccounting(this.players[1], this.players[0], PAIR_WIN);
            /*
             this.payWinners(this.players[1], this.players[0], PAIR_WIN);

             this.players[1].hand.map(function(each){
             if(each.number == varB){
             each.winCard = 1;
             }
             });
             $('#Morty .card').find('.bottom').toggleClass('transparent');
             $('#Rick').find('.card').filter('[data-card-value="' + varB + '"]').addClass('winner');
             $('#Rick').find('.card').not('.winner').find('img').css('height', '75px');
             return true; */

        } else if (varA == varB) {
            this.winner = "";

        }
        return false;
    };

    /** ====================  EVALUATES TWO PAIRS ==================== */

    this.checkForTwoPair = function (varA, varB) {

        if (varA > varB) {
            this.payWinners(this.players[0], this.players[1], TWO_PAIR_WIN);

            var secondPair = this.players[0].pair;
            this.players[0].hand.map(function (each) {
                if (each.number == varA || each.number == secondPair) {
                    each.winCard = 1;
                }
            });

            $('#Rick .card').find('.bottom').toggleClass('transparent');
            $('#Morty').find('.card').filter('[data-card-value="' + varA + '"]').addClass('winner');
            $('#Morty').find('.card').filter('[data-card-value="' + this.players[0].pair + '"]').addClass('winner');
            $('#Morty').find('.card').not('.winner').find('img').css('height', '75px');
            return true;
        } else if (varA < varB) {
            this.payWinners(this.players[1], this.players[0], TWO_PAIR_WIN);

            var secondPair = this.players[1].pair;

            this.players[1].hand.map(function (each) {
                if (each.number == varB || each.number == secondPair) {
                    each.winCard = 1;
                }
            });
            $('#Morty .card').find('.bottom').toggleClass('transparent');
            $('#Rick').find('.card').filter('[data-card-value="' + varB + '"]').addClass('winner');
            $('#Rick').find('.card').filter('[data-card-value="' + this.players[1].pair + '"]').addClass('winner');
            $('#Rick').find('.card').not('.winner').find('img').css('height', '75px');
            return true;
        }
        return false;
    };


    /** ====================  EVALUATES A FULL HOUSE ==================== */

    this.checkForFullHouse = function () {

        var aFullHouse = ((this.players[0].threeOfAKind >= ZERO) && (this.players[0].pair >= ZERO));
        var bFullHouse = ((this.players[0].threeOfAKind >= ZERO) && (this.players[1].pair >= ZERO));

        if ((aFullHouse) || (bFullHouse)) {
            if ((aFullHouse) && (bFullHouse)) {
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

            var winnerName = winner.name;
            var looserName = looser.name;

            winner.typeOfWin = type;
            looser.typeOfWin = "";
            this.winner = winner.name;


            $('#' + winnerName).find('.card').addClass('winner');

            winner.hand.map(function (each) {

                if (type === PAIR_WIN) {
                    if (winner.pair == each.number) {
                        each.winCard = 1;
                        console.log('in pair win?');
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

            $('#' + looserName + ' .card').find('.bottom').toggleClass('transparent');

            this.payWinners(winner, looser, type);

            return true;

        };

        /** ====================  PAYS THIS WINNERS ==================== */

        this.payWinners = function (winner, looser, type) {

            winner.typeOfWin = type;
            looser.typeOfWin = "";


            winner.addCredits(this.pot);
            looser.removeCredits(this.pot);
            this.winner = winner.name;
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


