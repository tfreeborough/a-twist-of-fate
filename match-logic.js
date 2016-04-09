var Roster = require('./card-roster'); // Import card roster


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
                        $deck[$counter] = this.roster.consumables[$j];
                    }
                    $counter++; //Add one to counter for deck numbering
                }
            }
        }
        this.shuffleDeck($deck); //Shuffle our deck
        return $deck;
    },





    /*
    @method     shuffleDeck
    @param      Object $deck
    @desc       Shuffles the given deck and returns the shuffled deck back to the calling method
    @return     Object $deck
     */
    shuffleDeck: function($deck){
        return $deck;
    }
};
// END OF LOGIC OBJECT

module.exports = logic;