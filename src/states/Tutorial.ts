namespace Template.Client {
  export class Tutorial extends Phaser.State {
    public create() {
    }
    public startGame() {
      this.game.state.start('Level01', true, false);
    }

  }

}