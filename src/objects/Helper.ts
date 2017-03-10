namespace GameName.Client {
    export class Helper { // helper functions
        static getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        static AssignToGrid(game: Phaser.Game, objs: Phaser.Sprite[], radius?: number) {
            let distance: number;
            let currentX: number = 0;
            if (!radius) {
                distance = Math.ceil(game.world.width / (objs.length + 1));
                objs.forEach(element => {
                    element.anchor.setTo(0.5);
                    currentX += distance;
                    element.x = currentX;
                    console.log(currentX);
                });
            } else {
                currentX = - radius;
                distance = Math.ceil((game.world.width - (radius * 2 * objs.length)) / (objs.length + 1));
                objs.forEach(element => {
                    element.anchor.setTo(0.5);
                    currentX += (radius + distance);
                    element.x = currentX;
                    console.log(currentX);
                    currentX += radius;
                });
            }
        }
        static EnableCenterAnchor(spr: Phaser.Sprite) {
            spr.anchor.setTo(0.5);
        }
        static myLog(message: any) {
            if (GameConfig.DEBUG_MODE) console.log(message);
        }
    }
}