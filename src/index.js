// reference URL
// https://pixijs.com/8.x/tutorials/getting-started#4

import { Application, Assets, Sprite } from "pixi.js";
import { Container, Graphics, Text } from "pixi.js";
import { VERSION } from "pixi.js";

import { App } from "@capacitor/app";

// Asynchronous IIFE(即時実行関数式)
(async () => {
  // Create a PixiJS application.
  // PixiJSのアプリを作成する
  const app = new Application();

  // Intialize the application.
  // アプリケーションを初期化する
  await app.init({ background: "#1099bb", width: 500 });

  // Then adding the application's canvas to the DOM body.
  // DOMのbodyにアプリケーションのcanvasを追加する
  document.body.appendChild(app.canvas);

  // Load the bunny texture.
  // バニーのテクスチャーをロードする
  // const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const texture = await Assets.load("assets/images/bunny.png");
  // ロード完了のコールバック？ver8での書き方？複数画像読み込み時に必要

  // Create a new Sprite from an image path.
  // イメージのパスから新規スプライトを作成する
  const bunny = new Sprite(texture);

  // Add to stage.
  // ステージに追加
  app.stage.addChild(bunny);

  // Center the sprite's anchor point.
  // スプライトのアンカーポイントを中央に
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen.
  // 画面の中央にスプライトを移動
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  // Add an animation loop callback to the application's ticker.
  // アプリケーションのティッカーにアニメーションループのコールバックを追加
  app.ticker.add((time) => {
    /**
     * Just for fun, let's rotate mr rabbit a little.
     * Time is a Ticker object which holds time related data.
     * Here we use deltaTime, which is the time elapsed between the frame callbacks
     * to create frame-independent transformation. Keeping the speed consistent.
     */
    /*
     * ちょっとした遊び心で、ウサギさんを少し回転させてみましょう。
     * Timeは、時間関連データを保持するTickerオブジェクトです。
     * ここでは、フレームコールバック間の経過時間であるdeltaTimeを使用します。
     * これにより、フレームに依存しない変換を作成し、速度を一定に保ちます。
     */
    bunny.rotation += 0.1 * time.deltaTime;
    // deltaTimeは、時間差を表すスカラー値です。これは、目標フレームレートにおけるフレームの割合を表す無次元値です。
    // 60 FPSの場合、この値は通常1.0前後になります。
  });

  // PixiJSのバージョンを表示
  console.log(VERSION); // 8.17.1

  // Basic text creation
  // 基本的なテキストの作成
  const basicText = new Text({
    text: "Hello Pixi! Ver. " + VERSION,
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    },
  });
  // ステージに追加→コンテナに追加
  app.stage.addChild(basicText);

  // function testClick() {
  //   console.log("testClick()");
  //   alert("testClick!");
  // }

  const button = new Container();
  button.eventMode = "dynamic"; // v8のイベント有効化設定
  button.cursor = "pointer";

  const bg = new Graphics();
  bg.beginFill(0x0000ff).drawRect(0, 0, 100, 50).endFill();
  button.addChild(bg);

  // ホバー/クリックイベントの追加
  // button.on("pointertap", () => console.log("Tapped!"));
  button.on("pointerover", () => (bg.alpha = 0.8));
  button.on("pointerout", () => (bg.alpha = 1));
    button.on("pointertap", () => buttonTapped());

    function buttonTapped(){
      alert("button taped!");

      closeApp();
    }

    const closeApp = async () => {
  await App.exitApp();
};

  app.stage.addChild(button);
})();

App.addListener("test", ({ canGoBack }) => {
  alert("app bt click!");
  if (!canGoBack) {
    // 戻る履歴がない（トップページ）場合、アプリを終了する
    App.exitApp();
  } else {
    // 戻る履歴がある場合、通常通り戻る
    window.history.back();
  }
});

App.addListener("appStateChange", ({ isActive }) => {
  console.log("App state changed. Is active?", isActive);
});

App.addListener("appUrlOpen", (data) => {
  console.log("App opened with URL:", data);
});

App.addListener("appRestoredResult", (data) => {
  console.log("Restored state:", data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  console.log("App opened with URL: " + url);
};

const closeApp = async () => {
  await App.exitApp();
};
