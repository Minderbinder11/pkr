/**
 * Created by Phil on 4/23/16.
 */

$(document).ready(function () {




    function startUp() {

        var myDataRef = new Firebase('https://pkrapp.firebaseio.com');

        var dealer = new Dealer();

        var playerA = new Player("Morty", 500);
        var playerB = new Player("Rick", 500);

        dealer.addPlayer(playerA);
        dealer.addPlayer(playerB);

        $('#history-modal').modal('show');


        /*
        *    =================== DEAL A HAND ======================
        * */
        $('.supporting').on('click', '#deal', function (){


            playerA.cleanHand();
            playerB.cleanHand();
            cleanHistory();
            dealer.startAGame();
            document.getElementById('deal').disabled = true;
            document.getElementById('discard').disabled = false;

        });

/*
 *    =================== SHOW HISTORY ======================
* */

        $('.supporting').on('click', '#history', function(){

          dealer.displayHistory(myDataRef);
        });

/*
 *    =================== DISCARD CARDS ======================
* */
        $('.supporting').on('click', '#discard', function(){

            document.getElementById('discard').disabled = true;
            dealer.discardCards();

        });

/*
 *    =================== EVALUATE CARDS ======================
* */
        $('.supporting').on('click', '#evaluate', function() {

            dealer.evaluateHands();
            var obj = dealer.saveHand();
            myDataRef.push(obj);

            document.getElementById('deal').disabled = false;

        });

/*
 *    =================== CLEAR HISTORY ======================
* */

        $('.supporting').on('click', '#clear', function(){
            myDataRef.set(null);  // erases the database
            $('.media-list').find('li').remove();
            $('.media-list').find('.divider').remove();
        });



        $(document).on('click','.card', function(){

            $(this).toggleClass('highlight');

        });

        $('.beret .card').on('click', function(){

           this.addClass('selected');
            console.log('click');
        });

    }

    startUp();

});