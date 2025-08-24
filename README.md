# EasyForm

![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/Naru8521/EasyForm/total) ![GitHub Downloads (all assets, latest release)](https://img.shields.io/github/downloads/Naru8521/EasyForm/latest/total?color=green) ![GitHub Release](https://img.shields.io/github/v/release/Naru8521/EasyForm)

## ディスコードサーバー

質問等は[コチラ](https://discord.com/invite/Mfn8HRhUfm)まで

## 使い方

まずは、アドオンをインポートしてください。

ワールドに入ったら、``/ef:create``を実行することで、作成用フォームが表示されます。

### プリセット名

プリセット名を設定します。

### プリセット説明

プリセットの説明を埋め込みます。

### フォーム編集

フォームの中身を編集します。

### 表示イベント編集

フォームが表示されるイベントを編集します。

### プレビュー

設定したフォームをプレビューすることができます。

これらの設定が完了したら、作成します。

## コマンドについて

ModalFormの場合、コマンドで``{formValues[0]}``などを埋め込むことで入力された値をコマンドにそのまま使用することができます。
例: /tag @s add {formValues[0]}

## 使用できるコマンド
/ef:create [PresetName]
/ef:edit <PresetName>
/ef:list
/ef:run <Target> <PresetName>