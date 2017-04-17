namespace Template.Client {
  export class GameConfig {
    public static DEBUG_MODE: boolean = true;
    public static TEXT_STYLE_1: object = {
      font: 'bold 22px geometria', fill: '#000000',
      boundsAlignH: 'center', boundsAlignV: 'middle', align: 'center'
    };
    public static SOURCE_GAME_WIDTH: number = 400;
    public static SOURCE_GAME_HETGHT: number = 500;

    public static WORLD_SCALE: number = 0;
    public static GAME_WIDTH: number = 0;
    public static GAME_HEIGHT: number = 0;
  }
}