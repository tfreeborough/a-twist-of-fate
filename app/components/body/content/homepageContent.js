/** @jsx React.DOM */

var HomepageContent = React.createClass({
    render: function(){
        return(
            <div>
                <div className="center valign-wrapper headline-wrapper intro-card">
                    <h2 className="center valign cyan-text text-accent-2">
                        Will you test your luck in A Twist of Fate?
                    </h2>
                </div>
                <p className="flow-text">
                    The Original League of Legends card game, initially developed at Riot Games' first hackathon.
                </p>
                <p className="flow-text">
                    We've been working hard since Riot Game hosted its first Hackathon in 2015. Our team built the very first and is still being developed by the original team members. We've been working tirelessly
                    in our spare time to re-develop the game into something we know the league of legends community will love. We are doing this solely as a passion project, there are
                    no paywalls, no restrictions or donation perks; everything unlocked, free forever.
                </p>
                <div className="features row">
                    <ul className="collection with-header col s12 m6">
                        <li className="collection-header"><h4>Feels like LoL</h4></li>
                        <li className="collection-item flow-text">Queueing and matchmaking system to pit you against opponents of similar skill.</li>
                        <li className="collection-item flow-text">The ability to discuss and chat with fellow Twist of Fate players in the chatrooms.</li>
                        <li className="collection-item flow-text">Easy and Seamless to play, you can play A Twist of Fate quickly and Smoothly.</li>
                        <li className="collection-item flow-text">Slick front-end to keep you only a few clicks away from card on card mayhem.</li>
                    </ul>
                    <ul className="collection with-header col s12 m6">
                        <li className="collection-header"><h4>Plays like LoL</h4></li>
                        <li className="collection-item flow-text">All cards reference their counterparts inside League of Legends, making A Twist of Fate feel like an extension to the game.</li>
                        <li className="collection-item flow-text">Easy to learn, difficult to master.</li>
                        <li className="collection-item flow-text">As new champions are released, the card pool will grow.</li>
                        <li className="collection-item flow-text">Region-free, Play against other players all over the world.</li>
                    </ul>
                </div>
            </div>
        )
    }
})