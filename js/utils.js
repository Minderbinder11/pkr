/**
 * Created by Phil on 4/25/16.
 */
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
    return value | 0;
}
