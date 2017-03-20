namespace GameName.Client {

    export class Boot extends Phaser.State {
        preload() {
            // You can preload an image here if you dont want to use text for the loading screen
        }
        scaleGame() {
            let windowHeight = window.innerHeight;
            let windowWidth = window.innerWidth;
            let doubleRatio = windowWidth * this.game.device.pixelRatio;
            Utils.Log("Inner window size: " + windowWidth + "x" + windowHeight + " - " + this.game.device.pixelRatio);
            let scaleWidth = 0;
            let scaleHeight = 0;

            if (doubleRatio <= GameConfig.SOURCE_GAME_WIDTH) {
                scaleWidth = 2 * windowWidth;
                scaleHeight = 2 * windowHeight;
            }
            else {
                scaleWidth = windowWidth;
                scaleHeight = windowHeight;
            }
            let worldScale = scaleWidth / GameConfig.SOURCE_GAME_WIDTH;

            this.world.scale.set(worldScale, worldScale);
            this.scale.setGameSize(scaleWidth, scaleHeight);

            GameConfig.WORLD_SCALE = worldScale;
            GameConfig.GAME_WIDTH = this.game.canvas.width / worldScale;
            GameConfig.GAME_HEIGHT = this.game.canvas.height / worldScale;
        }
        create() {
            console.log(GameConfig.DEBUG_MODE ? "Debug on" : "Debug off");

            this.stage.setBackgroundColor(0x95A5A6);
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            let t = false;
            if (this.game.device.desktop) {
                // desktop
                let s = this.game.scale;
                s.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                s.aspectRatio = GameConfig.GAME_WIDTH / GameConfig.GAME_HEIGHT;
                s.pageAlignHorizontally = true;
                s.pageAlignVertically = true; s;
                // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            } else {
                // mobile
                let s = this.game.scale;
                s.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                s.forceOrientation(false, true);
                s.onSizeChange.add(f => {
                    this.scaleGame();
                    Utils.Log(GameConfig.GAME_WIDTH + "x" + GameConfig.GAME_HEIGHT);
                    this.game.state.resize(GameConfig.GAME_WIDTH, GameConfig.GAME_HEIGHT);
                }, this);
                s.refresh();
            }
            this.game.state.start("Preloader", true, false);
        }
    }

}