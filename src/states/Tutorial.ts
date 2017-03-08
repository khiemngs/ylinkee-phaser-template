module GameName.Client {

    export class Tutorial extends Phaser.State {

        create() {
     
        }

        startGame() {
            this.game.state.start("Level01", true, false);
        }

    }

}