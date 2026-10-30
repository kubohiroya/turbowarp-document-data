# TurboWarp-Document-Data

<img src="assets/block-icon.svg" alt="" width="48" height="48">

[English](README.md) | 日本語

HTMLとMarkdownをtyped tree/ASTとしてparseし、target-localな名前で保持するTurboWarp機能拡張です。`turbowarp-extension-template`を基に初期化し、canonical `@kubohiroya/turbowarp-named-data` registryへ接続します。

## 実行できるサンプル

[**TurboWarp Editorでデモを開く**](https://turbowarp.org/editor?project_url=https%3A%2F%2Fkubohiroya.github.io%2Fturbowarp-document-data%2Fsamples%2Freplace-document-text.sb3) · [SB3をダウンロード](https://kubohiroya.github.io/turbowarp-document-data/samples/replace-document-text.sb3)

**Run without sandbox**を選んで**Allow**し、緑の旗を押します。
`parseHtml`で短い文書を登録し、`replaceDocumentText`後の`getDocumentText`・`serializeDocument`を表示。サンプルの元データと期待結果は[`samples/README.md`](samples/README.md)に記載しています。

このサンプルは拡張生成時だけ`DOCUMENT_DATA_MVP`を有効にし、直後にホストの設定を元に戻します。拡張本体の既定OFFは変更しません。

`pnpm run samples:build`でSB3を再生成し、`pnpm run samples:check`で更新漏れと生成処理を確認します。

## 機能

- HTML / Markdownを名前付きdocumentへparse
- 存在確認、削除、kind取得
- root、`$[0][1]`形式のtree path、単純なHTML selector（tag、`#id`、`.class`）によるtext取得・置換
- native formatへの決定的serialize
- HTTP response body向けNamed Data provider

HTMLのsanitize、script実行、DOM mount、HTML/Markdown間の暗黙変換は行いません。既存の`@kubohiroya/turbowarp-html`と`@kubohiroya/turbowarp-markdown`はfragment生成APIを担当し、このpackageはparse済み名前付きdocumentのlifecycleを担当します。

## 有効化

unsandboxed modeが必要です。起動時に`DOCUMENT_DATA_MVP=true`を設定してください。既定値はOFFです。`pnpm run build`後、`dist/document-data.js`を読み込みます。

## 安全性と制限

source/output size、node数、depthに上限があります。parse・編集に失敗しても既存bindingは置換されません。`PROJECT_STOP_ALL`でbindingとopen body handleを解放します。

providerはpersistent lifetimeでruntime共通registryへ登録されます。`PROJECT_STOP_ALL`後も登録は維持され、target-local bindingのみがclearされます。

## 開発

`pnpm run check`

## License

MPL-2.0。bundle内の依存packageは`THIRD_PARTY_NOTICES.md`を参照してください。

固定入力の編集範囲・互換性・切戻しについては [固定入力の編集](docs/fixed-input-editors.ja.md) を参照してください。

## YAML/JSON原文のSB3保存（先行版・既定OFF）

`DOCUMENT_SOURCE` は拡張の生成時に一度だけ読み、既定OFFです。読み込む前に `globalThis.DOCUMENT_SOURCE = true` を設定すると原文用ブロックを表示します。既存の `DOCUMENT_DATA_MVP` によるHTML/Markdownのtarget-local treeは独立しており、停止時に従来どおり破棄します。YAML/JSON原文は停止しても削除しません。

正本は `runtime.extensionStorage.kubohiroyadocumentdata` の `{formatVersion:1, documents:{[id]:{id,filename,format,source,revision,schema?,docsURL?}}}` です。共通codecで構文、任意のinline JSON Schemaで値を検証してから保存し、コメント・空白・CRLF・Unicodeを保持します。保存時にparse/renderで本文を作り直しません。Schemaは `{id,schema}`、docsURLは認証情報なしの固定HTTPS URLです。

`./composition` は原文参照・provider registry・Schema metadataのpure契約だけを公開します。parser・GUI・特定App・Editor・native launcherに依存しません。旧embedded名も同じ関数のaliasです。旧v1 Symbol/参照encodingは維持しますが、formatを保持できない旧registryは `REGISTRY_INCOMPATIBLE` で明示拒否し、別registryを二重作成しません。ownerとhostは対応bundleへ一緒に更新・再読込してください。

別のpure入口 `./source-documents` は `createSourceDocumentStore(vm)` と `createSourceDocumentProvider(vm)` を提供します。provider IDは `document-data` です。文書IDとファイル名・formatを別に保持し、`capture/prepare/commit` の途中で原文変更・文書削除・作品切替があれば上書きしません。通常停止でtarget一覧の配列が変わることは許容します。`sourceDocument` ハットは実在IDへの参照だけを持ち、本文を複製・実行しません。

TurboWarpの通常SB3保存は、作品内ブロックが使う拡張IDのstorageを保持します。Document Dataのブロックも作品内に残してください。このpackageがVMのserializerを変更することはありません。read-only Named Dataの `document-source` namespace（kind `document`、scope `project`）はnativeなyaml/json bytesとrevisionを返し、暗黙の形式変換を拒否します。1作品256文書・合計4MiB、各原文のparse上限は共通codecに従います。

Issue #21の未公開ローカル実装です。切戻しは起動時フラグOFF、または接続・ローカル依存の差分をrevertし、元のSB3を保持します。値/ASTやSchema専用ブロックとの相互変換は別表現として扱い、この原文層で黙って置き換えません。

原文Schema検証は明示2020-12 profileを既定とし、draft-07のmetaschema URIが指定された文書ではdraft-07 profileを選びます。未対応metaschemaはowner validatorが拒否します。


作品切替（`RUNTIME_DISPOSED`→`PROJECT_LOADED`）ではキャッシュ済みの拡張・store・providerを再利用します。古い編集captureとHTML/Markdownの一時値・session handleだけを無効化し、次の作品のstorageでも永続登録を利用できます。登録を永久に解除するのは明示的な `dispose()` だけです。
