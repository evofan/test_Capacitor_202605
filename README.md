# Test PixiJS ver.8 and App close btn on Capacitor

<img src="https://evofan.github.io/test_Capacitor_202605/screenshot/1.png" width="25%">  

reference

2. アプリを強制的に終了させるボタンクリックなどでアプリを完全に閉じたい（終了させたい）場合は、  
App.exitApp() を呼び出します。  
```
typescript  
import { App } from '@capacitor/app';  

const closeApp = async () => {
  await App.exitApp();
};
```
2. 基本的なインタラクション実装  
ライブラリを使用しない場合、コンテナにイベントを設定します。  
```
javascript 
import { Container, Graphics, Text } from 'pixi.js';

const button = new Container();
button.eventMode = 'dynamic'; // v8のイベント有効化設定
button.cursor = 'pointer';

const bg = new Graphics();
bg.beginFill(0x0000FF).drawRect(0, 0, 100, 50).endFill();
button.addChild(bg);

// ホバー/クリックイベントの追加
button.on('pointertap', () => console.log('Tapped!'));
button.on('pointerover', () => (bg.alpha = 0.8));
button.on('pointerout', () => (bg.alpha = 1));

app.stage.addChild(button);

```

<img src="https://evofan.github.io/test_Capacitor_202605/screenshot/2.png" width="50%">  

**Capacitor ビルド＆開発環境（WSL & Android編）**  
[https://zenn.dev/portalkeyinc/articles/eeb7d2c9227b98](https://zenn.dev/portalkeyinc/articles/eeb7d2c9227b98)  
> WebViewのデバッグには、Chrome DevToolsが使えます：  
>1. Androidアプリを起動  
>2. PCのChromeでchrome://inspect/#devicesを開く  
>3. 接続されたデバイス一覧にアプリが表示される  
>4. inspectをクリックでDevToolsが開く  
これで通常のWeb開発と同じようにコンソールログ、要素検証、ネットワーク監視が可能です。  
