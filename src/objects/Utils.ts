namespace Template.Client {
  export class Utils { // helper functions
    public static GetRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    public static AssignToGrid(game: Phaser.Game, objs: Phaser.Sprite[], radius?: number) {
      let distance: number;
      let currentX: number = 0;
      if (!radius) {
        distance = Math.ceil(game.world.width / (objs.length + 1));
        objs.forEach(element => {
          element.anchor.setTo(0.5);
          currentX += distance;
          element.x = currentX;
          //console.log(currentX);
        });
      } else {
        currentX = - radius;
        distance = Math.ceil((game.world.width - (radius * 2 * objs.length)) / (objs.length + 1));
        objs.forEach(element => {
          element.anchor.setTo(0.5);
          currentX += (radius + distance);
          element.x = currentX;
          //console.log(currentX);
          currentX += radius;
        });
      }
    }
    public static EnableCenterAnchor(spr: Phaser.Sprite) {
      spr.anchor.setTo(0.5);
    }
    public static Log(message: any) {
      if (GameConfig.DEBUG_MODE) {
        console.log(message);
      }
    }
    public static Pulse(t, a) {
      t.add.tween(a.scale).to({
        x: 1.2,
        y: 1.2
      }, 1e3, Phaser.Easing.Sinusoidal.InOut).to({
        x: 1,
        y: 1
      }, 1e3, Phaser.Easing.Sinusoidal.InOut).loop().start();
    }

    public static FormatTime(timeInMiliSec: number) {
      const totalSec = Math.floor(timeInMiliSec / 1000);
      const hour = Math.floor(totalSec / 3600);
      const min = Math.floor((totalSec - 3600 * hour) / 60);
      const sec = totalSec - 3600 * hour - 60 * min;
      let txtI: string;
      let txtO: string;
      let txtN: string;
      if (10 > hour) {
        txtI = '0' + hour;
      }
      if (10 > min) {
        txtO = '0' + min;
      }
      if (10 > sec) {
        txtN = '0' + sec;
      }
      return txtO + ':' + txtN;
    }
  }
}