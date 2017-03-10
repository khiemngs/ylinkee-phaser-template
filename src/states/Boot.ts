namespace GameName.Client {

    export class Boot extends Phaser.State {
        preload() {
            // You can preload an image here if you dont want to use text for the loading screen
        }

        create() {
            this.stage.setBackgroundColor(0x95A5A6);

            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
                // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            } else {
                // mobile
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 320;
                this.scale.minHeight = 500;
                this.scale.maxWidth = 1080;
                this.scale.maxHeight = 1920;
                this.scale.forcePortrait = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.refresh();
            }

            this.game.state.start("Preloader", true, false);
        }
    }

}