/**
 * Created by Phil on 4/25/16.
 */


/*
 * Current Hand HTML
 *
 * */

var HTMLCurrentHand         = '<div class="purple-rain" id="%name%" data-player-number="%number%"><ul class="beret"> </ul></div>';
var HTMLPlayerName          = '<h3>%name%</h3>';
/*
 * History HTML
 * */

var PlayerHistoryHeader     = '<li class="media media-sm"> <div class="media-body media-%data%">';
var LeftHandUserPic         = '<a class="media-%side%" href="javascript:;"><img src="%data%" alt="" class="media-object rounded-corner"/></a>';
var RightHandUserPic        = '<a class="media-%side%" href="javascript:;"><img src="%data%" alt="" class="media-object rounded-corner"/></a>';

var HandBox                 = '<div class="media-body text-%data% hand-history round-%round%" style="position: relative;">';
var PlayerAccountButton     = '<a href="javascript:;" class="btn btn-sm btn-danger m-r-5"> %data%</a>';
var CardBox                 = '<div class="hand-history text-%data%"><ul style="padding-left: 0px"></ul></div>';

var HistoryCard             = '<li class="history-card" data-card-value="%dataNum%"><img src="img/%dataNum% %dataSuit%.png" %size%></li>';




/*
 *
 * ====================== DEALING, SHUFFLING, CREATING THE DEAK ===========================
 *
 *  */
function createDeck(deck){

    for (let i = ZERO; i < MAX_NUM_CARDS; i++) {
        switch (i % NUM_SUITS) {
            case DIAMONDS:
                deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: DIAMONDS_STRING, winCard: ""};
                break;
            case HEARTS:
                deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: HEARTS_STRING, winCard: ""};
                break;
            case CLUBS:
                deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: CLUBS_STRING, winCard: ""};
                break;
            case SPADES:
                deck[i] = {number: (2 + float2int(i / NUM_SUITS)), suit: SPADES_STRING, winCard: ""};
                break;
            default:
                break;
        }
    }

    return deck;
};


/*
 * Deck Shuffler,  previous algorithm of swapping two items did not see to introduce enough randomness into
 * the deal,  so i reverted back to this method.
 * */

function shuffleDeck(deck) {

    let randNum;
    let arr = [];

    for (let j = ZERO; j < 4; j++) {

        arr = initializeArray(MAX_NUM_CARDS);
        let spotsFilled = ZERO;

        for (let i = ZERO; i < MAX_NUM_CARDS; i++) {

            randNum = randomSlot();

            while (arr[randNum] != ZERO) {
                randNum = randomSlot();

                if (spotsFilled == NEXT_TO_LAST_CARD) {
                    randNum = arr.indexOf(0);
                }
            }
            arr[randNum] = deck[i];
            spotsFilled++;
        }
    }
    return arr;
};



function quicksort(arr, left, right){


    let pivotNum = left + float2int((right-left) /2);
    let pivot = arr[pivotNum].number;

    let i = left;
    let j = right;

    while (i <= j) {

        while (arr[i].number < pivot) { i++; }

        while (arr[j].number > pivot) { j--; }

        if (i <= j) {
            arr = this.exchange(arr, i, j);
            i++;
            j--;
        }
    }

    if(left < j) {
        arr = this.quicksort(arr, left, j);}

    if(i < right) {
        arr = this.quicksort(arr, i, right);}
    return arr;
};


function exchange(arr, i, j){

    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
    return arr;
};


function cleanHistory(){

    $('.media-list').find('li').remove();
    $('.media-list').find('.divider').remove();
};

/*
 * returns a random integer between 0 and 52
 * */

function randomSlot() {
    return float2int(getRandomArbitrary(ZERO, MAX_NUM_CARDS))
}

/*
 * helper function for randomSlot
 * */

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/*
 * takes a float and returns an integer
 * */

function float2int(value) {
    return value | ZERO;
}

function initializeArray(n){

    let arr;
    arr = [];

    for (let j = ZERO; j < n; j++) {
        arr[j] = ZERO;
    }

    return arr;
}

