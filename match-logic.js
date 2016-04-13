var Roster = require('./card-roster'); // Import card roster
var shortid = require('shortid');
var deepcopy = require("deepcopy");

// START OF LOGIC OBJECT
var logic = {
    baseHealth: 45, //Set global nexus health variable
    roster: Roster, //Set the roster to what we currently have in Roster


    /*
    @method     seedDeck
    @param      Array $cardCount,
                Bool $random
    @desc       Seeds a new deck for both players in the given Game object
    @return     Object Game
     */
    seedDeck: function($cardCount, $random){

        $cardCount = typeof $cardCount !== 'undefined' ? $cardCount : [8,12,10];    //Set initial values if not set
        $random = typeof $random !== 'undefined' ? $random : false;                 //Set initial values if not set

        var $deck = {};
        var $counter = 0; //Use a counter to number cards in the deck
        if($random){ //If we want to see a random deck or not

        }else{
            for(var $i=0;$i<$cardCount.length;$i++){ //Read from array of card amounts given
                for(var $j=0;$j<$cardCount[$i];$j++){ //Count over supplied number in $cardCount
                    if($i == 0){ //If we're looking for champions
                        $deck[$counter] = deepcopy(this.roster.champions[$j]);
                    }
                    if($i == 1){ //If we're looking for equipment
                        $deck[$counter] = deepcopy(this.roster.equipment[$j]);
                    }
                    if($i == 2){ //If we're looking for consumables

                        for(var $k=0; $k<this.roster.consumables[$j].amount; $k++){
                            /*
                             Loop over amount property of each equipment card and reduce remaining amount by the amount of
                             each card - the one we just added.
                             */
                            $deck[$counter] = deepcopy(this.roster.consumables[$j]);
                            $counter++;
                        }
                        $cardCount[$i] = $cardCount[$i]-(this.roster.consumables[$j].amount-1);
                    }else{
                        $counter++; //Add one to counter for deck numbering
                    }

                }
            }
        }
      
        return $deck;
    },





    /*
    @method     shuffleDeck
    @param      Object $deck
    @desc       Shuffles the given deck and returns the shuffled deck back to the calling method
    @return     
     */
    shuffleDeck: function($deckOrder){
        var $i = $deckOrder.length, $temp, $rand;

        while(0 !== $i) {
            $rand = Math.floor(Math.random() * $i); //random index
            $i -= 1;

            //swap
            $temp = $deckOrder[$i];
            $deckOrder[$i] = $deckOrder[$rand];
            $deckOrder[$rand] = $temp;
        }
    },





    /*
    @method     turnCardsUnique
    @param      Object $match
    @desc       Replaces all keys in the deck with unique id's
    @return     
    */
    // turnCardsUnique: function($deck){
    //     for(var $i=0;$i<Object.keys($deck).length;$i++){
    //         var $uid = shortid.generate().toString(); // Generate a random id to replace the card
    //         var $copy = $deck[$i];
    //         delete $deck[$i];
    //         $deck[$uid] = $copy;
    //     }
    //     return $deck;
    // },
    turnCardsUnique: function($match) {
        var $d1 = deepcopy($match.match[$match.player1.id].deck);
        var $d2 = deepcopy($match.match[$match.player2.id].deck);

        var $d1Keys = Object.keys($d1);
        var $d2Keys = Object.keys($d2);

        if($d1Keys.length !== $d2Keys.length)
            return;

        for(var $i=0;$i<$d1Keys.length;$i++){
            $d1[shortid.worker(0).generate()] = $d1[$d1Keys[$i]];
            delete $d1[$d1Keys[$i]];           
           
            $d2[shortid.worker(16).generate()] = $d2[$d2Keys[$i]];
            delete $d2[$d2Keys[$i]];
        }

        $match.match[$match.player1.id].deck = $d1;
        $match.match[$match.player2.id].deck = $d2;
    },




    /*
    @method     drawCards
    @param      int $amount
                Object $match
    @desc       Draws $size amount of cards from the cardOrder, and places into hand object
    @return     
    */
    drawCards: function($amount, $match) {
        var $cardKey;

        for(var $i = 0; $i < $amount; $i++){
            $cardKey = $match.deckOrder.shift();
            $match.hand[$cardKey] = $match.deck[$cardKey];
        }
    }

};
// END OF LOGIC OBJECT

module.exports = logic;