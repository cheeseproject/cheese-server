# cheese-server

## local 環境立ち上げの手順

ディレクトリ移動

```
cd functions
```

サーバー起動

```
npm run server
```

ホットリロード

```
npm run build:watch
```

関数のテスト

```
firebase functions:shell
```

## 環境変数

firebase に設定した環境変数を表示

```
firebase functions:config:get
```

環境変数をローカルに pull

```

firebase functions:config:get > .runtimeconfig.json

```

firebase に環境変数を設定

```
firebase functions:config:set hoge='hoge'
```

## テストデータ

以下のリンクに飛びエクポート

https://console.cloud.google.com/firestore/databases/-default-/import-export?authuser=2&project=[firebaseのprojectID]&hl=ja

```
gcloud firestore export gs://[firebaseのID].appspot.com
```

## index 編集

エクスポート

```
firebase firestore:indexes > firestore.indexes.json
```

デプロイ

```
firebase deploy --only firestore:indexes
```

## セキュリテルール 編集

エクスポート

```
firebase firestore:rules > firestore.rules
```

デプロイ

```
firebase deploy --only firestore:rules
```
