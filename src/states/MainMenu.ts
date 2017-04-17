namespace Template.Client {

  export class MainMenu extends Phaser.State {

    public create() {
      this.startGame();
    }

    public startGame() {
      GameManager.level = 1;
      if (GameManager.firstTime) {
        this.game.state.start('Tutorial', true, false);
      } else {
        this.game.state.start('Level01', true, false);
      }

    }

  }

}