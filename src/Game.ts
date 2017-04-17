namespace Template.Client {
  class SimpleGame extends Phaser.Game {
    public game: Phaser.Game;
    constructor() {
      super(GameConfig.SOURCE_GAME_WIDTH, GameConfig.SOURCE_GAME_HETGHT, Phaser.AUTO, 'canvas', null);
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
    const game = new SimpleGame();
  };
}
