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
