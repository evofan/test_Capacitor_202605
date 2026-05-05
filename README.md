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
