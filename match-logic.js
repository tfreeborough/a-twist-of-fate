var Roster = require('./card-roster'); // Import card roster
var shortid = require('shortid');


// START OF LOGIC OBJECT
var logic = {
    baseHealth: 45, //Set global nexus health variable
    roster: Roster, //Set the roster to what we currently have in Roster


    /*
    @method     seedDeck
    @param      Object $game,
                Array $cardCount,
                Bool $random
    @desc       Seeds a new deck for both players in the given Game object
    @return     Object Game
     */
    seedDeck: function($game, $cardCount, $random){

        $cardCount = typeof $cardCount !== 'undefined' ? $cardCount : [8,12,10];    //Set initial values if not set
        $random = typeof $random !== 'undefined' ? $random : false;                 //Set initial values if not set

        var $deck = {};
        var $counter = 0; //Use a counter to number cards in the deck
        if($random){ //If we want to see a random deck or not

        }else{
            for(var $i=0;$i<$cardCount.length;$i++){ //Read from array of card amounts given
                for(var $j=0;$j<$cardCount[$i];$j++){ //Count over supplied number in $cardCount
                    if($i == 0){ //If we're looking for champions
                        $deck[$counter] = this.roster.champions[$j];
                    }
                    if($i == 1){ //If we're looking for equipment
                        $deck[$counter] = this.roster.equipment[$j];
                    }
                    if($i == 2){ //If we're looking for consumables

                        for(var $k=0; $k<this.roster.consumables[$j].amount; $k++){
                            /*
                             Loop over amount property of each equipment card and reduce remaining amount by the amount of
                             each card - the one we just added.
                             */
                            $deck[$counter] = this.roster.consumables[$j];
                            $counter++;
                        }
                        $cardCount[$i] = $cardCount[$i]-(this.roster.consumables[$j].amount-1);
                    }else{
                        $counter++; //Add one to counter for deck numbering
                    }

                }
            }
        }
        $deck = this.shuffleDeck($deck); //Shuffle our deck
        $deck = this.turnCardsUnique($deck); //Give all cards a unique ID
        return $deck;
    },





    /*
    @method     shuffleDeck
    @param      Object $deck
    @desc       Shuffles the given deck and returns the shuffled deck back to the calling method
    @return     Object $deck
     */
    shuffleDeck: function($deck){
        console.log(Object.keys($deck).length);
        for (var i = 0; i < Object.keys($deck).length - 1; i++) {
            var j = i + Math.floor(Math.random() * (Object.keys($deck).length - i));

            var temp = $deck[j];
            $deck[j] = $deck[i];
            $deck[i] = temp;
        }
        return $deck;
    },





    /*
    @method     turnCardsUnique
    @param      Object $deck
    @desc       Replaces all keys in the deck with unique id's
    @return     Object $deck
     */
    turnCardsUnique: function($deck){
        for(var $i=0;$i<Object.keys($deck).length;$i++){
            var $uid = shortid.generate().toString(); // Generate a random id to replace the card
            var $copy = $deck[$i];
            delete $deck[$i];
            $deck[$uid] = $copy;
        }
        return $deck;
    },





};
// END OF LOGIC OBJECT

module.exports = logic;