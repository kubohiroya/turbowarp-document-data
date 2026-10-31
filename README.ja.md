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
- 解析時の原文での位置情報の保持
- 別のサンドボックス外の拡張が、名前付きdocumentの木（部分木）を文字列を経由せずにコピーするための共有registry（`./composition`。ブロックは追加しません）

HTMLのsanitize、script実行、DOM mount、HTML/Markdown間の暗黙変換は行いません。既存の`@kubohiroya/turbowarp-html`と`@kubohiroya/turbowarp-markdown`はfragment生成APIを担当し、このpackageはparse済み名前付きdocumentのlifecycleを担当します。

## 有効化

unsandboxed modeが必要です。起動時に`DOCUMENT_DATA_MVP=true`を設定してください。既定値はOFFです。`pnpm run build`後、`dist/document-data.js`を読み込みます。

## 安全性と制限

source/output size、node数、depthに上限があります。parse・編集に失敗しても既存bindingは置換されません。`PROJECT_STOP_ALL`でbindingとopen body handleを解放します。

providerはpersistent lifetimeでruntime共通registryへ登録されます。`PROJECT_STOP_ALL`後も登録は維持され、target-local bindingのみがclearされます。

## 位置情報

解析した時点の原文での位置を、各ノードに保持します。Markdownはmdastの`position`をそのまま保持します。HTMLはparse5の位置情報を同じ形に変換して各ノードに付け、根には原文全体の範囲を付けます。

- **形**：`position: {start: {line, column, offset}, end: {line, column, offset}}`（mdast・unistと同じ形）。lineとcolumnは1から、offsetは0から数え、`end`は範囲の直後を指します。
- **単位**：columnとoffsetはUTF-16単位です。JSの文字列の添字やScratchの`letter (n) of`と同じ数え方で、絵文字1文字は2と数えます。`\r\n`のCRもoffsetに数え、`\r\n`・`\n`・`\r`はそれぞれ1つの改行として数えます。
- **基準**：parseに渡した文字列そのものでの位置です。`turbowarp-markdown`・`turbowarp-html`のbuilderから渡した文書では、描画した文字列での位置になります。原文そのものは保持しません。
- **位置のないノード**：parse5が補った、原文にないノード（暗黙の`tbody`など）は`position`を持ちません。終了タグを省いた要素の`end`は、暗黙に閉じた位置（次の要素の開始位置）です。
- **編集**：`replace text in document`は、結果の木のすべてのノード（根を含む）から`position`を取り除きます。編集で挿入したノードにも付けません。木の位置は常に「解析した原文ですべて有効」か「ない」のどちらかで、根に`position`があれば有効です。
- **既存の出力**：`serialize document`とNamed Data providerの出力は、位置の有無にかかわらず同じです。

## 木の共有registry

`./composition`は、名前付きdocumentの木を別のサンドボックス外の拡張（`turbowarp-structured-data`など）から読み取るための、parserに依存しないregistryを公開します。木を文字列にせずメモリ上でコピーするため、JSON文字列の大きさの上限はかかりません。

```js
import {getDocumentTreeRegistry} from '@kubohiroya/turbowarp-document-data/composition';
const {kind, revision, root} = getDocumentTreeRegistry(vm).capture(target, 'page', {
  location: '$[1]',                       // $、$[0][1]形式、単純なHTML selector（ブロックと同じ）
  positions: false,                       // trueなら位置のあるノードのpositionを残す
  limits: {maxDepth: 64, maxNodes: 50000}
});
```

- `getDocumentTreeRegistry(scope)`は、`scope`の`Symbol.for('@kubohiroya/turbowarp-document-data/document-tree-registry/v1')`（`documentTreeRegistrySymbol`）に置いたregistryを返します。別々にbundleされた拡張からも同じregistryに届きます。Document Dataは原文registryと同じくVM（`Scratch.vm`）をscopeにします。registryはブロックの実行時に探してください。拡張の読み込み順は問いません。
- `DOCUMENT_DATA_MVP`が有効なとき、拡張は生成時にproviderを登録し、`dispose()`で解除します。`PROJECT_STOP_ALL`と作品切替ではdocumentを破棄し、登録は維持します。`register(provider)`はその登録だけを解除する関数を返し、最後に登録したproviderが応答します。
- `capture(target, name, {location, positions, limits})`は、targetの名前付きdocument（名前はブロックと同じく前後の空白を除く）から`{kind, revision, root}`を返します。`kind`は`html`か`markdown`、`revision`はNamed Data providerと同じ不透明なrevision、`root`は`location`のノードの、plainなJSONのobjectからなる新しい深いコピーです。
- 返す木の形：HTMLは文書全体で`{"type":"root","children":[…]}`、ノードは`element`（`tagName`・`attributes`・`children`）、`text`（`value`）、`comment`（`value`）で、parse済みの木と同じ形です。Markdownはmdast-util-from-markdown v2の出力するmdastで、mdastのmajor更新は破壊的変更として扱います。`positions`が`true`のときだけ（既定は`false`）`position`を含めます。
- 返したコピーを書き換えても、documentは変わりません。registryは木やコピーを保持しません。
- `limits`は`@kubohiroya/turbowarp-yaml-json/codec`がJSONを解析するときと同じに数えます。値（object・array・文字列・数値・真偽値・null）を1つずつ数え、objectのkeyは数えません。深さはコピーするノードを0とします。木の1段ごとにノードのobjectと`children`配列で2段深くなり、`position`はノードから3段下まで使います。同じ深さ・値数の上限でJSON文字列を解析して成功する場合に限り、コピーも成功します。上限を超えた時点でコピーを打ち切るので、上限を超える大きさのコピーは作りません。
- errorは`DocumentTreeError`で、安定した`code`を持ちます：`DOCUMENT_TREE_UNAVAILABLE`（providerがない。Document Dataが読み込まれていない、`DOCUMENT_DATA_MVP`がOFF、またはdispose済み）、`DOCUMENT_NOT_FOUND`、`INVALID_LOCATION`、`LOCATION_NOT_FOUND`、`DOCUMENT_LIMIT_EXCEEDED`。引数の誤りには`DOCUMENT_TREE_OPTIONS_INVALID`・`DOCUMENT_TREE_PROVIDER_INVALID`・`REGISTRY_SCOPE_INVALID`・`REGISTRY_INCOMPATIBLE`を使います。bundleごとにclassが別になるため、`instanceof`ではなく`code`で判定してください。

