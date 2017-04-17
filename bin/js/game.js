var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var SimpleGame = (function (_super) {
            __extends(SimpleGame, _super);
            function SimpleGame() {
                var _this = _super.call(this, Client.GameConfig.SOURCE_GAME_WIDTH, Client.GameConfig.SOURCE_GAME_HETGHT, Phaser.AUTO, "canvas", null) || this;
                _this.state.add("Boot", Client.Boot, false);
                _this.state.add("Preloader", Client.Preloader, false);
                _this.state.add("MainMenu", Client.MainMenu, false);
                _this.state.add("Level01", Client.Level01, false);
                _this.state.add("Tutorial", Client.Tutorial, false);
                _this.state.start("Boot");
                return _this;
            }
            return SimpleGame;
        }(Phaser.Game));
        // when the page has finished loading, create our game
        window.onload = function () {
            var game = new SimpleGame();
        };
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
;
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var GameConfig = (function () {
            function GameConfig() {
            }
            return GameConfig;
        }());
        GameConfig.DEBUG_MODE = true;
        GameConfig.TEXT_STYLE_1 = { font: "bold 22px geometria", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle", align: "center" };
        GameConfig.SOURCE_GAME_WIDTH = 400;
        GameConfig.SOURCE_GAME_HETGHT = 500;
        GameConfig.WORLD_SCALE = 0;
        GameConfig.GAME_WIDTH = 0;
        GameConfig.GAME_HEIGHT = 0;
        Client.GameConfig = GameConfig;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var GameManager = (function () {
            function GameManager() {
            }
            return GameManager;
        }());
        GameManager.level = 1;
        GameManager.firstTime = false;
        GameManager.gridSize = 1;
        Client.GameManager = GameManager;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var Grid = (function () {
            function Grid() {
            }
            return Grid;
        }());
        Client.Grid = Grid;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.GetRandomInt = function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            };
            Utils.AssignToGrid = function (game, objs, radius) {
                var distance;
                var currentX = 0;
                if (!radius) {
                    distance = Math.ceil(game.world.width / (objs.length + 1));
                    objs.forEach(function (element) {
                        element.anchor.setTo(0.5);
                        currentX += distance;
                        element.x = currentX;
                        console.log(currentX);
                    });
                }
                else {
                    currentX = -radius;
                    distance = Math.ceil((game.world.width - (radius * 2 * objs.length)) / (objs.length + 1));
                    objs.forEach(function (element) {
                        element.anchor.setTo(0.5);
                        currentX += (radius + distance);
                        element.x = currentX;
                        console.log(currentX);
                        currentX += radius;
                    });
                }
            };
            Utils.EnableCenterAnchor = function (spr) {
                spr.anchor.setTo(0.5);
            };
            Utils.Log = function (message) {
                if (Client.GameConfig.DEBUG_MODE)
                    console.log(message);
            };
            return Utils;
        }());
        Client.Utils = Utils;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                // You can preload an image here if you dont want to use text for the loading screen
            };
            Boot.prototype.scaleGame = function () {
                var windowHeight = window.innerHeight;
                var windowWidth = window.innerWidth;
                var doubleRatio = windowWidth * this.game.device.pixelRatio;
                Client.Utils.Log("Inner window size: " + windowWidth + "x" + windowHeight + " - " + this.game.device.pixelRatio);
                var scaleWidth = 0;
                var scaleHeight = 0;
                if (doubleRatio <= Client.GameConfig.SOURCE_GAME_WIDTH) {
                    scaleWidth = 2 * windowWidth;
                    scaleHeight = 2 * windowHeight;
                }
                else {
                    scaleWidth = windowWidth;
                    scaleHeight = windowHeight;
                }
                var worldScale = scaleWidth / Client.GameConfig.SOURCE_GAME_WIDTH;
                this.world.scale.set(worldScale, worldScale);
                this.scale.setGameSize(scaleWidth, scaleHeight);
                Client.GameConfig.WORLD_SCALE = worldScale;
                Client.GameConfig.GAME_WIDTH = this.game.canvas.width / worldScale;
                Client.GameConfig.GAME_HEIGHT = this.game.canvas.height / worldScale;
            };
            Boot.prototype.create = function () {
                console.log(Client.GameConfig.DEBUG_MODE ? "Debug on" : "Debug off");
                this.stage.setBackgroundColor(0x95A5A6);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                var t = false;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                var parentWidth = document.getElementById("canvas").clientWidth, parentHeight = document.getElementById("canvas").clientHeight, gameHeight = Client.GameConfig.SOURCE_GAME_HETGHT, gameWidth = Client.GameConfig.SOURCE_GAME_WIDTH;
                var matchedHorizon = gameWidth / gameHeight > parentWidth / parentHeight;
                if (matchedHorizon) {
                    this.scale.minWidth = parentWidth;
                    this.scale.minHeight = parentWidth / gameWidth * gameHeight;
                    this.scale.maxWidth = parentWidth;
                    this.scale.maxHeight = parentWidth / gameWidth * gameHeight;
                }
                else {
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
                this.game.state.start("Preloader", true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var Level01 = (function (_super) {
            __extends(Level01, _super);
            function Level01() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.heart = 3;
                return _this;
            }
            Level01.prototype.create = function () {
                this.images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
                this.iString = Client.Utils.GetRandomInt(1, 18).toString();
            };
            Level01.prototype.makeGrid = function (size) {
                for (var i = 0; i < size; i++) {
                    for (var j = 0; j < size; j++) {
                        var img = this.game.add.sprite(this.getPosX(j), this.getPosY(i), this.iString);
                        img.inputEnabled = true;
                        img.events.onInputDown.add(this.check, this);
                    }
                }
            };
            Level01.prototype.check = function () {
            };
            Level01.prototype.getPosX = function (pos) {
                var x;
                return x;
            };
            Level01.prototype.getPosY = function (pos) {
                var y;
                return y + 100;
            };
            Level01.prototype.update = function () {
            };
            Level01.prototype.GameOver = function () {
            };
            Level01.prototype.NextLevel = function () {
            };
            return Level01;
        }(Phaser.State));
        Client.Level01 = Level01;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                this.startGame();
            };
            MainMenu.prototype.startGame = function () {
                Client.GameManager.level = 1;
                if (Client.GameManager.firstTime) {
                    this.game.state.start("Tutorial", true, false);
                }
                else {
                    this.game.state.start("Level01", true, false);
                }
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Preloader.prototype.preload = function () {
                this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...", { font: "18px Arial", fill: "#A9A91111", align: "center" });
                this.loaderText.anchor.setTo(0.5);
                this.game.load.image("bg", "assets/sprites/bg.png");
                //
                this.game.load.image("1", "assets/sprites/1.png");
                this.game.load.image("1e", "assets/sprites/1_.png");
                this.game.load.image("2", "assets/sprites/2.png");
                this.game.load.image("2e", "assets/sprites/2_2.png");
                this.game.load.image("3", "assets/sprites/3.png");
                this.game.load.image("3e", "assets/sprites/3_2.png");
                this.game.load.image("4", "assets/sprites/4.png");
                this.game.load.image("4e", "assets/sprites/4_2.png");
                this.game.load.image("5", "assets/sprites/5.png");
                this.game.load.image("5e", "assets/sprites/5_2.png");
                this.game.load.image("6", "assets/sprites/6.png");
                this.game.load.image("6e", "assets/sprites/6_2.png");
                this.game.load.image("7", "assets/sprites/7.png");
                this.game.load.image("7e", "assets/sprites/7_2.png");
                this.game.load.image("8", "assets/sprites/8.png");
                this.game.load.image("8e", "assets/sprites/8_2.png");
                this.game.load.image("9", "assets/sprites/9.png");
                this.game.load.image("9e", "assets/sprites/9_2.png");
                this.game.load.image("10", "assets/sprites/10.png");
                this.game.load.image("10e", "assets/sprites/10_2.png");
                this.game.load.image("11", "assets/sprites/11.png");
                this.game.load.image("11e", "assets/sprites/11_2.png");
                this.game.load.image("12", "assets/sprites/12.png");
                this.game.load.image("12e", "assets/sprites/12_2.png");
                this.game.load.image("13", "assets/sprites/13.png");
                this.game.load.image("13e", "assets/sprites/13_2.png");
                this.game.load.image("14", "assets/sprites/14.png");
                this.game.load.image("14e", "assets/sprites/14_2.png");
                this.game.load.image("15", "assets/sprites/15.png");
                this.game.load.image("15e", "assets/sprites/15_2.png");
                this.game.load.image("16", "assets/sprites/16.png");
                this.game.load.image("16e", "assets/sprites/16_2.png");
                this.game.load.image("17", "assets/sprites/17.png");
                this.game.load.image("17e", "assets/sprites/17_2.png");
                //
            };
            Preloader.prototype.create = function () {
                // var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000,
                // Phaser.Easing.Linear.None, true);
                // tween.onComplete.add(this.startMainMenu, this);
                this.startMainMenu();
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start("MainMenu", true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
var QuickChoice;
(function (QuickChoice) {
    var Client;
    (function (Client) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Tutorial.prototype.create = function () {
            };
            Tutorial.prototype.startGame = function () {
                this.game.state.start("Level01", true, false);
            };
            return Tutorial;
        }(Phaser.State));
        Client.Tutorial = Tutorial;
    })(Client = QuickChoice.Client || (QuickChoice.Client = {}));
})(QuickChoice || (QuickChoice = {}));
