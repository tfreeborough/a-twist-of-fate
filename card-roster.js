
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
                        delay:              The amount of turns before this ult triggers
                        timer:              The amount of turns this persists for, 0 is infinite.
                        cooldown:           The turns before this ult can be used
                        damage:             The damage this ult inflicts
                        attack:             The modifier to add to the targets attack
                        healing:            The modifier to add to the targets health
                        description:        The ult description that goes on the card.
                }
             */
            name: "Rammus",
            description: "When asked if Rammus would aid you in the fight he simply said 'Okay...'.",
            type: 'tank',
            health: 24,
            attack: 2,
            ult: {
                passive: true,
                chance: 100,
                targetType: 'reflected',
                targetRandomness: false,
                targetAlly: false,
                targetEnemy: true,
                killRequired: false,
                numberOfTargets: 1,
                delay:0,
                timer:0,
                cooldown:0,
                damage: 1,
                attack: 0,
                healing: 0,
                description: "When attacked, Rammus returns 1 damage to his attacker"
            }
        },
        1: {
            name: "Cho'Gath",
            description: "He keeps wishing our world to end. We're not sure if that's good but at least he's helping...",
            type: 'tank',
            health: 26,
            attack: 3,
            ult: {
                passive: true,
                chance: 100,
                targetType: 'self',
                targetRandomness: false,
                targetAlly: true,
                targetEnemy: false,
                killRequired: true,
                numberOfTargets: 1,
                delay:0,
                timer:0,
                cooldown:0,
                damage: 0,
                attack: 0,
                healing: 2,
                description: "When Cho'gath kills an enemy, he gains 2 health"
            }
        },
        2: {
            name: "Rengar",
            description: "Rengards description goes here",
            type: 'jungle',
            health: 16,
            attack: 10,
            ult: {
                passive: false,
                chance: 100,
                targetType: 'self',
                targetRandomness: false,
                targetAlly: true,
                targetEnemy: false,
                killRequired: false,
                numberOfTargets: 1,
                delay:1,
                timer:1,
                cooldown:4,
                damage: 0,
                attack: 10,
                healing: 0,
                description: "On Rengar's next attack he deals 200% damage"
            }
        },
        3: {
            name: "Elise",
            description: "We have no idea how she makes the time to spin all of those webs...",
            type: 'jungle',
            health: 15,
            attack: 12,
            ult: {
                passive: true,
                chance: 100,
                targetType: 'reflected',
                targetRandomness: false,
                targetAlly: true,
                targetEnemy: false,
                killRequired: false,
                numberOfTargets: 1,
                delay:0,
                timer:0,
                cooldown:4,
                damage: 0,
                attack: -100,
                healing: 0,
                description: "The next attack to hit elise deals 0 damage"
            }
        },
        4: {
            name: "Soraka",
            description: "Whatever you do, just don't call her attacks bananas.",
            type: 'support',
            health: 18,
            attack: 1,
            ult: {
                passive: false,
                chance: 100,
                targetType: 'multi',
                targetRandomness: false,
                targetAlly: true,
                targetEnemy: false,
                killRequired: false,
                numberOfTargets: 5,
                delay:0,
                timer:0,
                cooldown:5,
                damage: 0,
                attack: 0,
                healing: 5,
                description: "Soraka calls down a blessing, giving all allied champions +5 health."
            }
        },
        5: {
            name: "Taric",
            description: "Perhaps the most mysterious thing about Taric is where he found that outrageous pink outfit.",
            type: 'support',
            health: 22,
            attack: 1,
            ult: {
                passive: false,
                chance: 100,
                targetType: 'multi',
                targetRandomness: true,
                targetAlly: true,
                targetEnemy: false,
                killRequired: false,
                numberOfTargets: 3,
                delay:0,
                timer:1,
                cooldown:4,
                damage: 0,
                attack: 6,
                healing: 0,
                description: "Taric increased the attack of up to 3 random allied champions by +6 for 1 turn."
            }
        },
        6: {
            name: "Le Blanc",
            description: "Weird that she is called Le Blanc but wears no white clothes whatsoever.",
            type: 'assassin',
            health:8,
            attack:6,
            ult: {
                passive: false,
                chance: 100,
                targetType: 'single',
                targetRandomness: false,
                targetAlly: false,
                targetEnemy: true,
                killRequired: false,
                numberOfTargets: 1,
                delay:0,
                timer:0,
                cooldown:2,
                damage: 18,
                attack: 0,
                healing: 0,
                description: "Le Blanc targets an enemy and hits them for 18 Damage."
            }
        },
        7: {
            name: "Master Yi",
            description: "Wuju... pass me that lotion.",
            type: 'assassin',
            health: 9,
            attack: 8,
            ult: {
                passive: true,
                chance: 50,
                targetType: 'single',
                targetRandomness: false,
                targetAlly: false,
                targetEnemy: true,
                killRequired: false,
                numberOfTargets: 1,
                delay:0,
                timer:1,
                cooldown:0,
                damage: 0,
                attack: 8,
                healing: 0,
                description: "When master yi attacks, he has a 50% chance to deal double damage."
            }
        }
    },




    /*
     @var    equipment
     @desc   Contains details about all equipment cards
     */
    equipment: {
        /*
         @param
            name:           Name of the champion
            flavour:        Flavourtext for the item
            description:    A short card description, NOT ULT DESCRIPTION
            uses:           The number of uses this equipment has
            modifiers: {
                @param
                    triggerOnAttack:    Does this item trigger when the champion attacks an enemy?
                    triggerOnDefense:   Triggers when you are attacked.
                    chance:             This equipment only has a chance of triggering
                    health:             Modifies base health
                    attack:             Modifies base attack
                    healing:            Grants bonus health
                    damage:             Inflicts damage
                    damageReduction:    Reduces all incoming damage
                    cooldownReduction:  Reduces the cooldown of parent card
                    cooldown:           Can the equipment only be used X turns?
                    splash:             Does this equipment splash to nearby enemies
                    endOfTurn:          Does this equipment trigger at the end of a turn?
         }
         */
        0: {
            name: "Zhonaya's Hourglass",
            flavour: "Freeze!",
            description: "Upon taking damage, become immune to all damage this turn.",
            uses:1,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:true,
                chance:100,
                health:0,
                attack:0,
                healing:0,
                damage:0,
                damageReduction:100,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        1: {
            name: "Warmogs",
            flavour: "Feel the power.",
            description: "+8 Health, Heal for 1 at the end of each turn.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:false,
                chance:100,
                health:8,
                attack:0,
                healing:1,
                damage:0,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:true
            }
        },
        2: {
            name: "Ninja Tabi",
            flavour: "You never saw me coming.",
            description: "You have a 10% chance to dodge incoming attacks.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:true,
                chance:10,
                health:0,
                attack:0,
                healing:0,
                damage:0,
                damageReduction:100,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        3: {
            name: "Boots of Lucidity",
            flavour: "Pure energy courses through your veins.",
            description: "Reduces your ult cooldown by 1 turn.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:false,
                chance:100,
                health:0,
                attack:0,
                healing:0,
                damage:0,
                damageReduction:0,
                cooldownReduction:1,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        4: {
            name: "Ravenous Hydra",
            flavour: "Ouch, that's gotta sting.",
            description: "When hitting an enemy, deal 1 splash damage.",
            uses:0,
            modifiers: {
                triggerOnAttack:true,
                triggerOnDefense:false,
                chance:100,
                health:0,
                attack:0,
                healing:0,
                damage:1,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:true,
                endOfTurn:false
            }
        },
        5: {
            name: "B.F Sword",
            flavour: "Old but gold.",
            description: "+5 attack.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:false,
                chance:100,
                health:0,
                attack:5,
                healing:0,
                damage:0,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        6: {
            name: "Giants Belt",
            flavour: "Does this even fit you?",
            description: "+10 health.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:false,
                chance:100,
                health:10,
                attack:0,
                healing:0,
                damage:0,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        7: {
            name: "Bloodthirster",
            flavour: "Feed me the blood of my enemies",
            description: "When attacking, heal yourself for 2 damage.",
            uses:0,
            modifiers: {
                triggerOnAttack:true,
                triggerOnDefense:false,
                chance:100,
                health:0,
                attack:0,
                healing:2,
                damage:0,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        8: {
            name: "Sunfire Cape",
            flavour: "Make sure you put suncream on.",
            description: "When attacking, deal 1 extra damage.",
            uses:0,
            modifiers: {
                triggerOnAttack:true,
                triggerOnDefense:false,
                chance:100,
                health:6,
                attack:0,
                healing:0,
                damage:1,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        9: {
            name: "Ludens Echo",
            flavour: "Is it just me or is there an echo in here?",
            description: "When you attack deal 4 splash damage.",
            uses:0,
            modifiers: {
                triggerOnAttack:true,
                triggerOnDefense:false,
                chance:100,
                health:0,
                attack:0,
                healing:0,
                damage:4,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:3,
                splash:true,
                endOfTurn:false
            }
        },
        10: {
            name: "Thornmail",
            flavour: "Ouch, this hurts to wear.",
            description: "Return 1 damage to any attacker.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:true,
                chance:100,
                health:0,
                attack:0,
                healing:0,
                damage:1,
                damageReduction:0,
                cooldownReduction:0,
                cooldown:0,
                splash:false,
                endOfTurn:false
            }
        },
        11: {
            name: "Banshees Veil",
            flavour: "At least someone is looking after me!",
            description: "You gain 8 damage reduction when you are attacked.",
            uses:0,
            modifiers: {
                triggerOnAttack:false,
                triggerOnDefense:true,
                chance:100,
                health:0,
                attack:0,
                healing:0,
                damage:0,
                damageReduction:8,
                cooldownReduction:0,
                cooldown:4,
                splash:false,
                endOfTurn:false
            }
        },

    },




    /*
     @var    consumables
     @desc   Contains details about all consumable cards
     */
    consumables: {
        /*
         @param
            name:           Name of the champion
            flavour:        Flavourtext for the item
            description:    A short card description, NOT ULT DESCRIPTION
            amount:         The number of these you are given
            type:           The type of consumable, can be Potion,Trigger or Buff
            duration:       How long this lasts for, 0 = infinite.
            modifiers: {
                @param
                    healing:                Champion heals each turn
                    health:                 Increases champion health
                    attack:                 Increased damage dealt
                    damageTakenIncrease:    Increases damage taken
                    cooldownReduction:      Reduces Champion cooldowns by an amount
            }
         */
        0: {
            name:"Health Potion",
            flavour:"Tastes like poison-berry.",
            description:"Health target champion for 1 each turn (lasts 5 turns)",
            amount:2,
            type:"potion",
            duration:5,
            modifiers: {
                healing:1,
                health:0,
                attack:0,
                damageTakenIncrease:0,
                cooldownReduction:0
            }
        },
        1: {
            name:"Elixir of Rage",
            flavour:"ROID-RAGE!",
            description:"Increases damage dealt 2, but increases damage taken by 2 (lasts 3 turns)",
            amount:2,
            type:"potion",
            duration:3,
            modifiers: {
                healing:0,
                health:0,
                attack:2,
                damageTakenIncrease:2,
                cooldownReduction:0
            }
        },
        2: {
            name:"Red Buff",
            flavour:"Why is Shaco always ganking me at red?",
            description:"When any champion takes damage, they also take 1 extra.",
            amount:1,
            type:"buff",
            duration:0,
            modifiers: {
                healing:0,
                health:0,
                attack:0,
                damageTakenIncrease:2,
                cooldownReduction:0
            }
        },
        3: {
            name:"Blue Buff",
            flavour:"FFS report Rengar x9 for stealing Blue!",
            description:"All champion cooldowns are reduced by 1",
            amount:1,
            type:"buff",
            duration:0,
            modifiers: {
                healing:0,
                health:0,
                attack:0,
                damageTakenIncrease:0,
                cooldownReduction:1
            }
        },
        4: {
            name:"Baron Buff",
            flavour:"Don't worry guys, Warwick will solo at level 4.",
            description:"All champions gain +1 Attack & +3 Health",
            amount:1,
            type:"buff",
            duration:0,
            modifiers: {
                healing:0,
                health:3,
                attack:1,
                damageTakenIncrease:0,
                cooldownReduction:0
            }
        },
        5: {
            name:"Ward",
            flavour:"What? non-support champions have to ward too?",
            description:"Ward will trigger on the next enemy attack, blocking it.",
            amount:3,
            type:"trigger",
            triggerDesc:"ward",
            duration:0,
        },
        6: {
            name:"Revive",
            flavour:"What is revive? I started playing mid 2015.",
            description:"Revive will put a copy of the next dead allied champion into your hand.",
            amount:1,
            type:"trigger",
            triggerDesc:"revive",
            duration:0,
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