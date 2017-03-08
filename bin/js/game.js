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
var Tricky;
(function (Tricky) {
    var Client;
    (function (Client) {
        var SimpleGame = (function (_super) {
            __extends(SimpleGame, _super);
            function SimpleGame() {
                var _this = _super.call(this, 320, 500, Phaser.AUTO, 'canvas', null) || this;
                _this.state.add('Boot', Client.Boot, false);
                _this.state.add('Preloader', Client.Preloader, false);
                _this.state.add('MainMenu', Client.MainMenu, false);
                _this.state.add('Level01', Client.Level01, false);
                _this.state.add('Tutorial', Client.Tutorial, false);
                _this.state.start('Boot');
                return _this;
            }
            return SimpleGame;
        }(Phaser.Game));
        // when the page has finished loading, create our game
        window.onload = function () {
            var game = new SimpleGame();
        };
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
;
var Tricky;
(function (Tricky) {
    var Client;
    (function (Client) {
        var GameConfig = (function () {
            function GameConfig() {
            }
            return GameConfig;
        }());
        GameConfig.DEBUG_MODE = false;
        GameConfig.TEXT_STYLE_1 = { font: "bold 22px geometria", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle", align: 'center' };
        Client.GameConfig = GameConfig;
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
    var Client;
    (function (Client) {
        var GameManager = (function () {
            function GameManager() {
            }
            return GameManager;
        }());
        GameManager.level = 1;
        GameManager.firstTime = false;
        Client.GameManager = GameManager;
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
    var Client;
    (function (Client) {
        var Helper = (function () {
            function Helper() {
            }
            Helper.getRandomInt = function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            };
            Helper.AssignToGrid = function (game, objs, radius) {
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
            Helper.myLog = function (message) {
                if (Client.GameConfig.DEBUG_MODE)
                    console.log(message);
            };
            return Helper;
        }());
        Client.Helper = Helper;
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                //You can preload an image here if you dont want to use text for the loading screen
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0x95A5A6);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                if (this.game.device.desktop) {
                    this.scale.pageAlignHorizontally = true;
                    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                }
                else {
                    // mobile
                    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.scale.minWidth = 320;
                    this.scale.minHeight = 500;
                    this.scale.maxWidth = 1024;
                    this.scale.maxHeight = 768;
                    this.scale.forceLandscape = true;
                    this.scale.pageAlignHorizontally = true;
                    this.scale.refresh();
                }
                this.game.state.start('Preloader', true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
    var Client;
    (function (Client) {
        var Level01 = (function (_super) {
            __extends(Level01, _super);
            function Level01() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Level01.prototype.create = function () {
                this.objs = [];
                console.log("Hi");
                Client.GameManager.firstTime = false;
                //this.game.add.sprite(100, 100, 'image');
                for (var i = 0; i < 9; i++) {
                    this.objs.push(this.game.add.sprite(0, 100, 'image'));
                }
                Client.Helper.AssignToGrid(this.game, this.objs);
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
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
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
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
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
                this.game.load.image('image', 'assets/sprites/tut-p.png');
            };
            Preloader.prototype.create = function () {
                //var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000,
                //Phaser.Easing.Linear.None, true);
                //tween.onComplete.add(this.startMainMenu, this);
                this.startMainMenu();
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start('MainMenu', true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
var Tricky;
(function (Tricky) {
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
    })(Client = Tricky.Client || (Tricky.Client = {}));
})(Tricky || (Tricky = {}));