## 開発

`pnpm run check`

## License

MPL-2.0。bundle内の依存packageは`THIRD_PARTY_NOTICES.md`を参照してください。

固定入力の編集範囲・互換性・切戻しについては [固定入力の編集](docs/fixed-input-editors.ja.md) を参照してください。

## YAML/JSON原文のSB3保存（先行版・既定OFF）

`DOCUMENT_SOURCE` は拡張の生成時に一度だけ読み、既定OFFです。読み込む前に `globalThis.DOCUMENT_SOURCE = true` を設定すると原文用ブロックを表示します。既存の `DOCUMENT_DATA_MVP` によるHTML/Markdownのtarget-local treeは独立しており、停止時に従来どおり破棄します。YAML/JSON原文は停止しても削除しません。

正本は `runtime.extensionStorage.kubohiroyadocumentdata` の `{formatVersion:1, documents:{[id]:{id,filename,format,source,revision,schema?,docsURL?}}}` です。共通codecで構文、任意のinline JSON Schemaで値を検証してから保存し、コメント・空白・CRLF・Unicodeを保持します。保存時にparse/renderで本文を作り直しません。Schemaは `{id,schema}`、docsURLは認証情報なしの固定HTTPS URLです。

`./composition` は原文参照・provider registry・Schema metadataのpure契約と、上記の木の共有registryを公開します。parser・GUI・特定App・Editor・native launcherに依存しません。旧embedded名も同じ関数のaliasです。旧v1 Symbol/参照encodingは維持しますが、formatを保持できない旧registryは `REGISTRY_INCOMPATIBLE` で明示拒否し、別registryを二重作成しません。ownerとhostは対応bundleへ一緒に更新・再読込してください。

別のpure入口 `./source-documents` は `createSourceDocumentStore(vm)` と `createSourceDocumentProvider(vm)` を提供します。provider IDは `document-data` です。文書IDとファイル名・formatを別に保持し、`capture/prepare/commit` の途中で原文変更・文書削除・作品切替があれば上書きしません。通常停止でtarget一覧の配列が変わることは許容します。`sourceDocument` ハットは実在IDへの参照だけを持ち、本文を複製・実行しません。

TurboWarpの通常SB3保存は、作品内ブロックが使う拡張IDのstorageを保持します。Document Dataのブロックも作品内に残してください。このpackageがVMのserializerを変更することはありません。read-only Named Dataの `document-source` namespace（kind `document`、scope `project`）はnativeなyaml/json bytesとrevisionを返し、暗黙の形式変換を拒否します。1作品256文書・合計4MiB、各原文のparse上限は共通codecに従います。

Issue #21の未公開ローカル実装です。切戻しは起動時フラグOFF、または接続・ローカル依存の差分をrevertし、元のSB3を保持します。値/ASTやSchema専用ブロックとの相互変換は別表現として扱い、この原文層で黙って置き換えません。

原文Schema検証は明示2020-12 profileを既定とし、draft-07のmetaschema URIが指定された文書ではdraft-07 profileを選びます。未対応metaschemaはowner validatorが拒否します。


作品切替（`RUNTIME_DISPOSED`→`PROJECT_LOADED`）ではキャッシュ済みの拡張・store・providerを再利用します。古い編集captureとHTML/Markdownの一時値・session handleだけを無効化し、次の作品のstorageでも永続登録を利用できます。登録を永久に解除するのは明示的な `dispose()` だけです。

編集済みブロックを正本へ保存しながら同じ表現を保持するproviderは、`fromRepresentations`へ自分のactive kindを明示できます。宣言がない同形式要求はownerを呼ぶ前に拒否し、`fromSource`だけでは許可しません。構文検証・古い状態の拒否・原子的なcommitはownerの責任です。ownerとhostの対応bundleを一緒に更新して再読込してください。
