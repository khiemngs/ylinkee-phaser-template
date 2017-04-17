namespace Template.Client {

  export class Boot extends Phaser.State {
    public preload() {
      // You can preload an image here if you dont want to use text for the loading screen
    }
    public scaleGame() {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const doubleRatio = windowWidth * this.game.device.pixelRatio;
      Utils.Log('Inner window size: ' + windowWidth + 'x' + windowHeight + ' - ' + this.game.device.pixelRatio);
      let scaleWidth = 0;
      let scaleHeight = 0;

      if (doubleRatio <= GameConfig.SOURCE_GAME_WIDTH) {
        scaleWidth = 2 * windowWidth;
        scaleHeight = 2 * windowHeight;
      } else {
        scaleWidth = windowWidth;
        scaleHeight = windowHeight;
      }
      const worldScale = scaleWidth / GameConfig.SOURCE_GAME_WIDTH;

      this.world.scale.set(worldScale, worldScale);
      this.scale.setGameSize(scaleWidth, scaleHeight);

      GameConfig.WORLD_SCALE = worldScale;
      GameConfig.GAME_WIDTH = this.game.canvas.width / worldScale;
      GameConfig.GAME_HEIGHT = this.game.canvas.height / worldScale;
    }
    public create() {
      //console.log(GameConfig.DEBUG_MODE ? 'Debug on' : 'Debug off');
      this.stage.setBackgroundColor(0x95A5A6);
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;
      const t = false;
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      const parentWidth = document.getElementById('canvas').clientWidth;
      const parentHeight = document.getElementById('canvas').clientHeight;
      const gameHeight = GameConfig.SOURCE_GAME_HETGHT;
      const gameWidth = GameConfig.SOURCE_GAME_WIDTH;
      const matchedHorizon = gameWidth / gameHeight > parentWidth / parentHeight;
      if (matchedHorizon) {
        this.scale.minWidth = parentWidth;
        this.scale.minHeight = parentWidth / gameWidth * gameHeight;
        this.scale.maxWidth = parentWidth;
        this.scale.maxHeight = parentWidth / gameWidth * gameHeight;
      } else {
        this.scale.minWidth = parentHeight / gameHeight * gameWidth;
        this.scale.minHeight = parentHeight;
        this.scale.maxWidth = parentHeight / gameHeight * gameWidth;
        this.scale.maxHeight = parentHeight;
      }
      //  this.scale.setGameSize(200, 300);
      // this.scale.forcePortrait = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.refresh();

      this.game.state.start('Preloader', true, false);
    }
  }

}