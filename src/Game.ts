module GameName.Client{
    class SimpleGame extends Phaser.Game
    {
        game:Phaser.Game;
        
        constructor()
        {
                super(320, 500, Phaser.AUTO, 'canvas', null);
                this.state.add('Boot', Boot, false);
                this.state.add('Preloader', Preloader, false);
                this.state.add('MainMenu', MainMenu, false);
                this.state.add('Level01', Level01, false);
                this.state.add('Tutorial', Tutorial, false);
                this.state.start('Boot');
        }
    }

    // when the page has finished loading, create our game
    window.onload = () => {
        var game = new SimpleGame();
    }
};
