namespace Template.Client {

  export class Preloader extends Phaser.State {
    private loaderText: Phaser.Text;
    public preload() {
      this.loaderText = this.game.add.text(this.world.centerX, 200, 'Loading...',
        { font: '18px Arial', fill: '#A9A91111', align: 'center' });
      this.loaderText.anchor.setTo(0.5);
    }
    public create() {
      // var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000,
      // Phaser.Easing.Linear.None, true);
      // tween.onComplete.add(this.startMainMenu, this);
      this.startMainMenu();
    }
    public startMainMenu() {
      this.game.state.start('MainMenu', true, false);

    }

  }

}