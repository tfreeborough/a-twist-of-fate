
// START OF ROSTER OBJECT
var roster = {

    /*
    TARGET TYPES
            single: This ability can only target one single champion.
             multi: This ability can target multiple champions.
              self: This ability targets the champion it was case from.
         reflected: This ability targets the champion attacking it.
         allyNexus: This ability targets your own nexus.
        enemyNexus: This ability targets the enemy nexus.
     */


    /*
    @var    champions
    @desc   Contains details about all champion cards
     */
    champions: {
        0: {
            /*
            @param
                name:           Name of the champion
                description:    A short card description, NOT ULT DESCRIPTION
                type:           The card type
                health:         The health of the card
                ult: {
                    @param
                        passive:            Is the ult an active ability?
                        chance:             The change of this ult occurring.
                        targetType:         The targetType, read more at top.
                        targetRandomness:   Does this ult target random champions.
                        targetAlly:         Can this ult hit allies?
                        targetEnemy:        Can this ult hit enemies?
                        killRequired:       Does this ult need to kill a card in order to activate
                        numberOfTargets:    The number of champions this card targets
                        damage:             The damage this ult inflicts
                        healing:            The healing this ult provides
                        description:        The ult description that goes on the card.
                }
             */
            name: "Rammus",
            description: "When asked if Rammus would aid you in the fight he simply said 'Okay...'.",
            type: 'tank',
            health: 24,
            ult: {
                passive: true,
                chance: 100,
                targetType: 'reflected',
                targetRandomness: false,
                targetAlly: false,
                targetEnemy: true,
                killRequired: false,
                numberOfTargets: 1,
                damage: 1,
                healing: 0,
                description: "When attacked, Rammus returns 1 damage to his attacker"
            }
        },
        1: {
            name: "Cho'Gath",
            description: "He keeps wishing our world to end. We're not sure if that's good but at least he's helping...",
            type: 'tank',
            health: 26,
            ult: {
                passive: true,
                chance: 100,
                targetType: 'self',
                targetRandomness: false,
                targetAlly: true,
                targetEnemy: false,
                killRequired: true,
                numberOfTargets: 1,
                damage: 0,
                healing: 2,
                description: "When Cho'gath kills an enemy, he gains 2 health"
            }
        },
    },




    /*
     @var    equipment
     @desc   Contains details about all equipment cards
     */
    equipment: {
        0: {

        },
    },




    /*
     @var    consumables
     @desc   Contains details about all consumable cards
     */
    consumables: {
        0: {

        },
    }





};
// END OF ROSTER OBJECT

/*
@author Tom Freeborough <4newmusic@googlemail.com>

TAKEN FROM GOOGLE DOC 09/04/2016

 Initial Deck
    8 Champion Cards
        + Rammus & Cho’gath (TANKS)
        + Rengar & Elise (JUNGLE)
        + Soraka & Taric (SUPPORT)
        + Le Blanc & Master Yi (Totally balanced) (ASSASSIN)
    12 Equipment
        + Zhonya’s Hourglass (When taking critical damage, become invulnerable for 1 turn)
        + Warmogs Armor (Health + At the end of each turn heal for 1 Health)
        + Ninja Tabi Boots (Chance to dodge attacks)
        + Boots of lucidity (Reduce Ultimate cooldown by 1 turn)
        + Ravenous Hydra (Attacks splash enemies either side for 1 damage)
        + B.F Sword (Increases attack)
        + Giants Belt (Increases health)
        + Bloodthirster (When attacking heal for 2 damage)
        + Sunfire cape (Health + 1 extra damage on attack)
        + Ludens Echo (When using ultimate, affects another random enemy card)
        + Thornmail (When struck returns 1 damage to attacker)
        + Banshees veil (Shield for 8 damage, refreshed after taking no damage for 3 turns)
    10 Consumables
        + Health Potion (Heal target champion for 1 each turn *lasts 5 turns*) x 2
        + Elixir of rage (Increase all damage dealt by 2 but increases damage taken by 2)
        + Red Buff (When any champion takes damage, they also take 1 extra damage)
        + Blue Buff (All champion have their cooldowns reduced by 1 turn)
        + Baron buff (All champion gain +1 Attack +3 health)
        + Ward (Block the next incoming targeted attack) x 3
        + Revive (Returns a random dead champion into your hand)
 */


module.exports = roster;