// Name: Document Data
// ID: kubohiroyadocumentdata
// Description: Named HTML and Markdown document trees for TurboWarp and HTTP bodies.
// By: Hiroya Kubo
// License: MPL-2.0

(function (Scratch) {
  'use strict';

  //#region \0rolldown/runtime.js
  var __defProp = Object.defineProperty;
  var __exportAll = (all, no_symbols) => {
  	let target = {};
  	for (var name in all) __defProp(target, name, {
  		get: all[name],
  		enumerable: true
  	});
  	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
  	return target;
  };
  function isDocumentDataMvpEnabled(source = globalThis) {
  	const value = source.DOCUMENT_DATA_MVP;
  	return value === void 0 ? false : value === true || value === "true";
  }
  var extensionConfig = {
  	id: "kubohiroyadocumentdata",
  	slug: "document-data",
  	name: "Document Data",
  	description: "Named HTML and Markdown document trees for TurboWarp and HTTP bodies.",
  	author: "Hiroya Kubo",
  	license: "MPL-2.0",
  	unsandboxed: true,
  	docsURI: "https://kubohiroya.github.io/turbowarp-document-data/",
  	blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3QgeD0iNCIgeT0iOCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE0IiByeD0iMyIgZmlsbD0iIzRDOTdGRiIvPjxyZWN0IHg9IjI2IiB5PSI4IiB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHJ4PSIzIiBmaWxsPSIjNTlDMDU5Ii8+PHJlY3QgeD0iMTUiIHk9IjI2IiB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHJ4PSIzIiBmaWxsPSIjRkZBQjE5Ii8+PC9zdmc+"
  };
  var block_definitions_default = {
  	extensionName: "Document Data",
  	menus: { "documentFormat": {
  		"acceptReporters": true,
  		"items": ["html", "markdown"]
  	} },
  	blocks: [
  		{
  			"opcode": "parseHtml",
  			"blockType": "COMMAND",
  			"text": "parse HTML [TEXT] as document [NAME]",
  			"description": "Parse HTML into a target-local named document tree. This does not sanitize HTML.",
  			"arguments": {
  				"TEXT": {
  					"type": "STRING",
  					"defaultValue": "<p>Hello</p>"
  				},
  				"NAME": {
  					"type": "STRING",
  					"defaultValue": "page"
  				}
  			}
  		},
  		{
  			"opcode": "parseMarkdown",
  			"blockType": "COMMAND",
  			"text": "parse Markdown [TEXT] as document [NAME]",
  			"description": "Parse Markdown into a target-local named syntax tree.",
  			"arguments": {
  				"TEXT": {
  					"type": "STRING",
  					"defaultValue": "# Hello"
  				},
  				"NAME": {
  					"type": "STRING",
  					"defaultValue": "page"
  				}
  			}
  		},
  		{
  			"opcode": "hasDocument",
  			"blockType": "BOOLEAN",
  			"text": "document [NAME] exists?",
  			"description": "Report whether the current target has the named document.",
  			"arguments": { "NAME": {
  				"type": "STRING",
  				"defaultValue": "page"
  			} }
  		},
  		{
  			"opcode": "deleteDocument",
  			"blockType": "COMMAND",
  			"text": "delete document [NAME]",
  			"description": "Delete the named document from the current target.",
  			"arguments": { "NAME": {
  				"type": "STRING",
  				"defaultValue": "page"
  			} }
  		},
  		{
  			"opcode": "documentKind",
  			"blockType": "REPORTER",
  			"text": "kind of document [NAME]",
  			"description": "Return html or markdown.",
  			"arguments": { "NAME": {
  				"type": "STRING",
  				"defaultValue": "page"
  			} }
  		},
  		{
  			"opcode": "getDocumentText",
  			"blockType": "REPORTER",
  			"text": "text in document [NAME] at [LOCATION]",
  			"description": "Get text at the root, a numeric tree path, or a simple HTML selector.",
  			"arguments": {
  				"NAME": {
  					"type": "STRING",
  					"defaultValue": "page"
  				},
  				"LOCATION": {
  					"type": "STRING",
  					"defaultValue": "$"
  				}
  			}
  		},
  		{
  			"opcode": "replaceDocumentText",
  			"blockType": "COMMAND",
  			"text": "replace text in document [NAME] at [LOCATION] with [TEXT]",
  			"description": "Immutably replace text at the selected node.",
  			"arguments": {
  				"NAME": {
  					"type": "STRING",
  					"defaultValue": "page"
  				},
  				"LOCATION": {
  					"type": "STRING",
  					"defaultValue": "$"
  				},
  				"TEXT": {
  					"type": "STRING",
  					"defaultValue": "Hello"
  				}
  			}
  		},
  		{
  			"opcode": "serializeDocument",
  			"blockType": "REPORTER",
  			"text": "serialize document [NAME] as [FORMAT]",
  			"description": "Deterministically serialize a document in its native format. Cross-format conversion is rejected as lossy.",
  			"arguments": {
  				"NAME": {
  					"type": "STRING",
  					"defaultValue": "page"
  				},
  				"FORMAT": {
  					"type": "STRING",
  					"defaultValue": "html",
  					"menu": "documentFormat"
  				}
  			}
  		}
  	]
  };
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-string@4.0.0/node_modules/mdast-util-to-string/lib/index.js
  /**
  * @typedef {import('mdast').Nodes} Nodes
  *
  * @typedef Options
  *   Configuration (optional).
  * @property {boolean | null | undefined} [includeImageAlt=true]
  *   Whether to use `alt` for `image`s (default: `true`).
  * @property {boolean | null | undefined} [includeHtml=true]
  *   Whether to use `value` of HTML (default: `true`).
  */
  /** @type {Options} */
  var emptyOptions = {};
  /**
  * Get the text content of a node or list of nodes.
  *
  * Prefers the node’s plain-text fields, otherwise serializes its children,
  * and if the given value is an array, serialize the nodes in it.
  *
  * @param {unknown} [value]
  *   Thing to serialize, typically `Node`.
  * @param {Options | null | undefined} [options]
  *   Configuration (optional).
  * @returns {string}
  *   Serialized `value`.
  */
  function toString(value, options) {
  	const settings = options || emptyOptions;
  	return one(value, typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true, typeof settings.includeHtml === "boolean" ? settings.includeHtml : true);
  }
  /**
  * One node or several nodes.
  *
  * @param {unknown} value
  *   Thing to serialize.
  * @param {boolean} includeImageAlt
  *   Include image `alt`s.
  * @param {boolean} includeHtml
  *   Include HTML.
  * @returns {string}
  *   Serialized node.
  */
  function one(value, includeImageAlt, includeHtml) {
  	if (node(value)) {
  		if ("value" in value) return value.type === "html" && !includeHtml ? "" : value.value;
  		if (includeImageAlt && "alt" in value && value.alt) return value.alt;
  		if ("children" in value) return all(value.children, includeImageAlt, includeHtml);
  	}
  	if (Array.isArray(value)) return all(value, includeImageAlt, includeHtml);
  	return "";
  }
  /**
  * Serialize a list of nodes.
  *
  * @param {Array<unknown>} values
  *   Thing to serialize.
  * @param {boolean} includeImageAlt
  *   Include image `alt`s.
  * @param {boolean} includeHtml
  *   Include HTML.
  * @returns {string}
  *   Serialized nodes.
  */
  function all(values, includeImageAlt, includeHtml) {
  	/** @type {Array<string>} */
  	const result = [];
  	let index = -1;
  	while (++index < values.length) result[index] = one(values[index], includeImageAlt, includeHtml);
  	return result.join("");
  }
  /**
  * Check if `value` looks like a node.
  *
  * @param {unknown} value
  *   Thing.
  * @returns {value is Nodes}
  *   Whether `value` is a node.
  */
  function node(value) {
  	return Boolean(value && typeof value === "object");
  }
  //#endregion
  //#region node_modules/.pnpm/decode-named-character-reference@1.3.0/node_modules/decode-named-character-reference/index.dom.js
  var element = document.createElement("i");
  /**
  * @param {string} value
  * @returns {string | false}
  */
  function decodeNamedCharacterReference(value) {
  	const characterReference = "&" + value + ";";
  	element.innerHTML = characterReference;
  	const character = element.textContent;
  	if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") return false;
  	return character === characterReference ? false : character;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-chunked@2.0.1/node_modules/micromark-util-chunked/index.js
  /**
  * Like `Array#splice`, but smarter for giant arrays.
  *
  * `Array#splice` takes all items to be inserted as individual argument which
  * causes a stack overflow in V8 when trying to insert 100k items for instance.
  *
  * Otherwise, this does not return the removed items, and takes `items` as an
  * array instead of rest parameters.
  *
  * @template {unknown} T
  *   Item type.
  * @param {Array<T>} list
  *   List to operate on.
  * @param {number} start
  *   Index to remove/insert at (can be negative).
  * @param {number} remove
  *   Number of items to remove.
  * @param {Array<T>} items
  *   Items to inject into `list`.
  * @returns {undefined}
  *   Nothing.
  */
  function splice(list, start, remove, items) {
  	const end = list.length;
  	let chunkStart = 0;
  	/** @type {Array<unknown>} */
  	let parameters;
  	if (start < 0) start = -start > end ? 0 : end + start;
  	else start = start > end ? end : start;
  	remove = remove > 0 ? remove : 0;
  	if (items.length < 1e4) {
  		parameters = Array.from(items);
  		parameters.unshift(start, remove);
  		list.splice(...parameters);
  	} else {
  		if (remove) list.splice(start, remove);
  		while (chunkStart < items.length) {
  			parameters = items.slice(chunkStart, chunkStart + 1e4);
  			parameters.unshift(start, 0);
  			list.splice(...parameters);
  			chunkStart += 1e4;
  			start += 1e4;
  		}
  	}
  }
  /**
  * Append `items` (an array) at the end of `list` (another array).
  * When `list` was empty, returns `items` instead.
  *
  * This prevents a potentially expensive operation when `list` is empty,
  * and adds items in batches to prevent V8 from hanging.
  *
  * @template {unknown} T
  *   Item type.
  * @param {Array<T>} list
  *   List to operate on.
  * @param {Array<T>} items
  *   Items to add to `list`.
  * @returns {Array<T>}
  *   Either `list` or `items`.
  */
  function push(list, items) {
  	if (list.length > 0) {
  		splice(list, list.length, 0, items);
  		return list;
  	}
  	return items;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-combine-extensions@2.0.1/node_modules/micromark-util-combine-extensions/index.js
  /**
  * @import {
  *   Extension,
  *   Handles,
  *   HtmlExtension,
  *   NormalizedExtension
  * } from 'micromark-util-types'
  */
  var hasOwnProperty = {}.hasOwnProperty;
  /**
  * Combine multiple syntax extensions into one.
  *
  * @param {ReadonlyArray<Extension>} extensions
  *   List of syntax extensions.
  * @returns {NormalizedExtension}
  *   A single combined extension.
  */
  function combineExtensions(extensions) {
  	/** @type {NormalizedExtension} */
  	const all = {};
  	let index = -1;
  	while (++index < extensions.length) syntaxExtension(all, extensions[index]);
  	return all;
  }
  /**
  * Merge `extension` into `all`.
  *
  * @param {NormalizedExtension} all
  *   Extension to merge into.
  * @param {Extension} extension
  *   Extension to merge.
  * @returns {undefined}
  *   Nothing.
  */
  function syntaxExtension(all, extension) {
  	/** @type {keyof Extension} */
  	let hook;
  	for (hook in extension) {
  		/** @type {Record<string, unknown>} */
  		const left = (hasOwnProperty.call(all, hook) ? all[hook] : void 0) || (all[hook] = {});
  		/** @type {Record<string, unknown> | undefined} */
  		const right = extension[hook];
  		/** @type {string} */
  		let code;
  		if (right) for (code in right) {
  			if (!hasOwnProperty.call(left, code)) left[code] = [];
  			const value = right[code];
  			constructs(left[code], Array.isArray(value) ? value : value ? [value] : []);
  		}
  	}
  }
  /**
  * Merge `list` into `existing` (both lists of constructs).
  * Mutates `existing`.
  *
  * @param {Array<unknown>} existing
  *   List of constructs to merge into.
  * @param {Array<unknown>} list
  *   List of constructs to merge.
  * @returns {undefined}
  *   Nothing.
  */
  function constructs(existing, list) {
  	let index = -1;
  	/** @type {Array<unknown>} */
  	const before = [];
  	while (++index < list.length) (list[index].add === "after" ? existing : before).push(list[index]);
  	splice(existing, 0, 0, before);
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-decode-numeric-character-reference@2.0.2/node_modules/micromark-util-decode-numeric-character-reference/index.js
  /**
  * Turn the number (in string form as either hexa- or plain decimal) coming from
  * a numeric character reference into a character.
  *
  * Sort of like `String.fromCodePoint(Number.parseInt(value, base))`, but makes
  * non-characters and control characters safe.
  *
  * @param {string} value
  *   Value to decode.
  * @param {number} base
  *   Numeric base.
  * @returns {string}
  *   Character.
  */
  function decodeNumericCharacterReference(value, base) {
  	const code = Number.parseInt(value, base);
  	if (code < 9 || code === 11 || code > 13 && code < 32 || code > 126 && code < 160 || code > 55295 && code < 57344 || code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || code > 1114111) return "�";
  	return String.fromCodePoint(code);
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-normalize-identifier@2.0.1/node_modules/micromark-util-normalize-identifier/index.js
  /**
  * Normalize an identifier (as found in references, definitions).
  *
  * Collapses markdown whitespace, trim, and then lower- and uppercase.
  *
  * Some characters are considered “uppercase”, such as U+03F4 (`ϴ`), but if their
  * lowercase counterpart (U+03B8 (`θ`)) is uppercased will result in a different
  * uppercase character (U+0398 (`Θ`)).
  * So, to get a canonical form, we perform both lower- and uppercase.
  *
  * Using uppercase last makes sure keys will never interact with default
  * prototypal values (such as `constructor`): nothing in the prototype of
  * `Object` is uppercase.
  *
  * @param {string} value
  *   Identifier to normalize.
  * @returns {string}
  *   Normalized identifier.
  */
  function normalizeIdentifier(value) {
  	return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-character@2.1.1/node_modules/micromark-util-character/index.js
  /**
  * @import {Code} from 'micromark-util-types'
  */
  /**
  * Check whether the character code represents an ASCII alpha (`a` through `z`,
  * case insensitive).
  *
  * An **ASCII alpha** is an ASCII upper alpha or ASCII lower alpha.
  *
  * An **ASCII upper alpha** is a character in the inclusive range U+0041 (`A`)
  * to U+005A (`Z`).
  *
  * An **ASCII lower alpha** is a character in the inclusive range U+0061 (`a`)
  * to U+007A (`z`).
  *
  * @param code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  var asciiAlpha = regexCheck(/[A-Za-z]/);
  /**
  * Check whether the character code represents an ASCII alphanumeric (`a`
  * through `z`, case insensitive, or `0` through `9`).
  *
  * An **ASCII alphanumeric** is an ASCII digit (see `asciiDigit`) or ASCII alpha
  * (see `asciiAlpha`).
  *
  * @param code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
  /**
  * Check whether the character code represents an ASCII atext.
  *
  * atext is an ASCII alphanumeric (see `asciiAlphanumeric`), or a character in
  * the inclusive ranges U+0023 NUMBER SIGN (`#`) to U+0027 APOSTROPHE (`'`),
  * U+002A ASTERISK (`*`), U+002B PLUS SIGN (`+`), U+002D DASH (`-`), U+002F
  * SLASH (`/`), U+003D EQUALS TO (`=`), U+003F QUESTION MARK (`?`), U+005E
  * CARET (`^`) to U+0060 GRAVE ACCENT (`` ` ``), or U+007B LEFT CURLY BRACE
  * (`{`) to U+007E TILDE (`~`).
  *
  * See:
  * **\[RFC5322]**:
  * [Internet Message Format](https://tools.ietf.org/html/rfc5322).
  * P. Resnick.
  * IETF.
  *
  * @param code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
  /**
  * Check whether a character code is an ASCII control character.
  *
  * An **ASCII control** is a character in the inclusive range U+0000 NULL (NUL)
  * to U+001F (US), or U+007F (DEL).
  *
  * @param {Code} code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  function asciiControl(code) {
  	return code !== null && (code < 32 || code === 127);
  }
  /**
  * Check whether the character code represents an ASCII digit (`0` through `9`).
  *
  * An **ASCII digit** is a character in the inclusive range U+0030 (`0`) to
  * U+0039 (`9`).
  *
  * @param code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  var asciiDigit = regexCheck(/\d/);
  /**
  * Check whether the character code represents an ASCII hex digit (`a` through
  * `f`, case insensitive, or `0` through `9`).
  *
  * An **ASCII hex digit** is an ASCII digit (see `asciiDigit`), ASCII upper hex
  * digit, or an ASCII lower hex digit.
  *
  * An **ASCII upper hex digit** is a character in the inclusive range U+0041
  * (`A`) to U+0046 (`F`).
  *
  * An **ASCII lower hex digit** is a character in the inclusive range U+0061
  * (`a`) to U+0066 (`f`).
  *
  * @param code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
  /**
  * Check whether the character code represents ASCII punctuation.
  *
  * An **ASCII punctuation** is a character in the inclusive ranges U+0021
  * EXCLAMATION MARK (`!`) to U+002F SLASH (`/`), U+003A COLON (`:`) to U+0040 AT
  * SIGN (`@`), U+005B LEFT SQUARE BRACKET (`[`) to U+0060 GRAVE ACCENT
  * (`` ` ``), or U+007B LEFT CURLY BRACE (`{`) to U+007E TILDE (`~`).
  *
  * @param code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
  /**
  * Check whether a character code is a markdown line ending.
  *
  * A **markdown line ending** is the virtual characters M-0003 CARRIAGE RETURN
  * LINE FEED (CRLF), M-0004 LINE FEED (LF) and M-0005 CARRIAGE RETURN (CR).
  *
  * In micromark, the actual character U+000A LINE FEED (LF) and U+000D CARRIAGE
  * RETURN (CR) are replaced by these virtual characters depending on whether
  * they occurred together.
  *
  * @param {Code} code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  function markdownLineEnding(code) {
  	return code !== null && code < -2;
  }
  /**
  * Check whether a character code is a markdown line ending (see
  * `markdownLineEnding`) or markdown space (see `markdownSpace`).
  *
  * @param {Code} code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  function markdownLineEndingOrSpace(code) {
  	return code !== null && (code < 0 || code === 32);
  }
  /**
  * Check whether a character code is a markdown space.
  *
  * A **markdown space** is the concrete character U+0020 SPACE (SP) and the
  * virtual characters M-0001 VIRTUAL SPACE (VS) and M-0002 HORIZONTAL TAB (HT).
  *
  * In micromark, the actual character U+0009 CHARACTER TABULATION (HT) is
  * replaced by one M-0002 HORIZONTAL TAB (HT) and between 0 and 3 M-0001 VIRTUAL
  * SPACE (VS) characters, depending on the column at which the tab occurred.
  *
  * @param {Code} code
  *   Code.
  * @returns {boolean}
  *   Whether it matches.
  */
  function markdownSpace(code) {
  	return code === -2 || code === -1 || code === 32;
  }
  /**
  * Check whether the character code represents Unicode punctuation.
  *
  * A **Unicode punctuation** is a character in the Unicode `Pc` (Punctuation,
  * Connector), `Pd` (Punctuation, Dash), `Pe` (Punctuation, Close), `Pf`
  * (Punctuation, Final quote), `Pi` (Punctuation, Initial quote), `Po`
  * (Punctuation, Other), or `Ps` (Punctuation, Open) categories, or an ASCII
  * punctuation (see `asciiPunctuation`).
  *
  * See:
  * **\[UNICODE]**:
  * [The Unicode Standard](https://www.unicode.org/versions/).
  * Unicode Consortium.
  *
  * @param code
  *   Code.
  * @returns
  *   Whether it matches.
  */
  var unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
  /**
  * Check whether the character code represents Unicode whitespace.
  *
  * Note that this does handle micromark specific markdown whitespace characters.
  * See `markdownLineEndingOrSpace` to check that.
  *
  * A **Unicode whitespace** is a character in the Unicode `Zs` (Separator,
  * Space) category, or U+0009 CHARACTER TABULATION (HT), U+000A LINE FEED (LF),
  * U+000C (FF), or U+000D CARRIAGE RETURN (CR) (**\[UNICODE]**).
  *
  * See:
  * **\[UNICODE]**:
  * [The Unicode Standard](https://www.unicode.org/versions/).
  * Unicode Consortium.
  *
  * @param code
  *   Code.
  * @returns
  *   Whether it matches.
  */
  var unicodeWhitespace = regexCheck(/\s/);
  /**
  * Create a code check from a regex.
  *
  * @param {RegExp} regex
  *   Expression.
  * @returns {(code: Code) => boolean}
  *   Check.
  */
  function regexCheck(regex) {
  	return check;
  	/**
  	* Check whether a code matches the bound regex.
  	*
  	* @param {Code} code
  	*   Character code.
  	* @returns {boolean}
  	*   Whether the character code matches the bound regex.
  	*/
  	function check(code) {
  		return code !== null && code > -1 && regex.test(String.fromCharCode(code));
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-factory-space@2.0.1/node_modules/micromark-factory-space/index.js
  /**
  * @import {Effects, State, TokenType} from 'micromark-util-types'
  */
  /**
  * Parse spaces and tabs.
  *
  * There is no `nok` parameter:
  *
  * *   spaces in markdown are often optional, in which case this factory can be
  *     used and `ok` will be switched to whether spaces were found or not
  * *   one line ending or space can be detected with `markdownSpace(code)` right
  *     before using `factorySpace`
  *
  * ###### Examples
  *
  * Where `␉` represents a tab (plus how much it expands) and `␠` represents a
  * single space.
  *
  * ```markdown
  * ␉
  * ␠␠␠␠
  * ␉␠
  * ```
  *
  * @param {Effects} effects
  *   Context.
  * @param {State} ok
  *   State switched to when successful.
  * @param {TokenType} type
  *   Type (`' \t'`).
  * @param {number | undefined} [max=Infinity]
  *   Max (exclusive).
  * @returns {State}
  *   Start state.
  */
  function factorySpace(effects, ok, type, max) {
  	const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  	let size = 0;
  	return start;
  	/** @type {State} */
  	function start(code) {
  		if (markdownSpace(code)) {
  			effects.enter(type);
  			return prefix(code);
  		}
  		return ok(code);
  	}
  	/** @type {State} */
  	function prefix(code) {
  		if (markdownSpace(code) && size++ < limit) {
  			effects.consume(code);
  			return prefix;
  		}
  		effects.exit(type);
  		return ok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/content.js
  /**
  * @import {
  *   InitialConstruct,
  *   Initializer,
  *   State,
  *   TokenizeContext,
  *   Token
  * } from 'micromark-util-types'
  */
  /** @type {InitialConstruct} */
  var content$1 = { tokenize: initializeContent };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Initializer}
  *   Content.
  */
  function initializeContent(effects) {
  	const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
  	/** @type {Token} */
  	let previous;
  	return contentStart;
  	/** @type {State} */
  	function afterContentStartConstruct(code) {
  		if (code === null) {
  			effects.consume(code);
  			return;
  		}
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return factorySpace(effects, contentStart, "linePrefix");
  	}
  	/** @type {State} */
  	function paragraphInitial(code) {
  		effects.enter("paragraph");
  		return lineStart(code);
  	}
  	/** @type {State} */
  	function lineStart(code) {
  		const token = effects.enter("chunkText", {
  			contentType: "text",
  			previous
  		});
  		if (previous) previous.next = token;
  		previous = token;
  		return data(code);
  	}
  	/** @type {State} */
  	function data(code) {
  		if (code === null) {
  			effects.exit("chunkText");
  			effects.exit("paragraph");
  			effects.consume(code);
  			return;
  		}
  		if (markdownLineEnding(code)) {
  			effects.consume(code);
  			effects.exit("chunkText");
  			return lineStart;
  		}
  		effects.consume(code);
  		return data;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/document.js
  /**
  * @import {
  *   Construct,
  *   ContainerState,
  *   InitialConstruct,
  *   Initializer,
  *   Point,
  *   State,
  *   TokenizeContext,
  *   Tokenizer,
  *   Token
  * } from 'micromark-util-types'
  */
  /**
  * @typedef {[Construct, ContainerState]} StackItem
  *   Construct and its state.
  */
  /** @type {InitialConstruct} */
  var document$2 = { tokenize: initializeDocument };
  /** @type {Construct} */
  var containerConstruct = { tokenize: tokenizeContainer };
  /**
  * @this {TokenizeContext}
  *   Self.
  * @type {Initializer}
  *   Initializer.
  */
  function initializeDocument(effects) {
  	const self = this;
  	/** @type {Array<StackItem>} */
  	const stack = [];
  	let continued = 0;
  	/** @type {TokenizeContext | undefined} */
  	let childFlow;
  	/** @type {Token | undefined} */
  	let childToken;
  	/** @type {number} */
  	let lineStartOffset;
  	return start;
  	/** @type {State} */
  	function start(code) {
  		if (continued < stack.length) {
  			const item = stack[continued];
  			self.containerState = item[1];
  			return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
  		}
  		return checkNewContainers(code);
  	}
  	/** @type {State} */
  	function documentContinue(code) {
  		continued++;
  		if (self.containerState._closeFlow) {
  			self.containerState._closeFlow = void 0;
  			if (childFlow) closeFlow();
  			const indexBeforeExits = self.events.length;
  			let indexBeforeFlow = indexBeforeExits;
  			/** @type {Point | undefined} */
  			let point;
  			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
  				point = self.events[indexBeforeFlow][1].end;
  				break;
  			}
  			exitContainers(continued);
  			let index = indexBeforeExits;
  			while (index < self.events.length) {
  				self.events[index][1].end = { ...point };
  				index++;
  			}
  			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
  			self.events.length = index;
  			return checkNewContainers(code);
  		}
  		return start(code);
  	}
  	/** @type {State} */
  	function checkNewContainers(code) {
  		if (continued === stack.length) {
  			if (!childFlow) return documentContinued(code);
  			if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code);
  			self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
  		}
  		self.containerState = {};
  		return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
  	}
  	/** @type {State} */
  	function thereIsANewContainer(code) {
  		if (childFlow) closeFlow();
  		exitContainers(continued);
  		return documentContinued(code);
  	}
  	/** @type {State} */
  	function thereIsNoNewContainer(code) {
  		self.parser.lazy[self.now().line] = continued !== stack.length;
  		lineStartOffset = self.now().offset;
  		return flowStart(code);
  	}
  	/** @type {State} */
  	function documentContinued(code) {
  		self.containerState = {};
  		return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
  	}
  	/** @type {State} */
  	function containerContinue(code) {
  		continued++;
  		stack.push([self.currentConstruct, self.containerState]);
  		return documentContinued(code);
  	}
  	/** @type {State} */
  	function flowStart(code) {
  		if (code === null) {
  			if (childFlow) closeFlow();
  			exitContainers(0);
  			effects.consume(code);
  			return;
  		}
  		childFlow = childFlow || self.parser.flow(self.now());
  		effects.enter("chunkFlow", {
  			_tokenizer: childFlow,
  			contentType: "flow",
  			previous: childToken
  		});
  		return flowContinue(code);
  	}
  	/** @type {State} */
  	function flowContinue(code) {
  		if (code === null) {
  			writeToChild(effects.exit("chunkFlow"), true);
  			exitContainers(0);
  			effects.consume(code);
  			return;
  		}
  		if (markdownLineEnding(code)) {
  			effects.consume(code);
  			writeToChild(effects.exit("chunkFlow"));
  			continued = 0;
  			self.interrupt = void 0;
  			return start;
  		}
  		effects.consume(code);
  		return flowContinue;
  	}
  	/**
  	* @param {Token} token
  	*   Token.
  	* @param {boolean | undefined} [endOfFile]
  	*   Whether the token is at the end of the file (default: `false`).
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	function writeToChild(token, endOfFile) {
  		const stream = self.sliceStream(token);
  		if (endOfFile) stream.push(null);
  		token.previous = childToken;
  		if (childToken) childToken.next = token;
  		childToken = token;
  		childFlow.defineSkip(token.start);
  		childFlow.write(stream);
  		if (self.parser.lazy[token.start.line]) {
  			let index = childFlow.events.length;
  			while (index--) if (childFlow.events[index][1].start.offset < lineStartOffset && (!childFlow.events[index][1].end || childFlow.events[index][1].end.offset > lineStartOffset)) return;
  			const indexBeforeExits = self.events.length;
  			let indexBeforeFlow = indexBeforeExits;
  			/** @type {boolean | undefined} */
  			let seen;
  			/** @type {Point | undefined} */
  			let point;
  			while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
  				if (seen) {
  					point = self.events[indexBeforeFlow][1].end;
  					break;
  				}
  				seen = true;
  			}
  			exitContainers(continued);
  			index = indexBeforeExits;
  			while (index < self.events.length) {
  				self.events[index][1].end = { ...point };
  				index++;
  			}
  			splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
  			self.events.length = index;
  		}
  	}
  	/**
  	* @param {number} size
  	*   Size.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	function exitContainers(size) {
  		let index = stack.length;
  		while (index-- > size) {
  			const entry = stack[index];
  			self.containerState = entry[1];
  			entry[0].exit.call(self, effects);
  		}
  		stack.length = size;
  	}
  	function closeFlow() {
  		childFlow.write([null]);
  		childToken = void 0;
  		childFlow = void 0;
  		self.containerState._closeFlow = void 0;
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  *   Tokenizer.
  */
  function tokenizeContainer(effects, ok, nok) {
  	return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-classify-character@2.0.1/node_modules/micromark-util-classify-character/index.js
  /**
  * @import {Code} from 'micromark-util-types'
  */
  /**
  * Classify whether a code represents whitespace, punctuation, or something
  * else.
  *
  * Used for attention (emphasis, strong), whose sequences can open or close
  * based on the class of surrounding characters.
  *
  * > 👉 **Note**: eof (`null`) is seen as whitespace.
  *
  * @param {Code} code
  *   Code.
  * @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}
  *   Group.
  */
  function classifyCharacter(code) {
  	if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return 1;
  	if (unicodePunctuation(code)) return 2;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-resolve-all@2.0.1/node_modules/micromark-util-resolve-all/index.js
  /**
  * @import {Event, Resolver, TokenizeContext} from 'micromark-util-types'
  */
  /**
  * Call all `resolveAll`s.
  *
  * @param {ReadonlyArray<{resolveAll?: Resolver | undefined}>} constructs
  *   List of constructs, optionally with `resolveAll`s.
  * @param {Array<Event>} events
  *   List of events.
  * @param {TokenizeContext} context
  *   Context used by `tokenize`.
  * @returns {Array<Event>}
  *   Changed events.
  */
  function resolveAll(constructs, events, context) {
  	/** @type {Array<Resolver>} */
  	const called = [];
  	let index = -1;
  	while (++index < constructs.length) {
  		const resolve = constructs[index].resolveAll;
  		if (resolve && !called.includes(resolve)) {
  			events = resolve(events, context);
  			called.push(resolve);
  		}
  	}
  	return events;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/attention.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   Event,
  *   Point,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer,
  *   Token
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var attention = {
  	name: "attention",
  	resolveAll: resolveAllAttention,
  	tokenize: tokenizeAttention
  };
  /**
  * Take all events and resolve attention to emphasis or strong.
  *
  * @type {Resolver}
  */
  function resolveAllAttention(events, context) {
  	let index = -1;
  	/** @type {number} */
  	let open;
  	/** @type {Token} */
  	let group;
  	/** @type {Token} */
  	let text;
  	/** @type {Token} */
  	let openingSequence;
  	/** @type {Token} */
  	let closingSequence;
  	/** @type {number} */
  	let use;
  	/** @type {Array<Event>} */
  	let nextEvents;
  	/** @type {number} */
  	let offset;
  	while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
  		open = index;
  		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
  			if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) continue;
  			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
  			const start = { ...events[open][1].end };
  			const end = { ...events[index][1].start };
  			movePoint(start, -use);
  			movePoint(end, use);
  			openingSequence = {
  				type: use > 1 ? "strongSequence" : "emphasisSequence",
  				start,
  				end: { ...events[open][1].end }
  			};
  			closingSequence = {
  				type: use > 1 ? "strongSequence" : "emphasisSequence",
  				start: { ...events[index][1].start },
  				end
  			};
  			text = {
  				type: use > 1 ? "strongText" : "emphasisText",
  				start: { ...events[open][1].end },
  				end: { ...events[index][1].start }
  			};
  			group = {
  				type: use > 1 ? "strong" : "emphasis",
  				start: { ...openingSequence.start },
  				end: { ...closingSequence.end }
  			};
  			events[open][1].end = { ...openingSequence.start };
  			events[index][1].start = { ...closingSequence.end };
  			nextEvents = [];
  			if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
  				"enter",
  				events[open][1],
  				context
  			], [
  				"exit",
  				events[open][1],
  				context
  			]]);
  			nextEvents = push(nextEvents, [
  				[
  					"enter",
  					group,
  					context
  				],
  				[
  					"enter",
  					openingSequence,
  					context
  				],
  				[
  					"exit",
  					openingSequence,
  					context
  				],
  				[
  					"enter",
  					text,
  					context
  				]
  			]);
  			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
  			nextEvents = push(nextEvents, [
  				[
  					"exit",
  					text,
  					context
  				],
  				[
  					"enter",
  					closingSequence,
  					context
  				],
  				[
  					"exit",
  					closingSequence,
  					context
  				],
  				[
  					"exit",
  					group,
  					context
  				]
  			]);
  			if (events[index][1].end.offset - events[index][1].start.offset) {
  				offset = 2;
  				nextEvents = push(nextEvents, [[
  					"enter",
  					events[index][1],
  					context
  				], [
  					"exit",
  					events[index][1],
  					context
  				]]);
  			} else offset = 0;
  			splice(events, open - 1, index - open + 3, nextEvents);
  			index = open + nextEvents.length - offset - 2;
  			break;
  		}
  	}
  	index = -1;
  	while (++index < events.length) if (events[index][1].type === "attentionSequence") events[index][1].type = "data";
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeAttention(effects, ok) {
  	const attentionMarkers = this.parser.constructs.attentionMarkers.null;
  	const previous = this.previous;
  	const before = classifyCharacter(previous);
  	/** @type {NonNullable<Code>} */
  	let marker;
  	return start;
  	/**
  	* Before a sequence.
  	*
  	* ```markdown
  	* > | **
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		marker = code;
  		effects.enter("attentionSequence");
  		return inside(code);
  	}
  	/**
  	* In a sequence.
  	*
  	* ```markdown
  	* > | **
  	*     ^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function inside(code) {
  		if (code === marker) {
  			effects.consume(code);
  			return inside;
  		}
  		const token = effects.exit("attentionSequence");
  		const after = classifyCharacter(code);
  		const open = !after || after === 2 && before || attentionMarkers.includes(code);
  		const close = !before || before === 2 && after || attentionMarkers.includes(previous);
  		token._open = Boolean(marker === 42 ? open : open && (before || !close));
  		token._close = Boolean(marker === 42 ? close : close && (after || !open));
  		return ok(code);
  	}
  }
  /**
  * Move a point a bit.
  *
  * Note: `move` only works inside lines! It’s not possible to move past other
  * chunks (replacement characters, tabs, or line endings).
  *
  * @param {Point} point
  *   Point.
  * @param {number} offset
  *   Amount to move.
  * @returns {undefined}
  *   Nothing.
  */
  function movePoint(point, offset) {
  	point.column += offset;
  	point.offset += offset;
  	point._bufferIndex += offset;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/autolink.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var autolink = {
  	name: "autolink",
  	tokenize: tokenizeAutolink
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeAutolink(effects, ok, nok) {
  	let size = 0;
  	return start;
  	/**
  	* Start of an autolink.
  	*
  	* ```markdown
  	* > | a<https://example.com>b
  	*      ^
  	* > | a<user@example.com>b
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("autolink");
  		effects.enter("autolinkMarker");
  		effects.consume(code);
  		effects.exit("autolinkMarker");
  		effects.enter("autolinkProtocol");
  		return open;
  	}
  	/**
  	* After `<`, at protocol or atext.
  	*
  	* ```markdown
  	* > | a<https://example.com>b
  	*       ^
  	* > | a<user@example.com>b
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function open(code) {
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			return schemeOrEmailAtext;
  		}
  		if (code === 64) return nok(code);
  		return emailAtext(code);
  	}
  	/**
  	* At second byte of protocol or atext.
  	*
  	* ```markdown
  	* > | a<https://example.com>b
  	*        ^
  	* > | a<user@example.com>b
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function schemeOrEmailAtext(code) {
  		if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
  			size = 1;
  			return schemeInsideOrEmailAtext(code);
  		}
  		return emailAtext(code);
  	}
  	/**
  	* In ambiguous protocol or atext.
  	*
  	* ```markdown
  	* > | a<https://example.com>b
  	*        ^
  	* > | a<user@example.com>b
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function schemeInsideOrEmailAtext(code) {
  		if (code === 58) {
  			effects.consume(code);
  			size = 0;
  			return urlInside;
  		}
  		if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
  			effects.consume(code);
  			return schemeInsideOrEmailAtext;
  		}
  		size = 0;
  		return emailAtext(code);
  	}
  	/**
  	* After protocol, in URL.
  	*
  	* ```markdown
  	* > | a<https://example.com>b
  	*             ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function urlInside(code) {
  		if (code === 62) {
  			effects.exit("autolinkProtocol");
  			effects.enter("autolinkMarker");
  			effects.consume(code);
  			effects.exit("autolinkMarker");
  			effects.exit("autolink");
  			return ok;
  		}
  		if (code === null || code === 32 || code === 60 || asciiControl(code)) return nok(code);
  		effects.consume(code);
  		return urlInside;
  	}
  	/**
  	* In email atext.
  	*
  	* ```markdown
  	* > | a<user.name@example.com>b
  	*              ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function emailAtext(code) {
  		if (code === 64) {
  			effects.consume(code);
  			return emailAtSignOrDot;
  		}
  		if (asciiAtext(code)) {
  			effects.consume(code);
  			return emailAtext;
  		}
  		return nok(code);
  	}
  	/**
  	* In label, after at-sign or dot.
  	*
  	* ```markdown
  	* > | a<user.name@example.com>b
  	*                 ^       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function emailAtSignOrDot(code) {
  		return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
  	}
  	/**
  	* In label, where `.` and `>` are allowed.
  	*
  	* ```markdown
  	* > | a<user.name@example.com>b
  	*                   ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function emailLabel(code) {
  		if (code === 46) {
  			effects.consume(code);
  			size = 0;
  			return emailAtSignOrDot;
  		}
  		if (code === 62) {
  			effects.exit("autolinkProtocol").type = "autolinkEmail";
  			effects.enter("autolinkMarker");
  			effects.consume(code);
  			effects.exit("autolinkMarker");
  			effects.exit("autolink");
  			return ok;
  		}
  		return emailValue(code);
  	}
  	/**
  	* In label, where `.` and `>` are *not* allowed.
  	*
  	* Though, this is also used in `emailLabel` to parse other values.
  	*
  	* ```markdown
  	* > | a<user.name@ex-ample.com>b
  	*                    ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function emailValue(code) {
  		if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
  			const next = code === 45 ? emailValue : emailLabel;
  			effects.consume(code);
  			return next;
  		}
  		return nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/blank-line.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var blankLine = {
  	partial: true,
  	tokenize: tokenizeBlankLine
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeBlankLine(effects, ok, nok) {
  	return start;
  	/**
  	* Start of blank line.
  	*
  	* > 👉 **Note**: `␠` represents a space character.
  	*
  	* ```markdown
  	* > | ␠␠␊
  	*     ^
  	* > | ␊
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
  	}
  	/**
  	* At eof/eol, after optional whitespace.
  	*
  	* > 👉 **Note**: `␠` represents a space character.
  	*
  	* ```markdown
  	* > | ␠␠␊
  	*       ^
  	* > | ␊
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/block-quote.js
  /**
  * @import {
  *   Construct,
  *   Exiter,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var blockQuote = {
  	continuation: { tokenize: tokenizeBlockQuoteContinuation },
  	exit,
  	name: "blockQuote",
  	tokenize: tokenizeBlockQuoteStart
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeBlockQuoteStart(effects, ok, nok) {
  	const self = this;
  	return start;
  	/**
  	* Start of block quote.
  	*
  	* ```markdown
  	* > | > a
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		if (code === 62) {
  			const state = self.containerState;
  			if (!state.open) {
  				effects.enter("blockQuote", { _container: true });
  				state.open = true;
  			}
  			effects.enter("blockQuotePrefix");
  			effects.enter("blockQuoteMarker");
  			effects.consume(code);
  			effects.exit("blockQuoteMarker");
  			return after;
  		}
  		return nok(code);
  	}
  	/**
  	* After `>`, before optional whitespace.
  	*
  	* ```markdown
  	* > | > a
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		if (markdownSpace(code)) {
  			effects.enter("blockQuotePrefixWhitespace");
  			effects.consume(code);
  			effects.exit("blockQuotePrefixWhitespace");
  			effects.exit("blockQuotePrefix");
  			return ok;
  		}
  		effects.exit("blockQuotePrefix");
  		return ok(code);
  	}
  }
  /**
  * Start of block quote continuation.
  *
  * ```markdown
  *   | > a
  * > | > b
  *     ^
  * ```
  *
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  	const self = this;
  	return contStart;
  	/**
  	* Start of block quote continuation.
  	*
  	* Also used to parse the first block quote opening.
  	*
  	* ```markdown
  	*   | > a
  	* > | > b
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function contStart(code) {
  		if (markdownSpace(code)) return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
  		return contBefore(code);
  	}
  	/**
  	* At `>`, after optional whitespace.
  	*
  	* Also used to parse the first block quote opening.
  	*
  	* ```markdown
  	*   | > a
  	* > | > b
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function contBefore(code) {
  		return effects.attempt(blockQuote, ok, nok)(code);
  	}
  }
  /** @type {Exiter} */
  function exit(effects) {
  	effects.exit("blockQuote");
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/character-escape.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var characterEscape = {
  	name: "characterEscape",
  	tokenize: tokenizeCharacterEscape
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeCharacterEscape(effects, ok, nok) {
  	return start;
  	/**
  	* Start of character escape.
  	*
  	* ```markdown
  	* > | a\*b
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("characterEscape");
  		effects.enter("escapeMarker");
  		effects.consume(code);
  		effects.exit("escapeMarker");
  		return inside;
  	}
  	/**
  	* After `\`, at punctuation.
  	*
  	* ```markdown
  	* > | a\*b
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function inside(code) {
  		if (asciiPunctuation(code)) {
  			effects.enter("characterEscapeValue");
  			effects.consume(code);
  			effects.exit("characterEscapeValue");
  			effects.exit("characterEscape");
  			return ok;
  		}
  		return nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/character-reference.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var characterReference = {
  	name: "characterReference",
  	tokenize: tokenizeCharacterReference
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeCharacterReference(effects, ok, nok) {
  	const self = this;
  	let size = 0;
  	/** @type {number} */
  	let max;
  	/** @type {(code: Code) => boolean} */
  	let test;
  	return start;
  	/**
  	* Start of character reference.
  	*
  	* ```markdown
  	* > | a&amp;b
  	*      ^
  	* > | a&#123;b
  	*      ^
  	* > | a&#x9;b
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("characterReference");
  		effects.enter("characterReferenceMarker");
  		effects.consume(code);
  		effects.exit("characterReferenceMarker");
  		return open;
  	}
  	/**
  	* After `&`, at `#` for numeric references or alphanumeric for named
  	* references.
  	*
  	* ```markdown
  	* > | a&amp;b
  	*       ^
  	* > | a&#123;b
  	*       ^
  	* > | a&#x9;b
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function open(code) {
  		if (code === 35) {
  			effects.enter("characterReferenceMarkerNumeric");
  			effects.consume(code);
  			effects.exit("characterReferenceMarkerNumeric");
  			return numeric;
  		}
  		effects.enter("characterReferenceValue");
  		max = 31;
  		test = asciiAlphanumeric;
  		return value(code);
  	}
  	/**
  	* After `#`, at `x` for hexadecimals or digit for decimals.
  	*
  	* ```markdown
  	* > | a&#123;b
  	*        ^
  	* > | a&#x9;b
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function numeric(code) {
  		if (code === 88 || code === 120) {
  			effects.enter("characterReferenceMarkerHexadecimal");
  			effects.consume(code);
  			effects.exit("characterReferenceMarkerHexadecimal");
  			effects.enter("characterReferenceValue");
  			max = 6;
  			test = asciiHexDigit;
  			return value;
  		}
  		effects.enter("characterReferenceValue");
  		max = 7;
  		test = asciiDigit;
  		return value(code);
  	}
  	/**
  	* After markers (`&#x`, `&#`, or `&`), in value, before `;`.
  	*
  	* The character reference kind defines what and how many characters are
  	* allowed.
  	*
  	* ```markdown
  	* > | a&amp;b
  	*       ^^^
  	* > | a&#123;b
  	*        ^^^
  	* > | a&#x9;b
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function value(code) {
  		if (code === 59 && size) {
  			const token = effects.exit("characterReferenceValue");
  			if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) return nok(code);
  			effects.enter("characterReferenceMarker");
  			effects.consume(code);
  			effects.exit("characterReferenceMarker");
  			effects.exit("characterReference");
  			return ok;
  		}
  		if (test(code) && size++ < max) {
  			effects.consume(code);
  			return value;
  		}
  		return nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/code-fenced.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var nonLazyContinuation = {
  	partial: true,
  	tokenize: tokenizeNonLazyContinuation
  };
  /** @type {Construct} */
  var codeFenced = {
  	concrete: true,
  	name: "codeFenced",
  	tokenize: tokenizeCodeFenced
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeCodeFenced(effects, ok, nok) {
  	const self = this;
  	/** @type {Construct} */
  	const closeStart = {
  		partial: true,
  		tokenize: tokenizeCloseStart
  	};
  	let initialPrefix = 0;
  	let sizeOpen = 0;
  	/** @type {NonNullable<Code>} */
  	let marker;
  	return start;
  	/**
  	* Start of code.
  	*
  	* ```markdown
  	* > | ~~~js
  	*     ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		return beforeSequenceOpen(code);
  	}
  	/**
  	* In opening fence, after prefix, at sequence.
  	*
  	* ```markdown
  	* > | ~~~js
  	*     ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function beforeSequenceOpen(code) {
  		const tail = self.events[self.events.length - 1];
  		initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  		marker = code;
  		effects.enter("codeFenced");
  		effects.enter("codeFencedFence");
  		effects.enter("codeFencedFenceSequence");
  		return sequenceOpen(code);
  	}
  	/**
  	* In opening fence sequence.
  	*
  	* ```markdown
  	* > | ~~~js
  	*      ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function sequenceOpen(code) {
  		if (code === marker) {
  			sizeOpen++;
  			effects.consume(code);
  			return sequenceOpen;
  		}
  		if (sizeOpen < 3) return nok(code);
  		effects.exit("codeFencedFenceSequence");
  		return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
  	}
  	/**
  	* In opening fence, after the sequence (and optional whitespace), before info.
  	*
  	* ```markdown
  	* > | ~~~js
  	*        ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function infoBefore(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("codeFencedFence");
  			return self.interrupt ? ok(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
  		}
  		effects.enter("codeFencedFenceInfo");
  		effects.enter("chunkString", { contentType: "string" });
  		return info(code);
  	}
  	/**
  	* In info.
  	*
  	* ```markdown
  	* > | ~~~js
  	*        ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function info(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("chunkString");
  			effects.exit("codeFencedFenceInfo");
  			return infoBefore(code);
  		}
  		if (markdownSpace(code)) {
  			effects.exit("chunkString");
  			effects.exit("codeFencedFenceInfo");
  			return factorySpace(effects, metaBefore, "whitespace")(code);
  		}
  		if (code === 96 && code === marker) return nok(code);
  		effects.consume(code);
  		return info;
  	}
  	/**
  	* In opening fence, after info and whitespace, before meta.
  	*
  	* ```markdown
  	* > | ~~~js eval
  	*           ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function metaBefore(code) {
  		if (code === null || markdownLineEnding(code)) return infoBefore(code);
  		effects.enter("codeFencedFenceMeta");
  		effects.enter("chunkString", { contentType: "string" });
  		return meta(code);
  	}
  	/**
  	* In meta.
  	*
  	* ```markdown
  	* > | ~~~js eval
  	*           ^
  	*   | alert(1)
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function meta(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("chunkString");
  			effects.exit("codeFencedFenceMeta");
  			return infoBefore(code);
  		}
  		if (code === 96 && code === marker) return nok(code);
  		effects.consume(code);
  		return meta;
  	}
  	/**
  	* At eol/eof in code, before a non-lazy closing fence or content.
  	*
  	* ```markdown
  	* > | ~~~js
  	*          ^
  	* > | alert(1)
  	*             ^
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function atNonLazyBreak(code) {
  		return effects.attempt(closeStart, after, contentBefore)(code);
  	}
  	/**
  	* Before code content, not a closing fence, at eol.
  	*
  	* ```markdown
  	*   | ~~~js
  	* > | alert(1)
  	*             ^
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function contentBefore(code) {
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return contentStart;
  	}
  	/**
  	* Before code content, not a closing fence.
  	*
  	* ```markdown
  	*   | ~~~js
  	* > | alert(1)
  	*     ^
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function contentStart(code) {
  		return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
  	}
  	/**
  	* Before code content, after optional prefix.
  	*
  	* ```markdown
  	*   | ~~~js
  	* > | alert(1)
  	*     ^
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function beforeContentChunk(code) {
  		if (code === null || markdownLineEnding(code)) return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
  		effects.enter("codeFlowValue");
  		return contentChunk(code);
  	}
  	/**
  	* In code content.
  	*
  	* ```markdown
  	*   | ~~~js
  	* > | alert(1)
  	*     ^^^^^^^^
  	*   | ~~~
  	* ```
  	*
  	* @type {State}
  	*/
  	function contentChunk(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("codeFlowValue");
  			return beforeContentChunk(code);
  		}
  		effects.consume(code);
  		return contentChunk;
  	}
  	/**
  	* After code.
  	*
  	* ```markdown
  	*   | ~~~js
  	*   | alert(1)
  	* > | ~~~
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		effects.exit("codeFenced");
  		return ok(code);
  	}
  	/**
  	* @this {TokenizeContext}
  	*   Context.
  	* @type {Tokenizer}
  	*/
  	function tokenizeCloseStart(effects, ok, nok) {
  		let size = 0;
  		return startBefore;
  		/**
  		*
  		*
  		* @type {State}
  		*/
  		function startBefore(code) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			return start;
  		}
  		/**
  		* Before closing fence, at optional whitespace.
  		*
  		* ```markdown
  		*   | ~~~js
  		*   | alert(1)
  		* > | ~~~
  		*     ^
  		* ```
  		*
  		* @type {State}
  		*/
  		function start(code) {
  			effects.enter("codeFencedFence");
  			return markdownSpace(code) ? factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : beforeSequenceClose(code);
  		}
  		/**
  		* In closing fence, after optional whitespace, at sequence.
  		*
  		* ```markdown
  		*   | ~~~js
  		*   | alert(1)
  		* > | ~~~
  		*     ^
  		* ```
  		*
  		* @type {State}
  		*/
  		function beforeSequenceClose(code) {
  			if (code === marker) {
  				effects.enter("codeFencedFenceSequence");
  				return sequenceClose(code);
  			}
  			return nok(code);
  		}
  		/**
  		* In closing fence sequence.
  		*
  		* ```markdown
  		*   | ~~~js
  		*   | alert(1)
  		* > | ~~~
  		*     ^
  		* ```
  		*
  		* @type {State}
  		*/
  		function sequenceClose(code) {
  			if (code === marker) {
  				size++;
  				effects.consume(code);
  				return sequenceClose;
  			}
  			if (size >= sizeOpen) {
  				effects.exit("codeFencedFenceSequence");
  				return markdownSpace(code) ? factorySpace(effects, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
  			}
  			return nok(code);
  		}
  		/**
  		* After closing fence sequence, after optional whitespace.
  		*
  		* ```markdown
  		*   | ~~~js
  		*   | alert(1)
  		* > | ~~~
  		*        ^
  		* ```
  		*
  		* @type {State}
  		*/
  		function sequenceCloseAfter(code) {
  			if (code === null || markdownLineEnding(code)) {
  				effects.exit("codeFencedFence");
  				return ok(code);
  			}
  			return nok(code);
  		}
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeNonLazyContinuation(effects, ok, nok) {
  	const self = this;
  	return start;
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		if (code === null) return nok(code);
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return lineStart;
  	}
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function lineStart(code) {
  		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/code-indented.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var codeIndented = {
  	name: "codeIndented",
  	tokenize: tokenizeCodeIndented
  };
  /** @type {Construct} */
  var furtherStart = {
  	partial: true,
  	tokenize: tokenizeFurtherStart
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeCodeIndented(effects, ok, nok) {
  	const self = this;
  	return start;
  	/**
  	* Start of code (indented).
  	*
  	* > **Parsing note**: it is not needed to check if this first line is a
  	* > filled line (that it has a non-whitespace character), because blank lines
  	* > are parsed already, so we never run into that.
  	*
  	* ```markdown
  	* > |     aaa
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("codeIndented");
  		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
  	}
  	/**
  	* At start, after 1 or 4 spaces.
  	*
  	* ```markdown
  	* > |     aaa
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function afterPrefix(code) {
  		const tail = self.events[self.events.length - 1];
  		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
  	}
  	/**
  	* At a break.
  	*
  	* ```markdown
  	* > |     aaa
  	*         ^  ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function atBreak(code) {
  		if (code === null) return after(code);
  		if (markdownLineEnding(code)) return effects.attempt(furtherStart, atBreak, after)(code);
  		effects.enter("codeFlowValue");
  		return inside(code);
  	}
  	/**
  	* In code content.
  	*
  	* ```markdown
  	* > |     aaa
  	*         ^^^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function inside(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("codeFlowValue");
  			return atBreak(code);
  		}
  		effects.consume(code);
  		return inside;
  	}
  	/** @type {State} */
  	function after(code) {
  		effects.exit("codeIndented");
  		return ok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeFurtherStart(effects, ok, nok) {
  	const self = this;
  	return furtherStart;
  	/**
  	* At eol, trying to parse another indent.
  	*
  	* ```markdown
  	* > |     aaa
  	*            ^
  	*   |     bbb
  	* ```
  	*
  	* @type {State}
  	*/
  	function furtherStart(code) {
  		if (self.parser.lazy[self.now().line]) return nok(code);
  		if (markdownLineEnding(code)) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			return furtherStart;
  		}
  		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
  	}
  	/**
  	* At start, after 1 or 4 spaces.
  	*
  	* ```markdown
  	* > |     aaa
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function afterPrefix(code) {
  		const tail = self.events[self.events.length - 1];
  		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? furtherStart(code) : nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/code-text.js
  /**
  * @import {
  *   Construct,
  *   Previous,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer,
  *   Token
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var codeText = {
  	name: "codeText",
  	previous,
  	resolve: resolveCodeText,
  	tokenize: tokenizeCodeText
  };
  /** @type {Resolver} */
  function resolveCodeText(events) {
  	let tailExitIndex = events.length - 4;
  	let headEnterIndex = 3;
  	/** @type {number} */
  	let index;
  	/** @type {number | undefined} */
  	let enter;
  	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
  		index = headEnterIndex;
  		while (++index < tailExitIndex) if (events[index][1].type === "codeTextData") {
  			events[headEnterIndex][1].type = "codeTextPadding";
  			events[tailExitIndex][1].type = "codeTextPadding";
  			headEnterIndex += 2;
  			tailExitIndex -= 2;
  			break;
  		}
  	}
  	index = headEnterIndex - 1;
  	tailExitIndex++;
  	while (++index <= tailExitIndex) if (enter === void 0) {
  		if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
  	} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
  		events[enter][1].type = "codeTextData";
  		if (index !== enter + 2) {
  			events[enter][1].end = events[index - 1][1].end;
  			events.splice(enter + 2, index - enter - 2);
  			tailExitIndex -= index - enter - 2;
  			index = enter + 2;
  		}
  		enter = void 0;
  	}
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Previous}
  */
  function previous(code) {
  	return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeCodeText(effects, ok, nok) {
  	let sizeOpen = 0;
  	/** @type {number} */
  	let size;
  	/** @type {Token} */
  	let token;
  	return start;
  	/**
  	* Start of code (text).
  	*
  	* ```markdown
  	* > | `a`
  	*     ^
  	* > | \`a`
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("codeText");
  		effects.enter("codeTextSequence");
  		return sequenceOpen(code);
  	}
  	/**
  	* In opening sequence.
  	*
  	* ```markdown
  	* > | `a`
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function sequenceOpen(code) {
  		if (code === 96) {
  			effects.consume(code);
  			sizeOpen++;
  			return sequenceOpen;
  		}
  		effects.exit("codeTextSequence");
  		return between(code);
  	}
  	/**
  	* Between something and something else.
  	*
  	* ```markdown
  	* > | `a`
  	*      ^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function between(code) {
  		if (code === null) return nok(code);
  		if (code === 32) {
  			effects.enter("space");
  			effects.consume(code);
  			effects.exit("space");
  			return between;
  		}
  		if (code === 96) {
  			token = effects.enter("codeTextSequence");
  			size = 0;
  			return sequenceClose(code);
  		}
  		if (markdownLineEnding(code)) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			return between;
  		}
  		effects.enter("codeTextData");
  		return data(code);
  	}
  	/**
  	* In data.
  	*
  	* ```markdown
  	* > | `a`
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function data(code) {
  		if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
  			effects.exit("codeTextData");
  			return between(code);
  		}
  		effects.consume(code);
  		return data;
  	}
  	/**
  	* In closing sequence.
  	*
  	* ```markdown
  	* > | `a`
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function sequenceClose(code) {
  		if (code === 96) {
  			effects.consume(code);
  			size++;
  			return sequenceClose;
  		}
  		if (size === sizeOpen) {
  			effects.exit("codeTextSequence");
  			effects.exit("codeText");
  			return ok(code);
  		}
  		token.type = "codeTextData";
  		return data(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/lib/splice-buffer.js
  /**
  * Some of the internal operations of micromark do lots of editing
  * operations on very large arrays. This runs into problems with two
  * properties of most circa-2020 JavaScript interpreters:
  *
  *  - Array-length modifications at the high end of an array (push/pop) are
  *    expected to be common and are implemented in (amortized) time
  *    proportional to the number of elements added or removed, whereas
  *    other operations (shift/unshift and splice) are much less efficient.
  *  - Function arguments are passed on the stack, so adding tens of thousands
  *    of elements to an array with `arr.push(...newElements)` will frequently
  *    cause stack overflows. (see <https://stackoverflow.com/questions/22123769/rangeerror-maximum-call-stack-size-exceeded-why>)
  *
  * SpliceBuffers are an implementation of gap buffers, which are a
  * generalization of the "queue made of two stacks" idea. The splice buffer
  * maintains a cursor, and moving the cursor has cost proportional to the
  * distance the cursor moves, but inserting, deleting, or splicing in
  * new information at the cursor is as efficient as the push/pop operation.
  * This allows for an efficient sequence of splices (or pushes, pops, shifts,
  * or unshifts) as long such edits happen at the same part of the array or
  * generally sweep through the array from the beginning to the end.
  *
  * The interface for splice buffers also supports large numbers of inputs by
  * passing a single array argument rather passing multiple arguments on the
  * function call stack.
  *
  * @template T
  *   Item type.
  */
  var SpliceBuffer = class {
  	/**
  	* @param {ReadonlyArray<T> | null | undefined} [initial]
  	*   Initial items (optional).
  	* @returns
  	*   Splice buffer.
  	*/
  	constructor(initial) {
  		/** @type {Array<T>} */
  		this.left = initial ? [...initial] : [];
  		/** @type {Array<T>} */
  		this.right = [];
  	}
  	/**
  	* Array access;
  	* does not move the cursor.
  	*
  	* @param {number} index
  	*   Index.
  	* @return {T}
  	*   Item.
  	*/
  	get(index) {
  		if (index < 0 || index >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + index + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
  		if (index < this.left.length) return this.left[index];
  		return this.right[this.right.length - index + this.left.length - 1];
  	}
  	/**
  	* The length of the splice buffer, one greater than the largest index in the
  	* array.
  	*/
  	get length() {
  		return this.left.length + this.right.length;
  	}
  	/**
  	* Remove and return `list[0]`;
  	* moves the cursor to `0`.
  	*
  	* @returns {T | undefined}
  	*   Item, optional.
  	*/
  	shift() {
  		this.setCursor(0);
  		return this.right.pop();
  	}
  	/**
  	* Slice the buffer to get an array;
  	* does not move the cursor.
  	*
  	* @param {number} start
  	*   Start.
  	* @param {number | null | undefined} [end]
  	*   End (optional).
  	* @returns {Array<T>}
  	*   Array of items.
  	*/
  	slice(start, end) {
  		/** @type {number} */
  		const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
  		if (stop < this.left.length) return this.left.slice(start, stop);
  		if (start > this.left.length) return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
  		return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
  	}
  	/**
  	* Mimics the behavior of Array.prototype.splice() except for the change of
  	* interface necessary to avoid segfaults when patching in very large arrays.
  	*
  	* This operation moves cursor is moved to `start` and results in the cursor
  	* placed after any inserted items.
  	*
  	* @param {number} start
  	*   Start;
  	*   zero-based index at which to start changing the array;
  	*   negative numbers count backwards from the end of the array and values
  	*   that are out-of bounds are clamped to the appropriate end of the array.
  	* @param {number | null | undefined} [deleteCount=0]
  	*   Delete count (default: `0`);
  	*   maximum number of elements to delete, starting from start.
  	* @param {Array<T> | null | undefined} [items=[]]
  	*   Items to include in place of the deleted items (default: `[]`).
  	* @return {Array<T>}
  	*   Any removed items.
  	*/
  	splice(start, deleteCount, items) {
  		/** @type {number} */
  		const count = deleteCount || 0;
  		this.setCursor(Math.trunc(start));
  		const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
  		if (items) chunkedPush(this.left, items);
  		return removed.reverse();
  	}
  	/**
  	* Remove and return the highest-numbered item in the array, so
  	* `list[list.length - 1]`;
  	* Moves the cursor to `length`.
  	*
  	* @returns {T | undefined}
  	*   Item, optional.
  	*/
  	pop() {
  		this.setCursor(Number.POSITIVE_INFINITY);
  		return this.left.pop();
  	}
  	/**
  	* Inserts a single item to the high-numbered side of the array;
  	* moves the cursor to `length`.
  	*
  	* @param {T} item
  	*   Item.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	push(item) {
  		this.setCursor(Number.POSITIVE_INFINITY);
  		this.left.push(item);
  	}
  	/**
  	* Inserts many items to the high-numbered side of the array.
  	* Moves the cursor to `length`.
  	*
  	* @param {Array<T>} items
  	*   Items.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	pushMany(items) {
  		this.setCursor(Number.POSITIVE_INFINITY);
  		chunkedPush(this.left, items);
  	}
  	/**
  	* Inserts a single item to the low-numbered side of the array;
  	* Moves the cursor to `0`.
  	*
  	* @param {T} item
  	*   Item.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	unshift(item) {
  		this.setCursor(0);
  		this.right.push(item);
  	}
  	/**
  	* Inserts many items to the low-numbered side of the array;
  	* moves the cursor to `0`.
  	*
  	* @param {Array<T>} items
  	*   Items.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	unshiftMany(items) {
  		this.setCursor(0);
  		chunkedPush(this.right, items.reverse());
  	}
  	/**
  	* Move the cursor to a specific position in the array. Requires
  	* time proportional to the distance moved.
  	*
  	* If `n < 0`, the cursor will end up at the beginning.
  	* If `n > length`, the cursor will end up at the end.
  	*
  	* @param {number} n
  	*   Position.
  	* @return {undefined}
  	*   Nothing.
  	*/
  	setCursor(n) {
  		if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
  		if (n < this.left.length) {
  			const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
  			chunkedPush(this.right, removed.reverse());
  		} else {
  			const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
  			chunkedPush(this.left, removed.reverse());
  		}
  	}
  };
  /**
  * Avoid stack overflow by pushing items onto the stack in segments
  *
  * @template T
  *   Item type.
  * @param {Array<T>} list
  *   List to inject into.
  * @param {ReadonlyArray<T>} right
  *   Items to inject.
  * @return {undefined}
  *   Nothing.
  */
  function chunkedPush(list, right) {
  	/** @type {number} */
  	let chunkStart = 0;
  	if (right.length < 1e4) list.push(...right);
  	else while (chunkStart < right.length) {
  		list.push(...right.slice(chunkStart, chunkStart + 1e4));
  		chunkStart += 1e4;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-subtokenize@2.1.0/node_modules/micromark-util-subtokenize/index.js
  /**
  * @import {Chunk, Event, Token} from 'micromark-util-types'
  */
  /**
  * Tokenize subcontent.
  *
  * @param {Array<Event>} eventsArray
  *   List of events.
  * @returns {boolean}
  *   Whether subtokens were found.
  */
  function subtokenize(eventsArray) {
  	/** @type {Record<string, number>} */
  	const jumps = {};
  	let index = -1;
  	/** @type {Event} */
  	let event;
  	/** @type {number | undefined} */
  	let lineIndex;
  	/** @type {number} */
  	let otherIndex;
  	/** @type {Event} */
  	let otherEvent;
  	/** @type {Array<Event>} */
  	let parameters;
  	/** @type {Array<Event>} */
  	let subevents;
  	/** @type {boolean | undefined} */
  	let more;
  	const events = new SpliceBuffer(eventsArray);
  	while (++index < events.length) {
  		while (index in jumps) index = jumps[index];
  		event = events.get(index);
  		if (index && event[1].type === "chunkFlow" && events.get(index - 1)[1].type === "listItemPrefix") {
  			subevents = event[1]._tokenizer.events;
  			otherIndex = 0;
  			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
  			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
  				if (subevents[otherIndex][1].type === "content") break;
  				if (subevents[otherIndex][1].type === "chunkText") {
  					subevents[otherIndex][1]._isInFirstContentOfListItem = true;
  					otherIndex++;
  				}
  			}
  		}
  		if (event[0] === "enter") {
  			if (event[1].contentType) {
  				Object.assign(jumps, subcontent(events, index));
  				index = jumps[index];
  				more = true;
  			}
  		} else if (event[1]._container) {
  			otherIndex = index;
  			lineIndex = void 0;
  			while (otherIndex--) {
  				otherEvent = events.get(otherIndex);
  				if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
  					if (otherEvent[0] === "enter") {
  						if (lineIndex) events.get(lineIndex)[1].type = "lineEndingBlank";
  						otherEvent[1].type = "lineEnding";
  						lineIndex = otherIndex;
  					}
  				} else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {} else break;
  			}
  			if (lineIndex) {
  				event[1].end = { ...events.get(lineIndex)[1].start };
  				parameters = events.slice(lineIndex, index);
  				parameters.unshift(event);
  				events.splice(lineIndex, index - lineIndex + 1, parameters);
  			}
  		}
  	}
  	splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
  	return !more;
  }
  /**
  * Tokenize embedded tokens.
  *
  * @param {SpliceBuffer<Event>} events
  *   Events.
  * @param {number} eventIndex
  *   Index.
  * @returns {Record<string, number>}
  *   Gaps.
  */
  function subcontent(events, eventIndex) {
  	const token = events.get(eventIndex)[1];
  	const context = events.get(eventIndex)[2];
  	let startPosition = eventIndex - 1;
  	/** @type {Array<number>} */
  	const startPositions = [];
  	let tokenizer = token._tokenizer;
  	if (!tokenizer) {
  		tokenizer = context.parser[token.contentType](token.start);
  		if (token._contentTypeTextTrailing) tokenizer._contentTypeTextTrailing = true;
  	}
  	const childEvents = tokenizer.events;
  	/** @type {Array<[number, number]>} */
  	const jumps = [];
  	/** @type {Record<string, number>} */
  	const gaps = {};
  	/** @type {Array<Chunk>} */
  	let stream;
  	/** @type {Token | undefined} */
  	let previous;
  	let index = -1;
  	/** @type {Token | undefined} */
  	let current = token;
  	let adjust = 0;
  	let start = 0;
  	const breaks = [start];
  	while (current) {
  		while (events.get(++startPosition)[1] !== current);
  		startPositions.push(startPosition);
  		if (!current._tokenizer) {
  			stream = context.sliceStream(current);
  			if (!current.next) stream.push(null);
  			if (previous) tokenizer.defineSkip(current.start);
  			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
  			tokenizer.write(stream);
  			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
  		}
  		previous = current;
  		current = current.next;
  	}
  	current = token;
  	while (++index < childEvents.length) if (childEvents[index][0] === "exit" && childEvents[index - 1][0] === "enter" && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
  		start = index + 1;
  		breaks.push(start);
  		current._tokenizer = void 0;
  		current.previous = void 0;
  		current = current.next;
  	}
  	tokenizer.events = [];
  	if (current) {
  		current._tokenizer = void 0;
  		current.previous = void 0;
  	} else breaks.pop();
  	index = breaks.length;
  	while (index--) {
  		const slice = childEvents.slice(breaks[index], breaks[index + 1]);
  		const start = startPositions.pop();
  		jumps.push([start, start + slice.length - 1]);
  		events.splice(start, 2, slice);
  	}
  	jumps.reverse();
  	index = -1;
  	while (++index < jumps.length) {
  		gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
  		adjust += jumps[index][1] - jumps[index][0] - 1;
  	}
  	return gaps;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/content.js
  /**
  * @import {
  *   Construct,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer,
  *   Token
  * } from 'micromark-util-types'
  */
  /**
  * No name because it must not be turned off.
  * @type {Construct}
  */
  var content = {
  	resolve: resolveContent,
  	tokenize: tokenizeContent
  };
  /** @type {Construct} */
  var continuationConstruct = {
  	partial: true,
  	tokenize: tokenizeContinuation
  };
  /**
  * Content is transparent: it’s parsed right now. That way, definitions are also
  * parsed right now: before text in paragraphs (specifically, media) are parsed.
  *
  * @type {Resolver}
  */
  function resolveContent(events) {
  	subtokenize(events);
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeContent(effects, ok) {
  	/** @type {Token | undefined} */
  	let previous;
  	return chunkStart;
  	/**
  	* Before a content chunk.
  	*
  	* ```markdown
  	* > | abc
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function chunkStart(code) {
  		effects.enter("content");
  		previous = effects.enter("chunkContent", { contentType: "content" });
  		return chunkInside(code);
  	}
  	/**
  	* In a content chunk.
  	*
  	* ```markdown
  	* > | abc
  	*     ^^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function chunkInside(code) {
  		if (code === null) return contentEnd(code);
  		if (markdownLineEnding(code)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
  		effects.consume(code);
  		return chunkInside;
  	}
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function contentEnd(code) {
  		effects.exit("chunkContent");
  		effects.exit("content");
  		return ok(code);
  	}
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function contentContinue(code) {
  		effects.consume(code);
  		effects.exit("chunkContent");
  		previous.next = effects.enter("chunkContent", {
  			contentType: "content",
  			previous
  		});
  		previous = previous.next;
  		return chunkInside;
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeContinuation(effects, ok, nok) {
  	const self = this;
  	return startLookahead;
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function startLookahead(code) {
  		effects.exit("chunkContent");
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return factorySpace(effects, prefixed, "linePrefix");
  	}
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function prefixed(code) {
  		if (code === null || markdownLineEnding(code)) return nok(code);
  		const tail = self.events[self.events.length - 1];
  		if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok(code);
  		return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-factory-destination@2.0.1/node_modules/micromark-factory-destination/index.js
  /**
  * @import {Effects, State, TokenType} from 'micromark-util-types'
  */
  /**
  * Parse destinations.
  *
  * ###### Examples
  *
  * ```markdown
  * <a>
  * <a\>b>
  * <a b>
  * <a)>
  * a
  * a\)b
  * a(b)c
  * a(b)
  * ```
  *
  * @param {Effects} effects
  *   Context.
  * @param {State} ok
  *   State switched to when successful.
  * @param {State} nok
  *   State switched to when unsuccessful.
  * @param {TokenType} type
  *   Type for whole (`<a>` or `b`).
  * @param {TokenType} literalType
  *   Type when enclosed (`<a>`).
  * @param {TokenType} literalMarkerType
  *   Type for enclosing (`<` and `>`).
  * @param {TokenType} rawType
  *   Type when not enclosed (`b`).
  * @param {TokenType} stringType
  *   Type for the value (`a` or `b`).
  * @param {number | undefined} [max=Infinity]
  *   Depth of nested parens (inclusive).
  * @returns {State}
  *   Start state.
  */
  function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  	const limit = max || Number.POSITIVE_INFINITY;
  	let balance = 0;
  	return start;
  	/**
  	* Start of destination.
  	*
  	* ```markdown
  	* > | <aa>
  	*     ^
  	* > | aa
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		if (code === 60) {
  			effects.enter(type);
  			effects.enter(literalType);
  			effects.enter(literalMarkerType);
  			effects.consume(code);
  			effects.exit(literalMarkerType);
  			return enclosedBefore;
  		}
  		if (code === null || code === 32 || code === 41 || asciiControl(code)) return nok(code);
  		effects.enter(type);
  		effects.enter(rawType);
  		effects.enter(stringType);
  		effects.enter("chunkString", { contentType: "string" });
  		return raw(code);
  	}
  	/**
  	* After `<`, at an enclosed destination.
  	*
  	* ```markdown
  	* > | <aa>
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function enclosedBefore(code) {
  		if (code === 62) {
  			effects.enter(literalMarkerType);
  			effects.consume(code);
  			effects.exit(literalMarkerType);
  			effects.exit(literalType);
  			effects.exit(type);
  			return ok;
  		}
  		effects.enter(stringType);
  		effects.enter("chunkString", { contentType: "string" });
  		return enclosed(code);
  	}
  	/**
  	* In enclosed destination.
  	*
  	* ```markdown
  	* > | <aa>
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function enclosed(code) {
  		if (code === 62) {
  			effects.exit("chunkString");
  			effects.exit(stringType);
  			return enclosedBefore(code);
  		}
  		if (code === null || code === 60 || markdownLineEnding(code)) return nok(code);
  		effects.consume(code);
  		return code === 92 ? enclosedEscape : enclosed;
  	}
  	/**
  	* After `\`, at a special character.
  	*
  	* ```markdown
  	* > | <a\*a>
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function enclosedEscape(code) {
  		if (code === 60 || code === 62 || code === 92) {
  			effects.consume(code);
  			return enclosed;
  		}
  		return enclosed(code);
  	}
  	/**
  	* In raw destination.
  	*
  	* ```markdown
  	* > | aa
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function raw(code) {
  		if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
  			effects.exit("chunkString");
  			effects.exit(stringType);
  			effects.exit(rawType);
  			effects.exit(type);
  			return ok(code);
  		}
  		if (balance < limit && code === 40) {
  			effects.consume(code);
  			balance++;
  			return raw;
  		}
  		if (code === 41) {
  			effects.consume(code);
  			balance--;
  			return raw;
  		}
  		if (code === null || code === 32 || code === 40 || asciiControl(code)) return nok(code);
  		effects.consume(code);
  		return code === 92 ? rawEscape : raw;
  	}
  	/**
  	* After `\`, at special character.
  	*
  	* ```markdown
  	* > | a\*a
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function rawEscape(code) {
  		if (code === 40 || code === 41 || code === 92) {
  			effects.consume(code);
  			return raw;
  		}
  		return raw(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-factory-label@2.0.1/node_modules/micromark-factory-label/index.js
  /**
  * @import {
  *   Effects,
  *   State,
  *   TokenizeContext,
  *   TokenType
  * } from 'micromark-util-types'
  */
  /**
  * Parse labels.
  *
  * > 👉 **Note**: labels in markdown are capped at 999 characters in the string.
  *
  * ###### Examples
  *
  * ```markdown
  * [a]
  * [a
  * b]
  * [a\]b]
  * ```
  *
  * @this {TokenizeContext}
  *   Tokenize context.
  * @param {Effects} effects
  *   Context.
  * @param {State} ok
  *   State switched to when successful.
  * @param {State} nok
  *   State switched to when unsuccessful.
  * @param {TokenType} type
  *   Type of the whole label (`[a]`).
  * @param {TokenType} markerType
  *   Type for the markers (`[` and `]`).
  * @param {TokenType} stringType
  *   Type for the identifier (`a`).
  * @returns {State}
  *   Start state.
  */
  function factoryLabel(effects, ok, nok, type, markerType, stringType) {
  	const self = this;
  	let size = 0;
  	/** @type {boolean} */
  	let seen;
  	return start;
  	/**
  	* Start of label.
  	*
  	* ```markdown
  	* > | [a]
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter(type);
  		effects.enter(markerType);
  		effects.consume(code);
  		effects.exit(markerType);
  		effects.enter(stringType);
  		return atBreak;
  	}
  	/**
  	* In label, at something, before something else.
  	*
  	* ```markdown
  	* > | [a]
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function atBreak(code) {
  		if (size > 999 || code === null || code === 91 || code === 93 && !seen || 
  		/* c8 ignore next 3 */
  		code === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) return nok(code);
  		if (code === 93) {
  			effects.exit(stringType);
  			effects.enter(markerType);
  			effects.consume(code);
  			effects.exit(markerType);
  			effects.exit(type);
  			return ok;
  		}
  		if (markdownLineEnding(code)) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			return atBreak;
  		}
  		effects.enter("chunkString", { contentType: "string" });
  		return labelInside(code);
  	}
  	/**
  	* In label, in text.
  	*
  	* ```markdown
  	* > | [a]
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function labelInside(code) {
  		if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
  			effects.exit("chunkString");
  			return atBreak(code);
  		}
  		effects.consume(code);
  		if (!seen) seen = !markdownSpace(code);
  		return code === 92 ? labelEscape : labelInside;
  	}
  	/**
  	* After `\`, at a special character.
  	*
  	* ```markdown
  	* > | [a\*a]
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function labelEscape(code) {
  		if (code === 91 || code === 92 || code === 93) {
  			effects.consume(code);
  			size++;
  			return labelInside;
  		}
  		return labelInside(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-factory-title@2.0.1/node_modules/micromark-factory-title/index.js
  /**
  * @import {
  *   Code,
  *   Effects,
  *   State,
  *   TokenType
  * } from 'micromark-util-types'
  */
  /**
  * Parse titles.
  *
  * ###### Examples
  *
  * ```markdown
  * "a"
  * 'b'
  * (c)
  * "a
  * b"
  * 'a
  *     b'
  * (a\)b)
  * ```
  *
  * @param {Effects} effects
  *   Context.
  * @param {State} ok
  *   State switched to when successful.
  * @param {State} nok
  *   State switched to when unsuccessful.
  * @param {TokenType} type
  *   Type of the whole title (`"a"`, `'b'`, `(c)`).
  * @param {TokenType} markerType
  *   Type for the markers (`"`, `'`, `(`, and `)`).
  * @param {TokenType} stringType
  *   Type for the value (`a`).
  * @returns {State}
  *   Start state.
  */
  function factoryTitle(effects, ok, nok, type, markerType, stringType) {
  	/** @type {NonNullable<Code>} */
  	let marker;
  	return start;
  	/**
  	* Start of title.
  	*
  	* ```markdown
  	* > | "a"
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		if (code === 34 || code === 39 || code === 40) {
  			effects.enter(type);
  			effects.enter(markerType);
  			effects.consume(code);
  			effects.exit(markerType);
  			marker = code === 40 ? 41 : code;
  			return begin;
  		}
  		return nok(code);
  	}
  	/**
  	* After opening marker.
  	*
  	* This is also used at the closing marker.
  	*
  	* ```markdown
  	* > | "a"
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function begin(code) {
  		if (code === marker) {
  			effects.enter(markerType);
  			effects.consume(code);
  			effects.exit(markerType);
  			effects.exit(type);
  			return ok;
  		}
  		effects.enter(stringType);
  		return atBreak(code);
  	}
  	/**
  	* At something, before something else.
  	*
  	* ```markdown
  	* > | "a"
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function atBreak(code) {
  		if (code === marker) {
  			effects.exit(stringType);
  			return begin(marker);
  		}
  		if (code === null) return nok(code);
  		if (markdownLineEnding(code)) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			return factorySpace(effects, atBreak, "linePrefix");
  		}
  		effects.enter("chunkString", { contentType: "string" });
  		return inside(code);
  	}
  	/**
  	*
  	*
  	* @type {State}
  	*/
  	function inside(code) {
  		if (code === marker || code === null || markdownLineEnding(code)) {
  			effects.exit("chunkString");
  			return atBreak(code);
  		}
  		effects.consume(code);
  		return code === 92 ? escape : inside;
  	}
  	/**
  	* After `\`, at a special character.
  	*
  	* ```markdown
  	* > | "a\*b"
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function escape(code) {
  		if (code === marker || code === 92) {
  			effects.consume(code);
  			return inside;
  		}
  		return inside(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-factory-whitespace@2.0.1/node_modules/micromark-factory-whitespace/index.js
  /**
  * @import {Effects, State} from 'micromark-util-types'
  */
  /**
  * Parse spaces and tabs.
  *
  * There is no `nok` parameter:
  *
  * *   line endings or spaces in markdown are often optional, in which case this
  *     factory can be used and `ok` will be switched to whether spaces were found
  *     or not
  * *   one line ending or space can be detected with
  *     `markdownLineEndingOrSpace(code)` right before using `factoryWhitespace`
  *
  * @param {Effects} effects
  *   Context.
  * @param {State} ok
  *   State switched to when successful.
  * @returns {State}
  *   Start state.
  */
  function factoryWhitespace(effects, ok) {
  	/** @type {boolean} */
  	let seen;
  	return start;
  	/** @type {State} */
  	function start(code) {
  		if (markdownLineEnding(code)) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			seen = true;
  			return start;
  		}
  		if (markdownSpace(code)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
  		return ok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/definition.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var definition$1 = {
  	name: "definition",
  	tokenize: tokenizeDefinition
  };
  /** @type {Construct} */
  var titleBefore = {
  	partial: true,
  	tokenize: tokenizeTitleBefore
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeDefinition(effects, ok, nok) {
  	const self = this;
  	/** @type {string} */
  	let identifier;
  	return start;
  	/**
  	* At start of a definition.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("definition");
  		return before(code);
  	}
  	/**
  	* After optional whitespace, at `[`.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function before(code) {
  		return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
  	}
  	/**
  	* After label.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function labelAfter(code) {
  		identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
  		if (code === 58) {
  			effects.enter("definitionMarker");
  			effects.consume(code);
  			effects.exit("definitionMarker");
  			return markerAfter;
  		}
  		return nok(code);
  	}
  	/**
  	* After marker.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function markerAfter(code) {
  		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
  	}
  	/**
  	* Before destination.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function destinationBefore(code) {
  		return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code);
  	}
  	/**
  	* After destination.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function destinationAfter(code) {
  		return effects.attempt(titleBefore, after, after)(code);
  	}
  	/**
  	* After definition.
  	*
  	* ```markdown
  	* > | [a]: b
  	*           ^
  	* > | [a]: b "c"
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
  	}
  	/**
  	* After definition, after optional whitespace.
  	*
  	* ```markdown
  	* > | [a]: b
  	*           ^
  	* > | [a]: b "c"
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function afterWhitespace(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("definition");
  			self.parser.defined.push(identifier);
  			return ok(code);
  		}
  		return nok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeTitleBefore(effects, ok, nok) {
  	return titleBefore;
  	/**
  	* After destination, at whitespace.
  	*
  	* ```markdown
  	* > | [a]: b
  	*           ^
  	* > | [a]: b "c"
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function titleBefore(code) {
  		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
  	}
  	/**
  	* At title.
  	*
  	* ```markdown
  	*   | [a]: b
  	* > | "c"
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function beforeMarker(code) {
  		return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
  	}
  	/**
  	* After title.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function titleAfter(code) {
  		return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
  	}
  	/**
  	* After title, after optional whitespace.
  	*
  	* ```markdown
  	* > | [a]: b "c"
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function titleAfterOptionalWhitespace(code) {
  		return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var hardBreakEscape = {
  	name: "hardBreakEscape",
  	tokenize: tokenizeHardBreakEscape
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeHardBreakEscape(effects, ok, nok) {
  	return start;
  	/**
  	* Start of a hard break (escape).
  	*
  	* ```markdown
  	* > | a\
  	*      ^
  	*   | b
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("hardBreakEscape");
  		effects.consume(code);
  		return after;
  	}
  	/**
  	* After `\`, at eol.
  	*
  	* ```markdown
  	* > | a\
  	*       ^
  	*   | b
  	* ```
  	*
  	*  @type {State}
  	*/
  	function after(code) {
  		if (markdownLineEnding(code)) {
  			effects.exit("hardBreakEscape");
  			return ok(code);
  		}
  		return nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/heading-atx.js
  /**
  * @import {
  *   Construct,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer,
  *   Token
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var headingAtx = {
  	name: "headingAtx",
  	resolve: resolveHeadingAtx,
  	tokenize: tokenizeHeadingAtx
  };
  /** @type {Resolver} */
  function resolveHeadingAtx(events, context) {
  	let contentEnd = events.length - 2;
  	let contentStart = 3;
  	/** @type {Token} */
  	let content;
  	/** @type {Token} */
  	let text;
  	if (events[contentStart][1].type === "whitespace") contentStart += 2;
  	if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
  	if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  	if (contentEnd > contentStart) {
  		content = {
  			type: "atxHeadingText",
  			start: events[contentStart][1].start,
  			end: events[contentEnd][1].end
  		};
  		text = {
  			type: "chunkText",
  			start: events[contentStart][1].start,
  			end: events[contentEnd][1].end,
  			contentType: "text"
  		};
  		splice(events, contentStart, contentEnd - contentStart + 1, [
  			[
  				"enter",
  				content,
  				context
  			],
  			[
  				"enter",
  				text,
  				context
  			],
  			[
  				"exit",
  				text,
  				context
  			],
  			[
  				"exit",
  				content,
  				context
  			]
  		]);
  	}
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeHeadingAtx(effects, ok, nok) {
  	let size = 0;
  	return start;
  	/**
  	* Start of a heading (atx).
  	*
  	* ```markdown
  	* > | ## aa
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("atxHeading");
  		return before(code);
  	}
  	/**
  	* After optional whitespace, at `#`.
  	*
  	* ```markdown
  	* > | ## aa
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function before(code) {
  		effects.enter("atxHeadingSequence");
  		return sequenceOpen(code);
  	}
  	/**
  	* In opening sequence.
  	*
  	* ```markdown
  	* > | ## aa
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function sequenceOpen(code) {
  		if (code === 35 && size++ < 6) {
  			effects.consume(code);
  			return sequenceOpen;
  		}
  		if (code === null || markdownLineEndingOrSpace(code)) {
  			effects.exit("atxHeadingSequence");
  			return atBreak(code);
  		}
  		return nok(code);
  	}
  	/**
  	* After something, before something else.
  	*
  	* ```markdown
  	* > | ## aa
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function atBreak(code) {
  		if (code === 35) {
  			effects.enter("atxHeadingSequence");
  			return sequenceFurther(code);
  		}
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("atxHeading");
  			return ok(code);
  		}
  		if (markdownSpace(code)) return factorySpace(effects, atBreak, "whitespace")(code);
  		effects.enter("atxHeadingText");
  		return data(code);
  	}
  	/**
  	* In further sequence (after whitespace).
  	*
  	* Could be normal “visible” hashes in the heading or a final sequence.
  	*
  	* ```markdown
  	* > | ## aa ##
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function sequenceFurther(code) {
  		if (code === 35) {
  			effects.consume(code);
  			return sequenceFurther;
  		}
  		effects.exit("atxHeadingSequence");
  		return atBreak(code);
  	}
  	/**
  	* In text.
  	*
  	* ```markdown
  	* > | ## aa
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function data(code) {
  		if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
  			effects.exit("atxHeadingText");
  			return atBreak(code);
  		}
  		effects.consume(code);
  		return data;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-html-tag-name@2.0.1/node_modules/micromark-util-html-tag-name/index.js
  /**
  * List of lowercase HTML “block” tag names.
  *
  * The list, when parsing HTML (flow), results in more relaxed rules (condition
  * 6).
  * Because they are known blocks, the HTML-like syntax doesn’t have to be
  * strictly parsed.
  * For tag names not in this list, a more strict algorithm (condition 7) is used
  * to detect whether the HTML-like syntax is seen as HTML (flow) or not.
  *
  * This is copied from:
  * <https://spec.commonmark.org/0.30/#html-blocks>.
  *
  * > 👉 **Note**: `search` was added in `CommonMark@0.31`.
  */
  var htmlBlockNames = [
  	"address",
  	"article",
  	"aside",
  	"base",
  	"basefont",
  	"blockquote",
  	"body",
  	"caption",
  	"center",
  	"col",
  	"colgroup",
  	"dd",
  	"details",
  	"dialog",
  	"dir",
  	"div",
  	"dl",
  	"dt",
  	"fieldset",
  	"figcaption",
  	"figure",
  	"footer",
  	"form",
  	"frame",
  	"frameset",
  	"h1",
  	"h2",
  	"h3",
  	"h4",
  	"h5",
  	"h6",
  	"head",
  	"header",
  	"hr",
  	"html",
  	"iframe",
  	"legend",
  	"li",
  	"link",
  	"main",
  	"menu",
  	"menuitem",
  	"nav",
  	"noframes",
  	"ol",
  	"optgroup",
  	"option",
  	"p",
  	"param",
  	"search",
  	"section",
  	"summary",
  	"table",
  	"tbody",
  	"td",
  	"tfoot",
  	"th",
  	"thead",
  	"title",
  	"tr",
  	"track",
  	"ul"
  ];
  /**
  * List of lowercase HTML “raw” tag names.
  *
  * The list, when parsing HTML (flow), results in HTML that can include lines
  * without exiting, until a closing tag also in this list is found (condition
  * 1).
  *
  * This module is copied from:
  * <https://spec.commonmark.org/0.30/#html-blocks>.
  *
  * > 👉 **Note**: `textarea` was added in `CommonMark@0.30`.
  */
  var htmlRawNames = [
  	"pre",
  	"script",
  	"style",
  	"textarea"
  ];
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/html-flow.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var htmlFlow = {
  	concrete: true,
  	name: "htmlFlow",
  	resolveTo: resolveToHtmlFlow,
  	tokenize: tokenizeHtmlFlow
  };
  /** @type {Construct} */
  var blankLineBefore = {
  	partial: true,
  	tokenize: tokenizeBlankLineBefore
  };
  var nonLazyContinuationStart = {
  	partial: true,
  	tokenize: tokenizeNonLazyContinuationStart
  };
  /** @type {Resolver} */
  function resolveToHtmlFlow(events) {
  	let index = events.length;
  	while (index--) if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") break;
  	if (index > 1 && events[index - 2][1].type === "linePrefix") {
  		events[index][1].start = events[index - 2][1].start;
  		events[index + 1][1].start = events[index - 2][1].start;
  		events.splice(index - 2, 2);
  	}
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeHtmlFlow(effects, ok, nok) {
  	const self = this;
  	/** @type {number} */
  	let marker;
  	/** @type {boolean} */
  	let closingTag;
  	/** @type {string} */
  	let buffer;
  	/** @type {number} */
  	let index;
  	/** @type {Code} */
  	let markerB;
  	return start;
  	/**
  	* Start of HTML (flow).
  	*
  	* ```markdown
  	* > | <x />
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		return before(code);
  	}
  	/**
  	* At `<`, after optional whitespace.
  	*
  	* ```markdown
  	* > | <x />
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function before(code) {
  		effects.enter("htmlFlow");
  		effects.enter("htmlFlowData");
  		effects.consume(code);
  		return open;
  	}
  	/**
  	* After `<`, at tag name or other stuff.
  	*
  	* ```markdown
  	* > | <x />
  	*      ^
  	* > | <!doctype>
  	*      ^
  	* > | <!--xxx-->
  	*      ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function open(code) {
  		if (code === 33) {
  			effects.consume(code);
  			return declarationOpen;
  		}
  		if (code === 47) {
  			effects.consume(code);
  			closingTag = true;
  			return tagCloseStart;
  		}
  		if (code === 63) {
  			effects.consume(code);
  			marker = 3;
  			return self.interrupt ? ok : continuationDeclarationInside;
  		}
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			buffer = String.fromCharCode(code);
  			return tagName;
  		}
  		return nok(code);
  	}
  	/**
  	* After `<!`, at declaration, comment, or CDATA.
  	*
  	* ```markdown
  	* > | <!doctype>
  	*       ^
  	* > | <!--xxx-->
  	*       ^
  	* > | <![CDATA[>&<]]>
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function declarationOpen(code) {
  		if (code === 45) {
  			effects.consume(code);
  			marker = 2;
  			return commentOpenInside;
  		}
  		if (code === 91) {
  			effects.consume(code);
  			marker = 5;
  			index = 0;
  			return cdataOpenInside;
  		}
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			marker = 4;
  			return self.interrupt ? ok : continuationDeclarationInside;
  		}
  		return nok(code);
  	}
  	/**
  	* After `<!-`, inside a comment, at another `-`.
  	*
  	* ```markdown
  	* > | <!--xxx-->
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function commentOpenInside(code) {
  		if (code === 45) {
  			effects.consume(code);
  			return self.interrupt ? ok : continuationDeclarationInside;
  		}
  		return nok(code);
  	}
  	/**
  	* After `<![`, inside CDATA, expecting `CDATA[`.
  	*
  	* ```markdown
  	* > | <![CDATA[>&<]]>
  	*        ^^^^^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function cdataOpenInside(code) {
  		if (code === "CDATA[".charCodeAt(index++)) {
  			effects.consume(code);
  			if (index === 6) return self.interrupt ? ok : continuation;
  			return cdataOpenInside;
  		}
  		return nok(code);
  	}
  	/**
  	* After `</`, in closing tag, at tag name.
  	*
  	* ```markdown
  	* > | </x>
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagCloseStart(code) {
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			buffer = String.fromCharCode(code);
  			return tagName;
  		}
  		return nok(code);
  	}
  	/**
  	* In tag name.
  	*
  	* ```markdown
  	* > | <ab>
  	*      ^^
  	* > | </ab>
  	*       ^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagName(code) {
  		if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
  			const slash = code === 47;
  			const name = buffer.toLowerCase();
  			if (!slash && !closingTag && htmlRawNames.includes(name)) {
  				marker = 1;
  				return self.interrupt ? ok(code) : continuation(code);
  			}
  			if (htmlBlockNames.includes(buffer.toLowerCase())) {
  				marker = 6;
  				if (slash) {
  					effects.consume(code);
  					return basicSelfClosing;
  				}
  				return self.interrupt ? ok(code) : continuation(code);
  			}
  			marker = 7;
  			return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
  		}
  		if (code === 45 || asciiAlphanumeric(code)) {
  			effects.consume(code);
  			buffer += String.fromCharCode(code);
  			return tagName;
  		}
  		return nok(code);
  	}
  	/**
  	* After closing slash of a basic tag name.
  	*
  	* ```markdown
  	* > | <div/>
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function basicSelfClosing(code) {
  		if (code === 62) {
  			effects.consume(code);
  			return self.interrupt ? ok : continuation;
  		}
  		return nok(code);
  	}
  	/**
  	* After closing slash of a complete tag name.
  	*
  	* ```markdown
  	* > | <x/>
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeClosingTagAfter(code) {
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return completeClosingTagAfter;
  		}
  		return completeEnd(code);
  	}
  	/**
  	* At an attribute name.
  	*
  	* At first, this state is used after a complete tag name, after whitespace,
  	* where it expects optional attributes or the end of the tag.
  	* It is also reused after attributes, when expecting more optional
  	* attributes.
  	*
  	* ```markdown
  	* > | <a />
  	*        ^
  	* > | <a :b>
  	*        ^
  	* > | <a _b>
  	*        ^
  	* > | <a b>
  	*        ^
  	* > | <a >
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeNameBefore(code) {
  		if (code === 47) {
  			effects.consume(code);
  			return completeEnd;
  		}
  		if (code === 58 || code === 95 || asciiAlpha(code)) {
  			effects.consume(code);
  			return completeAttributeName;
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return completeAttributeNameBefore;
  		}
  		return completeEnd(code);
  	}
  	/**
  	* In attribute name.
  	*
  	* ```markdown
  	* > | <a :b>
  	*         ^
  	* > | <a _b>
  	*         ^
  	* > | <a b>
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeName(code) {
  		if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
  			effects.consume(code);
  			return completeAttributeName;
  		}
  		return completeAttributeNameAfter(code);
  	}
  	/**
  	* After attribute name, at an optional initializer, the end of the tag, or
  	* whitespace.
  	*
  	* ```markdown
  	* > | <a b>
  	*         ^
  	* > | <a b=c>
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeNameAfter(code) {
  		if (code === 61) {
  			effects.consume(code);
  			return completeAttributeValueBefore;
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return completeAttributeNameAfter;
  		}
  		return completeAttributeNameBefore(code);
  	}
  	/**
  	* Before unquoted, double quoted, or single quoted attribute value, allowing
  	* whitespace.
  	*
  	* ```markdown
  	* > | <a b=c>
  	*          ^
  	* > | <a b="c">
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeValueBefore(code) {
  		if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
  		if (code === 34 || code === 39) {
  			effects.consume(code);
  			markerB = code;
  			return completeAttributeValueQuoted;
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return completeAttributeValueBefore;
  		}
  		return completeAttributeValueUnquoted(code);
  	}
  	/**
  	* In double or single quoted attribute value.
  	*
  	* ```markdown
  	* > | <a b="c">
  	*           ^
  	* > | <a b='c'>
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeValueQuoted(code) {
  		if (code === markerB) {
  			effects.consume(code);
  			markerB = null;
  			return completeAttributeValueQuotedAfter;
  		}
  		if (code === null || markdownLineEnding(code)) return nok(code);
  		effects.consume(code);
  		return completeAttributeValueQuoted;
  	}
  	/**
  	* In unquoted attribute value.
  	*
  	* ```markdown
  	* > | <a b=c>
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeValueUnquoted(code) {
  		if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) return completeAttributeNameAfter(code);
  		effects.consume(code);
  		return completeAttributeValueUnquoted;
  	}
  	/**
  	* After double or single quoted attribute value, before whitespace or the
  	* end of the tag.
  	*
  	* ```markdown
  	* > | <a b="c">
  	*            ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAttributeValueQuotedAfter(code) {
  		if (code === 47 || code === 62 || markdownSpace(code)) return completeAttributeNameBefore(code);
  		return nok(code);
  	}
  	/**
  	* In certain circumstances of a complete tag where only an `>` is allowed.
  	*
  	* ```markdown
  	* > | <a b="c">
  	*             ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeEnd(code) {
  		if (code === 62) {
  			effects.consume(code);
  			return completeAfter;
  		}
  		return nok(code);
  	}
  	/**
  	* After `>` in a complete tag.
  	*
  	* ```markdown
  	* > | <x>
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function completeAfter(code) {
  		if (code === null || markdownLineEnding(code)) return continuation(code);
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return completeAfter;
  		}
  		return nok(code);
  	}
  	/**
  	* In continuation of any HTML kind.
  	*
  	* ```markdown
  	* > | <!--xxx-->
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuation(code) {
  		if (code === 45 && marker === 2) {
  			effects.consume(code);
  			return continuationCommentInside;
  		}
  		if (code === 60 && marker === 1) {
  			effects.consume(code);
  			return continuationRawTagOpen;
  		}
  		if (code === 62 && marker === 4) {
  			effects.consume(code);
  			return continuationClose;
  		}
  		if (code === 63 && marker === 3) {
  			effects.consume(code);
  			return continuationDeclarationInside;
  		}
  		if (code === 93 && marker === 5) {
  			effects.consume(code);
  			return continuationCdataInside;
  		}
  		if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
  			effects.exit("htmlFlowData");
  			return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
  		}
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("htmlFlowData");
  			return continuationStart(code);
  		}
  		effects.consume(code);
  		return continuation;
  	}
  	/**
  	* In continuation, at eol.
  	*
  	* ```markdown
  	* > | <x>
  	*        ^
  	*   | asd
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationStart(code) {
  		return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
  	}
  	/**
  	* In continuation, at eol, before non-lazy content.
  	*
  	* ```markdown
  	* > | <x>
  	*        ^
  	*   | asd
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationStartNonLazy(code) {
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return continuationBefore;
  	}
  	/**
  	* In continuation, before non-lazy content.
  	*
  	* ```markdown
  	*   | <x>
  	* > | asd
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationBefore(code) {
  		if (code === null || markdownLineEnding(code)) return continuationStart(code);
  		effects.enter("htmlFlowData");
  		return continuation(code);
  	}
  	/**
  	* In comment continuation, after one `-`, expecting another.
  	*
  	* ```markdown
  	* > | <!--xxx-->
  	*             ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationCommentInside(code) {
  		if (code === 45) {
  			effects.consume(code);
  			return continuationDeclarationInside;
  		}
  		return continuation(code);
  	}
  	/**
  	* In raw continuation, after `<`, at `/`.
  	*
  	* ```markdown
  	* > | <script>console.log(1)<\/script>
  	*                            ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationRawTagOpen(code) {
  		if (code === 47) {
  			effects.consume(code);
  			buffer = "";
  			return continuationRawEndTag;
  		}
  		return continuation(code);
  	}
  	/**
  	* In raw continuation, after `</`, in a raw tag name.
  	*
  	* ```markdown
  	* > | <script>console.log(1)<\/script>
  	*                             ^^^^^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationRawEndTag(code) {
  		if (code === 62) {
  			const name = buffer.toLowerCase();
  			if (htmlRawNames.includes(name)) {
  				effects.consume(code);
  				return continuationClose;
  			}
  			return continuation(code);
  		}
  		if (asciiAlpha(code) && buffer.length < 8) {
  			effects.consume(code);
  			buffer += String.fromCharCode(code);
  			return continuationRawEndTag;
  		}
  		return continuation(code);
  	}
  	/**
  	* In cdata continuation, after `]`, expecting `]>`.
  	*
  	* ```markdown
  	* > | <![CDATA[>&<]]>
  	*                  ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationCdataInside(code) {
  		if (code === 93) {
  			effects.consume(code);
  			return continuationDeclarationInside;
  		}
  		return continuation(code);
  	}
  	/**
  	* In declaration or instruction continuation, at `>`.
  	*
  	* ```markdown
  	* > | <!-->
  	*         ^
  	* > | <?>
  	*       ^
  	* > | <!q>
  	*        ^
  	* > | <!--ab-->
  	*             ^
  	* > | <![CDATA[>&<]]>
  	*                   ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationDeclarationInside(code) {
  		if (code === 62) {
  			effects.consume(code);
  			return continuationClose;
  		}
  		if (code === 45 && marker === 2) {
  			effects.consume(code);
  			return continuationDeclarationInside;
  		}
  		return continuation(code);
  	}
  	/**
  	* In closed continuation: everything we get until the eol/eof is part of it.
  	*
  	* ```markdown
  	* > | <!doctype>
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationClose(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("htmlFlowData");
  			return continuationAfter(code);
  		}
  		effects.consume(code);
  		return continuationClose;
  	}
  	/**
  	* Done.
  	*
  	* ```markdown
  	* > | <!doctype>
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function continuationAfter(code) {
  		effects.exit("htmlFlow");
  		return ok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeNonLazyContinuationStart(effects, ok, nok) {
  	const self = this;
  	return start;
  	/**
  	* At eol, before continuation.
  	*
  	* ```markdown
  	* > | * ```js
  	*            ^
  	*   | b
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		if (markdownLineEnding(code)) {
  			effects.enter("lineEnding");
  			effects.consume(code);
  			effects.exit("lineEnding");
  			return after;
  		}
  		return nok(code);
  	}
  	/**
  	* A continuation.
  	*
  	* ```markdown
  	*   | * ```js
  	* > | b
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeBlankLineBefore(effects, ok, nok) {
  	return start;
  	/**
  	* Before eol, expecting blank line.
  	*
  	* ```markdown
  	* > | <div>
  	*          ^
  	*   |
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return effects.attempt(blankLine, ok, nok);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/html-text.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var htmlText = {
  	name: "htmlText",
  	tokenize: tokenizeHtmlText
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeHtmlText(effects, ok, nok) {
  	const self = this;
  	/** @type {NonNullable<Code> | undefined} */
  	let marker;
  	/** @type {number} */
  	let index;
  	/** @type {State} */
  	let returnState;
  	return start;
  	/**
  	* Start of HTML (text).
  	*
  	* ```markdown
  	* > | a <b> c
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("htmlText");
  		effects.enter("htmlTextData");
  		effects.consume(code);
  		return open;
  	}
  	/**
  	* After `<`, at tag name or other stuff.
  	*
  	* ```markdown
  	* > | a <b> c
  	*        ^
  	* > | a <!doctype> c
  	*        ^
  	* > | a <!--b--> c
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function open(code) {
  		if (code === 33) {
  			effects.consume(code);
  			return declarationOpen;
  		}
  		if (code === 47) {
  			effects.consume(code);
  			return tagCloseStart;
  		}
  		if (code === 63) {
  			effects.consume(code);
  			return instruction;
  		}
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			return tagOpen;
  		}
  		return nok(code);
  	}
  	/**
  	* After `<!`, at declaration, comment, or CDATA.
  	*
  	* ```markdown
  	* > | a <!doctype> c
  	*         ^
  	* > | a <!--b--> c
  	*         ^
  	* > | a <![CDATA[>&<]]> c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function declarationOpen(code) {
  		if (code === 45) {
  			effects.consume(code);
  			return commentOpenInside;
  		}
  		if (code === 91) {
  			effects.consume(code);
  			index = 0;
  			return cdataOpenInside;
  		}
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			return declaration;
  		}
  		return nok(code);
  	}
  	/**
  	* In a comment, after `<!-`, at another `-`.
  	*
  	* ```markdown
  	* > | a <!--b--> c
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function commentOpenInside(code) {
  		if (code === 45) {
  			effects.consume(code);
  			return commentEnd;
  		}
  		return nok(code);
  	}
  	/**
  	* In comment.
  	*
  	* ```markdown
  	* > | a <!--b--> c
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function comment(code) {
  		if (code === null) return nok(code);
  		if (code === 45) {
  			effects.consume(code);
  			return commentClose;
  		}
  		if (markdownLineEnding(code)) {
  			returnState = comment;
  			return lineEndingBefore(code);
  		}
  		effects.consume(code);
  		return comment;
  	}
  	/**
  	* In comment, after `-`.
  	*
  	* ```markdown
  	* > | a <!--b--> c
  	*             ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function commentClose(code) {
  		if (code === 45) {
  			effects.consume(code);
  			return commentEnd;
  		}
  		return comment(code);
  	}
  	/**
  	* In comment, after `--`.
  	*
  	* ```markdown
  	* > | a <!--b--> c
  	*              ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function commentEnd(code) {
  		return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
  	}
  	/**
  	* After `<![`, in CDATA, expecting `CDATA[`.
  	*
  	* ```markdown
  	* > | a <![CDATA[>&<]]> b
  	*          ^^^^^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function cdataOpenInside(code) {
  		if (code === "CDATA[".charCodeAt(index++)) {
  			effects.consume(code);
  			return index === 6 ? cdata : cdataOpenInside;
  		}
  		return nok(code);
  	}
  	/**
  	* In CDATA.
  	*
  	* ```markdown
  	* > | a <![CDATA[>&<]]> b
  	*                ^^^
  	* ```
  	*
  	* @type {State}
  	*/
  	function cdata(code) {
  		if (code === null) return nok(code);
  		if (code === 93) {
  			effects.consume(code);
  			return cdataClose;
  		}
  		if (markdownLineEnding(code)) {
  			returnState = cdata;
  			return lineEndingBefore(code);
  		}
  		effects.consume(code);
  		return cdata;
  	}
  	/**
  	* In CDATA, after `]`, at another `]`.
  	*
  	* ```markdown
  	* > | a <![CDATA[>&<]]> b
  	*                    ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function cdataClose(code) {
  		if (code === 93) {
  			effects.consume(code);
  			return cdataEnd;
  		}
  		return cdata(code);
  	}
  	/**
  	* In CDATA, after `]]`, at `>`.
  	*
  	* ```markdown
  	* > | a <![CDATA[>&<]]> b
  	*                     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function cdataEnd(code) {
  		if (code === 62) return end(code);
  		if (code === 93) {
  			effects.consume(code);
  			return cdataEnd;
  		}
  		return cdata(code);
  	}
  	/**
  	* In declaration.
  	*
  	* ```markdown
  	* > | a <!b> c
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function declaration(code) {
  		if (code === null || code === 62) return end(code);
  		if (markdownLineEnding(code)) {
  			returnState = declaration;
  			return lineEndingBefore(code);
  		}
  		effects.consume(code);
  		return declaration;
  	}
  	/**
  	* In instruction.
  	*
  	* ```markdown
  	* > | a <?b?> c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function instruction(code) {
  		if (code === null) return nok(code);
  		if (code === 63) {
  			effects.consume(code);
  			return instructionClose;
  		}
  		if (markdownLineEnding(code)) {
  			returnState = instruction;
  			return lineEndingBefore(code);
  		}
  		effects.consume(code);
  		return instruction;
  	}
  	/**
  	* In instruction, after `?`, at `>`.
  	*
  	* ```markdown
  	* > | a <?b?> c
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function instructionClose(code) {
  		return code === 62 ? end(code) : instruction(code);
  	}
  	/**
  	* After `</`, in closing tag, at tag name.
  	*
  	* ```markdown
  	* > | a </b> c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagCloseStart(code) {
  		if (asciiAlpha(code)) {
  			effects.consume(code);
  			return tagClose;
  		}
  		return nok(code);
  	}
  	/**
  	* After `</x`, in a tag name.
  	*
  	* ```markdown
  	* > | a </b> c
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagClose(code) {
  		if (code === 45 || asciiAlphanumeric(code)) {
  			effects.consume(code);
  			return tagClose;
  		}
  		return tagCloseBetween(code);
  	}
  	/**
  	* In closing tag, after tag name.
  	*
  	* ```markdown
  	* > | a </b> c
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagCloseBetween(code) {
  		if (markdownLineEnding(code)) {
  			returnState = tagCloseBetween;
  			return lineEndingBefore(code);
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return tagCloseBetween;
  		}
  		return end(code);
  	}
  	/**
  	* After `<x`, in opening tag name.
  	*
  	* ```markdown
  	* > | a <b> c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpen(code) {
  		if (code === 45 || asciiAlphanumeric(code)) {
  			effects.consume(code);
  			return tagOpen;
  		}
  		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
  		return nok(code);
  	}
  	/**
  	* In opening tag, after tag name.
  	*
  	* ```markdown
  	* > | a <b> c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenBetween(code) {
  		if (code === 47) {
  			effects.consume(code);
  			return end;
  		}
  		if (code === 58 || code === 95 || asciiAlpha(code)) {
  			effects.consume(code);
  			return tagOpenAttributeName;
  		}
  		if (markdownLineEnding(code)) {
  			returnState = tagOpenBetween;
  			return lineEndingBefore(code);
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return tagOpenBetween;
  		}
  		return end(code);
  	}
  	/**
  	* In attribute name.
  	*
  	* ```markdown
  	* > | a <b c> d
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenAttributeName(code) {
  		if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
  			effects.consume(code);
  			return tagOpenAttributeName;
  		}
  		return tagOpenAttributeNameAfter(code);
  	}
  	/**
  	* After attribute name, before initializer, the end of the tag, or
  	* whitespace.
  	*
  	* ```markdown
  	* > | a <b c> d
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenAttributeNameAfter(code) {
  		if (code === 61) {
  			effects.consume(code);
  			return tagOpenAttributeValueBefore;
  		}
  		if (markdownLineEnding(code)) {
  			returnState = tagOpenAttributeNameAfter;
  			return lineEndingBefore(code);
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return tagOpenAttributeNameAfter;
  		}
  		return tagOpenBetween(code);
  	}
  	/**
  	* Before unquoted, double quoted, or single quoted attribute value, allowing
  	* whitespace.
  	*
  	* ```markdown
  	* > | a <b c=d> e
  	*            ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenAttributeValueBefore(code) {
  		if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
  		if (code === 34 || code === 39) {
  			effects.consume(code);
  			marker = code;
  			return tagOpenAttributeValueQuoted;
  		}
  		if (markdownLineEnding(code)) {
  			returnState = tagOpenAttributeValueBefore;
  			return lineEndingBefore(code);
  		}
  		if (markdownSpace(code)) {
  			effects.consume(code);
  			return tagOpenAttributeValueBefore;
  		}
  		effects.consume(code);
  		return tagOpenAttributeValueUnquoted;
  	}
  	/**
  	* In double or single quoted attribute value.
  	*
  	* ```markdown
  	* > | a <b c="d"> e
  	*             ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenAttributeValueQuoted(code) {
  		if (code === marker) {
  			effects.consume(code);
  			marker = void 0;
  			return tagOpenAttributeValueQuotedAfter;
  		}
  		if (code === null) return nok(code);
  		if (markdownLineEnding(code)) {
  			returnState = tagOpenAttributeValueQuoted;
  			return lineEndingBefore(code);
  		}
  		effects.consume(code);
  		return tagOpenAttributeValueQuoted;
  	}
  	/**
  	* In unquoted attribute value.
  	*
  	* ```markdown
  	* > | a <b c=d> e
  	*            ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenAttributeValueUnquoted(code) {
  		if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) return nok(code);
  		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
  		effects.consume(code);
  		return tagOpenAttributeValueUnquoted;
  	}
  	/**
  	* After double or single quoted attribute value, before whitespace or the end
  	* of the tag.
  	*
  	* ```markdown
  	* > | a <b c="d"> e
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function tagOpenAttributeValueQuotedAfter(code) {
  		if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
  		return nok(code);
  	}
  	/**
  	* In certain circumstances of a tag where only an `>` is allowed.
  	*
  	* ```markdown
  	* > | a <b c="d"> e
  	*               ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function end(code) {
  		if (code === 62) {
  			effects.consume(code);
  			effects.exit("htmlTextData");
  			effects.exit("htmlText");
  			return ok;
  		}
  		return nok(code);
  	}
  	/**
  	* At eol.
  	*
  	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
  	* > empty tokens.
  	*
  	* ```markdown
  	* > | a <!--a
  	*            ^
  	*   | b-->
  	* ```
  	*
  	* @type {State}
  	*/
  	function lineEndingBefore(code) {
  		effects.exit("htmlTextData");
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return lineEndingAfter;
  	}
  	/**
  	* After eol, at optional whitespace.
  	*
  	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
  	* > empty tokens.
  	*
  	* ```markdown
  	*   | a <!--a
  	* > | b-->
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function lineEndingAfter(code) {
  		return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : lineEndingAfterPrefix(code);
  	}
  	/**
  	* After eol, after optional whitespace.
  	*
  	* > 👉 **Note**: we can’t have blank lines in text, so no need to worry about
  	* > empty tokens.
  	*
  	* ```markdown
  	*   | a <!--a
  	* > | b-->
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function lineEndingAfterPrefix(code) {
  		effects.enter("htmlTextData");
  		return returnState(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/label-end.js
  /**
  * @import {
  *   Construct,
  *   Event,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer,
  *   Token
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var labelEnd = {
  	name: "labelEnd",
  	resolveAll: resolveAllLabelEnd,
  	resolveTo: resolveToLabelEnd,
  	tokenize: tokenizeLabelEnd
  };
  /** @type {Construct} */
  var resourceConstruct = { tokenize: tokenizeResource };
  /** @type {Construct} */
  var referenceFullConstruct = { tokenize: tokenizeReferenceFull };
  /** @type {Construct} */
  var referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
  /** @type {Resolver} */
  function resolveAllLabelEnd(events) {
  	let index = -1;
  	/** @type {Array<Event>} */
  	const newEvents = [];
  	while (++index < events.length) {
  		const token = events[index][1];
  		newEvents.push(events[index]);
  		if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
  			const offset = token.type === "labelImage" ? 4 : 2;
  			token.type = "data";
  			index += offset;
  		}
  	}
  	if (events.length !== newEvents.length) splice(events, 0, events.length, newEvents);
  	return events;
  }
  /** @type {Resolver} */
  function resolveToLabelEnd(events, context) {
  	let index = events.length;
  	let offset = 0;
  	/** @type {Token} */
  	let token;
  	/** @type {number | undefined} */
  	let open;
  	/** @type {number | undefined} */
  	let close;
  	/** @type {Array<Event>} */
  	let media;
  	while (index--) {
  		token = events[index][1];
  		if (open) {
  			if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
  			if (events[index][0] === "enter" && token.type === "labelLink") token._inactive = true;
  		} else if (close) {
  			if (events[index][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
  				open = index;
  				if (token.type !== "labelLink") {
  					offset = 2;
  					break;
  				}
  			}
  		} else if (token.type === "labelEnd") close = index;
  	}
  	const group = {
  		type: events[open][1].type === "labelLink" ? "link" : "image",
  		start: { ...events[open][1].start },
  		end: { ...events[events.length - 1][1].end }
  	};
  	const label = {
  		type: "label",
  		start: { ...events[open][1].start },
  		end: { ...events[close][1].end }
  	};
  	const text = {
  		type: "labelText",
  		start: { ...events[open + offset + 2][1].end },
  		end: { ...events[close - 2][1].start }
  	};
  	media = [[
  		"enter",
  		group,
  		context
  	], [
  		"enter",
  		label,
  		context
  	]];
  	media = push(media, events.slice(open + 1, open + offset + 3));
  	media = push(media, [[
  		"enter",
  		text,
  		context
  	]]);
  	media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
  	media = push(media, [
  		[
  			"exit",
  			text,
  			context
  		],
  		events[close - 2],
  		events[close - 1],
  		[
  			"exit",
  			label,
  			context
  		]
  	]);
  	media = push(media, events.slice(close + 1));
  	media = push(media, [[
  		"exit",
  		group,
  		context
  	]]);
  	splice(events, open, events.length, media);
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeLabelEnd(effects, ok, nok) {
  	const self = this;
  	let index = self.events.length;
  	/** @type {Token} */
  	let labelStart;
  	/** @type {boolean} */
  	let defined;
  	while (index--) if ((self.events[index][1].type === "labelImage" || self.events[index][1].type === "labelLink") && !self.events[index][1]._balanced) {
  		labelStart = self.events[index][1];
  		break;
  	}
  	return start;
  	/**
  	* Start of label end.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*       ^
  	* > | [a][b] c
  	*       ^
  	* > | [a][] b
  	*       ^
  	* > | [a] b
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		if (!labelStart) return nok(code);
  		if (labelStart._inactive) return labelEndNok(code);
  		defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
  			start: labelStart.end,
  			end: self.now()
  		})));
  		effects.enter("labelEnd");
  		effects.enter("labelMarker");
  		effects.consume(code);
  		effects.exit("labelMarker");
  		effects.exit("labelEnd");
  		return after;
  	}
  	/**
  	* After `]`.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*       ^
  	* > | [a][b] c
  	*       ^
  	* > | [a][] b
  	*       ^
  	* > | [a] b
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		if (code === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
  		if (code === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
  		return defined ? labelEndOk(code) : labelEndNok(code);
  	}
  	/**
  	* After `]`, at `[`, but not at a full reference.
  	*
  	* > 👉 **Note**: we only get here if the label is defined.
  	*
  	* ```markdown
  	* > | [a][] b
  	*        ^
  	* > | [a] b
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function referenceNotFull(code) {
  		return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
  	}
  	/**
  	* Done, we found something.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*           ^
  	* > | [a][b] c
  	*           ^
  	* > | [a][] b
  	*          ^
  	* > | [a] b
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function labelEndOk(code) {
  		return ok(code);
  	}
  	/**
  	* Done, it’s nothing.
  	*
  	* There was an okay opening, but we didn’t match anything.
  	*
  	* ```markdown
  	* > | [a](b c
  	*        ^
  	* > | [a][b c
  	*        ^
  	* > | [a] b
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function labelEndNok(code) {
  		labelStart._balanced = true;
  		return nok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeResource(effects, ok, nok) {
  	return resourceStart;
  	/**
  	* At a resource.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceStart(code) {
  		effects.enter("resource");
  		effects.enter("resourceMarker");
  		effects.consume(code);
  		effects.exit("resourceMarker");
  		return resourceBefore;
  	}
  	/**
  	* In resource, after `(`, at optional whitespace.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceBefore(code) {
  		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
  	}
  	/**
  	* In resource, after optional whitespace, at `)` or a destination.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceOpen(code) {
  		if (code === 41) return resourceEnd(code);
  		return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
  	}
  	/**
  	* In resource, after destination, at optional whitespace.
  	*
  	* ```markdown
  	* > | [a](b) c
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceDestinationAfter(code) {
  		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
  	}
  	/**
  	* At invalid destination.
  	*
  	* ```markdown
  	* > | [a](<<) b
  	*         ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceDestinationMissing(code) {
  		return nok(code);
  	}
  	/**
  	* In resource, after destination and whitespace, at `(` or title.
  	*
  	* ```markdown
  	* > | [a](b ) c
  	*           ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceBetween(code) {
  		if (code === 34 || code === 39 || code === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
  		return resourceEnd(code);
  	}
  	/**
  	* In resource, after title, at optional whitespace.
  	*
  	* ```markdown
  	* > | [a](b "c") d
  	*              ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceTitleAfter(code) {
  		return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
  	}
  	/**
  	* In resource, at `)`.
  	*
  	* ```markdown
  	* > | [a](b) d
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function resourceEnd(code) {
  		if (code === 41) {
  			effects.enter("resourceMarker");
  			effects.consume(code);
  			effects.exit("resourceMarker");
  			effects.exit("resource");
  			return ok;
  		}
  		return nok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeReferenceFull(effects, ok, nok) {
  	const self = this;
  	return referenceFull;
  	/**
  	* In a reference (full), at the `[`.
  	*
  	* ```markdown
  	* > | [a][b] d
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function referenceFull(code) {
  		return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
  	}
  	/**
  	* In a reference (full), after `]`.
  	*
  	* ```markdown
  	* > | [a][b] d
  	*          ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function referenceFullAfter(code) {
  		return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
  	}
  	/**
  	* In reference (full) that was missing.
  	*
  	* ```markdown
  	* > | [a][b d
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function referenceFullMissing(code) {
  		return nok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeReferenceCollapsed(effects, ok, nok) {
  	return referenceCollapsedStart;
  	/**
  	* In reference (collapsed), at `[`.
  	*
  	* > 👉 **Note**: we only get here if the label is defined.
  	*
  	* ```markdown
  	* > | [a][] d
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function referenceCollapsedStart(code) {
  		effects.enter("reference");
  		effects.enter("referenceMarker");
  		effects.consume(code);
  		effects.exit("referenceMarker");
  		return referenceCollapsedOpen;
  	}
  	/**
  	* In reference (collapsed), at `]`.
  	*
  	* > 👉 **Note**: we only get here if the label is defined.
  	*
  	* ```markdown
  	* > | [a][] d
  	*         ^
  	* ```
  	*
  	*  @type {State}
  	*/
  	function referenceCollapsedOpen(code) {
  		if (code === 93) {
  			effects.enter("referenceMarker");
  			effects.consume(code);
  			effects.exit("referenceMarker");
  			effects.exit("reference");
  			return ok;
  		}
  		return nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/label-start-image.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var labelStartImage = {
  	name: "labelStartImage",
  	resolveAll: labelEnd.resolveAll,
  	tokenize: tokenizeLabelStartImage
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeLabelStartImage(effects, ok, nok) {
  	const self = this;
  	return start;
  	/**
  	* Start of label (image) start.
  	*
  	* ```markdown
  	* > | a ![b] c
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("labelImage");
  		effects.enter("labelImageMarker");
  		effects.consume(code);
  		effects.exit("labelImageMarker");
  		return open;
  	}
  	/**
  	* After `!`, at `[`.
  	*
  	* ```markdown
  	* > | a ![b] c
  	*        ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function open(code) {
  		if (code === 91) {
  			effects.enter("labelMarker");
  			effects.consume(code);
  			effects.exit("labelMarker");
  			effects.exit("labelImage");
  			return after;
  		}
  		return nok(code);
  	}
  	/**
  	* After `![`.
  	*
  	* ```markdown
  	* > | a ![b] c
  	*         ^
  	* ```
  	*
  	* This is needed in because, when GFM footnotes are enabled, images never
  	* form when started with a `^`.
  	* Instead, links form:
  	*
  	* ```markdown
  	* ![^a](b)
  	*
  	* ![^a][b]
  	*
  	* [b]: c
  	* ```
  	*
  	* ```html
  	* <p>!<a href=\"b\">^a</a></p>
  	* <p>!<a href=\"c\">^a</a></p>
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		/* c8 ignore next 3 */
  		return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/label-start-link.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var labelStartLink = {
  	name: "labelStartLink",
  	resolveAll: labelEnd.resolveAll,
  	tokenize: tokenizeLabelStartLink
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeLabelStartLink(effects, ok, nok) {
  	const self = this;
  	return start;
  	/**
  	* Start of label (link) start.
  	*
  	* ```markdown
  	* > | a [b] c
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("labelLink");
  		effects.enter("labelMarker");
  		effects.consume(code);
  		effects.exit("labelMarker");
  		effects.exit("labelLink");
  		return after;
  	}
  	/** @type {State} */
  	function after(code) {
  		/* c8 ignore next 3 */
  		return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/line-ending.js
  /**
  * @import {
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var lineEnding = {
  	name: "lineEnding",
  	tokenize: tokenizeLineEnding
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeLineEnding(effects, ok) {
  	return start;
  	/** @type {State} */
  	function start(code) {
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		return factorySpace(effects, ok, "linePrefix");
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/thematic-break.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var thematicBreak$1 = {
  	name: "thematicBreak",
  	tokenize: tokenizeThematicBreak
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeThematicBreak(effects, ok, nok) {
  	let size = 0;
  	/** @type {NonNullable<Code>} */
  	let marker;
  	return start;
  	/**
  	* Start of thematic break.
  	*
  	* ```markdown
  	* > | ***
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		effects.enter("thematicBreak");
  		return before(code);
  	}
  	/**
  	* After optional whitespace, at marker.
  	*
  	* ```markdown
  	* > | ***
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function before(code) {
  		marker = code;
  		return atBreak(code);
  	}
  	/**
  	* After something, before something else.
  	*
  	* ```markdown
  	* > | ***
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function atBreak(code) {
  		if (code === marker) {
  			effects.enter("thematicBreakSequence");
  			return sequence(code);
  		}
  		if (size >= 3 && (code === null || markdownLineEnding(code))) {
  			effects.exit("thematicBreak");
  			return ok(code);
  		}
  		return nok(code);
  	}
  	/**
  	* In sequence.
  	*
  	* ```markdown
  	* > | ***
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function sequence(code) {
  		if (code === marker) {
  			effects.consume(code);
  			size++;
  			return sequence;
  		}
  		effects.exit("thematicBreakSequence");
  		return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/list.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   Exiter,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var list$2 = {
  	continuation: { tokenize: tokenizeListContinuation },
  	exit: tokenizeListEnd,
  	name: "list",
  	tokenize: tokenizeListStart
  };
  /** @type {Construct} */
  var listItemPrefixWhitespaceConstruct = {
  	partial: true,
  	tokenize: tokenizeListItemPrefixWhitespace
  };
  /** @type {Construct} */
  var indentConstruct = {
  	partial: true,
  	tokenize: tokenizeIndent
  };
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeListStart(effects, ok, nok) {
  	const self = this;
  	const tail = self.events[self.events.length - 1];
  	let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  	let size = 0;
  	return start;
  	/** @type {State} */
  	function start(code) {
  		const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
  		if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
  			if (!self.containerState.type) {
  				self.containerState.type = kind;
  				effects.enter(kind, { _container: true });
  			}
  			if (kind === "listUnordered") {
  				effects.enter("listItemPrefix");
  				return code === 42 || code === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code) : atMarker(code);
  			}
  			if (!self.interrupt || code === 49) {
  				effects.enter("listItemPrefix");
  				effects.enter("listItemValue");
  				return inside(code);
  			}
  		}
  		return nok(code);
  	}
  	/** @type {State} */
  	function inside(code) {
  		if (asciiDigit(code) && ++size < 10) {
  			effects.consume(code);
  			return inside;
  		}
  		if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
  			effects.exit("listItemValue");
  			return atMarker(code);
  		}
  		return nok(code);
  	}
  	/**
  	* @type {State}
  	**/
  	function atMarker(code) {
  		effects.enter("listItemMarker");
  		effects.consume(code);
  		effects.exit("listItemMarker");
  		self.containerState.marker = self.containerState.marker || code;
  		return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
  	}
  	/** @type {State} */
  	function onBlank(code) {
  		self.containerState.initialBlankLine = true;
  		initialSize++;
  		return endOfPrefix(code);
  	}
  	/** @type {State} */
  	function otherPrefix(code) {
  		if (markdownSpace(code)) {
  			effects.enter("listItemPrefixWhitespace");
  			effects.consume(code);
  			effects.exit("listItemPrefixWhitespace");
  			return endOfPrefix;
  		}
  		return nok(code);
  	}
  	/** @type {State} */
  	function endOfPrefix(code) {
  		self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
  		return ok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeListContinuation(effects, ok, nok) {
  	const self = this;
  	self.containerState._closeFlow = void 0;
  	return effects.check(blankLine, onBlank, notBlank);
  	/** @type {State} */
  	function onBlank(code) {
  		self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
  		return factorySpace(effects, ok, "listItemIndent", self.containerState.size + 1)(code);
  	}
  	/** @type {State} */
  	function notBlank(code) {
  		if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
  			self.containerState.furtherBlankLines = void 0;
  			self.containerState.initialBlankLine = void 0;
  			return notInCurrentItem(code);
  		}
  		self.containerState.furtherBlankLines = void 0;
  		self.containerState.initialBlankLine = void 0;
  		return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
  	}
  	/** @type {State} */
  	function notInCurrentItem(code) {
  		self.containerState._closeFlow = true;
  		self.interrupt = void 0;
  		return factorySpace(effects, effects.attempt(list$2, ok, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeIndent(effects, ok, nok) {
  	const self = this;
  	return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
  	/** @type {State} */
  	function afterPrefix(code) {
  		const tail = self.events[self.events.length - 1];
  		return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
  	}
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Exiter}
  */
  function tokenizeListEnd(effects) {
  	effects.exit(this.containerState.type);
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  	const self = this;
  	return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  	/** @type {State} */
  	function afterPrefix(code) {
  		const tail = self.events[self.events.length - 1];
  		return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-core-commonmark@2.0.3/node_modules/micromark-core-commonmark/lib/setext-underline.js
  /**
  * @import {
  *   Code,
  *   Construct,
  *   Resolver,
  *   State,
  *   TokenizeContext,
  *   Tokenizer
  * } from 'micromark-util-types'
  */
  /** @type {Construct} */
  var setextUnderline = {
  	name: "setextUnderline",
  	resolveTo: resolveToSetextUnderline,
  	tokenize: tokenizeSetextUnderline
  };
  /** @type {Resolver} */
  function resolveToSetextUnderline(events, context) {
  	let index = events.length;
  	/** @type {number | undefined} */
  	let content;
  	/** @type {number | undefined} */
  	let text;
  	/** @type {number | undefined} */
  	let definition;
  	while (index--) if (events[index][0] === "enter") {
  		if (events[index][1].type === "content") {
  			content = index;
  			break;
  		}
  		if (events[index][1].type === "paragraph") text = index;
  	} else {
  		if (events[index][1].type === "content") events.splice(index, 1);
  		if (!definition && events[index][1].type === "definition") definition = index;
  	}
  	const heading = {
  		type: "setextHeading",
  		start: { ...events[content][1].start },
  		end: { ...events[events.length - 1][1].end }
  	};
  	events[text][1].type = "setextHeadingText";
  	if (definition) {
  		events.splice(text, 0, [
  			"enter",
  			heading,
  			context
  		]);
  		events.splice(definition + 1, 0, [
  			"exit",
  			events[content][1],
  			context
  		]);
  		events[content][1].end = { ...events[definition][1].end };
  	} else events[content][1] = heading;
  	events.push([
  		"exit",
  		heading,
  		context
  	]);
  	return events;
  }
  /**
  * @this {TokenizeContext}
  *   Context.
  * @type {Tokenizer}
  */
  function tokenizeSetextUnderline(effects, ok, nok) {
  	const self = this;
  	/** @type {NonNullable<Code>} */
  	let marker;
  	return start;
  	/**
  	* At start of heading (setext) underline.
  	*
  	* ```markdown
  	*   | aa
  	* > | ==
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function start(code) {
  		let index = self.events.length;
  		/** @type {boolean | undefined} */
  		let paragraph;
  		while (index--) if (self.events[index][1].type !== "lineEnding" && self.events[index][1].type !== "linePrefix" && self.events[index][1].type !== "content") {
  			paragraph = self.events[index][1].type === "paragraph";
  			break;
  		}
  		if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
  			effects.enter("setextHeadingLine");
  			marker = code;
  			return before(code);
  		}
  		return nok(code);
  	}
  	/**
  	* After optional whitespace, at `-` or `=`.
  	*
  	* ```markdown
  	*   | aa
  	* > | ==
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function before(code) {
  		effects.enter("setextHeadingLineSequence");
  		return inside(code);
  	}
  	/**
  	* In sequence.
  	*
  	* ```markdown
  	*   | aa
  	* > | ==
  	*     ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function inside(code) {
  		if (code === marker) {
  			effects.consume(code);
  			return inside;
  		}
  		effects.exit("setextHeadingLineSequence");
  		return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
  	}
  	/**
  	* After sequence, after optional whitespace.
  	*
  	* ```markdown
  	*   | aa
  	* > | ==
  	*       ^
  	* ```
  	*
  	* @type {State}
  	*/
  	function after(code) {
  		if (code === null || markdownLineEnding(code)) {
  			effects.exit("setextHeadingLine");
  			return ok(code);
  		}
  		return nok(code);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/flow.js
  /**
  * @import {
  *   InitialConstruct,
  *   Initializer,
  *   State,
  *   TokenizeContext
  * } from 'micromark-util-types'
  */
  /** @type {InitialConstruct} */
  var flow$1 = { tokenize: initializeFlow };
  /**
  * @this {TokenizeContext}
  *   Self.
  * @type {Initializer}
  *   Initializer.
  */
  function initializeFlow(effects) {
  	const self = this;
  	const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
  	return initial;
  	/** @type {State} */
  	function atBlankEnding(code) {
  		if (code === null) {
  			effects.consume(code);
  			return;
  		}
  		effects.enter("lineEndingBlank");
  		effects.consume(code);
  		effects.exit("lineEndingBlank");
  		self.currentConstruct = void 0;
  		return initial;
  	}
  	/** @type {State} */
  	function afterConstruct(code) {
  		if (code === null) {
  			effects.consume(code);
  			return;
  		}
  		effects.enter("lineEnding");
  		effects.consume(code);
  		effects.exit("lineEnding");
  		self.currentConstruct = void 0;
  		return initial;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/initialize/text.js
  /**
  * @import {
  *   Code,
  *   InitialConstruct,
  *   Initializer,
  *   Resolver,
  *   State,
  *   TokenizeContext
  * } from 'micromark-util-types'
  */
  var resolver = { resolveAll: createResolver() };
  var string$1 = initializeFactory("string");
  var text$2 = initializeFactory("text");
  /**
  * @param {'string' | 'text'} field
  *   Field.
  * @returns {InitialConstruct}
  *   Construct.
  */
  function initializeFactory(field) {
  	return {
  		resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
  		tokenize: initializeText
  	};
  	/**
  	* @this {TokenizeContext}
  	*   Context.
  	* @type {Initializer}
  	*/
  	function initializeText(effects) {
  		const self = this;
  		const constructs = this.parser.constructs[field];
  		const text = effects.attempt(constructs, start, notText);
  		return start;
  		/** @type {State} */
  		function start(code) {
  			return atBreak(code) ? text(code) : notText(code);
  		}
  		/** @type {State} */
  		function notText(code) {
  			if (code === null) {
  				effects.consume(code);
  				return;
  			}
  			effects.enter("data");
  			effects.consume(code);
  			return data;
  		}
  		/** @type {State} */
  		function data(code) {
  			if (atBreak(code)) {
  				effects.exit("data");
  				return text(code);
  			}
  			effects.consume(code);
  			return data;
  		}
  		/**
  		* @param {Code} code
  		*   Code.
  		* @returns {boolean}
  		*   Whether the code is a break.
  		*/
  		function atBreak(code) {
  			if (code === null) return true;
  			const list = constructs[code];
  			let index = -1;
  			if (list) while (++index < list.length) {
  				const item = list[index];
  				if (!item.previous || item.previous.call(self, self.previous)) return true;
  			}
  			return false;
  		}
  	}
  }
  /**
  * @param {Resolver | undefined} [extraResolver]
  *   Resolver.
  * @returns {Resolver}
  *   Resolver.
  */
  function createResolver(extraResolver) {
  	return resolveAllText;
  	/** @type {Resolver} */
  	function resolveAllText(events, context) {
  		let index = -1;
  		/** @type {number | undefined} */
  		let enter;
  		while (++index <= events.length) if (enter === void 0) {
  			if (events[index] && events[index][1].type === "data") {
  				enter = index;
  				index++;
  			}
  		} else if (!events[index] || events[index][1].type !== "data") {
  			if (index !== enter + 2) {
  				events[enter][1].end = events[index - 1][1].end;
  				events.splice(enter + 2, index - enter - 2);
  				index = enter + 2;
  			}
  			enter = void 0;
  		}
  		return extraResolver ? extraResolver(events, context) : events;
  	}
  }
  /**
  * A rather ugly set of instructions which again looks at chunks in the input
  * stream.
  * The reason to do this here is that it is *much* faster to parse in reverse.
  * And that we can’t hook into `null` to split the line suffix before an EOF.
  * To do: figure out if we can make this into a clean utility, or even in core.
  * As it will be useful for GFMs literal autolink extension (and maybe even
  * tables?)
  *
  * @type {Resolver}
  */
  function resolveAllLineSuffixes(events, context) {
  	let eventIndex = 0;
  	while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
  		const data = events[eventIndex - 1][1];
  		const chunks = context.sliceStream(data);
  		let index = chunks.length;
  		let bufferIndex = -1;
  		let size = 0;
  		/** @type {boolean | undefined} */
  		let tabs;
  		while (index--) {
  			const chunk = chunks[index];
  			if (typeof chunk === "string") {
  				bufferIndex = chunk.length;
  				while (chunk.charCodeAt(bufferIndex - 1) === 32) {
  					size++;
  					bufferIndex--;
  				}
  				if (bufferIndex) break;
  				bufferIndex = -1;
  			} else if (chunk === -2) {
  				tabs = true;
  				size++;
  			} else if (chunk === -1) {} else {
  				index++;
  				break;
  			}
  		}
  		if (context._contentTypeTextTrailing && eventIndex === events.length) size = 0;
  		if (size) {
  			const token = {
  				type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
  				start: {
  					_bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
  					_index: data.start._index + index,
  					line: data.end.line,
  					column: data.end.column - size,
  					offset: data.end.offset - size
  				},
  				end: { ...data.end }
  			};
  			data.end = { ...token.start };
  			if (data.start.offset === data.end.offset) Object.assign(data, token);
  			else {
  				events.splice(eventIndex, 0, [
  					"enter",
  					token,
  					context
  				], [
  					"exit",
  					token,
  					context
  				]);
  				eventIndex += 2;
  			}
  		}
  		eventIndex++;
  	}
  	return events;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/constructs.js
  /**
  * @import {Extension} from 'micromark-util-types'
  */
  var constructs_exports = /* @__PURE__ */ __exportAll({
  	attentionMarkers: () => attentionMarkers,
  	contentInitial: () => contentInitial,
  	disable: () => disable,
  	document: () => document$1,
  	flow: () => flow,
  	flowInitial: () => flowInitial,
  	insideSpan: () => insideSpan,
  	string: () => string,
  	text: () => text$1
  });
  /** @satisfies {Extension['document']} */
  var document$1 = {
  	[42]: list$2,
  	[43]: list$2,
  	[45]: list$2,
  	[48]: list$2,
  	[49]: list$2,
  	[50]: list$2,
  	[51]: list$2,
  	[52]: list$2,
  	[53]: list$2,
  	[54]: list$2,
  	[55]: list$2,
  	[56]: list$2,
  	[57]: list$2,
  	[62]: blockQuote
  };
  /** @satisfies {Extension['contentInitial']} */
  var contentInitial = { [91]: definition$1 };
  /** @satisfies {Extension['flowInitial']} */
  var flowInitial = {
  	[-2]: codeIndented,
  	[-1]: codeIndented,
  	[32]: codeIndented
  };
  /** @satisfies {Extension['flow']} */
  var flow = {
  	[35]: headingAtx,
  	[42]: thematicBreak$1,
  	[45]: [setextUnderline, thematicBreak$1],
  	[60]: htmlFlow,
  	[61]: setextUnderline,
  	[95]: thematicBreak$1,
  	[96]: codeFenced,
  	[126]: codeFenced
  };
  /** @satisfies {Extension['string']} */
  var string = {
  	[38]: characterReference,
  	[92]: characterEscape
  };
  /** @satisfies {Extension['text']} */
  var text$1 = {
  	[-5]: lineEnding,
  	[-4]: lineEnding,
  	[-3]: lineEnding,
  	[33]: labelStartImage,
  	[38]: characterReference,
  	[42]: attention,
  	[60]: [autolink, htmlText],
  	[91]: labelStartLink,
  	[92]: [hardBreakEscape, characterEscape],
  	[93]: labelEnd,
  	[95]: attention,
  	[96]: codeText
  };
  /** @satisfies {Extension['insideSpan']} */
  var insideSpan = { null: [attention, resolver] };
  /** @satisfies {Extension['attentionMarkers']} */
  var attentionMarkers = { null: [42, 95] };
  /** @satisfies {Extension['disable']} */
  var disable = { null: [] };
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/create-tokenizer.js
  /**
  * @import {
  *   Chunk,
  *   Code,
  *   ConstructRecord,
  *   Construct,
  *   Effects,
  *   InitialConstruct,
  *   ParseContext,
  *   Point,
  *   State,
  *   TokenizeContext,
  *   Token
  * } from 'micromark-util-types'
  */
  /**
  * @callback Restore
  *   Restore the state.
  * @returns {undefined}
  *   Nothing.
  *
  * @typedef Info
  *   Info.
  * @property {Restore} restore
  *   Restore.
  * @property {number} from
  *   From.
  *
  * @callback ReturnHandle
  *   Handle a successful run.
  * @param {Construct} construct
  *   Construct.
  * @param {Info} info
  *   Info.
  * @returns {undefined}
  *   Nothing.
  */
  /**
  * Create a tokenizer.
  * Tokenizers deal with one type of data (e.g., containers, flow, text).
  * The parser is the object dealing with it all.
  * `initialize` works like other constructs, except that only its `tokenize`
  * function is used, in which case it doesn’t receive an `ok` or `nok`.
  * `from` can be given to set the point before the first character, although
  * when further lines are indented, they must be set with `defineSkip`.
  *
  * @param {ParseContext} parser
  *   Parser.
  * @param {InitialConstruct} initialize
  *   Construct.
  * @param {Omit<Point, '_bufferIndex' | '_index'> | undefined} [from]
  *   Point (optional).
  * @returns {TokenizeContext}
  *   Context.
  */
  function createTokenizer(parser, initialize, from) {
  	/** @type {Point} */
  	let point = {
  		_bufferIndex: -1,
  		_index: 0,
  		line: from && from.line || 1,
  		column: from && from.column || 1,
  		offset: from && from.offset || 0
  	};
  	/** @type {Record<string, number>} */
  	const columnStart = {};
  	/** @type {Array<Construct>} */
  	const resolveAllConstructs = [];
  	/** @type {Array<Chunk>} */
  	let chunks = [];
  	/** @type {Array<Token>} */
  	let stack = [];
  	/**
  	* Tools used for tokenizing.
  	*
  	* @type {Effects}
  	*/
  	const effects = {
  		attempt: constructFactory(onsuccessfulconstruct),
  		check: constructFactory(onsuccessfulcheck),
  		consume,
  		enter,
  		exit,
  		interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
  	};
  	/**
  	* State and tools for resolving and serializing.
  	*
  	* @type {TokenizeContext}
  	*/
  	const context = {
  		code: null,
  		containerState: {},
  		defineSkip,
  		events: [],
  		now,
  		parser,
  		previous: null,
  		sliceSerialize,
  		sliceStream,
  		write
  	};
  	/**
  	* The state function.
  	*
  	* @type {State | undefined}
  	*/
  	let state = initialize.tokenize.call(context, effects);
  	if (initialize.resolveAll) resolveAllConstructs.push(initialize);
  	return context;
  	/** @type {TokenizeContext['write']} */
  	function write(slice) {
  		chunks = push(chunks, slice);
  		main();
  		if (chunks[chunks.length - 1] !== null) return [];
  		addResult(initialize, 0);
  		context.events = resolveAll(resolveAllConstructs, context.events, context);
  		return context.events;
  	}
  	/** @type {TokenizeContext['sliceSerialize']} */
  	function sliceSerialize(token, expandTabs) {
  		return serializeChunks(sliceStream(token), expandTabs);
  	}
  	/** @type {TokenizeContext['sliceStream']} */
  	function sliceStream(token) {
  		return sliceChunks(chunks, token);
  	}
  	/** @type {TokenizeContext['now']} */
  	function now() {
  		const { _bufferIndex, _index, line, column, offset } = point;
  		return {
  			_bufferIndex,
  			_index,
  			line,
  			column,
  			offset
  		};
  	}
  	/** @type {TokenizeContext['defineSkip']} */
  	function defineSkip(value) {
  		columnStart[value.line] = value.column;
  		accountForPotentialSkip();
  	}
  	/**
  	* Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
  	* `consume`).
  	* Here is where we walk through the chunks, which either include strings of
  	* several characters, or numerical character codes.
  	* The reason to do this in a loop instead of a call is so the stack can
  	* drain.
  	*
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	function main() {
  		/** @type {number} */
  		let chunkIndex;
  		while (point._index < chunks.length) {
  			const chunk = chunks[point._index];
  			if (typeof chunk === "string") {
  				chunkIndex = point._index;
  				if (point._bufferIndex < 0) point._bufferIndex = 0;
  				while (point._index === chunkIndex && point._bufferIndex < chunk.length) go(chunk.charCodeAt(point._bufferIndex));
  			} else go(chunk);
  		}
  	}
  	/**
  	* Deal with one code.
  	*
  	* @param {Code} code
  	*   Code.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	function go(code) {
  		state = state(code);
  	}
  	/** @type {Effects['consume']} */
  	function consume(code) {
  		if (markdownLineEnding(code)) {
  			point.line++;
  			point.column = 1;
  			point.offset += code === -3 ? 2 : 1;
  			accountForPotentialSkip();
  		} else if (code !== -1) {
  			point.column++;
  			point.offset++;
  		}
  		if (point._bufferIndex < 0) point._index++;
  		else {
  			point._bufferIndex++;
  			if (point._bufferIndex === chunks[point._index].length) {
  				point._bufferIndex = -1;
  				point._index++;
  			}
  		}
  		context.previous = code;
  	}
  	/** @type {Effects['enter']} */
  	function enter(type, fields) {
  		/** @type {Token} */
  		const token = fields || {};
  		token.type = type;
  		token.start = now();
  		context.events.push([
  			"enter",
  			token,
  			context
  		]);
  		stack.push(token);
  		return token;
  	}
  	/** @type {Effects['exit']} */
  	function exit(type) {
  		const token = stack.pop();
  		token.end = now();
  		context.events.push([
  			"exit",
  			token,
  			context
  		]);
  		return token;
  	}
  	/**
  	* Use results.
  	*
  	* @type {ReturnHandle}
  	*/
  	function onsuccessfulconstruct(construct, info) {
  		addResult(construct, info.from);
  	}
  	/**
  	* Discard results.
  	*
  	* @type {ReturnHandle}
  	*/
  	function onsuccessfulcheck(_, info) {
  		info.restore();
  	}
  	/**
  	* Factory to attempt/check/interrupt.
  	*
  	* @param {ReturnHandle} onreturn
  	*   Callback.
  	* @param {{interrupt?: boolean | undefined} | undefined} [fields]
  	*   Fields.
  	*/
  	function constructFactory(onreturn, fields) {
  		return hook;
  		/**
  		* Handle either an object mapping codes to constructs, a list of
  		* constructs, or a single construct.
  		*
  		* @param {Array<Construct> | ConstructRecord | Construct} constructs
  		*   Constructs.
  		* @param {State} returnState
  		*   State.
  		* @param {State | undefined} [bogusState]
  		*   State.
  		* @returns {State}
  		*   State.
  		*/
  		function hook(constructs, returnState, bogusState) {
  			/** @type {ReadonlyArray<Construct>} */
  			let listOfConstructs;
  			/** @type {number} */
  			let constructIndex;
  			/** @type {Construct} */
  			let currentConstruct;
  			/** @type {Info} */
  			let info;
  			return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
  			/**
  			* Handle a list of construct.
  			*
  			* @param {ConstructRecord} map
  			*   Constructs.
  			* @returns {State}
  			*   State.
  			*/
  			function handleMapOfConstructs(map) {
  				return start;
  				/** @type {State} */
  				function start(code) {
  					const left = code !== null && map[code];
  					const all = code !== null && map.null;
  					return handleListOfConstructs([...Array.isArray(left) ? left : left ? [left] : [], ...Array.isArray(all) ? all : all ? [all] : []])(code);
  				}
  			}
  			/**
  			* Handle a list of construct.
  			*
  			* @param {ReadonlyArray<Construct>} list
  			*   Constructs.
  			* @returns {State}
  			*   State.
  			*/
  			function handleListOfConstructs(list) {
  				listOfConstructs = list;
  				constructIndex = 0;
  				if (list.length === 0) return bogusState;
  				return handleConstruct(list[constructIndex]);
  			}
  			/**
  			* Handle a single construct.
  			*
  			* @param {Construct} construct
  			*   Construct.
  			* @returns {State}
  			*   State.
  			*/
  			function handleConstruct(construct) {
  				return start;
  				/** @type {State} */
  				function start(code) {
  					info = store();
  					currentConstruct = construct;
  					if (!construct.partial) context.currentConstruct = construct;
  					if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code);
  					return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
  				}
  			}
  			/** @type {State} */
  			function ok(code) {
  				onreturn(currentConstruct, info);
  				return returnState;
  			}
  			/** @type {State} */
  			function nok(code) {
  				info.restore();
  				if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
  				return bogusState;
  			}
  		}
  	}
  	/**
  	* @param {Construct} construct
  	*   Construct.
  	* @param {number} from
  	*   From.
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	function addResult(construct, from) {
  		if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
  		if (construct.resolve) splice(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
  		if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
  	}
  	/**
  	* Store state.
  	*
  	* @returns {Info}
  	*   Info.
  	*/
  	function store() {
  		const startPoint = now();
  		const startPrevious = context.previous;
  		const startCurrentConstruct = context.currentConstruct;
  		const startEventsIndex = context.events.length;
  		const startStack = Array.from(stack);
  		return {
  			from: startEventsIndex,
  			restore
  		};
  		/**
  		* Restore state.
  		*
  		* @returns {undefined}
  		*   Nothing.
  		*/
  		function restore() {
  			point = startPoint;
  			context.previous = startPrevious;
  			context.currentConstruct = startCurrentConstruct;
  			context.events.length = startEventsIndex;
  			stack = startStack;
  			accountForPotentialSkip();
  		}
  	}
  	/**
  	* Move the current point a bit forward in the line when it’s on a column
  	* skip.
  	*
  	* @returns {undefined}
  	*   Nothing.
  	*/
  	function accountForPotentialSkip() {
  		if (point.line in columnStart && point.column < 2) {
  			point.column = columnStart[point.line];
  			point.offset += columnStart[point.line] - 1;
  		}
  	}
  }
  /**
  * Get the chunks from a slice of chunks in the range of a token.
  *
  * @param {ReadonlyArray<Chunk>} chunks
  *   Chunks.
  * @param {Pick<Token, 'end' | 'start'>} token
  *   Token.
  * @returns {Array<Chunk>}
  *   Chunks.
  */
  function sliceChunks(chunks, token) {
  	const startIndex = token.start._index;
  	const startBufferIndex = token.start._bufferIndex;
  	const endIndex = token.end._index;
  	const endBufferIndex = token.end._bufferIndex;
  	/** @type {Array<Chunk>} */
  	let view;
  	if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  	else {
  		view = chunks.slice(startIndex, endIndex);
  		if (startBufferIndex > -1) {
  			const head = view[0];
  			if (typeof head === "string") view[0] = head.slice(startBufferIndex);
  			else view.shift();
  		}
  		if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
  	}
  	return view;
  }
  /**
  * Get the string value of a slice of chunks.
  *
  * @param {ReadonlyArray<Chunk>} chunks
  *   Chunks.
  * @param {boolean | undefined} [expandTabs=false]
  *   Whether to expand tabs (default: `false`).
  * @returns {string}
  *   Result.
  */
  function serializeChunks(chunks, expandTabs) {
  	let index = -1;
  	/** @type {Array<string>} */
  	const result = [];
  	/** @type {boolean | undefined} */
  	let atTab;
  	while (++index < chunks.length) {
  		const chunk = chunks[index];
  		/** @type {string} */
  		let value;
  		if (typeof chunk === "string") value = chunk;
  		else switch (chunk) {
  			case -5:
  				value = "\r";
  				break;
  			case -4:
  				value = "\n";
  				break;
  			case -3:
  				value = "\r\n";
  				break;
  			case -2:
  				value = expandTabs ? " " : "	";
  				break;
  			case -1:
  				if (!expandTabs && atTab) continue;
  				value = " ";
  				break;
  			default: value = String.fromCharCode(chunk);
  		}
  		atTab = chunk === -2;
  		result.push(value);
  	}
  	return result.join("");
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/parse.js
  /**
  * @import {
  *   Create,
  *   FullNormalizedExtension,
  *   InitialConstruct,
  *   ParseContext,
  *   ParseOptions
  * } from 'micromark-util-types'
  */
  /**
  * @param {ParseOptions | null | undefined} [options]
  *   Configuration (optional).
  * @returns {ParseContext}
  *   Parser.
  */
  function parse(options) {
  	/** @type {ParseContext} */
  	const parser = {
  		constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
  		content: create(content$1),
  		defined: [],
  		document: create(document$2),
  		flow: create(flow$1),
  		lazy: {},
  		string: create(string$1),
  		text: create(text$2)
  	};
  	return parser;
  	/**
  	* @param {InitialConstruct} initial
  	*   Construct to start with.
  	* @returns {Create}
  	*   Create a tokenizer.
  	*/
  	function create(initial) {
  		return creator;
  		/** @type {Create} */
  		function creator(from) {
  			return createTokenizer(parser, initial, from);
  		}
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/postprocess.js
  /**
  * @import {Event} from 'micromark-util-types'
  */
  /**
  * @param {Array<Event>} events
  *   Events.
  * @returns {Array<Event>}
  *   Events.
  */
  function postprocess(events) {
  	while (!subtokenize(events));
  	return events;
  }
  //#endregion
  //#region node_modules/.pnpm/micromark@4.0.2/node_modules/micromark/lib/preprocess.js
  /**
  * @import {Chunk, Code, Encoding, Value} from 'micromark-util-types'
  */
  /**
  * @callback Preprocessor
  *   Preprocess a value.
  * @param {Value} value
  *   Value.
  * @param {Encoding | null | undefined} [encoding]
  *   Encoding when `value` is a typed array (optional).
  * @param {boolean | null | undefined} [end=false]
  *   Whether this is the last chunk (default: `false`).
  * @returns {Array<Chunk>}
  *   Chunks.
  */
  var search = /[\0\t\n\r]/g;
  /**
  * @returns {Preprocessor}
  *   Preprocess a value.
  */
  function preprocess() {
  	let column = 1;
  	let buffer = "";
  	/** @type {boolean | undefined} */
  	let start = true;
  	/** @type {boolean | undefined} */
  	let atCarriageReturn;
  	return preprocessor;
  	/** @type {Preprocessor} */
  	function preprocessor(value, encoding, end) {
  		/** @type {Array<Chunk>} */
  		const chunks = [];
  		/** @type {RegExpMatchArray | null} */
  		let match;
  		/** @type {number} */
  		let next;
  		/** @type {number} */
  		let startPosition;
  		/** @type {number} */
  		let endPosition;
  		/** @type {Code} */
  		let code;
  		value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
  		startPosition = 0;
  		buffer = "";
  		if (start) {
  			if (value.charCodeAt(0) === 65279) startPosition++;
  			start = void 0;
  		}
  		while (startPosition < value.length) {
  			search.lastIndex = startPosition;
  			match = search.exec(value);
  			endPosition = match && match.index !== void 0 ? match.index : value.length;
  			code = value.charCodeAt(endPosition);
  			if (!match) {
  				buffer = value.slice(startPosition);
  				break;
  			}
  			if (code === 10 && startPosition === endPosition && atCarriageReturn) {
  				chunks.push(-3);
  				atCarriageReturn = void 0;
  			} else {
  				if (atCarriageReturn) {
  					chunks.push(-5);
  					atCarriageReturn = void 0;
  				}
  				if (startPosition < endPosition) {
  					chunks.push(value.slice(startPosition, endPosition));
  					column += endPosition - startPosition;
  				}
  				switch (code) {
  					case 0:
  						chunks.push(65533);
  						column++;
  						break;
  					case 9:
  						next = Math.ceil(column / 4) * 4;
  						chunks.push(-2);
  						while (column++ < next) chunks.push(-1);
  						break;
  					case 10:
  						chunks.push(-4);
  						column = 1;
  						break;
  					default:
  						atCarriageReturn = true;
  						column = 1;
  				}
  			}
  			startPosition = endPosition + 1;
  		}
  		if (end) {
  			if (atCarriageReturn) chunks.push(-5);
  			if (buffer) chunks.push(buffer);
  			chunks.push(null);
  		}
  		return chunks;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/micromark-util-decode-string@2.0.1/node_modules/micromark-util-decode-string/index.js
  var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  /**
  * Decode markdown strings (which occur in places such as fenced code info
  * strings, destinations, labels, and titles).
  *
  * The “string” content type allows character escapes and -references.
  * This decodes those.
  *
  * @param {string} value
  *   Value to decode.
  * @returns {string}
  *   Decoded value.
  */
  function decodeString(value) {
  	return value.replace(characterEscapeOrReference, decode);
  }
  /**
  * @param {string} $0
  *   Match.
  * @param {string} $1
  *   Character escape.
  * @param {string} $2
  *   Character reference.
  * @returns {string}
  *   Decoded value
  */
  function decode($0, $1, $2) {
  	if ($1) return $1;
  	if ($2.charCodeAt(0) === 35) {
  		const head = $2.charCodeAt(1);
  		const hex = head === 120 || head === 88;
  		return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  	}
  	return decodeNamedCharacterReference($2) || $0;
  }
  //#endregion
  //#region node_modules/.pnpm/unist-util-stringify-position@4.0.0/node_modules/unist-util-stringify-position/lib/index.js
  /**
  * @typedef {import('unist').Node} Node
  * @typedef {import('unist').Point} Point
  * @typedef {import('unist').Position} Position
  */
  /**
  * @typedef NodeLike
  * @property {string} type
  * @property {PositionLike | null | undefined} [position]
  *
  * @typedef PointLike
  * @property {number | null | undefined} [line]
  * @property {number | null | undefined} [column]
  * @property {number | null | undefined} [offset]
  *
  * @typedef PositionLike
  * @property {PointLike | null | undefined} [start]
  * @property {PointLike | null | undefined} [end]
  */
  /**
  * Serialize the positional info of a point, position (start and end points),
  * or node.
  *
  * @param {Node | NodeLike | Point | PointLike | Position | PositionLike | null | undefined} [value]
  *   Node, position, or point.
  * @returns {string}
  *   Pretty printed positional info of a node (`string`).
  *
  *   In the format of a range `ls:cs-le:ce` (when given `node` or `position`)
  *   or a point `l:c` (when given `point`), where `l` stands for line, `c` for
  *   column, `s` for `start`, and `e` for end.
  *   An empty string (`''`) is returned if the given value is neither `node`,
  *   `position`, nor `point`.
  */
  function stringifyPosition(value) {
  	if (!value || typeof value !== "object") return "";
  	if ("position" in value || "type" in value) return position(value.position);
  	if ("start" in value || "end" in value) return position(value);
  	if ("line" in value || "column" in value) return point$1(value);
  	return "";
  }
  /**
  * @param {Point | PointLike | null | undefined} point
  * @returns {string}
  */
  function point$1(point) {
  	return index(point && point.line) + ":" + index(point && point.column);
  }
  /**
  * @param {Position | PositionLike | null | undefined} pos
  * @returns {string}
  */
  function position(pos) {
  	return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
  }
  /**
  * @param {number | null | undefined} value
  * @returns {number}
  */
  function index(value) {
  	return value && typeof value === "number" ? value : 1;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-from-markdown@2.0.3/node_modules/mdast-util-from-markdown/lib/index.js
  /**
  * @import {
  *   Break,
  *   Blockquote,
  *   Code,
  *   Definition,
  *   Emphasis,
  *   Heading,
  *   Html,
  *   Image,
  *   InlineCode,
  *   Link,
  *   ListItem,
  *   List,
  *   Nodes,
  *   Paragraph,
  *   PhrasingContent,
  *   ReferenceType,
  *   Root,
  *   Strong,
  *   Text,
  *   ThematicBreak
  * } from 'mdast'
  * @import {
  *   Encoding,
  *   Event,
  *   Token,
  *   Value
  * } from 'micromark-util-types'
  * @import {Point} from 'unist'
  * @import {
  *   CompileContext,
  *   CompileData,
  *   Config,
  *   Extension,
  *   Handle,
  *   OnEnterError,
  *   Options
  * } from './types.js'
  */
  var own$2 = {}.hasOwnProperty;
  /**
  * Turn markdown into a syntax tree.
  *
  * @overload
  * @param {Value} value
  * @param {Encoding | null | undefined} [encoding]
  * @param {Options | null | undefined} [options]
  * @returns {Root}
  *
  * @overload
  * @param {Value} value
  * @param {Options | null | undefined} [options]
  * @returns {Root}
  *
  * @param {Value} value
  *   Markdown to parse.
  * @param {Encoding | Options | null | undefined} [encoding]
  *   Character encoding for when `value` is `Buffer`.
  * @param {Options | null | undefined} [options]
  *   Configuration.
  * @returns {Root}
  *   mdast tree.
  */
  function fromMarkdown(value, encoding, options) {
  	if (encoding && typeof encoding === "object") {
  		options = encoding;
  		encoding = void 0;
  	}
  	return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
  }
  /**
  * Note this compiler only understand complete buffering, not streaming.
  *
  * @param {Options | null | undefined} [options]
  */
  function compiler(options) {
  	/** @type {Config} */
  	const config = {
  		transforms: [],
  		canContainEols: [
  			"emphasis",
  			"fragment",
  			"heading",
  			"paragraph",
  			"strong"
  		],
  		enter: {
  			autolink: opener(link),
  			autolinkProtocol: onenterdata,
  			autolinkEmail: onenterdata,
  			atxHeading: opener(heading),
  			blockQuote: opener(blockQuote),
  			characterEscape: onenterdata,
  			characterReference: onenterdata,
  			codeFenced: opener(codeFlow),
  			codeFencedFenceInfo: buffer,
  			codeFencedFenceMeta: buffer,
  			codeIndented: opener(codeFlow, buffer),
  			codeText: opener(codeText, buffer),
  			codeTextData: onenterdata,
  			data: onenterdata,
  			codeFlowValue: onenterdata,
  			definition: opener(definition),
  			definitionDestinationString: buffer,
  			definitionLabelString: buffer,
  			definitionTitleString: buffer,
  			emphasis: opener(emphasis),
  			hardBreakEscape: opener(hardBreak),
  			hardBreakTrailing: opener(hardBreak),
  			htmlFlow: opener(html, buffer),
  			htmlFlowData: onenterdata,
  			htmlText: opener(html, buffer),
  			htmlTextData: onenterdata,
  			image: opener(image),
  			label: buffer,
  			link: opener(link),
  			listItem: opener(listItem),
  			listItemValue: onenterlistitemvalue,
  			listOrdered: opener(list, onenterlistordered),
  			listUnordered: opener(list),
  			paragraph: opener(paragraph),
  			reference: onenterreference,
  			referenceString: buffer,
  			resourceDestinationString: buffer,
  			resourceTitleString: buffer,
  			setextHeading: opener(heading),
  			strong: opener(strong),
  			thematicBreak: opener(thematicBreak)
  		},
  		exit: {
  			atxHeading: closer(),
  			atxHeadingSequence: onexitatxheadingsequence,
  			autolink: closer(),
  			autolinkEmail: onexitautolinkemail,
  			autolinkProtocol: onexitautolinkprotocol,
  			blockQuote: closer(),
  			characterEscapeValue: onexitdata,
  			characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
  			characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
  			characterReferenceValue: onexitcharacterreferencevalue,
  			characterReference: onexitcharacterreference,
  			codeFenced: closer(onexitcodefenced),
  			codeFencedFence: onexitcodefencedfence,
  			codeFencedFenceInfo: onexitcodefencedfenceinfo,
  			codeFencedFenceMeta: onexitcodefencedfencemeta,
  			codeFlowValue: onexitdata,
  			codeIndented: closer(onexitcodeindented),
  			codeText: closer(onexitcodetext),
  			codeTextData: onexitdata,
  			data: onexitdata,
  			definition: closer(),
  			definitionDestinationString: onexitdefinitiondestinationstring,
  			definitionLabelString: onexitdefinitionlabelstring,
  			definitionTitleString: onexitdefinitiontitlestring,
  			emphasis: closer(),
  			hardBreakEscape: closer(onexithardbreak),
  			hardBreakTrailing: closer(onexithardbreak),
  			htmlFlow: closer(onexithtmlflow),
  			htmlFlowData: onexitdata,
  			htmlText: closer(onexithtmltext),
  			htmlTextData: onexitdata,
  			image: closer(onexitimage),
  			label: onexitlabel,
  			labelText: onexitlabeltext,
  			lineEnding: onexitlineending,
  			link: closer(onexitlink),
  			listItem: closer(),
  			listOrdered: closer(),
  			listUnordered: closer(),
  			paragraph: closer(),
  			referenceString: onexitreferencestring,
  			resourceDestinationString: onexitresourcedestinationstring,
  			resourceTitleString: onexitresourcetitlestring,
  			resource: onexitresource,
  			setextHeading: closer(onexitsetextheading),
  			setextHeadingLineSequence: onexitsetextheadinglinesequence,
  			setextHeadingText: onexitsetextheadingtext,
  			strong: closer(),
  			thematicBreak: closer()
  		}
  	};
  	configure$1(config, (options || {}).mdastExtensions || []);
  	/** @type {CompileData} */
  	const data = {};
  	return compile;
  	/**
  	* Turn micromark events into an mdast tree.
  	*
  	* @param {Array<Event>} events
  	*   Events.
  	* @returns {Root}
  	*   mdast tree.
  	*/
  	function compile(events) {
  		/** @type {Root} */
  		let tree = {
  			type: "root",
  			children: []
  		};
  		/** @type {Omit<CompileContext, 'sliceSerialize'>} */
  		const context = {
  			stack: [tree],
  			tokenStack: [],
  			config,
  			enter,
  			exit,
  			buffer,
  			resume,
  			data
  		};
  		/** @type {Array<number>} */
  		const listStack = [];
  		let index = -1;
  		while (++index < events.length) if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") {
  			if (events[index][0] === "enter") listStack.push(index);
  			else index = prepareList(events, listStack.pop(), index);
  		}
  		index = -1;
  		while (++index < events.length) {
  			const handler = config[events[index][0]];
  			if (own$2.call(handler, events[index][1].type)) handler[events[index][1].type].call(Object.assign({ sliceSerialize: events[index][2].sliceSerialize }, context), events[index][1]);
  		}
  		if (context.tokenStack.length > 0) {
  			const tail = context.tokenStack[context.tokenStack.length - 1];
  			(tail[1] || defaultOnError).call(context, void 0, tail[0]);
  		}
  		tree.position = {
  			start: point(events.length > 0 ? events[0][1].start : {
  				line: 1,
  				column: 1,
  				offset: 0
  			}),
  			end: point(events.length > 0 ? events[events.length - 2][1].end : {
  				line: 1,
  				column: 1,
  				offset: 0
  			})
  		};
  		index = -1;
  		while (++index < config.transforms.length) tree = config.transforms[index](tree) || tree;
  		return tree;
  	}
  	/**
  	* @param {Array<Event>} events
  	* @param {number} start
  	* @param {number} length
  	* @returns {number}
  	*/
  	function prepareList(events, start, length) {
  		let index = start - 1;
  		let containerBalance = -1;
  		let listSpread = false;
  		/** @type {Token | undefined} */
  		let listItem;
  		/** @type {number | undefined} */
  		let lineIndex;
  		/** @type {number | undefined} */
  		let firstBlankLineIndex;
  		/** @type {boolean | undefined} */
  		let atMarker;
  		while (++index <= length) {
  			const event = events[index];
  			switch (event[1].type) {
  				case "listUnordered":
  				case "listOrdered":
  				case "blockQuote":
  					if (event[0] === "enter") containerBalance++;
  					else containerBalance--;
  					atMarker = void 0;
  					break;
  				case "lineEndingBlank":
  					if (event[0] === "enter") {
  						if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index;
  						atMarker = void 0;
  					}
  					break;
  				case "linePrefix":
  				case "listItemValue":
  				case "listItemMarker":
  				case "listItemPrefix":
  				case "listItemPrefixWhitespace": break;
  				default: atMarker = void 0;
  			}
  			if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
  				if (listItem) {
  					let tailIndex = index;
  					lineIndex = void 0;
  					while (tailIndex--) {
  						const tailEvent = events[tailIndex];
  						if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
  							if (tailEvent[0] === "exit") continue;
  							if (lineIndex) {
  								events[lineIndex][1].type = "lineEndingBlank";
  								listSpread = true;
  							}
  							tailEvent[1].type = "lineEnding";
  							lineIndex = tailIndex;
  						} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
  					}
  					if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem._spread = true;
  					listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
  					events.splice(lineIndex || index, 0, [
  						"exit",
  						listItem,
  						event[2]
  					]);
  					index++;
  					length++;
  				}
  				if (event[1].type === "listItemPrefix") {
  					/** @type {Token} */
  					const item = {
  						type: "listItem",
  						_spread: false,
  						start: Object.assign({}, event[1].start),
  						end: void 0
  					};
  					listItem = item;
  					events.splice(index, 0, [
  						"enter",
  						item,
  						event[2]
  					]);
  					index++;
  					length++;
  					firstBlankLineIndex = void 0;
  					atMarker = true;
  				}
  			}
  		}
  		events[start][1]._spread = listSpread;
  		return length;
  	}
  	/**
  	* Create an opener handle.
  	*
  	* @param {(token: Token) => Nodes} create
  	*   Create a node.
  	* @param {Handle | undefined} [and]
  	*   Optional function to also run.
  	* @returns {Handle}
  	*   Handle.
  	*/
  	function opener(create, and) {
  		return open;
  		/**
  		* @this {CompileContext}
  		* @param {Token} token
  		* @returns {undefined}
  		*/
  		function open(token) {
  			enter.call(this, create(token), token);
  			if (and) and.call(this, token);
  		}
  	}
  	/**
  	* @type {CompileContext['buffer']}
  	*/
  	function buffer() {
  		this.stack.push({
  			type: "fragment",
  			children: []
  		});
  	}
  	/**
  	* @type {CompileContext['enter']}
  	*/
  	function enter(node, token, errorHandler) {
  		this.stack[this.stack.length - 1].children.push(node);
  		this.stack.push(node);
  		this.tokenStack.push([token, errorHandler || void 0]);
  		node.position = {
  			start: point(token.start),
  			end: void 0
  		};
  	}
  	/**
  	* Create a closer handle.
  	*
  	* @param {Handle | undefined} [and]
  	*   Optional function to also run.
  	* @returns {Handle}
  	*   Handle.
  	*/
  	function closer(and) {
  		return close;
  		/**
  		* @this {CompileContext}
  		* @param {Token} token
  		* @returns {undefined}
  		*/
  		function close(token) {
  			if (and) and.call(this, token);
  			exit.call(this, token);
  		}
  	}
  	/**
  	* @type {CompileContext['exit']}
  	*/
  	function exit(token, onExitError) {
  		const node = this.stack.pop();
  		const open = this.tokenStack.pop();
  		if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
  			start: token.start,
  			end: token.end
  		}) + "): it’s not open");
  		else if (open[0].type !== token.type) {
  			if (onExitError) onExitError.call(this, token, open[0]);
  			else (open[1] || defaultOnError).call(this, token, open[0]);
  		}
  		node.position.end = point(token.end);
  	}
  	/**
  	* @type {CompileContext['resume']}
  	*/
  	function resume() {
  		return toString(this.stack.pop());
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onenterlistordered() {
  		this.data.expectingFirstListItemValue = true;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onenterlistitemvalue(token) {
  		if (this.data.expectingFirstListItemValue) {
  			const ancestor = this.stack[this.stack.length - 2];
  			ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
  			this.data.expectingFirstListItemValue = void 0;
  		}
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcodefencedfenceinfo() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.lang = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcodefencedfencemeta() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.meta = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcodefencedfence() {
  		if (this.data.flowCodeInside) return;
  		this.buffer();
  		this.data.flowCodeInside = true;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcodefenced() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
  		this.data.flowCodeInside = void 0;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcodeindented() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.value = data.replace(/(\r?\n|\r)$/g, "");
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitdefinitionlabelstring(token) {
  		const label = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.label = label;
  		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitdefinitiontitlestring() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.title = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitdefinitiondestinationstring() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.url = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitatxheadingsequence(token) {
  		const node = this.stack[this.stack.length - 1];
  		if (!node.depth) node.depth = this.sliceSerialize(token).length;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitsetextheadingtext() {
  		this.data.setextHeadingSlurpLineEnding = true;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitsetextheadinglinesequence(token) {
  		const node = this.stack[this.stack.length - 1];
  		node.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitsetextheading() {
  		this.data.setextHeadingSlurpLineEnding = void 0;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onenterdata(token) {
  		/** @type {Array<Nodes>} */
  		const siblings = this.stack[this.stack.length - 1].children;
  		let tail = siblings[siblings.length - 1];
  		if (!tail || tail.type !== "text") {
  			tail = text();
  			tail.position = {
  				start: point(token.start),
  				end: void 0
  			};
  			siblings.push(tail);
  		}
  		this.stack.push(tail);
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitdata(token) {
  		const tail = this.stack.pop();
  		tail.value += this.sliceSerialize(token);
  		tail.position.end = point(token.end);
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitlineending(token) {
  		const context = this.stack[this.stack.length - 1];
  		if (this.data.atHardBreak) {
  			const tail = context.children[context.children.length - 1];
  			tail.position.end = point(token.end);
  			this.data.atHardBreak = void 0;
  			return;
  		}
  		if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
  			onenterdata.call(this, token);
  			onexitdata.call(this, token);
  		}
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexithardbreak() {
  		this.data.atHardBreak = true;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexithtmlflow() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.value = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexithtmltext() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.value = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcodetext() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.value = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitlink() {
  		const node = this.stack[this.stack.length - 1];
  		if (this.data.inReference) {
  			/** @type {ReferenceType} */
  			const referenceType = this.data.referenceType || "shortcut";
  			node.type += "Reference";
  			node.referenceType = referenceType;
  			delete node.url;
  			delete node.title;
  		} else {
  			delete node.identifier;
  			delete node.label;
  		}
  		this.data.referenceType = void 0;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitimage() {
  		const node = this.stack[this.stack.length - 1];
  		if (this.data.inReference) {
  			/** @type {ReferenceType} */
  			const referenceType = this.data.referenceType || "shortcut";
  			node.type += "Reference";
  			node.referenceType = referenceType;
  			delete node.url;
  			delete node.title;
  		} else {
  			delete node.identifier;
  			delete node.label;
  		}
  		this.data.referenceType = void 0;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitlabeltext(token) {
  		const string = this.sliceSerialize(token);
  		const ancestor = this.stack[this.stack.length - 2];
  		ancestor.label = decodeString(string);
  		ancestor.identifier = normalizeIdentifier(string).toLowerCase();
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitlabel() {
  		const fragment = this.stack[this.stack.length - 1];
  		const value = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		this.data.inReference = true;
  		if (node.type === "link") node.children = fragment.children;
  		else node.alt = value;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitresourcedestinationstring() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.url = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitresourcetitlestring() {
  		const data = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.title = data;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitresource() {
  		this.data.inReference = void 0;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onenterreference() {
  		this.data.referenceType = "collapsed";
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitreferencestring(token) {
  		const label = this.resume();
  		const node = this.stack[this.stack.length - 1];
  		node.label = label;
  		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  		this.data.referenceType = "full";
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcharacterreferencemarker(token) {
  		this.data.characterReferenceType = token.type;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcharacterreferencevalue(token) {
  		const data = this.sliceSerialize(token);
  		const type = this.data.characterReferenceType;
  		/** @type {string} */
  		let value;
  		if (type) {
  			value = decodeNumericCharacterReference(data, type === "characterReferenceMarkerNumeric" ? 10 : 16);
  			this.data.characterReferenceType = void 0;
  		} else value = decodeNamedCharacterReference(data);
  		const tail = this.stack[this.stack.length - 1];
  		tail.value += value;
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitcharacterreference(token) {
  		const tail = this.stack.pop();
  		tail.position.end = point(token.end);
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitautolinkprotocol(token) {
  		onexitdata.call(this, token);
  		const node = this.stack[this.stack.length - 1];
  		node.url = this.sliceSerialize(token);
  	}
  	/**
  	* @this {CompileContext}
  	* @type {Handle}
  	*/
  	function onexitautolinkemail(token) {
  		onexitdata.call(this, token);
  		const node = this.stack[this.stack.length - 1];
  		node.url = "mailto:" + this.sliceSerialize(token);
  	}
  	/** @returns {Blockquote} */
  	function blockQuote() {
  		return {
  			type: "blockquote",
  			children: []
  		};
  	}
  	/** @returns {Code} */
  	function codeFlow() {
  		return {
  			type: "code",
  			lang: null,
  			meta: null,
  			value: ""
  		};
  	}
  	/** @returns {InlineCode} */
  	function codeText() {
  		return {
  			type: "inlineCode",
  			value: ""
  		};
  	}
  	/** @returns {Definition} */
  	function definition() {
  		return {
  			type: "definition",
  			identifier: "",
  			label: null,
  			title: null,
  			url: ""
  		};
  	}
  	/** @returns {Emphasis} */
  	function emphasis() {
  		return {
  			type: "emphasis",
  			children: []
  		};
  	}
  	/** @returns {Heading} */
  	function heading() {
  		return {
  			type: "heading",
  			depth: 0,
  			children: []
  		};
  	}
  	/** @returns {Break} */
  	function hardBreak() {
  		return { type: "break" };
  	}
  	/** @returns {Html} */
  	function html() {
  		return {
  			type: "html",
  			value: ""
  		};
  	}
  	/** @returns {Image} */
  	function image() {
  		return {
  			type: "image",
  			title: null,
  			url: "",
  			alt: null
  		};
  	}
  	/** @returns {Link} */
  	function link() {
  		return {
  			type: "link",
  			title: null,
  			url: "",
  			children: []
  		};
  	}
  	/**
  	* @param {Token} token
  	* @returns {List}
  	*/
  	function list(token) {
  		return {
  			type: "list",
  			ordered: token.type === "listOrdered",
  			start: null,
  			spread: token._spread,
  			children: []
  		};
  	}
  	/**
  	* @param {Token} token
  	* @returns {ListItem}
  	*/
  	function listItem(token) {
  		return {
  			type: "listItem",
  			spread: token._spread,
  			checked: null,
  			children: []
  		};
  	}
  	/** @returns {Paragraph} */
  	function paragraph() {
  		return {
  			type: "paragraph",
  			children: []
  		};
  	}
  	/** @returns {Strong} */
  	function strong() {
  		return {
  			type: "strong",
  			children: []
  		};
  	}
  	/** @returns {Text} */
  	function text() {
  		return {
  			type: "text",
  			value: ""
  		};
  	}
  	/** @returns {ThematicBreak} */
  	function thematicBreak() {
  		return { type: "thematicBreak" };
  	}
  }
  /**
  * Copy a point-like value.
  *
  * @param {Point} d
  *   Point-like value.
  * @returns {Point}
  *   unist point.
  */
  function point(d) {
  	return {
  		line: d.line,
  		column: d.column,
  		offset: d.offset
  	};
  }
  /**
  * @param {Config} combined
  * @param {Array<Array<Extension> | Extension>} extensions
  * @returns {undefined}
  */
  function configure$1(combined, extensions) {
  	let index = -1;
  	while (++index < extensions.length) {
  		const value = extensions[index];
  		if (Array.isArray(value)) configure$1(combined, value);
  		else extension(combined, value);
  	}
  }
  /**
  * @param {Config} combined
  * @param {Extension} extension
  * @returns {undefined}
  */
  function extension(combined, extension) {
  	/** @type {keyof Extension} */
  	let key;
  	for (key in extension) if (own$2.call(extension, key)) switch (key) {
  		case "canContainEols": {
  			const right = extension[key];
  			if (right) combined[key].push(...right);
  			break;
  		}
  		case "transforms": {
  			const right = extension[key];
  			if (right) combined[key].push(...right);
  			break;
  		}
  		case "enter":
  		case "exit": {
  			const right = extension[key];
  			if (right) Object.assign(combined[key], right);
  			break;
  		}
  	}
  }
  /** @type {OnEnterError} */
  function defaultOnError(left, right) {
  	if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
  		start: left.start,
  		end: left.end
  	}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
  		start: right.start,
  		end: right.end
  	}) + ") is open");
  	else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
  		start: right.start,
  		end: right.end
  	}) + ") is still open");
  }
  //#endregion
  //#region node_modules/.pnpm/zwitch@2.0.4/node_modules/zwitch/index.js
  /**
  * @callback Handler
  *   Handle a value, with a certain ID field set to a certain value.
  *   The ID field is passed to `zwitch`, and it’s value is this function’s
  *   place on the `handlers` record.
  * @param {...any} parameters
  *   Arbitrary parameters passed to the zwitch.
  *   The first will be an object with a certain ID field set to a certain value.
  * @returns {any}
  *   Anything!
  */
  /**
  * @callback UnknownHandler
  *   Handle values that do have a certain ID field, but it’s set to a value
  *   that is not listed in the `handlers` record.
  * @param {unknown} value
  *   An object with a certain ID field set to an unknown value.
  * @param {...any} rest
  *   Arbitrary parameters passed to the zwitch.
  * @returns {any}
  *   Anything!
  */
  /**
  * @callback InvalidHandler
  *   Handle values that do not have a certain ID field.
  * @param {unknown} value
  *   Any unknown value.
  * @param {...any} rest
  *   Arbitrary parameters passed to the zwitch.
  * @returns {void|null|undefined|never}
  *   This should crash or return nothing.
  */
  /**
  * @template {InvalidHandler} [Invalid=InvalidHandler]
  * @template {UnknownHandler} [Unknown=UnknownHandler]
  * @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
  * @typedef Options
  *   Configuration (required).
  * @property {Invalid} [invalid]
  *   Handler to use for invalid values.
  * @property {Unknown} [unknown]
  *   Handler to use for unknown values.
  * @property {Handlers} [handlers]
  *   Handlers to use.
  */
  var own$1 = {}.hasOwnProperty;
  /**
  * Handle values based on a field.
  *
  * @template {InvalidHandler} [Invalid=InvalidHandler]
  * @template {UnknownHandler} [Unknown=UnknownHandler]
  * @template {Record<string, Handler>} [Handlers=Record<string, Handler>]
  * @param {string} key
  *   Field to switch on.
  * @param {Options<Invalid, Unknown, Handlers>} [options]
  *   Configuration (required).
  * @returns {{unknown: Unknown, invalid: Invalid, handlers: Handlers, (...parameters: Parameters<Handlers[keyof Handlers]>): ReturnType<Handlers[keyof Handlers]>, (...parameters: Parameters<Unknown>): ReturnType<Unknown>}}
  */
  function zwitch(key, options) {
  	const settings = options || {};
  	/**
  	* Handle one value.
  	*
  	* Based on the bound `key`, a respective handler will be called.
  	* If `value` is not an object, or doesn’t have a `key` property, the special
  	* “invalid” handler will be called.
  	* If `value` has an unknown `key`, the special “unknown” handler will be
  	* called.
  	*
  	* All arguments, and the context object, are passed through to the handler,
  	* and it’s result is returned.
  	*
  	* @this {unknown}
  	*   Any context object.
  	* @param {unknown} [value]
  	*   Any value.
  	* @param {...unknown} parameters
  	*   Arbitrary parameters passed to the zwitch.
  	* @property {Handler} invalid
  	*   Handle for values that do not have a certain ID field.
  	* @property {Handler} unknown
  	*   Handle values that do have a certain ID field, but it’s set to a value
  	*   that is not listed in the `handlers` record.
  	* @property {Handlers} handlers
  	*   Record of handlers.
  	* @returns {unknown}
  	*   Anything.
  	*/
  	function one(value, ...parameters) {
  		/** @type {Handler|undefined} */
  		let fn = one.invalid;
  		const handlers = one.handlers;
  		if (value && own$1.call(value, key)) {
  			const id = String(value[key]);
  			fn = own$1.call(handlers, id) ? handlers[id] : one.unknown;
  		}
  		if (fn) return fn.call(this, value, ...parameters);
  	}
  	one.handlers = settings.handlers || {};
  	one.invalid = settings.invalid;
  	one.unknown = settings.unknown;
  	return one;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/configure.js
  /**
  * @import {Options, State} from './types.js'
  */
  var own = {}.hasOwnProperty;
  /**
  * @param {State} base
  * @param {Options} extension
  * @returns {State}
  */
  function configure(base, extension) {
  	let index = -1;
  	/** @type {keyof Options} */
  	let key;
  	if (extension.extensions) while (++index < extension.extensions.length) configure(base, extension.extensions[index]);
  	for (key in extension) if (own.call(extension, key)) switch (key) {
  		case "extensions": break;
  		/* c8 ignore next 4 */
  		case "unsafe":
  			list$1(base[key], extension[key]);
  			break;
  		case "join":
  			list$1(base[key], extension[key]);
  			break;
  		case "handlers":
  			map$2(base[key], extension[key]);
  			break;
  		default: base.options[key] = extension[key];
  	}
  	return base;
  }
  /**
  * @template T
  * @param {Array<T>} left
  * @param {Array<T> | null | undefined} right
  */
  function list$1(left, right) {
  	if (right) left.push(...right);
  }
  /**
  * @template T
  * @param {Record<string, T>} left
  * @param {Record<string, T> | null | undefined} right
  */
  function map$2(left, right) {
  	if (right) Object.assign(left, right);
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
  /**
  * @import {Blockquote, Parents} from 'mdast'
  * @import {Info, Map, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {Blockquote} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function blockquote(node, _, state, info) {
  	const exit = state.enter("blockquote");
  	const tracker = state.createTracker(info);
  	tracker.move("> ");
  	tracker.shift(2);
  	const value = state.indentLines(state.containerFlow(node, tracker.current()), map$1);
  	exit();
  	return value;
  }
  /** @type {Map} */
  function map$1(line, _, blank) {
  	return ">" + (blank ? "" : " ") + line;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
  /**
  * @import {ConstructName, Unsafe} from 'mdast-util-to-markdown'
  */
  /**
  * @param {Array<ConstructName>} stack
  * @param {Unsafe} pattern
  * @returns {boolean}
  */
  function patternInScope(stack, pattern) {
  	return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
  }
  /**
  * @param {Array<ConstructName>} stack
  * @param {Unsafe['inConstruct']} list
  * @param {boolean} none
  * @returns {boolean}
  */
  function listInScope(stack, list, none) {
  	if (typeof list === "string") list = [list];
  	if (!list || list.length === 0) return none;
  	let index = -1;
  	while (++index < list.length) if (stack.includes(list[index])) return true;
  	return false;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/break.js
  /**
  * @import {Break, Parents} from 'mdast'
  * @import {Info, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {Break} _
  * @param {Parents | undefined} _1
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function hardBreak(_, _1, state, info) {
  	let index = -1;
  	while (++index < state.unsafe.length) if (state.unsafe[index].character === "\n" && patternInScope(state.stack, state.unsafe[index])) return /[ \t]/.test(info.before) ? "" : " ";
  	return "\\\n";
  }
  //#endregion
  //#region node_modules/.pnpm/longest-streak@3.1.0/node_modules/longest-streak/index.js
  /**
  * Get the count of the longest repeating streak of `substring` in `value`.
  *
  * @param {string} value
  *   Content to search in.
  * @param {string} substring
  *   Substring to look for, typically one character.
  * @returns {number}
  *   Count of most frequent adjacent `substring`s in `value`.
  */
  function longestStreak(value, substring) {
  	const source = String(value);
  	let index = source.indexOf(substring);
  	let expected = index;
  	let count = 0;
  	let max = 0;
  	if (typeof substring !== "string") throw new TypeError("Expected substring");
  	while (index !== -1) {
  		if (index === expected) {
  			if (++count > max) max = count;
  		} else count = 1;
  		expected = index + substring.length;
  		index = source.indexOf(substring, expected);
  	}
  	return max;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
  /**
  * @import {State} from 'mdast-util-to-markdown'
  * @import {Code} from 'mdast'
  */
  /**
  * @param {Code} node
  * @param {State} state
  * @returns {boolean}
  */
  function formatCodeAsIndented(node, state) {
  	return Boolean(state.options.fences === false && node.value && !node.lang && /[^ \r\n]/.test(node.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value));
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-fence.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['fence'], null | undefined>}
  */
  function checkFence(state) {
  	const marker = state.options.fence || "`";
  	if (marker !== "`" && marker !== "~") throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/code.js
  /**
  * @import {Info, Map, State} from 'mdast-util-to-markdown'
  * @import {Code, Parents} from 'mdast'
  */
  /**
  * @param {Code} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function code(node, _, state, info) {
  	const marker = checkFence(state);
  	const raw = node.value || "";
  	const suffix = marker === "`" ? "GraveAccent" : "Tilde";
  	if (formatCodeAsIndented(node, state)) {
  		const exit = state.enter("codeIndented");
  		const value = state.indentLines(raw, map);
  		exit();
  		return value;
  	}
  	const tracker = state.createTracker(info);
  	const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
  	const exit = state.enter("codeFenced");
  	let value = tracker.move(sequence);
  	if (node.lang) {
  		const subexit = state.enter(`codeFencedLang${suffix}`);
  		value += tracker.move(state.safe(node.lang, {
  			before: value,
  			after: " ",
  			encode: ["`"],
  			...tracker.current()
  		}));
  		subexit();
  	}
  	if (node.lang && node.meta) {
  		const subexit = state.enter(`codeFencedMeta${suffix}`);
  		value += tracker.move(" ");
  		value += tracker.move(state.safe(node.meta, {
  			before: value,
  			after: "\n",
  			encode: ["`"],
  			...tracker.current()
  		}));
  		subexit();
  	}
  	value += tracker.move("\n");
  	if (raw) value += tracker.move(raw + "\n");
  	value += tracker.move(sequence);
  	exit();
  	return value;
  }
  /** @type {Map} */
  function map(line, _, blank) {
  	return (blank ? "" : "    ") + line;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-quote.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['quote'], null | undefined>}
  */
  function checkQuote(state) {
  	const marker = state.options.quote || "\"";
  	if (marker !== "\"" && marker !== "'") throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/definition.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Definition, Parents} from 'mdast'
  */
  /**
  * @param {Definition} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function definition(node, _, state, info) {
  	const quote = checkQuote(state);
  	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
  	const exit = state.enter("definition");
  	let subexit = state.enter("label");
  	const tracker = state.createTracker(info);
  	let value = tracker.move("[");
  	value += tracker.move(state.safe(state.associationId(node), {
  		before: value,
  		after: "]",
  		...tracker.current()
  	}));
  	value += tracker.move("]: ");
  	subexit();
  	if (!node.url || /[\0- \u007F]/.test(node.url)) {
  		subexit = state.enter("destinationLiteral");
  		value += tracker.move("<");
  		value += tracker.move(state.safe(node.url, {
  			before: value,
  			after: ">",
  			...tracker.current()
  		}));
  		value += tracker.move(">");
  	} else {
  		subexit = state.enter("destinationRaw");
  		value += tracker.move(state.safe(node.url, {
  			before: value,
  			after: node.title ? " " : "\n",
  			...tracker.current()
  		}));
  	}
  	subexit();
  	if (node.title) {
  		subexit = state.enter(`title${suffix}`);
  		value += tracker.move(" " + quote);
  		value += tracker.move(state.safe(node.title, {
  			before: value,
  			after: quote,
  			...tracker.current()
  		}));
  		value += tracker.move(quote);
  		subexit();
  	}
  	exit();
  	return value;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['emphasis'], null | undefined>}
  */
  function checkEmphasis(state) {
  	const marker = state.options.emphasis || "*";
  	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
  /**
  * Encode a code point as a character reference.
  *
  * @param {number} code
  *   Code point to encode.
  * @returns {string}
  *   Encoded character reference.
  */
  function encodeCharacterReference(code) {
  	return "&#x" + code.toString(16).toUpperCase() + ";";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/encode-info.js
  /**
  * @import {EncodeSides} from '../types.js'
  */
  /**
  * Check whether to encode (as a character reference) the characters
  * surrounding an attention run.
  *
  * Which characters are around an attention run influence whether it works or
  * not.
  *
  * See <https://github.com/orgs/syntax-tree/discussions/60> for more info.
  * See this markdown in a particular renderer to see what works:
  *
  * ```markdown
  * |                         | A (letter inside) | B (punctuation inside) | C (whitespace inside) | D (nothing inside) |
  * | ----------------------- | ----------------- | ---------------------- | --------------------- | ------------------ |
  * | 1 (letter outside)      | x*y*z             | x*.*z                  | x* *z                 | x**z               |
  * | 2 (punctuation outside) | .*y*.             | .*.*.                  | .* *.                 | .**.               |
  * | 3 (whitespace outside)  | x *y* z           | x *.* z                | x * * z               | x ** z             |
  * | 4 (nothing outside)     | *x*               | *.*                    | * *                   | **                 |
  * ```
  *
  * @param {number} outside
  *   Code point on the outer side of the run.
  * @param {number} inside
  *   Code point on the inner side of the run.
  * @param {'*' | '_'} marker
  *   Marker of the run.
  *   Underscores are handled more strictly (they form less often) than
  *   asterisks.
  * @returns {EncodeSides}
  *   Whether to encode characters.
  */
  function encodeInfo(outside, inside, marker) {
  	const outsideKind = classifyCharacter(outside);
  	const insideKind = classifyCharacter(inside);
  	if (outsideKind === void 0) return insideKind === void 0 ? marker === "_" ? {
  		inside: true,
  		outside: true
  	} : {
  		inside: false,
  		outside: false
  	} : insideKind === 1 ? {
  		inside: true,
  		outside: true
  	} : {
  		inside: false,
  		outside: true
  	};
  	if (outsideKind === 1) return insideKind === void 0 ? {
  		inside: false,
  		outside: false
  	} : insideKind === 1 ? {
  		inside: true,
  		outside: true
  	} : {
  		inside: false,
  		outside: false
  	};
  	return insideKind === void 0 ? {
  		inside: false,
  		outside: false
  	} : insideKind === 1 ? {
  		inside: true,
  		outside: false
  	} : {
  		inside: false,
  		outside: false
  	};
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Emphasis, Parents} from 'mdast'
  */
  emphasis.peek = emphasisPeek;
  /**
  * @param {Emphasis} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function emphasis(node, _, state, info) {
  	const marker = checkEmphasis(state);
  	const exit = state.enter("emphasis");
  	const tracker = state.createTracker(info);
  	const before = tracker.move(marker);
  	let between = tracker.move(state.containerPhrasing(node, {
  		after: marker,
  		before,
  		...tracker.current()
  	}));
  	const betweenHead = between.charCodeAt(0);
  	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
  	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
  	const betweenTail = between.charCodeAt(between.length - 1);
  	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  	const after = tracker.move(marker);
  	exit();
  	state.attentionEncodeSurroundingInfo = {
  		after: close.outside,
  		before: open.outside
  	};
  	return before + between + after;
  }
  /**
  * @param {Emphasis} _
  * @param {Parents | undefined} _1
  * @param {State} state
  * @returns {string}
  */
  function emphasisPeek(_, _1, state) {
  	return state.options.emphasis || "*";
  }
  //#endregion
  //#region node_modules/.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/lib/index.js
  /**
  * Generate an assertion from a test.
  *
  * Useful if you’re going to test many nodes, for example when creating a
  * utility where something else passes a compatible test.
  *
  * The created function is a bit faster because it expects valid input only:
  * a `node`, `index`, and `parent`.
  *
  * @param {Test} test
  *   *   when nullish, checks if `node` is a `Node`.
  *   *   when `string`, works like passing `(node) => node.type === test`.
  *   *   when `function` checks if function passed the node is true.
  *   *   when `object`, checks that all keys in test are in node, and that they have (strictly) equal values.
  *   *   when `array`, checks if any one of the subtests pass.
  * @returns {Check}
  *   An assertion.
  */
  var convert = (
  /**
  * @param {Test} [test]
  * @returns {Check}
  */
  function(test) {
  	if (test === null || test === void 0) return ok;
  	if (typeof test === "function") return castFactory(test);
  	if (typeof test === "object") return Array.isArray(test) ? anyFactory(test) : propertiesFactory(test);
  	if (typeof test === "string") return typeFactory(test);
  	throw new Error("Expected function, string, or object as test");
  });
  /**
  * @param {Array<Props | TestFunction | string>} tests
  * @returns {Check}
  */
  function anyFactory(tests) {
  	/** @type {Array<Check>} */
  	const checks = [];
  	let index = -1;
  	while (++index < tests.length) checks[index] = convert(tests[index]);
  	return castFactory(any);
  	/**
  	* @this {unknown}
  	* @type {TestFunction}
  	*/
  	function any(...parameters) {
  		let index = -1;
  		while (++index < checks.length) if (checks[index].apply(this, parameters)) return true;
  		return false;
  	}
  }
  /**
  * Turn an object into a test for a node with a certain fields.
  *
  * @param {Props} check
  * @returns {Check}
  */
  function propertiesFactory(check) {
  	const checkAsRecord = check;
  	return castFactory(all);
  	/**
  	* @param {Node} node
  	* @returns {boolean}
  	*/
  	function all(node) {
  		const nodeAsRecord = node;
  		/** @type {string} */
  		let key;
  		for (key in check) if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
  		return true;
  	}
  }
  /**
  * Turn a string into a test for a node with a certain type.
  *
  * @param {string} check
  * @returns {Check}
  */
  function typeFactory(check) {
  	return castFactory(type);
  	/**
  	* @param {Node} node
  	*/
  	function type(node) {
  		return node && node.type === check;
  	}
  }
  /**
  * Turn a custom test into a test for a node that passes that test.
  *
  * @param {TestFunction} testFunction
  * @returns {Check}
  */
  function castFactory(testFunction) {
  	return check;
  	/**
  	* @this {unknown}
  	* @type {Check}
  	*/
  	function check(value, index, parent) {
  		return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index === "number" ? index : void 0, parent || void 0));
  	}
  }
  function ok() {
  	return true;
  }
  /**
  * @param {unknown} value
  * @returns {value is Node}
  */
  function looksLikeANode(value) {
  	return value !== null && typeof value === "object" && "type" in value;
  }
  //#endregion
  //#region node_modules/.pnpm/unist-util-visit-parents@6.0.2/node_modules/unist-util-visit-parents/lib/color.js
  /**
  * @param {string} d
  * @returns {string}
  */
  function color(d) {
  	return d;
  }
  //#endregion
  //#region node_modules/.pnpm/unist-util-visit-parents@6.0.2/node_modules/unist-util-visit-parents/lib/index.js
  /**
  * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
  */
  /**
  * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
  *   Test from `unist-util-is`.
  *
  *   Note: we have remove and add `undefined`, because otherwise when generating
  *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
  *   which doesn’t work when publishing on npm.
  */
  /**
  * @typedef {(
  *   Fn extends (value: any) => value is infer Thing
  *   ? Thing
  *   : Fallback
  * )} Predicate
  *   Get the value of a type guard `Fn`.
  * @template Fn
  *   Value; typically function that is a type guard (such as `(x): x is Y`).
  * @template Fallback
  *   Value to yield if `Fn` is not a type guard.
  */
  /**
  * @typedef {(
  *   Check extends null | undefined // No test.
  *   ? Value
  *   : Value extends {type: Check} // String (type) test.
  *   ? Value
  *   : Value extends Check // Partial test.
  *   ? Value
  *   : Check extends Function // Function test.
  *   ? Predicate<Check, Value> extends Value
  *     ? Predicate<Check, Value>
  *     : never
  *   : never // Some other test?
  * )} MatchesOne
  *   Check whether a node matches a primitive check in the type system.
  * @template Value
  *   Value; typically unist `Node`.
  * @template Check
  *   Value; typically `unist-util-is`-compatible test, but not arrays.
  */
  /**
  * @typedef {(
  *   Check extends ReadonlyArray<infer T>
  *   ? MatchesOne<Value, T>
  *   : Check extends Array<infer T>
  *   ? MatchesOne<Value, T>
  *   : MatchesOne<Value, Check>
  * )} Matches
  *   Check whether a node matches a check in the type system.
  * @template Value
  *   Value; typically unist `Node`.
  * @template Check
  *   Value; typically `unist-util-is`-compatible test.
  */
  /**
  * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
  *   Number; capped reasonably.
  */
  /**
  * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
  *   Increment a number in the type system.
  * @template {Uint} [I=0]
  *   Index.
  */
  /**
  * @typedef {(
  *   Node extends UnistParent
  *   ? Node extends {children: Array<infer Children>}
  *     ? Child extends Children ? Node : never
  *     : never
  *   : never
  * )} InternalParent
  *   Collect nodes that can be parents of `Child`.
  * @template {UnistNode} Node
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  */
  /**
  * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
  *   Collect nodes in `Tree` that can be parents of `Child`.
  * @template {UnistNode} Tree
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  */
  /**
  * @typedef {(
  *   Depth extends Max
  *   ? never
  *   :
  *     | InternalParent<Node, Child>
  *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
  * )} InternalAncestor
  *   Collect nodes in `Tree` that can be ancestors of `Child`.
  * @template {UnistNode} Node
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  * @template {Uint} [Max=10]
  *   Max; searches up to this depth.
  * @template {Uint} [Depth=0]
  *   Current depth.
  */
  /**
  * @typedef {InternalAncestor<InclusiveDescendant<Tree>, Child>} Ancestor
  *   Collect nodes in `Tree` that can be ancestors of `Child`.
  * @template {UnistNode} Tree
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  */
  /**
  * @typedef {(
  *   Tree extends UnistParent
  *     ? Depth extends Max
  *       ? Tree
  *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
  *     : Tree
  * )} InclusiveDescendant
  *   Collect all (inclusive) descendants of `Tree`.
  *
  *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
  *   > recurse without actually running into an infinite loop, which the
  *   > previous version did.
  *   >
  *   > Practically, a max of `2` is typically enough assuming a `Root` is
  *   > passed, but it doesn’t improve performance.
  *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
  *   > Using up to `10` doesn’t hurt or help either.
  * @template {UnistNode} Tree
  *   Tree type.
  * @template {Uint} [Max=10]
  *   Max; searches up to this depth.
  * @template {Uint} [Depth=0]
  *   Current depth.
  */
  /**
  * @typedef {'skip' | boolean} Action
  *   Union of the action types.
  *
  * @typedef {number} Index
  *   Move to the sibling at `index` next (after node itself is completely
  *   traversed).
  *
  *   Useful if mutating the tree, such as removing the node the visitor is
  *   currently on, or any of its previous siblings.
  *   Results less than 0 or greater than or equal to `children.length` stop
  *   traversing the parent.
  *
  * @typedef {[(Action | null | undefined | void)?, (Index | null | undefined)?]} ActionTuple
  *   List with one or two values, the first an action, the second an index.
  *
  * @typedef {Action | ActionTuple | Index | null | undefined | void} VisitorResult
  *   Any value that can be returned from a visitor.
  */
  /**
  * @callback Visitor
  *   Handle a node (matching `test`, if given).
  *
  *   Visitors are free to transform `node`.
  *   They can also transform the parent of node (the last of `ancestors`).
  *
  *   Replacing `node` itself, if `SKIP` is not returned, still causes its
  *   descendants to be walked (which is a bug).
  *
  *   When adding or removing previous siblings of `node` (or next siblings, in
  *   case of reverse), the `Visitor` should return a new `Index` to specify the
  *   sibling to traverse after `node` is traversed.
  *   Adding or removing next siblings of `node` (or previous siblings, in case
  *   of reverse) is handled as expected without needing to return a new `Index`.
  *
  *   Removing the children property of an ancestor still results in them being
  *   traversed.
  * @param {Visited} node
  *   Found node.
  * @param {Array<VisitedParents>} ancestors
  *   Ancestors of `node`.
  * @returns {VisitorResult}
  *   What to do next.
  *
  *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
  *   An `Action` is treated as a tuple of `[Action]`.
  *
  *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
  *   When the `Action` is `EXIT`, that action can be returned.
  *   When the `Action` is `CONTINUE`, `Index` can be returned.
  * @template {UnistNode} [Visited=UnistNode]
  *   Visited node type.
  * @template {UnistParent} [VisitedParents=UnistParent]
  *   Ancestor type.
  */
  /**
  * @typedef {Visitor<Matches<InclusiveDescendant<Tree>, Check>, Ancestor<Tree, Matches<InclusiveDescendant<Tree>, Check>>>} BuildVisitor
  *   Build a typed `Visitor` function from a tree and a test.
  *
  *   It will infer which values are passed as `node` and which as `parents`.
  * @template {UnistNode} [Tree=UnistNode]
  *   Tree type.
  * @template {Test} [Check=Test]
  *   Test type.
  */
  /** @type {Readonly<ActionTuple>} */
  var empty = [];
  /**
  * Visit nodes, with ancestral information.
  *
  * This algorithm performs *depth-first* *tree traversal* in *preorder*
  * (**NLR**) or if `reverse` is given, in *reverse preorder* (**NRL**).
  *
  * You can choose for which nodes `visitor` is called by passing a `test`.
  * For complex tests, you should test yourself in `visitor`, as it will be
  * faster and will have improved type information.
  *
  * Walking the tree is an intensive task.
  * Make use of the return values of the visitor when possible.
  * Instead of walking a tree multiple times, walk it once, use `unist-util-is`
  * to check if a node matches, and then perform different operations.
  *
  * You can change the tree.
  * See `Visitor` for more info.
  *
  * @overload
  * @param {Tree} tree
  * @param {Check} check
  * @param {BuildVisitor<Tree, Check>} visitor
  * @param {boolean | null | undefined} [reverse]
  * @returns {undefined}
  *
  * @overload
  * @param {Tree} tree
  * @param {BuildVisitor<Tree>} visitor
  * @param {boolean | null | undefined} [reverse]
  * @returns {undefined}
  *
  * @param {UnistNode} tree
  *   Tree to traverse.
  * @param {Visitor | Test} test
  *   `unist-util-is`-compatible test
  * @param {Visitor | boolean | null | undefined} [visitor]
  *   Handle each node.
  * @param {boolean | null | undefined} [reverse]
  *   Traverse in reverse preorder (NRL) instead of the default preorder (NLR).
  * @returns {undefined}
  *   Nothing.
  *
  * @template {UnistNode} Tree
  *   Node type.
  * @template {Test} Check
  *   `unist-util-is`-compatible test.
  */
  function visitParents(tree, test, visitor, reverse) {
  	/** @type {Test} */
  	let check;
  	if (typeof test === "function" && typeof visitor !== "function") {
  		reverse = visitor;
  		visitor = test;
  	} else check = test;
  	const is = convert(check);
  	const step = reverse ? -1 : 1;
  	factory(tree, void 0, [])();
  	/**
  	* @param {UnistNode} node
  	* @param {number | undefined} index
  	* @param {Array<UnistParent>} parents
  	*/
  	function factory(node, index, parents) {
  		const value = node && typeof node === "object" ? node : {};
  		if (typeof value.type === "string") {
  			const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
  			Object.defineProperty(visit, "name", { value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")" });
  		}
  		return visit;
  		function visit() {
  			/** @type {Readonly<ActionTuple>} */
  			let result = empty;
  			/** @type {Readonly<ActionTuple>} */
  			let subresult;
  			/** @type {number} */
  			let offset;
  			/** @type {Array<UnistParent>} */
  			let grandparents;
  			if (!test || is(node, index, parents[parents.length - 1] || void 0)) {
  				result = toResult(visitor(node, parents));
  				if (result[0] === false) return result;
  			}
  			if ("children" in node && node.children) {
  				const nodeAsParent = node;
  				if (nodeAsParent.children && result[0] !== "skip") {
  					offset = (reverse ? nodeAsParent.children.length : -1) + step;
  					grandparents = parents.concat(nodeAsParent);
  					while (offset > -1 && offset < nodeAsParent.children.length) {
  						const child = nodeAsParent.children[offset];
  						subresult = factory(child, offset, grandparents)();
  						if (subresult[0] === false) return subresult;
  						offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
  					}
  				}
  			}
  			return result;
  		}
  	}
  }
  /**
  * Turn a return value into a clean result.
  *
  * @param {VisitorResult} value
  *   Valid return values from visitors.
  * @returns {Readonly<ActionTuple>}
  *   Clean result.
  */
  function toResult(value) {
  	if (Array.isArray(value)) return value;
  	if (typeof value === "number") return [true, value];
  	return value === null || value === void 0 ? empty : [value];
  }
  //#endregion
  //#region node_modules/.pnpm/unist-util-visit@5.1.0/node_modules/unist-util-visit/lib/index.js
  /**
  * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
  * @import {VisitorResult} from 'unist-util-visit-parents'
  */
  /**
  * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
  *   Test from `unist-util-is`.
  *
  *   Note: we have remove and add `undefined`, because otherwise when generating
  *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
  *   which doesn’t work when publishing on npm.
  */
  /**
  * @typedef {(
  *   Fn extends (value: any) => value is infer Thing
  *   ? Thing
  *   : Fallback
  * )} Predicate
  *   Get the value of a type guard `Fn`.
  * @template Fn
  *   Value; typically function that is a type guard (such as `(x): x is Y`).
  * @template Fallback
  *   Value to yield if `Fn` is not a type guard.
  */
  /**
  * @typedef {(
  *   Check extends null | undefined // No test.
  *   ? Value
  *   : Value extends {type: Check} // String (type) test.
  *   ? Value
  *   : Value extends Check // Partial test.
  *   ? Value
  *   : Check extends Function // Function test.
  *   ? Predicate<Check, Value> extends Value
  *     ? Predicate<Check, Value>
  *     : never
  *   : never // Some other test?
  * )} MatchesOne
  *   Check whether a node matches a primitive check in the type system.
  * @template Value
  *   Value; typically unist `Node`.
  * @template Check
  *   Value; typically `unist-util-is`-compatible test, but not arrays.
  */
  /**
  * @typedef {(
  *   Check extends ReadonlyArray<any>
  *   ? MatchesOne<Value, Check[number]>
  *   : MatchesOne<Value, Check>
  * )} Matches
  *   Check whether a node matches a check in the type system.
  * @template Value
  *   Value; typically unist `Node`.
  * @template Check
  *   Value; typically `unist-util-is`-compatible test.
  */
  /**
  * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
  *   Number; capped reasonably.
  */
  /**
  * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
  *   Increment a number in the type system.
  * @template {Uint} [I=0]
  *   Index.
  */
  /**
  * @typedef {(
  *   Node extends UnistParent
  *   ? Node extends {children: Array<infer Children>}
  *     ? Child extends Children ? Node : never
  *     : never
  *   : never
  * )} InternalParent
  *   Collect nodes that can be parents of `Child`.
  * @template {UnistNode} Node
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  */
  /**
  * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
  *   Collect nodes in `Tree` that can be parents of `Child`.
  * @template {UnistNode} Tree
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  */
  /**
  * @typedef {(
  *   Depth extends Max
  *   ? never
  *   :
  *     | InternalParent<Node, Child>
  *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
  * )} InternalAncestor
  *   Collect nodes in `Tree` that can be ancestors of `Child`.
  * @template {UnistNode} Node
  *   All node types in a tree.
  * @template {UnistNode} Child
  *   Node to search for.
  * @template {Uint} [Max=10]
  *   Max; searches up to this depth.
  * @template {Uint} [Depth=0]
  *   Current depth.
  */
  /**
  * @typedef {(
  *   Tree extends UnistParent
  *     ? Depth extends Max
  *       ? Tree
  *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
  *     : Tree
  * )} InclusiveDescendant
  *   Collect all (inclusive) descendants of `Tree`.
  *
  *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
  *   > recurse without actually running into an infinite loop, which the
  *   > previous version did.
  *   >
  *   > Practically, a max of `2` is typically enough assuming a `Root` is
  *   > passed, but it doesn’t improve performance.
  *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
  *   > Using up to `10` doesn’t hurt or help either.
  * @template {UnistNode} Tree
  *   Tree type.
  * @template {Uint} [Max=10]
  *   Max; searches up to this depth.
  * @template {Uint} [Depth=0]
  *   Current depth.
  */
  /**
  * @callback Visitor
  *   Handle a node (matching `test`, if given).
  *
  *   Visitors are free to transform `node`.
  *   They can also transform `parent`.
  *
  *   Replacing `node` itself, if `SKIP` is not returned, still causes its
  *   descendants to be walked (which is a bug).
  *
  *   When adding or removing previous siblings of `node` (or next siblings, in
  *   case of reverse), the `Visitor` should return a new `Index` to specify the
  *   sibling to traverse after `node` is traversed.
  *   Adding or removing next siblings of `node` (or previous siblings, in case
  *   of reverse) is handled as expected without needing to return a new `Index`.
  *
  *   Removing the children property of `parent` still results in them being
  *   traversed.
  * @param {Visited} node
  *   Found node.
  * @param {Visited extends UnistNode ? number | undefined : never} index
  *   Index of `node` in `parent`.
  * @param {Ancestor extends UnistParent ? Ancestor | undefined : never} parent
  *   Parent of `node`.
  * @returns {VisitorResult}
  *   What to do next.
  *
  *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
  *   An `Action` is treated as a tuple of `[Action]`.
  *
  *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
  *   When the `Action` is `EXIT`, that action can be returned.
  *   When the `Action` is `CONTINUE`, `Index` can be returned.
  * @template {UnistNode} [Visited=UnistNode]
  *   Visited node type.
  * @template {UnistParent} [Ancestor=UnistParent]
  *   Ancestor type.
  */
  /**
  * @typedef {Visitor<Visited, Parent<Ancestor, Visited>>} BuildVisitorFromMatch
  *   Build a typed `Visitor` function from a node and all possible parents.
  *
  *   It will infer which values are passed as `node` and which as `parent`.
  * @template {UnistNode} Visited
  *   Node type.
  * @template {UnistParent} Ancestor
  *   Parent type.
  */
  /**
  * @typedef {(
  *   BuildVisitorFromMatch<
  *     Matches<Descendant, Check>,
  *     Extract<Descendant, UnistParent>
  *   >
  * )} BuildVisitorFromDescendants
  *   Build a typed `Visitor` function from a list of descendants and a test.
  *
  *   It will infer which values are passed as `node` and which as `parent`.
  * @template {UnistNode} Descendant
  *   Node type.
  * @template {Test} Check
  *   Test type.
  */
  /**
  * @typedef {(
  *   BuildVisitorFromDescendants<
  *     InclusiveDescendant<Tree>,
  *     Check
  *   >
  * )} BuildVisitor
  *   Build a typed `Visitor` function from a tree and a test.
  *
  *   It will infer which values are passed as `node` and which as `parent`.
  * @template {UnistNode} [Tree=UnistNode]
  *   Node type.
  * @template {Test} [Check=Test]
  *   Test type.
  */
  /**
  * Visit nodes.
  *
  * This algorithm performs *depth-first* *tree traversal* in *preorder*
  * (**NLR**) or if `reverse` is given, in *reverse preorder* (**NRL**).
  *
  * You can choose for which nodes `visitor` is called by passing a `test`.
  * For complex tests, you should test yourself in `visitor`, as it will be
  * faster and will have improved type information.
  *
  * Walking the tree is an intensive task.
  * Make use of the return values of the visitor when possible.
  * Instead of walking a tree multiple times, walk it once, use `unist-util-is`
  * to check if a node matches, and then perform different operations.
  *
  * You can change the tree.
  * See `Visitor` for more info.
  *
  * @overload
  * @param {Tree} tree
  * @param {Check} check
  * @param {BuildVisitor<Tree, Check>} visitor
  * @param {boolean | null | undefined} [reverse]
  * @returns {undefined}
  *
  * @overload
  * @param {Tree} tree
  * @param {BuildVisitor<Tree>} visitor
  * @param {boolean | null | undefined} [reverse]
  * @returns {undefined}
  *
  * @param {UnistNode} tree
  *   Tree to traverse.
  * @param {Visitor | Test} testOrVisitor
  *   `unist-util-is`-compatible test (optional, omit to pass a visitor).
  * @param {Visitor | boolean | null | undefined} [visitorOrReverse]
  *   Handle each node (when test is omitted, pass `reverse`).
  * @param {boolean | null | undefined} [maybeReverse=false]
  *   Traverse in reverse preorder (NRL) instead of the default preorder (NLR).
  * @returns {undefined}
  *   Nothing.
  *
  * @template {UnistNode} Tree
  *   Node type.
  * @template {Test} Check
  *   `unist-util-is`-compatible test.
  */
  function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
  	/** @type {boolean | null | undefined} */
  	let reverse;
  	/** @type {Test} */
  	let test;
  	/** @type {Visitor} */
  	let visitor;
  	if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
  		test = void 0;
  		visitor = testOrVisitor;
  		reverse = visitorOrReverse;
  	} else {
  		test = testOrVisitor;
  		visitor = visitorOrReverse;
  		reverse = maybeReverse;
  	}
  	visitParents(tree, test, overload, reverse);
  	/**
  	* @param {UnistNode} node
  	* @param {Array<UnistParent>} parents
  	*/
  	function overload(node, parents) {
  		const parent = parents[parents.length - 1];
  		const index = parent ? parent.children.indexOf(node) : void 0;
  		return visitor(node, index, parent);
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
  /**
  * @import {State} from 'mdast-util-to-markdown'
  * @import {Heading} from 'mdast'
  */
  /**
  * @param {Heading} node
  * @param {State} state
  * @returns {boolean}
  */
  function formatHeadingAsSetext(node, state) {
  	let literalWithBreak = false;
  	visit(node, function(node) {
  		if ("value" in node && /\r?\n|\r/.test(node.value) || node.type === "break") {
  			literalWithBreak = true;
  			return false;
  		}
  	});
  	return Boolean((!node.depth || node.depth < 3) && toString(node) && (state.options.setext || literalWithBreak));
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/heading.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Heading, Parents} from 'mdast'
  */
  /**
  * @param {Heading} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function heading(node, _, state, info) {
  	const rank = Math.max(Math.min(6, node.depth || 1), 1);
  	const tracker = state.createTracker(info);
  	if (formatHeadingAsSetext(node, state)) {
  		const exit = state.enter("headingSetext");
  		const subexit = state.enter("phrasing");
  		const value = state.containerPhrasing(node, {
  			...tracker.current(),
  			before: "\n",
  			after: "\n"
  		});
  		subexit();
  		exit();
  		return value + "\n" + (rank === 1 ? "=" : "-").repeat(value.length - (Math.max(value.lastIndexOf("\r"), value.lastIndexOf("\n")) + 1));
  	}
  	const sequence = "#".repeat(rank);
  	const exit = state.enter("headingAtx");
  	const subexit = state.enter("phrasing");
  	tracker.move(sequence + " ");
  	let value = state.containerPhrasing(node, {
  		before: "# ",
  		after: "\n",
  		...tracker.current()
  	});
  	if (/^[\t ]/.test(value)) value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
  	value = value ? sequence + " " + value : sequence;
  	if (state.options.closeAtx) value += " " + sequence;
  	subexit();
  	exit();
  	return value;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/html.js
  /**
  * @import {Html} from 'mdast'
  */
  html.peek = htmlPeek;
  /**
  * @param {Html} node
  * @returns {string}
  */
  function html(node) {
  	return node.value || "";
  }
  /**
  * @returns {string}
  */
  function htmlPeek() {
  	return "<";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/image.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Image, Parents} from 'mdast'
  */
  image.peek = imagePeek;
  /**
  * @param {Image} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function image(node, _, state, info) {
  	const quote = checkQuote(state);
  	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
  	const exit = state.enter("image");
  	let subexit = state.enter("label");
  	const tracker = state.createTracker(info);
  	let value = tracker.move("![");
  	value += tracker.move(state.safe(node.alt, {
  		before: value,
  		after: "]",
  		...tracker.current()
  	}));
  	value += tracker.move("](");
  	subexit();
  	if (!node.url && node.title || /[\0- \u007F]/.test(node.url)) {
  		subexit = state.enter("destinationLiteral");
  		value += tracker.move("<");
  		value += tracker.move(state.safe(node.url, {
  			before: value,
  			after: ">",
  			...tracker.current()
  		}));
  		value += tracker.move(">");
  	} else {
  		subexit = state.enter("destinationRaw");
  		value += tracker.move(state.safe(node.url, {
  			before: value,
  			after: node.title ? " " : ")",
  			...tracker.current()
  		}));
  	}
  	subexit();
  	if (node.title) {
  		subexit = state.enter(`title${suffix}`);
  		value += tracker.move(" " + quote);
  		value += tracker.move(state.safe(node.title, {
  			before: value,
  			after: quote,
  			...tracker.current()
  		}));
  		value += tracker.move(quote);
  		subexit();
  	}
  	value += tracker.move(")");
  	exit();
  	return value;
  }
  /**
  * @returns {string}
  */
  function imagePeek() {
  	return "!";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {ImageReference, Parents} from 'mdast'
  */
  imageReference.peek = imageReferencePeek;
  /**
  * @param {ImageReference} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function imageReference(node, _, state, info) {
  	const type = node.referenceType;
  	const exit = state.enter("imageReference");
  	let subexit = state.enter("label");
  	const tracker = state.createTracker(info);
  	let value = tracker.move("![");
  	const alt = state.safe(node.alt, {
  		before: value,
  		after: "]",
  		...tracker.current()
  	});
  	value += tracker.move(alt + "][");
  	subexit();
  	const stack = state.stack;
  	state.stack = [];
  	subexit = state.enter("reference");
  	const reference = state.safe(state.associationId(node), {
  		before: value,
  		after: "]",
  		...tracker.current()
  	});
  	subexit();
  	state.stack = stack;
  	exit();
  	if (type === "full" || !alt || alt !== reference) value += tracker.move(reference + "]");
  	else if (type === "shortcut") value = value.slice(0, -1);
  	else value += tracker.move("]");
  	return value;
  }
  /**
  * @returns {string}
  */
  function imageReferencePeek() {
  	return "!";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
  /**
  * @import {State} from 'mdast-util-to-markdown'
  * @import {InlineCode, Parents} from 'mdast'
  */
  inlineCode.peek = inlineCodePeek;
  /**
  * @param {InlineCode} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @returns {string}
  */
  function inlineCode(node, _, state) {
  	let value = node.value || "";
  	let sequence = "`";
  	let index = -1;
  	while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) sequence += "`";
  	if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) value = " " + value + " ";
  	while (++index < state.unsafe.length) {
  		const pattern = state.unsafe[index];
  		const expression = state.compilePattern(pattern);
  		/** @type {RegExpExecArray | null} */
  		let match;
  		if (!pattern.atBreak) continue;
  		while (match = expression.exec(value)) {
  			let position = match.index;
  			if (value.charCodeAt(position) === 10 && value.charCodeAt(position - 1) === 13) position--;
  			value = value.slice(0, position) + " " + value.slice(match.index + 1);
  		}
  	}
  	return sequence + value + sequence;
  }
  /**
  * @returns {string}
  */
  function inlineCodePeek() {
  	return "`";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
  /**
  * @import {State} from 'mdast-util-to-markdown'
  * @import {Link} from 'mdast'
  */
  /**
  * @param {Link} node
  * @param {State} state
  * @returns {boolean}
  */
  function formatLinkAsAutolink(node, state) {
  	const raw = toString(node);
  	return Boolean(!state.options.resourceLink && node.url && !node.title && node.children && node.children.length === 1 && node.children[0].type === "text" && (raw === node.url || "mailto:" + raw === node.url) && /^[a-z][a-z+.-]+:/i.test(node.url) && !/[\0- <>\u007F]/.test(node.url));
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/link.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Link, Parents} from 'mdast'
  * @import {Exit} from '../types.js'
  */
  link.peek = linkPeek;
  /**
  * @param {Link} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function link(node, _, state, info) {
  	const quote = checkQuote(state);
  	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
  	const tracker = state.createTracker(info);
  	/** @type {Exit} */
  	let exit;
  	/** @type {Exit} */
  	let subexit;
  	if (formatLinkAsAutolink(node, state)) {
  		const stack = state.stack;
  		state.stack = [];
  		exit = state.enter("autolink");
  		let value = tracker.move("<");
  		value += tracker.move(state.containerPhrasing(node, {
  			before: value,
  			after: ">",
  			...tracker.current()
  		}));
  		value += tracker.move(">");
  		exit();
  		state.stack = stack;
  		return value;
  	}
  	exit = state.enter("link");
  	subexit = state.enter("label");
  	let value = tracker.move("[");
  	value += tracker.move(state.containerPhrasing(node, {
  		before: value,
  		after: "](",
  		...tracker.current()
  	}));
  	value += tracker.move("](");
  	subexit();
  	if (!node.url && node.title || /[\0- \u007F]/.test(node.url)) {
  		subexit = state.enter("destinationLiteral");
  		value += tracker.move("<");
  		value += tracker.move(state.safe(node.url, {
  			before: value,
  			after: ">",
  			...tracker.current()
  		}));
  		value += tracker.move(">");
  	} else {
  		subexit = state.enter("destinationRaw");
  		value += tracker.move(state.safe(node.url, {
  			before: value,
  			after: node.title ? " " : ")",
  			...tracker.current()
  		}));
  	}
  	subexit();
  	if (node.title) {
  		subexit = state.enter(`title${suffix}`);
  		value += tracker.move(" " + quote);
  		value += tracker.move(state.safe(node.title, {
  			before: value,
  			after: quote,
  			...tracker.current()
  		}));
  		value += tracker.move(quote);
  		subexit();
  	}
  	value += tracker.move(")");
  	exit();
  	return value;
  }
  /**
  * @param {Link} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @returns {string}
  */
  function linkPeek(node, _, state) {
  	return formatLinkAsAutolink(node, state) ? "<" : "[";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {LinkReference, Parents} from 'mdast'
  */
  linkReference.peek = linkReferencePeek;
  /**
  * @param {LinkReference} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function linkReference(node, _, state, info) {
  	const type = node.referenceType;
  	const exit = state.enter("linkReference");
  	let subexit = state.enter("label");
  	const tracker = state.createTracker(info);
  	let value = tracker.move("[");
  	const text = state.containerPhrasing(node, {
  		before: value,
  		after: "]",
  		...tracker.current()
  	});
  	value += tracker.move(text + "][");
  	subexit();
  	const stack = state.stack;
  	state.stack = [];
  	subexit = state.enter("reference");
  	const reference = state.safe(state.associationId(node), {
  		before: value,
  		after: "]",
  		...tracker.current()
  	});
  	subexit();
  	state.stack = stack;
  	exit();
  	if (type === "full" || !text || text !== reference) value += tracker.move(reference + "]");
  	else if (type === "shortcut") value = value.slice(0, -1);
  	else value += tracker.move("]");
  	return value;
  }
  /**
  * @returns {string}
  */
  function linkReferencePeek() {
  	return "[";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['bullet'], null | undefined>}
  */
  function checkBullet(state) {
  	const marker = state.options.bullet || "*";
  	if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['bullet'], null | undefined>}
  */
  function checkBulletOther(state) {
  	const bullet = checkBullet(state);
  	const bulletOther = state.options.bulletOther;
  	if (!bulletOther) return bullet === "*" ? "-" : "*";
  	if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
  	if (bulletOther === bullet) throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
  	return bulletOther;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['bulletOrdered'], null | undefined>}
  */
  function checkBulletOrdered(state) {
  	const marker = state.options.bulletOrdered || ".";
  	if (marker !== "." && marker !== ")") throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-rule.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['rule'], null | undefined>}
  */
  function checkRule(state) {
  	const marker = state.options.rule || "*";
  	if (marker !== "*" && marker !== "-" && marker !== "_") throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/list.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {List, Parents} from 'mdast'
  */
  /**
  * @param {List} node
  * @param {Parents | undefined} parent
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function list(node, parent, state, info) {
  	const exit = state.enter("list");
  	const bulletCurrent = state.bulletCurrent;
  	/** @type {string} */
  	let bullet = node.ordered ? checkBulletOrdered(state) : checkBullet(state);
  	/** @type {string} */
  	const bulletOther = node.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
  	let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
  	if (!node.ordered) {
  		const firstListItem = node.children ? node.children[0] : void 0;
  		if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) useDifferentMarker = true;
  		if (checkRule(state) === bullet && firstListItem) {
  			let index = -1;
  			while (++index < node.children.length) {
  				const item = node.children[index];
  				if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
  					useDifferentMarker = true;
  					break;
  				}
  			}
  		}
  	}
  	if (useDifferentMarker) bullet = bulletOther;
  	state.bulletCurrent = bullet;
  	const value = state.containerFlow(node, info);
  	state.bulletLastUsed = bullet;
  	state.bulletCurrent = bulletCurrent;
  	exit();
  	return value;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['listItemIndent'], null | undefined>}
  */
  function checkListItemIndent(state) {
  	const style = state.options.listItemIndent || "one";
  	if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
  	return style;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/list-item.js
  /**
  * @import {Info, Map, State} from 'mdast-util-to-markdown'
  * @import {ListItem, Parents} from 'mdast'
  */
  /**
  * @param {ListItem} node
  * @param {Parents | undefined} parent
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function listItem(node, parent, state, info) {
  	const listItemIndent = checkListItemIndent(state);
  	let bullet = state.bulletCurrent || checkBullet(state);
  	if (parent && parent.type === "list" && parent.ordered) bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + bullet;
  	let size = bullet.length + 1;
  	if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node.spread)) size = Math.ceil(size / 4) * 4;
  	const tracker = state.createTracker(info);
  	tracker.move(bullet + " ".repeat(size - bullet.length));
  	tracker.shift(size);
  	const exit = state.enter("listItem");
  	const value = state.indentLines(state.containerFlow(node, tracker.current()), map);
  	exit();
  	return value;
  	/** @type {Map} */
  	function map(line, index, blank) {
  		if (index) return (blank ? "" : " ".repeat(size)) + line;
  		return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Paragraph, Parents} from 'mdast'
  */
  /**
  * @param {Paragraph} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function paragraph(node, _, state, info) {
  	const exit = state.enter("paragraph");
  	const subexit = state.enter("phrasing");
  	const value = state.containerPhrasing(node, info);
  	subexit();
  	exit();
  	return value;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-phrasing@4.1.0/node_modules/mdast-util-phrasing/lib/index.js
  /**
  * @typedef {import('mdast').Html} Html
  * @typedef {import('mdast').PhrasingContent} PhrasingContent
  */
  /**
  * Check if the given value is *phrasing content*.
  *
  * > 👉 **Note**: Excludes `html`, which can be both phrasing or flow.
  *
  * @param node
  *   Thing to check, typically `Node`.
  * @returns
  *   Whether `value` is phrasing content.
  */
  var phrasing = convert([
  	"break",
  	"delete",
  	"emphasis",
  	"footnote",
  	"footnoteReference",
  	"image",
  	"imageReference",
  	"inlineCode",
  	"inlineMath",
  	"link",
  	"linkReference",
  	"mdxJsxTextElement",
  	"mdxTextExpression",
  	"strong",
  	"text",
  	"textDirective"
  ]);
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/root.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Parents, Root} from 'mdast'
  */
  /**
  * @param {Root} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function root(node, _, state, info) {
  	return (node.children.some(function(d) {
  		return phrasing(d);
  	}) ? state.containerPhrasing : state.containerFlow).call(state, node, info);
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-strong.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['strong'], null | undefined>}
  */
  function checkStrong(state) {
  	const marker = state.options.strong || "*";
  	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
  	return marker;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/strong.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Parents, Strong} from 'mdast'
  */
  strong.peek = strongPeek;
  /**
  * @param {Strong} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function strong(node, _, state, info) {
  	const marker = checkStrong(state);
  	const exit = state.enter("strong");
  	const tracker = state.createTracker(info);
  	const before = tracker.move(marker + marker);
  	let between = tracker.move(state.containerPhrasing(node, {
  		after: marker,
  		before,
  		...tracker.current()
  	}));
  	const betweenHead = between.charCodeAt(0);
  	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
  	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
  	const betweenTail = between.charCodeAt(between.length - 1);
  	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
  	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
  	const after = tracker.move(marker + marker);
  	exit();
  	state.attentionEncodeSurroundingInfo = {
  		after: close.outside,
  		before: open.outside
  	};
  	return before + between + after;
  }
  /**
  * @param {Strong} _
  * @param {Parents | undefined} _1
  * @param {State} state
  * @returns {string}
  */
  function strongPeek(_, _1, state) {
  	return state.options.strong || "*";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/text.js
  /**
  * @import {Info, State} from 'mdast-util-to-markdown'
  * @import {Parents, Text} from 'mdast'
  */
  /**
  * @param {Text} node
  * @param {Parents | undefined} _
  * @param {State} state
  * @param {Info} info
  * @returns {string}
  */
  function text(node, _, state, info) {
  	return state.safe(node.value, info);
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
  /**
  * @import {Options, State} from 'mdast-util-to-markdown'
  */
  /**
  * @param {State} state
  * @returns {Exclude<Options['ruleRepetition'], null | undefined>}
  */
  function checkRuleRepetition(state) {
  	const repetition = state.options.ruleRepetition || 3;
  	if (repetition < 3) throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
  	return repetition;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
  /**
  * @import {State} from 'mdast-util-to-markdown'
  * @import {Parents, ThematicBreak} from 'mdast'
  */
  /**
  * @param {ThematicBreak} _
  * @param {Parents | undefined} _1
  * @param {State} state
  * @returns {string}
  */
  function thematicBreak(_, _1, state) {
  	const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
  	return state.options.ruleSpaces ? value.slice(0, -1) : value;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/handle/index.js
  /**
  * Default (CommonMark) handlers.
  */
  var handle = {
  	blockquote,
  	break: hardBreak,
  	code,
  	definition,
  	emphasis,
  	hardBreak,
  	heading,
  	html,
  	image,
  	imageReference,
  	inlineCode,
  	link,
  	linkReference,
  	list,
  	listItem,
  	paragraph,
  	root,
  	strong,
  	text,
  	thematicBreak
  };
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/join.js
  /**
  * @import {Join} from 'mdast-util-to-markdown'
  */
  /** @type {Array<Join>} */
  var join = [joinDefaults];
  /** @type {Join} */
  function joinDefaults(left, right, parent, state) {
  	if (right.type === "code" && formatCodeAsIndented(right, state) && (left.type === "list" || left.type === right.type && formatCodeAsIndented(left, state))) return false;
  	if ("spread" in parent && typeof parent.spread === "boolean") {
  		if (left.type === "paragraph" && (left.type === right.type || right.type === "definition" || right.type === "heading" && formatHeadingAsSetext(right, state))) return;
  		return parent.spread ? 1 : 0;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/unsafe.js
  /**
  * @import {ConstructName, Unsafe} from 'mdast-util-to-markdown'
  */
  /**
  * List of constructs that occur in phrasing (paragraphs, headings), but cannot
  * contain things like attention (emphasis, strong), images, or links.
  * So they sort of cancel each other out.
  * Note: could use a better name.
  *
  * @type {Array<ConstructName>}
  */
  var fullPhrasingSpans = [
  	"autolink",
  	"destinationLiteral",
  	"destinationRaw",
  	"reference",
  	"titleQuote",
  	"titleApostrophe"
  ];
  /** @type {Array<Unsafe>} */
  var unsafe = [
  	{
  		character: "	",
  		after: "[\\r\\n]",
  		inConstruct: "phrasing"
  	},
  	{
  		character: "	",
  		before: "[\\r\\n]",
  		inConstruct: "phrasing"
  	},
  	{
  		character: "	",
  		inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
  	},
  	{
  		character: "\r",
  		inConstruct: [
  			"codeFencedLangGraveAccent",
  			"codeFencedLangTilde",
  			"codeFencedMetaGraveAccent",
  			"codeFencedMetaTilde",
  			"destinationLiteral",
  			"headingAtx"
  		]
  	},
  	{
  		character: "\n",
  		inConstruct: [
  			"codeFencedLangGraveAccent",
  			"codeFencedLangTilde",
  			"codeFencedMetaGraveAccent",
  			"codeFencedMetaTilde",
  			"destinationLiteral",
  			"headingAtx"
  		]
  	},
  	{
  		character: " ",
  		after: "[\\r\\n]",
  		inConstruct: "phrasing"
  	},
  	{
  		character: " ",
  		before: "[\\r\\n]",
  		inConstruct: "phrasing"
  	},
  	{
  		character: " ",
  		inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
  	},
  	{
  		character: "!",
  		after: "\\[",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		character: "\"",
  		inConstruct: "titleQuote"
  	},
  	{
  		atBreak: true,
  		character: "#"
  	},
  	{
  		character: "#",
  		inConstruct: "headingAtx",
  		after: "(?:[\r\n]|$)"
  	},
  	{
  		character: "&",
  		after: "[#A-Za-z]",
  		inConstruct: "phrasing"
  	},
  	{
  		character: "'",
  		inConstruct: "titleApostrophe"
  	},
  	{
  		character: "(",
  		inConstruct: "destinationRaw"
  	},
  	{
  		before: "\\]",
  		character: "(",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		atBreak: true,
  		before: "\\d+",
  		character: ")"
  	},
  	{
  		character: ")",
  		inConstruct: "destinationRaw"
  	},
  	{
  		atBreak: true,
  		character: "*",
  		after: "(?:[ 	\r\n*])"
  	},
  	{
  		character: "*",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		atBreak: true,
  		character: "+",
  		after: "(?:[ 	\r\n])"
  	},
  	{
  		atBreak: true,
  		character: "-",
  		after: "(?:[ 	\r\n-])"
  	},
  	{
  		atBreak: true,
  		before: "\\d+",
  		character: ".",
  		after: "(?:[ 	\r\n]|$)"
  	},
  	{
  		atBreak: true,
  		character: "<",
  		after: "[!/?A-Za-z]"
  	},
  	{
  		character: "<",
  		after: "[!/?A-Za-z]",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		character: "<",
  		inConstruct: "destinationLiteral"
  	},
  	{
  		atBreak: true,
  		character: "="
  	},
  	{
  		atBreak: true,
  		character: ">"
  	},
  	{
  		character: ">",
  		inConstruct: "destinationLiteral"
  	},
  	{
  		atBreak: true,
  		character: "["
  	},
  	{
  		character: "[",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		character: "[",
  		inConstruct: ["label", "reference"]
  	},
  	{
  		character: "\\",
  		after: "[\\r\\n]",
  		inConstruct: "phrasing"
  	},
  	{
  		character: "]",
  		inConstruct: ["label", "reference"]
  	},
  	{
  		atBreak: true,
  		character: "_"
  	},
  	{
  		character: "_",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		atBreak: true,
  		character: "`"
  	},
  	{
  		character: "`",
  		inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
  	},
  	{
  		character: "`",
  		inConstruct: "phrasing",
  		notInConstruct: fullPhrasingSpans
  	},
  	{
  		atBreak: true,
  		character: "~"
  	}
  ];
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/association.js
  /**
  * @import {AssociationId} from '../types.js'
  */
  /**
  * Get an identifier from an association to match it to others.
  *
  * Associations are nodes that match to something else through an ID:
  * <https://github.com/syntax-tree/mdast#association>.
  *
  * The `label` of an association is the string value: character escapes and
  * references work, and casing is intact.
  * The `identifier` is used to match one association to another:
  * controversially, character escapes and references don’t work in this
  * matching: `&copy;` does not match `©`, and `\+` does not match `+`.
  *
  * But casing is ignored (and whitespace) is trimmed and collapsed: ` A\nb`
  * matches `a b`.
  * So, we do prefer the label when figuring out how we’re going to serialize:
  * it has whitespace, casing, and we can ignore most useless character
  * escapes and all character references.
  *
  * @type {AssociationId}
  */
  function association(node) {
  	if (node.label || !node.identifier) return node.label || "";
  	return decodeString(node.identifier);
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/compile-pattern.js
  /**
  * @import {CompilePattern} from '../types.js'
  */
  /**
  * @type {CompilePattern}
  */
  function compilePattern(pattern) {
  	if (!pattern._compiled) {
  		const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
  		pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""), "g");
  	}
  	return pattern._compiled;
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
  /**
  * @import {Handle, Info, State} from 'mdast-util-to-markdown'
  * @import {PhrasingParents} from '../types.js'
  */
  /**
  * Serialize the children of a parent that contains phrasing children.
  *
  * These children will be joined flush together.
  *
  * @param {PhrasingParents} parent
  *   Parent of flow nodes.
  * @param {State} state
  *   Info passed around about the current state.
  * @param {Info} info
  *   Info on where we are in the document we are generating.
  * @returns {string}
  *   Serialized children, joined together.
  */
  function containerPhrasing(parent, state, info) {
  	const indexStack = state.indexStack;
  	const children = parent.children || [];
  	/** @type {Array<string>} */
  	const results = [];
  	let index = -1;
  	let before = info.before;
  	/** @type {string | undefined} */
  	let encodeAfter;
  	indexStack.push(-1);
  	let tracker = state.createTracker(info);
  	while (++index < children.length) {
  		const child = children[index];
  		/** @type {string} */
  		let after;
  		indexStack[indexStack.length - 1] = index;
  		if (index + 1 < children.length) {
  			/** @type {Handle} */
  			let handle = state.handle.handlers[children[index + 1].type];
  			/** @type {Handle} */
  			if (handle && handle.peek) handle = handle.peek;
  			after = handle ? handle(children[index + 1], parent, state, {
  				before: "",
  				after: "",
  				...tracker.current()
  			}).charAt(0) : "";
  		} else after = info.after;
  		if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
  			results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
  			before = " ";
  			tracker = state.createTracker(info);
  			tracker.move(results.join(""));
  		}
  		let value = state.handle(child, parent, state, {
  			...tracker.current(),
  			after,
  			before
  		});
  		if (encodeAfter && encodeAfter === value.slice(0, 1)) value = encodeCharacterReference(encodeAfter.charCodeAt(0)) + value.slice(1);
  		const encodingInfo = state.attentionEncodeSurroundingInfo;
  		state.attentionEncodeSurroundingInfo = void 0;
  		encodeAfter = void 0;
  		if (encodingInfo) {
  			if (results.length > 0 && encodingInfo.before && before === results[results.length - 1].slice(-1)) results[results.length - 1] = results[results.length - 1].slice(0, -1) + encodeCharacterReference(before.charCodeAt(0));
  			if (encodingInfo.after) encodeAfter = after;
  		}
  		tracker.move(value);
  		results.push(value);
  		before = value.slice(-1);
  	}
  	indexStack.pop();
  	return results.join("");
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/container-flow.js
  /**
  * @import {State} from 'mdast-util-to-markdown'
  * @import {FlowChildren, FlowParents, TrackFields} from '../types.js'
  */
  /**
  * @param {FlowParents} parent
  *   Parent of flow nodes.
  * @param {State} state
  *   Info passed around about the current state.
  * @param {TrackFields} info
  *   Info on where we are in the document we are generating.
  * @returns {string}
  *   Serialized children, joined by (blank) lines.
  */
  function containerFlow(parent, state, info) {
  	const indexStack = state.indexStack;
  	const children = parent.children || [];
  	const tracker = state.createTracker(info);
  	/** @type {Array<string>} */
  	const results = [];
  	let index = -1;
  	indexStack.push(-1);
  	while (++index < children.length) {
  		const child = children[index];
  		indexStack[indexStack.length - 1] = index;
  		results.push(tracker.move(state.handle(child, parent, state, {
  			before: "\n",
  			after: "\n",
  			...tracker.current()
  		})));
  		if (child.type !== "list") state.bulletLastUsed = void 0;
  		if (index < children.length - 1) results.push(tracker.move(between(child, children[index + 1], parent, state)));
  	}
  	indexStack.pop();
  	return results.join("");
  }
  /**
  * @param {FlowChildren} left
  * @param {FlowChildren} right
  * @param {FlowParents} parent
  * @param {State} state
  * @returns {string}
  */
  function between(left, right, parent, state) {
  	let index = state.join.length;
  	while (index--) {
  		const result = state.join[index](left, right, parent, state);
  		if (result === true || result === 1) break;
  		if (typeof result === "number") return "\n".repeat(1 + result);
  		if (result === false) return "\n\n<!---->\n\n";
  	}
  	return "\n\n";
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
  /**
  * @import {IndentLines} from '../types.js'
  */
  var eol = /\r?\n|\r/g;
  /**
  * @type {IndentLines}
  */
  function indentLines(value, map) {
  	/** @type {Array<string>} */
  	const result = [];
  	let start = 0;
  	let line = 0;
  	/** @type {RegExpExecArray | null} */
  	let match;
  	while (match = eol.exec(value)) {
  		one(value.slice(start, match.index));
  		result.push(match[0]);
  		start = match.index + match[0].length;
  		line++;
  	}
  	one(value.slice(start));
  	return result.join("");
  	/**
  	* @param {string} value
  	*/
  	function one(value) {
  		result.push(map(value, line, !value));
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/safe.js
  /**
  * @import {SafeConfig, State} from 'mdast-util-to-markdown'
  */
  /**
  * Make a string safe for embedding in markdown constructs.
  *
  * In markdown, almost all punctuation characters can, in certain cases,
  * result in something.
  * Whether they do is highly subjective to where they happen and in what
  * they happen.
  *
  * To solve this, `mdast-util-to-markdown` tracks:
  *
  * * Characters before and after something;
  * * What “constructs” we are in.
  *
  * This information is then used by this function to escape or encode
  * special characters.
  *
  * @param {State} state
  *   Info passed around about the current state.
  * @param {string | null | undefined} input
  *   Raw value to make safe.
  * @param {SafeConfig} config
  *   Configuration.
  * @returns {string}
  *   Serialized markdown safe for embedding.
  */
  function safe(state, input, config) {
  	const value = (config.before || "") + (input || "") + (config.after || "");
  	/** @type {Array<number>} */
  	const positions = [];
  	/** @type {Array<string>} */
  	const result = [];
  	/** @type {Record<number, {before: boolean, after: boolean}>} */
  	const infos = {};
  	let index = -1;
  	while (++index < state.unsafe.length) {
  		const pattern = state.unsafe[index];
  		if (!patternInScope(state.stack, pattern)) continue;
  		const expression = state.compilePattern(pattern);
  		/** @type {RegExpExecArray | null} */
  		let match;
  		while (match = expression.exec(value)) {
  			const before = "before" in pattern || Boolean(pattern.atBreak);
  			const after = "after" in pattern;
  			const position = match.index + (before ? match[1].length : 0);
  			if (positions.includes(position)) {
  				if (infos[position].before && !before) infos[position].before = false;
  				if (infos[position].after && !after) infos[position].after = false;
  			} else {
  				positions.push(position);
  				infos[position] = {
  					before,
  					after
  				};
  			}
  		}
  	}
  	positions.sort(numerical);
  	let start = config.before ? config.before.length : 0;
  	const end = value.length - (config.after ? config.after.length : 0);
  	index = -1;
  	while (++index < positions.length) {
  		const position = positions[index];
  		if (position < start || position >= end) continue;
  		if (position + 1 < end && positions[index + 1] === position + 1 && infos[position].after && !infos[position + 1].before && !infos[position + 1].after || positions[index - 1] === position - 1 && infos[position].before && !infos[position - 1].before && !infos[position - 1].after) continue;
  		if (start !== position) result.push(escapeBackslashes(value.slice(start, position), "\\"));
  		start = position;
  		if (/[!-/:-@[-`{-~]/.test(value.charAt(position)) && (!config.encode || !config.encode.includes(value.charAt(position)))) result.push("\\");
  		else {
  			result.push(encodeCharacterReference(value.charCodeAt(position)));
  			start++;
  		}
  	}
  	result.push(escapeBackslashes(value.slice(start, end), config.after));
  	return result.join("");
  }
  /**
  * @param {number} a
  * @param {number} b
  * @returns {number}
  */
  function numerical(a, b) {
  	return a - b;
  }
  /**
  * @param {string} value
  * @param {string} after
  * @returns {string}
  */
  function escapeBackslashes(value, after) {
  	const expression = /\\(?=[!-/:-@[-`{-~])/g;
  	/** @type {Array<number>} */
  	const positions = [];
  	/** @type {Array<string>} */
  	const results = [];
  	const whole = value + after;
  	let index = -1;
  	let start = 0;
  	/** @type {RegExpExecArray | null} */
  	let match;
  	while (match = expression.exec(whole)) positions.push(match.index);
  	while (++index < positions.length) {
  		if (start !== positions[index]) results.push(value.slice(start, positions[index]));
  		results.push("\\");
  		start = positions[index];
  	}
  	results.push(value.slice(start));
  	return results.join("");
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/util/track.js
  /**
  * @import {CreateTracker, TrackCurrent, TrackMove, TrackShift} from '../types.js'
  */
  /**
  * Track positional info in the output.
  *
  * @type {CreateTracker}
  */
  function track(config) {
  	/* c8 ignore next 5 */
  	const options = config || {};
  	const now = options.now || {};
  	let lineShift = options.lineShift || 0;
  	let line = now.line || 1;
  	let column = now.column || 1;
  	return {
  		move,
  		current,
  		shift
  	};
  	/**
  	* Get the current tracked info.
  	*
  	* @type {TrackCurrent}
  	*/
  	function current() {
  		return {
  			now: {
  				line,
  				column
  			},
  			lineShift
  		};
  	}
  	/**
  	* Define an increased line shift (the typical indent for lines).
  	*
  	* @type {TrackShift}
  	*/
  	function shift(value) {
  		lineShift += value;
  	}
  	/**
  	* Move past some generated markdown.
  	*
  	* @type {TrackMove}
  	*/
  	function move(input) {
  		const value = input || "";
  		const chunks = value.split(/\r?\n|\r/g);
  		const tail = chunks[chunks.length - 1];
  		line += chunks.length - 1;
  		column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
  		return value;
  	}
  }
  //#endregion
  //#region node_modules/.pnpm/mdast-util-to-markdown@2.1.2/node_modules/mdast-util-to-markdown/lib/index.js
  /**
  * @import {Info, Join, Options, SafeConfig, State} from 'mdast-util-to-markdown'
  * @import {Nodes} from 'mdast'
  * @import {Enter, FlowParents, PhrasingParents, TrackFields} from './types.js'
  */
  /**
  * Turn an mdast syntax tree into markdown.
  *
  * @param {Nodes} tree
  *   Tree to serialize.
  * @param {Options | null | undefined} [options]
  *   Configuration (optional).
  * @returns {string}
  *   Serialized markdown representing `tree`.
  */
  function toMarkdown(tree, options) {
  	const settings = options || {};
  	/** @type {State} */
  	const state = {
  		associationId: association,
  		containerPhrasing: containerPhrasingBound,
  		containerFlow: containerFlowBound,
  		createTracker: track,
  		compilePattern,
  		enter,
  		handlers: { ...handle },
  		handle: void 0,
  		indentLines,
  		indexStack: [],
  		join: [...join],
  		options: {},
  		safe: safeBound,
  		stack: [],
  		unsafe: [...unsafe]
  	};
  	configure(state, settings);
  	if (state.options.tightDefinitions) state.join.push(joinDefinition);
  	state.handle = zwitch("type", {
  		invalid,
  		unknown,
  		handlers: state.handlers
  	});
  	let result = state.handle(tree, void 0, state, {
  		before: "\n",
  		after: "\n",
  		now: {
  			line: 1,
  			column: 1
  		},
  		lineShift: 0
  	});
  	if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) result += "\n";
  	return result;
  	/** @type {Enter} */
  	function enter(name) {
  		state.stack.push(name);
  		return exit;
  		/**
  		* @returns {undefined}
  		*/
  		function exit() {
  			state.stack.pop();
  		}
  	}
  }
  /**
  * @param {unknown} value
  * @returns {never}
  */
  function invalid(value) {
  	throw new Error("Cannot handle value `" + value + "`, expected node");
  }
  /**
  * @param {unknown} value
  * @returns {never}
  */
  function unknown(value) {
  	throw new Error("Cannot handle unknown node `" + value.type + "`");
  }
  /** @type {Join} */
  function joinDefinition(left, right) {
  	if (left.type === "definition" && left.type === right.type) return 0;
  }
  /**
  * Serialize the children of a parent that contains phrasing children.
  *
  * These children will be joined flush together.
  *
  * @this {State}
  *   Info passed around about the current state.
  * @param {PhrasingParents} parent
  *   Parent of flow nodes.
  * @param {Info} info
  *   Info on where we are in the document we are generating.
  * @returns {string}
  *   Serialized children, joined together.
  */
  function containerPhrasingBound(parent, info) {
  	return containerPhrasing(parent, this, info);
  }
  /**
  * Serialize the children of a parent that contains flow children.
  *
  * These children will typically be joined by blank lines.
  * What they are joined by exactly is defined by `Join` functions.
  *
  * @this {State}
  *   Info passed around about the current state.
  * @param {FlowParents} parent
  *   Parent of flow nodes.
  * @param {TrackFields} info
  *   Info on where we are in the document we are generating.
  * @returns {string}
  *   Serialized children, joined by (blank) lines.
  */
  function containerFlowBound(parent, info) {
  	return containerFlow(parent, this, info);
  }
  /**
  * Make a string safe for embedding in markdown constructs.
  *
  * In markdown, almost all punctuation characters can, in certain cases,
  * result in something.
  * Whether they do is highly subjective to where they happen and in what
  * they happen.
  *
  * To solve this, `mdast-util-to-markdown` tracks:
  *
  * * Characters before and after something;
  * * What “constructs” we are in.
  *
  * This information is then used by this function to escape or encode
  * special characters.
  *
  * @this {State}
  *   Info passed around about the current state.
  * @param {string | null | undefined} value
  *   Raw value to make safe.
  * @param {SafeConfig} config
  *   Configuration.
  * @returns {string}
  *   Serialized markdown safe for embedding.
  */
  function safeBound(value, config) {
  	return safe(this, value, config);
  }
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/unicode.js
  var UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
  	65534,
  	65535,
  	131070,
  	131071,
  	196606,
  	196607,
  	262142,
  	262143,
  	327678,
  	327679,
  	393214,
  	393215,
  	458750,
  	458751,
  	524286,
  	524287,
  	589822,
  	589823,
  	655358,
  	655359,
  	720894,
  	720895,
  	786430,
  	786431,
  	851966,
  	851967,
  	917502,
  	917503,
  	983038,
  	983039,
  	1048574,
  	1048575,
  	1114110,
  	1114111
  ]);
  var CODE_POINTS;
  (function(CODE_POINTS) {
  	CODE_POINTS[CODE_POINTS["EOF"] = -1] = "EOF";
  	CODE_POINTS[CODE_POINTS["NULL"] = 0] = "NULL";
  	CODE_POINTS[CODE_POINTS["TABULATION"] = 9] = "TABULATION";
  	CODE_POINTS[CODE_POINTS["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
  	CODE_POINTS[CODE_POINTS["LINE_FEED"] = 10] = "LINE_FEED";
  	CODE_POINTS[CODE_POINTS["FORM_FEED"] = 12] = "FORM_FEED";
  	CODE_POINTS[CODE_POINTS["SPACE"] = 32] = "SPACE";
  	CODE_POINTS[CODE_POINTS["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
  	CODE_POINTS[CODE_POINTS["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
  	CODE_POINTS[CODE_POINTS["AMPERSAND"] = 38] = "AMPERSAND";
  	CODE_POINTS[CODE_POINTS["APOSTROPHE"] = 39] = "APOSTROPHE";
  	CODE_POINTS[CODE_POINTS["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
  	CODE_POINTS[CODE_POINTS["SOLIDUS"] = 47] = "SOLIDUS";
  	CODE_POINTS[CODE_POINTS["DIGIT_0"] = 48] = "DIGIT_0";
  	CODE_POINTS[CODE_POINTS["DIGIT_9"] = 57] = "DIGIT_9";
  	CODE_POINTS[CODE_POINTS["SEMICOLON"] = 59] = "SEMICOLON";
  	CODE_POINTS[CODE_POINTS["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
  	CODE_POINTS[CODE_POINTS["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
  	CODE_POINTS[CODE_POINTS["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
  	CODE_POINTS[CODE_POINTS["QUESTION_MARK"] = 63] = "QUESTION_MARK";
  	CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
  	CODE_POINTS[CODE_POINTS["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
  	CODE_POINTS[CODE_POINTS["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
  	CODE_POINTS[CODE_POINTS["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
  	CODE_POINTS[CODE_POINTS["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
  	CODE_POINTS[CODE_POINTS["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  })(CODE_POINTS || (CODE_POINTS = {}));
  var SEQUENCES = {
  	DASH_DASH: "--",
  	CDATA_START: "[CDATA[",
  	DOCTYPE: "doctype",
  	SCRIPT: "script",
  	PUBLIC: "public",
  	SYSTEM: "system"
  };
  function isSurrogate(cp) {
  	return cp >= 55296 && cp <= 57343;
  }
  function isSurrogatePair(cp) {
  	return cp >= 56320 && cp <= 57343;
  }
  function getSurrogatePairCodePoint(cp1, cp2) {
  	return (cp1 - 55296) * 1024 + 9216 + cp2;
  }
  function isControlCodePoint(cp) {
  	return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
  }
  function isUndefinedCodePoint(cp) {
  	return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
  }
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/error-codes.js
  var ERR;
  (function(ERR) {
  	ERR["controlCharacterInInputStream"] = "control-character-in-input-stream";
  	ERR["noncharacterInInputStream"] = "noncharacter-in-input-stream";
  	ERR["surrogateInInputStream"] = "surrogate-in-input-stream";
  	ERR["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
  	ERR["endTagWithAttributes"] = "end-tag-with-attributes";
  	ERR["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
  	ERR["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
  	ERR["unexpectedNullCharacter"] = "unexpected-null-character";
  	ERR["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
  	ERR["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
  	ERR["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
  	ERR["missingEndTagName"] = "missing-end-tag-name";
  	ERR["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
  	ERR["unknownNamedCharacterReference"] = "unknown-named-character-reference";
  	ERR["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
  	ERR["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
  	ERR["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
  	ERR["eofBeforeTagName"] = "eof-before-tag-name";
  	ERR["eofInTag"] = "eof-in-tag";
  	ERR["missingAttributeValue"] = "missing-attribute-value";
  	ERR["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
  	ERR["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
  	ERR["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
  	ERR["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
  	ERR["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
  	ERR["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
  	ERR["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
  	ERR["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
  	ERR["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
  	ERR["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
  	ERR["cdataInHtmlContent"] = "cdata-in-html-content";
  	ERR["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
  	ERR["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
  	ERR["eofInDoctype"] = "eof-in-doctype";
  	ERR["nestedComment"] = "nested-comment";
  	ERR["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
  	ERR["eofInComment"] = "eof-in-comment";
  	ERR["incorrectlyClosedComment"] = "incorrectly-closed-comment";
  	ERR["eofInCdata"] = "eof-in-cdata";
  	ERR["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
  	ERR["nullCharacterReference"] = "null-character-reference";
  	ERR["surrogateCharacterReference"] = "surrogate-character-reference";
  	ERR["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
  	ERR["controlCharacterReference"] = "control-character-reference";
  	ERR["noncharacterCharacterReference"] = "noncharacter-character-reference";
  	ERR["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
  	ERR["missingDoctypeName"] = "missing-doctype-name";
  	ERR["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
  	ERR["duplicateAttribute"] = "duplicate-attribute";
  	ERR["nonConformingDoctype"] = "non-conforming-doctype";
  	ERR["missingDoctype"] = "missing-doctype";
  	ERR["misplacedDoctype"] = "misplaced-doctype";
  	ERR["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
  	ERR["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
  	ERR["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
  	ERR["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
  	ERR["abandonedHeadElementChild"] = "abandoned-head-element-child";
  	ERR["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
  	ERR["nestedNoscriptInHead"] = "nested-noscript-in-head";
  	ERR["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
  })(ERR || (ERR = {}));
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tokenizer/preprocessor.js
  var DEFAULT_BUFFER_WATERLINE = 65536;
  var Preprocessor = class {
  	constructor(handler) {
  		this.handler = handler;
  		this.html = "";
  		this.pos = -1;
  		this.lastGapPos = -2;
  		this.gapStack = [];
  		this.skipNextNewLine = false;
  		this.lastChunkWritten = false;
  		this.endOfChunkHit = false;
  		this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
  		this.isEol = false;
  		this.lineStartPos = 0;
  		this.droppedBufferSize = 0;
  		this.line = 1;
  		this.lastErrOffset = -1;
  	}
  	/** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  	get col() {
  		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
  	}
  	get offset() {
  		return this.droppedBufferSize + this.pos;
  	}
  	getError(code, cpOffset) {
  		const { line, col, offset } = this;
  		const startCol = col + cpOffset;
  		const startOffset = offset + cpOffset;
  		return {
  			code,
  			startLine: line,
  			endLine: line,
  			startCol,
  			endCol: startCol,
  			startOffset,
  			endOffset: startOffset
  		};
  	}
  	_err(code) {
  		if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
  			this.lastErrOffset = this.offset;
  			this.handler.onParseError(this.getError(code, 0));
  		}
  	}
  	_addGap() {
  		this.gapStack.push(this.lastGapPos);
  		this.lastGapPos = this.pos;
  	}
  	_processSurrogate(cp) {
  		if (this.pos !== this.html.length - 1) {
  			const nextCp = this.html.charCodeAt(this.pos + 1);
  			if (isSurrogatePair(nextCp)) {
  				this.pos++;
  				this._addGap();
  				return getSurrogatePairCodePoint(cp, nextCp);
  			}
  		} else if (!this.lastChunkWritten) {
  			this.endOfChunkHit = true;
  			return CODE_POINTS.EOF;
  		}
  		this._err(ERR.surrogateInInputStream);
  		return cp;
  	}
  	willDropParsedChunk() {
  		return this.pos > this.bufferWaterline;
  	}
  	dropParsedChunk() {
  		if (this.willDropParsedChunk()) {
  			this.html = this.html.substring(this.pos);
  			this.lineStartPos -= this.pos;
  			this.droppedBufferSize += this.pos;
  			this.pos = 0;
  			this.lastGapPos = -2;
  			this.gapStack.length = 0;
  		}
  	}
  	write(chunk, isLastChunk) {
  		if (this.html.length > 0) this.html += chunk;
  		else this.html = chunk;
  		this.endOfChunkHit = false;
  		this.lastChunkWritten = isLastChunk;
  	}
  	insertHtmlAtCurrentPos(chunk) {
  		this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
  		this.endOfChunkHit = false;
  	}
  	startsWith(pattern, caseSensitive) {
  		if (this.pos + pattern.length > this.html.length) {
  			this.endOfChunkHit = !this.lastChunkWritten;
  			return false;
  		}
  		if (caseSensitive) return this.html.startsWith(pattern, this.pos);
  		for (let i = 0; i < pattern.length; i++) if ((this.html.charCodeAt(this.pos + i) | 32) !== pattern.charCodeAt(i)) return false;
  		return true;
  	}
  	peek(offset) {
  		const pos = this.pos + offset;
  		if (pos >= this.html.length) {
  			this.endOfChunkHit = !this.lastChunkWritten;
  			return CODE_POINTS.EOF;
  		}
  		const code = this.html.charCodeAt(pos);
  		return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
  	}
  	advance() {
  		this.pos++;
  		if (this.isEol) {
  			this.isEol = false;
  			this.line++;
  			this.lineStartPos = this.pos;
  		}
  		if (this.pos >= this.html.length) {
  			this.endOfChunkHit = !this.lastChunkWritten;
  			return CODE_POINTS.EOF;
  		}
  		let cp = this.html.charCodeAt(this.pos);
  		if (cp === CODE_POINTS.CARRIAGE_RETURN) {
  			this.isEol = true;
  			this.skipNextNewLine = true;
  			return CODE_POINTS.LINE_FEED;
  		}
  		if (cp === CODE_POINTS.LINE_FEED) {
  			this.isEol = true;
  			if (this.skipNextNewLine) {
  				this.line--;
  				this.skipNextNewLine = false;
  				this._addGap();
  				return this.advance();
  			}
  		}
  		this.skipNextNewLine = false;
  		if (isSurrogate(cp)) cp = this._processSurrogate(cp);
  		if (!(this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976)) this._checkForProblematicCharacters(cp);
  		return cp;
  	}
  	_checkForProblematicCharacters(cp) {
  		if (isControlCodePoint(cp)) this._err(ERR.controlCharacterInInputStream);
  		else if (isUndefinedCodePoint(cp)) this._err(ERR.noncharacterInInputStream);
  	}
  	retreat(count) {
  		this.pos -= count;
  		while (this.pos < this.lastGapPos) {
  			this.lastGapPos = this.gapStack.pop();
  			this.pos--;
  		}
  		this.isEol = false;
  	}
  };
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/token.js
  var TokenType;
  (function(TokenType) {
  	TokenType[TokenType["CHARACTER"] = 0] = "CHARACTER";
  	TokenType[TokenType["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
  	TokenType[TokenType["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
  	TokenType[TokenType["START_TAG"] = 3] = "START_TAG";
  	TokenType[TokenType["END_TAG"] = 4] = "END_TAG";
  	TokenType[TokenType["COMMENT"] = 5] = "COMMENT";
  	TokenType[TokenType["DOCTYPE"] = 6] = "DOCTYPE";
  	TokenType[TokenType["EOF"] = 7] = "EOF";
  	TokenType[TokenType["HIBERNATION"] = 8] = "HIBERNATION";
  })(TokenType || (TokenType = {}));
  function getTokenAttr(token, attrName) {
  	for (let i = token.attrs.length - 1; i >= 0; i--) if (token.attrs[i].name === attrName) return token.attrs[i].value;
  	return null;
  }
  //#endregion
  //#region node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/decode-codepoint.js
  /**
  * C1 Unicode control character reference replacements (code points 128–159).
  * Index i gives the replacement for code point 128+i; 0 means "no replacement".
  */
  var c1 = [
  	8364,
  	0,
  	8218,
  	402,
  	8222,
  	8230,
  	8224,
  	8225,
  	710,
  	8240,
  	352,
  	8249,
  	338,
  	0,
  	381,
  	0,
  	0,
  	8216,
  	8217,
  	8220,
  	8221,
  	8226,
  	8211,
  	8212,
  	732,
  	8482,
  	353,
  	8250,
  	339,
  	0,
  	382,
  	376
  ];
  /**
  * True for NUL, UTF-16 surrogates, and values past U+10FFFF.
  * @param codePoint Unicode code point to check.
  */
  function isInvalidCodePoint(codePoint) {
  	return codePoint === 0 || codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111;
  }
  /**
  * Replace the given code point with U+FFFD if it is NUL (0), a surrogate, or
  * outside the valid Unicode range. Code points in the C1 controls range
  * (128–159) are remapped to their Windows-1252 equivalents, following the
  * HTML spec. All other code points are returned unchanged.
  * @param codePoint Unicode code point to convert.
  */
  function replaceCodePoint(codePoint) {
  	if (isInvalidCodePoint(codePoint)) return 65533;
  	if (codePoint >= 128 && codePoint <= 159) return c1[codePoint - 128] || codePoint;
  	return codePoint;
  }
  /**
  * XML numeric character references are the referenced Unicode code point.
  * Invalid values still become U+FFFD; the HTML Windows-1252 C1 remap is not
  * applied.
  * @see https://www.w3.org/TR/xml/#NT-CharRef
  * @param codePoint Unicode code point to convert.
  */
  function replaceCodePointXML(codePoint) {
  	return isInvalidCodePoint(codePoint) ? 65533 : codePoint;
  }
  //#endregion
  //#region node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/internal/decode-shared.js
  var BASE91_INVERSE = /* #__PURE__ */ (() => {
  	const table = /* @__PURE__ */ new Uint8Array(127);
  	let code = 0;
  	for (let char = 33; char <= 126; char++) if (char !== 34 && char !== 36 && char !== 92) table[char] = code++;
  	return table;
  })();
  /**
  * Decode a dictionary-encoded trie string back into its Uint16Array.
  *
  * Stream layout (consumed in this order):
  *   1. dict1 atoms — `dict1AtomCount` uint16 values, delta+RLE encoded.
  *   2. dict2 atoms — `atomCount - dict1AtomCount` values, delta+RLE.
  *   3. dict2 ngrams — `ngramCount - (dictSize - dict1AtomCount)` entries,
  *      each a pair of slot codes that resolve to earlier slots.
  *   4. dict1 ngrams — `dictSize - dict1AtomCount` entries, same shape.
  *   5. data — slot codes, each expanding to one or more uint16 values.
  *
  * Codes use a 91-char base (printable ASCII minus `"`, `$`, `\`):
  *   - char1 < dictSize  → 1-char code, slot = char1
  *   - char1 ≥ dictSize  → 2-char code, slot = dictSize + (char1 - dictSize)*91 + char2
  *
  * Slot index → token kind:
  *   [0, A)                  dict1 atoms     (1-char codes)
  *   [A, dictSize)           dict1 ngrams    (1-char codes)
  *   [dictSize, dictSize+D)  dict2 atoms     (2-char codes)
  *   [dictSize+D, end)       dict2 ngrams    (2-char codes)
  *
  * Both atom dicts decode before any ngram, and dict2 ngrams decode before
  * dict1 ngrams. So every ngram entry references slots whose contents are
  * already filled — no forward references to handle.
  *
  * This runs on library import. Flat typed arrays store each slot as either
  * a plain value (`single`, covering every atom) or a range in a shared
  * `pool` (ngrams).
  * @param input Packed trie string.
  * @param resultLength Expected number of uint16 values in the output.
  * @param atomCount Total number of distinct uint16 values in the trie.
  * @param dict1AtomCount Atoms in the 1-char range (`A` above).
  * @param ngramCount Total number of ngram entries (dict1 + dict2).
  * @param dictSize Number of 1-char code slots; the rest of `BASE - dictSize`
  *   first-byte values are 2-char codes.
  */
  function decodeTrieDict(input, resultLength, atomCount, dict1AtomCount, ngramCount, dictSize) {
  	const base = 91;
  	const inputLength = input.length;
  	const twoCharBias = dictSize * 90;
  	let pos = 0;
  	/** Read one slot code at `pos` and return its slot index, advancing pos. */
  	const readSlotCode = () => {
  		const c1 = BASE91_INVERSE[input.charCodeAt(pos++)];
  		return c1 < dictSize ? c1 : c1 * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
  	};
  	const dict2AtomCount = atomCount - dict1AtomCount;
  	const slotCount = atomCount + ngramCount;
  	const single = new Int32Array(slotCount);
  	single.fill(-1, dict1AtomCount, dictSize);
  	single.fill(-1, dictSize + dict2AtomCount, slotCount);
  	const start = new Int32Array(slotCount);
  	const length = new Int32Array(slotCount);
  	/**
  	* Decode `count` ascending uint16 values from a delta+RLE stream into
  	* `single[off..off+count)`.
  	*
  	*   code < 89   → delta = code
  	*   code == 89  → run-length: next char encodes runLength-2; emit `runLength` consecutive +1 values
  	*   code == 90, next < 90  → escape: delta = 89 + next * BASE + after-next
  	*   code == 90, next == 90 → double-escape: extra char for very large deltas
  	* @param count
  	* @param off
  	*/
  	function decodeDelta(count, off) {
  		let previous = 0;
  		let slot = off;
  		const end = off + count;
  		while (slot < end) {
  			const code = BASE91_INVERSE[input.charCodeAt(pos++)];
  			if (code < 89) {
  				previous += code;
  				single[slot++] = previous;
  			} else if (code === 89) {
  				let runLength = BASE91_INVERSE[input.charCodeAt(pos++)] + 2;
  				while (runLength--) single[slot++] = ++previous;
  			} else {
  				const next = BASE91_INVERSE[input.charCodeAt(pos++)];
  				previous += 89 + (next < 90 ? next * base + BASE91_INVERSE[input.charCodeAt(pos++)] : BASE91_INVERSE[input.charCodeAt(pos++)] * 8281 + BASE91_INVERSE[input.charCodeAt(pos++)] * base + BASE91_INVERSE[input.charCodeAt(pos++)]);
  				single[slot++] = previous;
  			}
  		}
  	}
  	decodeDelta(dict1AtomCount, 0);
  	decodeDelta(dict2AtomCount, dictSize);
  	const references = new Int32Array(ngramCount * 2);
  	let poolSize = 0;
  	let ngramIndex = 0;
  	/**
  	* Read `count` ngram entries (each = 2 slot-code references) for the slots
  	* starting at `startSlot`, recording references and assigning pool ranges.
  	* @param count
  	* @param startSlot
  	*/
  	function readNgramReferences(count, startSlot) {
  		for (let index = 0; index < count; index++) {
  			const slot = startSlot + index;
  			const a = readSlotCode();
  			const b = readSlotCode();
  			references[ngramIndex * 2] = a;
  			references[ngramIndex * 2 + 1] = b;
  			ngramIndex += 1;
  			start[slot] = poolSize;
  			const entryLength = (single[a] < 0 ? length[a] : 1) + (single[b] < 0 ? length[b] : 1);
  			length[slot] = entryLength;
  			poolSize += entryLength;
  		}
  	}
  	readNgramReferences(ngramCount - dictSize + dict1AtomCount, dictSize + dict2AtomCount);
  	readNgramReferences(dictSize - dict1AtomCount, dict1AtomCount);
  	const pool = new Uint16Array(poolSize);
  	let write = 0;
  	for (let index = 0; index < ngramIndex; index++) for (let half = 0; half < 2; half++) {
  		const source = references[index * 2 + half];
  		const value = single[source];
  		if (value < 0) {
  			let read = start[source];
  			const readEnd = read + length[source];
  			while (read < readEnd) pool[write++] = pool[read++];
  		} else pool[write++] = value;
  	}
  	const out = new Uint16Array(resultLength);
  	let outIndex = 0;
  	while (pos < inputLength) {
  		let slot = BASE91_INVERSE[input.charCodeAt(pos++)];
  		if (slot >= dictSize) slot = slot * base - twoCharBias + BASE91_INVERSE[input.charCodeAt(pos++)];
  		const value = single[slot];
  		if (value < 0) {
  			let read = start[slot];
  			const readEnd = read + length[slot];
  			while (read < readEnd) out[outIndex++] = pool[read++];
  		} else out[outIndex++] = value;
  	}
  	return out;
  }
  //#endregion
  //#region node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/generated/decode-data-html.js
  /** Packed HTML decode trie data. */
  var htmlDecodeTree = /* #__PURE__ */ decodeTrieDict("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P", 13494, 2713, 49, 25, 61);
  //#endregion
  //#region node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/generated/decode-data-xml.js
  /** Packed XML decode trie data. */
  var xmlDecodeTree = /* #__PURE__ */ new Uint16Array([
  	512,
  	26465,
  	29036,
  	7,
  	0,
  	2,
  	4,
  	116,
  	24638,
  	116,
  	24636,
  	8693,
  	29807,
  	24610,
  	621,
  	1,
  	0,
  	0,
  	3,
  	112,
  	24614,
  	111,
  	115,
  	24615
  ]);
  //#endregion
  //#region node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/internal/bin-trie-flags.js
  /**
  * Bit flags & masks for the binary trie encoding used for entity decoding.
  *
  * The trie is a flat `Uint16Array`. Every node starts with one header word:
  *
  *   15..14 VALUE_LENGTH   Number of words the value occupies, +1.
  *                         0 = no value; 1 = value inline in bits 12..0;
  *                         2/3 = value in the 1/2 words after the header.
  *   13     FLAG13         If VALUE_LENGTH > 0: semicolon required ("strict"
  *                         entity; `;` is never stored as a branch).
  *                         If VALUE_LENGTH == 0: this node is a compact run.
  *   12..7  BRANCH_LENGTH  Number of branches (or run length for runs).
  *   6..0   JUMP_TABLE     Jump-table offset / single-branch char / first
  *                         run char (see below).
  *
  * Branch data follows the header and any value words. Its shape is selected
  * by (JUMP_TABLE, BRANCH_LENGTH) in the header:
  *
  *   Single branch  JUMP_TABLE = the only child's char, BRANCH_LENGTH = 0.
  *                  No branch words; the child node follows immediately.
  *   Jump table     JUMP_TABLE = first covered char (> 0), BRANCH_LENGTH =
  *                  table length. One word per covered char: 0 = no branch,
  *                  otherwise the child's offset from the END of the table,
  *                  +1 (so 0 stays the no-branch sentinel).
  *   Dictionary     JUMP_TABLE = 0, BRANCH_LENGTH = number of branches.
  *                  ceil(n/2) words of sorted keys packed two per word
  *                  (low byte first), then n pointer words storing the
  *                  child's offset from the END of the branch data.
  *   Compact run    VALUE_LENGTH = 0, FLAG13 set. BRANCH_LENGTH = run
  *                  length (3..63), JUMP_TABLE = first char; remaining run
  *                  chars packed two per word after the header. The target
  *                  node follows the packed words immediately.
  *
  * Pointers are end-relative (rather than relative to the pointer's own
  * position) because that makes the common "child encoded right after the
  * branch data" case a small constant, which compresses far better. Offsets
  * to already-encoded (shared) nodes wrap via uint16 modulo arithmetic; the
  * decoder masks navigation results with `& 0xff_ff` to match.
  */
  var BinTrieFlags;
  (function(BinTrieFlags) {
  	BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  	BinTrieFlags[BinTrieFlags["FLAG13"] = 8192] = "FLAG13";
  	BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
  	BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  	/** Bits 12..0: the inline value of a VALUE_LENGTH = 1 header word. */
  	BinTrieFlags[BinTrieFlags["VALUE_MASK"] = 8191] = "VALUE_MASK";
  })(BinTrieFlags || (BinTrieFlags = {}));
  //#endregion
  //#region \0@oxc-project+runtime@0.148.0/helpers/esm/typeof.js
  function _typeof(o) {
  	"@babel/helpers - typeof";
  	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
  		return typeof o;
  	} : function(o) {
  		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  	}, _typeof(o);
  }
  //#endregion
  //#region \0@oxc-project+runtime@0.148.0/helpers/esm/toPrimitive.js
  function toPrimitive(t, r) {
  	if ("object" != _typeof(t) || !t) return t;
  	var e = t[Symbol.toPrimitive];
  	if (void 0 !== e) {
  		var i = e.call(t, r || "default");
  		if ("object" != _typeof(i)) return i;
  		throw new TypeError("@@toPrimitive must return a primitive value.");
  	}
  	return ("string" === r ? String : Number)(t);
  }
  //#endregion
  //#region \0@oxc-project+runtime@0.148.0/helpers/esm/toPropertyKey.js
  function toPropertyKey(t) {
  	var i = toPrimitive(t, "string");
  	return "symbol" == _typeof(i) ? i : i + "";
  }
  //#endregion
  //#region \0@oxc-project+runtime@0.148.0/helpers/esm/defineProperty.js
  function _defineProperty(e, r, t) {
  	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
  		value: t,
  		enumerable: !0,
  		configurable: !0,
  		writable: !0
  	}) : e[r] = t, e;
  }
  //#endregion
  //#region node_modules/.pnpm/entities@8.1.0/node_modules/entities/dist/decode.js
  var CharCodes;
  (function(CharCodes) {
  	CharCodes[CharCodes["AMP"] = 38] = "AMP";
  	CharCodes[CharCodes["NUM"] = 35] = "NUM";
  	CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
  	CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
  	CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
  	CharCodes[CharCodes["NINE"] = 57] = "NINE";
  	CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
  	CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
  })(CharCodes || (CharCodes = {}));
  /** Bit that needs to be set to convert an upper case ASCII character to lower case */
  var TO_LOWER_BIT = 32;
  /**
  * Unsigned subtraction trick: (code - lo) >>> 0 wraps negatives to large
  * values, so a single `<=` covers the entire [lo..hi] range check.
  * @param code Code point to check.
  */
  function isNumber(code) {
  	return code - CharCodes.ZERO >>> 0 <= 9;
  }
  function isHexadecimalCharacter(code) {
  	return (code | TO_LOWER_BIT) - CharCodes.LOWER_A >>> 0 <= 5;
  }
  function isAlpha(code) {
  	return (code | TO_LOWER_BIT) - CharCodes.LOWER_A >>> 0 <= 25;
  }
  /**
  * Checks if the given character is a valid end character for an entity in an attribute.
  *
  * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
  * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
  * @param code Code point to check.
  */
  function isEntityInAttributeInvalidEnd(code) {
  	return code === CharCodes.EQUALS || isAlpha(code) || isNumber(code);
  }
  var EntityDecoderState;
  (function(EntityDecoderState) {
  	EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
  	EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
  	EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
  	EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
  	EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  /**
  * Decoding mode for named entities.
  */
  var DecodingMode;
  (function(DecodingMode) {
  	/** Entities in text nodes that can end with any character. */
  	DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
  	/** Only allow entities terminated with a semicolon. */
  	DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
  	/** Entities in attributes have limitations on ending characters. */
  	DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  /**
  * Token decoder with support of writing partial entities.
  */
  var EntityDecoder = class {
  	constructor(decodeTree, emitCodePoint, errors) {
  		_defineProperty(this, "decodeTree", void 0);
  		_defineProperty(this, "emitCodePoint", void 0);
  		_defineProperty(this, "errors", void 0);
  		_defineProperty(
  			this,
  			/** The current state of the decoder. */
  			"state",
  			EntityDecoderState.EntityStart
  		);
  		_defineProperty(
  			this,
  			/** Characters that were consumed while parsing an entity. */
  			"consumed",
  			1
  		);
  		_defineProperty(
  			this,
  			/**
  			* The result of the entity.
  			*
  			* For named entities: the trie index of the best legacy match so far
  			* (0 = none). For numeric entities: the accumulated code point.
  			*/
  			"result",
  			0
  		);
  		_defineProperty(
  			this,
  			/** The current index in the decode tree. */
  			"treeIndex",
  			0
  		);
  		_defineProperty(
  			this,
  			/**
  			* Characters consumed since the last recorded legacy match, plus one.
  			* Invariant at the top of the `stateNamedEntity` loop: `excess` equals
  			* the number of unrecorded consumed characters + 1.
  			*/
  			"excess",
  			1
  		);
  		_defineProperty(
  			this,
  			/** The mode in which the decoder is operating. */
  			"decodeMode",
  			DecodingMode.Strict
  		);
  		_defineProperty(
  			this,
  			/** The number of characters that have been consumed in the current run. */
  			"runConsumed",
  			0
  		);
  		this.decodeTree = decodeTree;
  		this.emitCodePoint = emitCodePoint;
  		this.errors = errors;
  	}
  	/**
  	* Resets the instance to make it reusable.
  	* @param decodeMode Entity decoding mode to use.
  	*/
  	startEntity(decodeMode) {
  		this.decodeMode = decodeMode;
  		this.state = EntityDecoderState.EntityStart;
  		this.result = 0;
  		this.treeIndex = 0;
  		this.excess = 1;
  		this.consumed = 1;
  		this.runConsumed = 0;
  	}
  	/**
  	* Write an entity to the decoder. This can be called multiple times with partial entities.
  	* If the entity is incomplete, the decoder will return -1.
  	*
  	* Mirrors the non-streaming `decodeWithTrie`, but with the ability to stop decoding if the
  	* entity is incomplete, and resume when the next string is written.
  	* @param input The string containing the entity (or a continuation of the entity).
  	* @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
  	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  	*/
  	write(input, offset) {
  		switch (this.state) {
  			case EntityDecoderState.EntityStart:
  				if (input.charCodeAt(offset) === CharCodes.NUM) {
  					this.state = EntityDecoderState.NumericStart;
  					this.consumed += 1;
  					return this.stateNumericStart(input, offset + 1);
  				}
  				this.state = EntityDecoderState.NamedEntity;
  				return this.stateNamedEntity(input, offset);
  			case EntityDecoderState.NumericStart: return this.stateNumericStart(input, offset);
  			case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(input, offset);
  			case EntityDecoderState.NumericHex: return this.stateNumericHex(input, offset);
  			default: return this.stateNamedEntity(input, offset);
  		}
  	}
  	/**
  	* Switches between the numeric decimal and hexadecimal states.
  	*
  	* Equivalent to the `Numeric character reference state` in the HTML spec.
  	* @param input The string containing the entity (or a continuation of the entity).
  	* @param offset The current offset.
  	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  	*/
  	stateNumericStart(input, offset) {
  		if (offset >= input.length) return -1;
  		if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
  			this.state = EntityDecoderState.NumericHex;
  			this.consumed += 1;
  			return this.stateNumericHex(input, offset + 1);
  		}
  		this.state = EntityDecoderState.NumericDecimal;
  		return this.stateNumericDecimal(input, offset);
  	}
  	/**
  	* Parses a hexadecimal numeric entity.
  	*
  	* Equivalent to the `Hexademical character reference state` in the HTML
  	* spec. Digit parsing matches the hex loop in `parseNumericEntity`.
  	* The accumulated value is preserved for numeric validation callbacks.
  	* @param input The string containing the entity (or a continuation of the entity).
  	* @param offset The current offset.
  	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  	*/
  	stateNumericHex(input, offset) {
  		const inputLength = input.length;
  		let { result } = this;
  		let { consumed } = this;
  		while (offset < inputLength) {
  			const char = input.charCodeAt(offset);
  			if (isNumber(char) || isHexadecimalCharacter(char)) {
  				const digit = char <= CharCodes.NINE ? char - CharCodes.ZERO : (char | TO_LOWER_BIT) - CharCodes.LOWER_A + 10;
  				result = result * 16 + digit;
  				consumed += 1;
  				offset += 1;
  			} else {
  				this.result = result;
  				this.consumed = consumed;
  				return this.emitNumericEntity(char, 3);
  			}
  		}
  		this.result = result;
  		this.consumed = consumed;
  		return -1;
  	}
  	/**
  	* Parses a decimal numeric entity.
  	*
  	* Equivalent to the `Decimal character reference state` in the HTML
  	* spec. Digit parsing matches the decimal loop in `parseNumericEntity`.
  	* The accumulated value is preserved for numeric validation callbacks.
  	* @param input The string containing the entity (or a continuation of the entity).
  	* @param offset The current offset.
  	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  	*/
  	stateNumericDecimal(input, offset) {
  		const inputLength = input.length;
  		let { result } = this;
  		let { consumed } = this;
  		while (offset < inputLength) {
  			const digit = input.charCodeAt(offset) - CharCodes.ZERO;
  			if (digit >>> 0 > 9) {
  				this.result = result;
  				this.consumed = consumed;
  				return this.emitNumericEntity(digit + CharCodes.ZERO, 2);
  			}
  			result = result * 10 + digit;
  			consumed += 1;
  			offset += 1;
  		}
  		this.result = result;
  		this.consumed = consumed;
  		return -1;
  	}
  	/**
  	* Validate and emit a numeric entity.
  	*
  	* Implements the logic from the `Hexademical character reference start
  	* state` and `Numeric character reference end state` in the HTML spec.
  	* @param lastCp The last code point of the entity. Used to see if the
  	*               entity was terminated with a semicolon.
  	* @param expectedLength The minimum number of characters that should be
  	*                       consumed. Used to validate that at least one digit
  	*                       was consumed.
  	* @returns The number of characters that were consumed.
  	*/
  	emitNumericEntity(lastCp, expectedLength) {
  		if (this.consumed <= expectedLength) {
  			this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
  			return 0;
  		}
  		if (lastCp === CharCodes.SEMI) this.consumed += 1;
  		else if (this.decodeMode === DecodingMode.Strict) return 0;
  		this.emitCodePoint((this.decodeTree === xmlDecodeTree ? replaceCodePointXML : replaceCodePoint)(this.result), this.consumed);
  		if (this.errors) {
  			if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
  			this.errors.validateNumericCharacterReference(this.result);
  		}
  		return this.consumed;
  	}
  	/**
  	* Flush locally-tracked walk state back to the fields, then emit the
  	* recorded legacy match or reject (cold path — at most once per
  	* entity). Called after failed navigation (leaf node, branch miss, or
  	* compact-run mismatch). In attribute mode, reject if no legacy was
  	* recorded at the current node, if we descended past it, or if the
  	* pending input character is an invalid attribute terminator.
  	* @param consumed Locally-tracked consumed count.
  	* @param excess Locally-tracked excess count.
  	* @param char Pending input character (may be the mismatching char).
  	* @param valueLength Value length at the current trie node.
  	*/
  	flushAndEmitLegacyOrReject(consumed, excess, char, valueLength) {
  		this.consumed = consumed;
  		this.excess = excess;
  		return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || excess > 1 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
  	}
  	/**
  	* Parses a named entity.
  	*
  	* Equivalent to the `Named character reference state` in the HTML spec.
  	* @param input The string containing the entity (or a continuation of the entity).
  	* @param offset The current offset.
  	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
  	*/
  	stateNamedEntity(input, offset) {
  		const { decodeTree } = this;
  		const inputLength = input.length;
  		const isStrict = this.decodeMode === DecodingMode.Strict;
  		let { treeIndex } = this;
  		let { excess } = this;
  		let { consumed } = this;
  		let current = decodeTree[treeIndex];
  		while (offset < inputLength) {
  			while ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === 0 && (current & BinTrieFlags.JUMP_TABLE) !== 0) {
  				const char = input.charCodeAt(offset);
  				const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  				const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  				if (branchCount === 0) {
  					if (char !== jumpOffset) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
  					treeIndex += 1;
  				} else {
  					const slot = char - jumpOffset;
  					if (slot >>> 0 >= branchCount) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
  					const stored = decodeTree[treeIndex + 1 + slot];
  					if (stored === 0) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
  					treeIndex = treeIndex + branchCount + stored & 65535;
  				}
  				current = decodeTree[treeIndex];
  				offset += 1;
  				excess += 1;
  				if (offset >= inputLength) break;
  			}
  			if (offset >= inputLength) break;
  			if ((current & (BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13)) === BinTrieFlags.FLAG13) {
  				const runLength = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  				let { runConsumed } = this;
  				if (runConsumed === 0) {
  					const char = input.charCodeAt(offset);
  					if (char !== (current & BinTrieFlags.JUMP_TABLE)) return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
  					offset += 1;
  					excess += 1;
  					runConsumed = 1;
  				}
  				while (runConsumed < runLength) {
  					if (offset >= inputLength) {
  						this.treeIndex = treeIndex;
  						this.excess = excess;
  						this.consumed = consumed;
  						this.runConsumed = runConsumed;
  						return -1;
  					}
  					const charIndexInPacked = runConsumed - 1;
  					const expectedChar = decodeTree[treeIndex + 1 + (charIndexInPacked >> 1)] >> ((charIndexInPacked & 1) << 3) & 255;
  					const char = input.charCodeAt(offset);
  					if (char !== expectedChar) {
  						this.runConsumed = 0;
  						return this.flushAndEmitLegacyOrReject(consumed, excess, char, 0);
  					}
  					offset += 1;
  					excess += 1;
  					runConsumed += 1;
  				}
  				this.runConsumed = 0;
  				treeIndex += 1 + (runLength >> 1);
  				current = decodeTree[treeIndex];
  				continue;
  			}
  			const valueLength = current >>> 14;
  			const char = input.charCodeAt(offset);
  			if (valueLength !== 0) {
  				if (!isStrict && (current & BinTrieFlags.FLAG13) === 0) {
  					this.result = treeIndex;
  					consumed += excess - 1;
  					excess = 1;
  				}
  				if (char === CharCodes.SEMI) return this.emitNamedEntityData(treeIndex, valueLength, consumed + excess);
  				if (valueLength === 1) return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
  			}
  			const next = determineBranch(decodeTree, current, treeIndex + (valueLength || 1), char);
  			if (next < 0) return this.flushAndEmitLegacyOrReject(consumed, excess, char, valueLength);
  			treeIndex = next;
  			current = decodeTree[treeIndex];
  			offset += 1;
  			excess += 1;
  		}
  		if (!isStrict && current >>> 14 !== 0 && (current & BinTrieFlags.FLAG13) === 0) {
  			this.result = treeIndex;
  			consumed += excess - 1;
  			excess = 1;
  		}
  		this.treeIndex = treeIndex;
  		this.excess = excess;
  		this.consumed = consumed;
  		return -1;
  	}
  	/**
  	* Emit a named entity that was not terminated with a semicolon.
  	* @returns The number of characters consumed.
  	*/
  	emitNotTerminatedNamedEntity() {
  		const { result, decodeTree } = this;
  		const valueLength = decodeTree[result] >>> 14;
  		this.emitNamedEntityData(result, valueLength, this.consumed);
  		this.errors?.missingSemicolonAfterCharacterReference();
  		return this.consumed;
  	}
  	/**
  	* Emit a named entity.
  	* @param result The index of the entity in the decode tree.
  	* @param valueLength Encoded value length (header plus any value words).
  	* @param consumed The number of characters consumed.
  	* @returns The number of characters consumed.
  	*/
  	emitNamedEntityData(result, valueLength, consumed) {
  		const { decodeTree } = this;
  		this.emitCodePoint(valueLength === 1 ? decodeTree[result] & BinTrieFlags.VALUE_MASK : decodeTree[result + 1], consumed);
  		if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
  		return consumed;
  	}
  	/**
  	* Signal to the parser that the end of the input was reached.
  	*
  	* Remaining data will be emitted and relevant errors will be produced.
  	* @returns The number of characters consumed.
  	*/
  	end() {
  		switch (this.state) {
  			case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
  			case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
  			case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
  			case EntityDecoderState.NumericStart:
  				this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed);
  				return 0;
  			default: return 0;
  		}
  	}
  };
  /**
  * Determines the branch of the current node that is taken given the current
  * character. This function is used to traverse the trie.
  *
  * See `BinTrieFlags` for the branch-data layouts handled here.
  * @param decodeTree The trie.
  * @param current The current node's header word.
  * @param nodeIndex Index of the node's first branch-data word (the header
  *   plus any value words have been skipped by the caller).
  * @param char The current character.
  * @returns The index of the next node, or -1 if no branch is taken.
  */
  function determineBranch(decodeTree, current, nodeIndex, char) {
  	const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  	const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  	if (jumpOffset) {
  		if (branchCount === 0) return char === jumpOffset ? nodeIndex : -1;
  		const slot = char - jumpOffset;
  		if (slot >>> 0 >= branchCount) return -1;
  		const stored = decodeTree[nodeIndex + slot];
  		return stored === 0 ? -1 : nodeIndex + branchCount + stored - 1 & 65535;
  	}
  	if (branchCount === 0) return -1;
  	const packedKeySlots = branchCount + 1 >> 1;
  	const branchEnd = nodeIndex + packedKeySlots + branchCount;
  	for (let index = 0; index < branchCount; index++) {
  		const key = decodeTree[nodeIndex + (index >> 1)] >> ((index & 1) << 3) & 255;
  		if (key === char) return branchEnd + decodeTree[nodeIndex + packedKeySlots + index] & 65535;
  		if (key > char) return -1;
  	}
  	return -1;
  }
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/html.js
  /** All valid namespaces in HTML. */
  var NS;
  (function(NS) {
  	NS["HTML"] = "http://www.w3.org/1999/xhtml";
  	NS["MATHML"] = "http://www.w3.org/1998/Math/MathML";
  	NS["SVG"] = "http://www.w3.org/2000/svg";
  	NS["XLINK"] = "http://www.w3.org/1999/xlink";
  	NS["XML"] = "http://www.w3.org/XML/1998/namespace";
  	NS["XMLNS"] = "http://www.w3.org/2000/xmlns/";
  })(NS || (NS = {}));
  var ATTRS;
  (function(ATTRS) {
  	ATTRS["TYPE"] = "type";
  	ATTRS["ACTION"] = "action";
  	ATTRS["ENCODING"] = "encoding";
  	ATTRS["PROMPT"] = "prompt";
  	ATTRS["NAME"] = "name";
  	ATTRS["COLOR"] = "color";
  	ATTRS["FACE"] = "face";
  	ATTRS["SIZE"] = "size";
  })(ATTRS || (ATTRS = {}));
  /**
  * The mode of the document.
  *
  * @see {@link https://dom.spec.whatwg.org/#concept-document-limited-quirks}
  */
  var DOCUMENT_MODE;
  (function(DOCUMENT_MODE) {
  	DOCUMENT_MODE["NO_QUIRKS"] = "no-quirks";
  	DOCUMENT_MODE["QUIRKS"] = "quirks";
  	DOCUMENT_MODE["LIMITED_QUIRKS"] = "limited-quirks";
  })(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
  var TAG_NAMES;
  (function(TAG_NAMES) {
  	TAG_NAMES["A"] = "a";
  	TAG_NAMES["ADDRESS"] = "address";
  	TAG_NAMES["ANNOTATION_XML"] = "annotation-xml";
  	TAG_NAMES["APPLET"] = "applet";
  	TAG_NAMES["AREA"] = "area";
  	TAG_NAMES["ARTICLE"] = "article";
  	TAG_NAMES["ASIDE"] = "aside";
  	TAG_NAMES["B"] = "b";
  	TAG_NAMES["BASE"] = "base";
  	TAG_NAMES["BASEFONT"] = "basefont";
  	TAG_NAMES["BGSOUND"] = "bgsound";
  	TAG_NAMES["BIG"] = "big";
  	TAG_NAMES["BLOCKQUOTE"] = "blockquote";
  	TAG_NAMES["BODY"] = "body";
  	TAG_NAMES["BR"] = "br";
  	TAG_NAMES["BUTTON"] = "button";
  	TAG_NAMES["CAPTION"] = "caption";
  	TAG_NAMES["CENTER"] = "center";
  	TAG_NAMES["CODE"] = "code";
  	TAG_NAMES["COL"] = "col";
  	TAG_NAMES["COLGROUP"] = "colgroup";
  	TAG_NAMES["DD"] = "dd";
  	TAG_NAMES["DESC"] = "desc";
  	TAG_NAMES["DETAILS"] = "details";
  	TAG_NAMES["DIALOG"] = "dialog";
  	TAG_NAMES["DIR"] = "dir";
  	TAG_NAMES["DIV"] = "div";
  	TAG_NAMES["DL"] = "dl";
  	TAG_NAMES["DT"] = "dt";
  	TAG_NAMES["EM"] = "em";
  	TAG_NAMES["EMBED"] = "embed";
  	TAG_NAMES["FIELDSET"] = "fieldset";
  	TAG_NAMES["FIGCAPTION"] = "figcaption";
  	TAG_NAMES["FIGURE"] = "figure";
  	TAG_NAMES["FONT"] = "font";
  	TAG_NAMES["FOOTER"] = "footer";
  	TAG_NAMES["FOREIGN_OBJECT"] = "foreignObject";
  	TAG_NAMES["FORM"] = "form";
  	TAG_NAMES["FRAME"] = "frame";
  	TAG_NAMES["FRAMESET"] = "frameset";
  	TAG_NAMES["H1"] = "h1";
  	TAG_NAMES["H2"] = "h2";
  	TAG_NAMES["H3"] = "h3";
  	TAG_NAMES["H4"] = "h4";
  	TAG_NAMES["H5"] = "h5";
  	TAG_NAMES["H6"] = "h6";
  	TAG_NAMES["HEAD"] = "head";
  	TAG_NAMES["HEADER"] = "header";
  	TAG_NAMES["HGROUP"] = "hgroup";
  	TAG_NAMES["HR"] = "hr";
  	TAG_NAMES["HTML"] = "html";
  	TAG_NAMES["I"] = "i";
  	TAG_NAMES["IMG"] = "img";
  	TAG_NAMES["IMAGE"] = "image";
  	TAG_NAMES["INPUT"] = "input";
  	TAG_NAMES["IFRAME"] = "iframe";
  	TAG_NAMES["KEYGEN"] = "keygen";
  	TAG_NAMES["LABEL"] = "label";
  	TAG_NAMES["LI"] = "li";
  	TAG_NAMES["LINK"] = "link";
  	TAG_NAMES["LISTING"] = "listing";
  	TAG_NAMES["MAIN"] = "main";
  	TAG_NAMES["MALIGNMARK"] = "malignmark";
  	TAG_NAMES["MARQUEE"] = "marquee";
  	TAG_NAMES["MATH"] = "math";
  	TAG_NAMES["MENU"] = "menu";
  	TAG_NAMES["META"] = "meta";
  	TAG_NAMES["MGLYPH"] = "mglyph";
  	TAG_NAMES["MI"] = "mi";
  	TAG_NAMES["MO"] = "mo";
  	TAG_NAMES["MN"] = "mn";
  	TAG_NAMES["MS"] = "ms";
  	TAG_NAMES["MTEXT"] = "mtext";
  	TAG_NAMES["NAV"] = "nav";
  	TAG_NAMES["NOBR"] = "nobr";
  	TAG_NAMES["NOFRAMES"] = "noframes";
  	TAG_NAMES["NOEMBED"] = "noembed";
  	TAG_NAMES["NOSCRIPT"] = "noscript";
  	TAG_NAMES["OBJECT"] = "object";
  	TAG_NAMES["OL"] = "ol";
  	TAG_NAMES["OPTGROUP"] = "optgroup";
  	TAG_NAMES["OPTION"] = "option";
  	TAG_NAMES["P"] = "p";
  	TAG_NAMES["PARAM"] = "param";
  	TAG_NAMES["PLAINTEXT"] = "plaintext";
  	TAG_NAMES["PRE"] = "pre";
  	TAG_NAMES["RB"] = "rb";
  	TAG_NAMES["RP"] = "rp";
  	TAG_NAMES["RT"] = "rt";
  	TAG_NAMES["RTC"] = "rtc";
  	TAG_NAMES["RUBY"] = "ruby";
  	TAG_NAMES["S"] = "s";
  	TAG_NAMES["SCRIPT"] = "script";
  	TAG_NAMES["SEARCH"] = "search";
  	TAG_NAMES["SECTION"] = "section";
  	TAG_NAMES["SELECT"] = "select";
  	TAG_NAMES["SOURCE"] = "source";
  	TAG_NAMES["SMALL"] = "small";
  	TAG_NAMES["SPAN"] = "span";
  	TAG_NAMES["STRIKE"] = "strike";
  	TAG_NAMES["STRONG"] = "strong";
  	TAG_NAMES["STYLE"] = "style";
  	TAG_NAMES["SUB"] = "sub";
  	TAG_NAMES["SUMMARY"] = "summary";
  	TAG_NAMES["SUP"] = "sup";
  	TAG_NAMES["TABLE"] = "table";
  	TAG_NAMES["TBODY"] = "tbody";
  	TAG_NAMES["TEMPLATE"] = "template";
  	TAG_NAMES["TEXTAREA"] = "textarea";
  	TAG_NAMES["TFOOT"] = "tfoot";
  	TAG_NAMES["TD"] = "td";
  	TAG_NAMES["TH"] = "th";
  	TAG_NAMES["THEAD"] = "thead";
  	TAG_NAMES["TITLE"] = "title";
  	TAG_NAMES["TR"] = "tr";
  	TAG_NAMES["TRACK"] = "track";
  	TAG_NAMES["TT"] = "tt";
  	TAG_NAMES["U"] = "u";
  	TAG_NAMES["UL"] = "ul";
  	TAG_NAMES["SVG"] = "svg";
  	TAG_NAMES["VAR"] = "var";
  	TAG_NAMES["WBR"] = "wbr";
  	TAG_NAMES["XMP"] = "xmp";
  })(TAG_NAMES || (TAG_NAMES = {}));
  /**
  * Tag IDs are numeric IDs for known tag names.
  *
  * We use tag IDs to improve the performance of tag name comparisons.
  */
  var TAG_ID;
  (function(TAG_ID) {
  	TAG_ID[TAG_ID["UNKNOWN"] = 0] = "UNKNOWN";
  	TAG_ID[TAG_ID["A"] = 1] = "A";
  	TAG_ID[TAG_ID["ADDRESS"] = 2] = "ADDRESS";
  	TAG_ID[TAG_ID["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
  	TAG_ID[TAG_ID["APPLET"] = 4] = "APPLET";
  	TAG_ID[TAG_ID["AREA"] = 5] = "AREA";
  	TAG_ID[TAG_ID["ARTICLE"] = 6] = "ARTICLE";
  	TAG_ID[TAG_ID["ASIDE"] = 7] = "ASIDE";
  	TAG_ID[TAG_ID["B"] = 8] = "B";
  	TAG_ID[TAG_ID["BASE"] = 9] = "BASE";
  	TAG_ID[TAG_ID["BASEFONT"] = 10] = "BASEFONT";
  	TAG_ID[TAG_ID["BGSOUND"] = 11] = "BGSOUND";
  	TAG_ID[TAG_ID["BIG"] = 12] = "BIG";
  	TAG_ID[TAG_ID["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
  	TAG_ID[TAG_ID["BODY"] = 14] = "BODY";
  	TAG_ID[TAG_ID["BR"] = 15] = "BR";
  	TAG_ID[TAG_ID["BUTTON"] = 16] = "BUTTON";
  	TAG_ID[TAG_ID["CAPTION"] = 17] = "CAPTION";
  	TAG_ID[TAG_ID["CENTER"] = 18] = "CENTER";
  	TAG_ID[TAG_ID["CODE"] = 19] = "CODE";
  	TAG_ID[TAG_ID["COL"] = 20] = "COL";
  	TAG_ID[TAG_ID["COLGROUP"] = 21] = "COLGROUP";
  	TAG_ID[TAG_ID["DD"] = 22] = "DD";
  	TAG_ID[TAG_ID["DESC"] = 23] = "DESC";
  	TAG_ID[TAG_ID["DETAILS"] = 24] = "DETAILS";
  	TAG_ID[TAG_ID["DIALOG"] = 25] = "DIALOG";
  	TAG_ID[TAG_ID["DIR"] = 26] = "DIR";
  	TAG_ID[TAG_ID["DIV"] = 27] = "DIV";
  	TAG_ID[TAG_ID["DL"] = 28] = "DL";
  	TAG_ID[TAG_ID["DT"] = 29] = "DT";
  	TAG_ID[TAG_ID["EM"] = 30] = "EM";
  	TAG_ID[TAG_ID["EMBED"] = 31] = "EMBED";
  	TAG_ID[TAG_ID["FIELDSET"] = 32] = "FIELDSET";
  	TAG_ID[TAG_ID["FIGCAPTION"] = 33] = "FIGCAPTION";
  	TAG_ID[TAG_ID["FIGURE"] = 34] = "FIGURE";
  	TAG_ID[TAG_ID["FONT"] = 35] = "FONT";
  	TAG_ID[TAG_ID["FOOTER"] = 36] = "FOOTER";
  	TAG_ID[TAG_ID["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
  	TAG_ID[TAG_ID["FORM"] = 38] = "FORM";
  	TAG_ID[TAG_ID["FRAME"] = 39] = "FRAME";
  	TAG_ID[TAG_ID["FRAMESET"] = 40] = "FRAMESET";
  	TAG_ID[TAG_ID["H1"] = 41] = "H1";
  	TAG_ID[TAG_ID["H2"] = 42] = "H2";
  	TAG_ID[TAG_ID["H3"] = 43] = "H3";
  	TAG_ID[TAG_ID["H4"] = 44] = "H4";
  	TAG_ID[TAG_ID["H5"] = 45] = "H5";
  	TAG_ID[TAG_ID["H6"] = 46] = "H6";
  	TAG_ID[TAG_ID["HEAD"] = 47] = "HEAD";
  	TAG_ID[TAG_ID["HEADER"] = 48] = "HEADER";
  	TAG_ID[TAG_ID["HGROUP"] = 49] = "HGROUP";
  	TAG_ID[TAG_ID["HR"] = 50] = "HR";
  	TAG_ID[TAG_ID["HTML"] = 51] = "HTML";
  	TAG_ID[TAG_ID["I"] = 52] = "I";
  	TAG_ID[TAG_ID["IMG"] = 53] = "IMG";
  	TAG_ID[TAG_ID["IMAGE"] = 54] = "IMAGE";
  	TAG_ID[TAG_ID["INPUT"] = 55] = "INPUT";
  	TAG_ID[TAG_ID["IFRAME"] = 56] = "IFRAME";
  	TAG_ID[TAG_ID["KEYGEN"] = 57] = "KEYGEN";
  	TAG_ID[TAG_ID["LABEL"] = 58] = "LABEL";
  	TAG_ID[TAG_ID["LI"] = 59] = "LI";
  	TAG_ID[TAG_ID["LINK"] = 60] = "LINK";
  	TAG_ID[TAG_ID["LISTING"] = 61] = "LISTING";
  	TAG_ID[TAG_ID["MAIN"] = 62] = "MAIN";
  	TAG_ID[TAG_ID["MALIGNMARK"] = 63] = "MALIGNMARK";
  	TAG_ID[TAG_ID["MARQUEE"] = 64] = "MARQUEE";
  	TAG_ID[TAG_ID["MATH"] = 65] = "MATH";
  	TAG_ID[TAG_ID["MENU"] = 66] = "MENU";
  	TAG_ID[TAG_ID["META"] = 67] = "META";
  	TAG_ID[TAG_ID["MGLYPH"] = 68] = "MGLYPH";
  	TAG_ID[TAG_ID["MI"] = 69] = "MI";
  	TAG_ID[TAG_ID["MO"] = 70] = "MO";
  	TAG_ID[TAG_ID["MN"] = 71] = "MN";
  	TAG_ID[TAG_ID["MS"] = 72] = "MS";
  	TAG_ID[TAG_ID["MTEXT"] = 73] = "MTEXT";
  	TAG_ID[TAG_ID["NAV"] = 74] = "NAV";
  	TAG_ID[TAG_ID["NOBR"] = 75] = "NOBR";
  	TAG_ID[TAG_ID["NOFRAMES"] = 76] = "NOFRAMES";
  	TAG_ID[TAG_ID["NOEMBED"] = 77] = "NOEMBED";
  	TAG_ID[TAG_ID["NOSCRIPT"] = 78] = "NOSCRIPT";
  	TAG_ID[TAG_ID["OBJECT"] = 79] = "OBJECT";
  	TAG_ID[TAG_ID["OL"] = 80] = "OL";
  	TAG_ID[TAG_ID["OPTGROUP"] = 81] = "OPTGROUP";
  	TAG_ID[TAG_ID["OPTION"] = 82] = "OPTION";
  	TAG_ID[TAG_ID["P"] = 83] = "P";
  	TAG_ID[TAG_ID["PARAM"] = 84] = "PARAM";
  	TAG_ID[TAG_ID["PLAINTEXT"] = 85] = "PLAINTEXT";
  	TAG_ID[TAG_ID["PRE"] = 86] = "PRE";
  	TAG_ID[TAG_ID["RB"] = 87] = "RB";
  	TAG_ID[TAG_ID["RP"] = 88] = "RP";
  	TAG_ID[TAG_ID["RT"] = 89] = "RT";
  	TAG_ID[TAG_ID["RTC"] = 90] = "RTC";
  	TAG_ID[TAG_ID["RUBY"] = 91] = "RUBY";
  	TAG_ID[TAG_ID["S"] = 92] = "S";
  	TAG_ID[TAG_ID["SCRIPT"] = 93] = "SCRIPT";
  	TAG_ID[TAG_ID["SEARCH"] = 94] = "SEARCH";
  	TAG_ID[TAG_ID["SECTION"] = 95] = "SECTION";
  	TAG_ID[TAG_ID["SELECT"] = 96] = "SELECT";
  	TAG_ID[TAG_ID["SOURCE"] = 97] = "SOURCE";
  	TAG_ID[TAG_ID["SMALL"] = 98] = "SMALL";
  	TAG_ID[TAG_ID["SPAN"] = 99] = "SPAN";
  	TAG_ID[TAG_ID["STRIKE"] = 100] = "STRIKE";
  	TAG_ID[TAG_ID["STRONG"] = 101] = "STRONG";
  	TAG_ID[TAG_ID["STYLE"] = 102] = "STYLE";
  	TAG_ID[TAG_ID["SUB"] = 103] = "SUB";
  	TAG_ID[TAG_ID["SUMMARY"] = 104] = "SUMMARY";
  	TAG_ID[TAG_ID["SUP"] = 105] = "SUP";
  	TAG_ID[TAG_ID["TABLE"] = 106] = "TABLE";
  	TAG_ID[TAG_ID["TBODY"] = 107] = "TBODY";
  	TAG_ID[TAG_ID["TEMPLATE"] = 108] = "TEMPLATE";
  	TAG_ID[TAG_ID["TEXTAREA"] = 109] = "TEXTAREA";
  	TAG_ID[TAG_ID["TFOOT"] = 110] = "TFOOT";
  	TAG_ID[TAG_ID["TD"] = 111] = "TD";
  	TAG_ID[TAG_ID["TH"] = 112] = "TH";
  	TAG_ID[TAG_ID["THEAD"] = 113] = "THEAD";
  	TAG_ID[TAG_ID["TITLE"] = 114] = "TITLE";
  	TAG_ID[TAG_ID["TR"] = 115] = "TR";
  	TAG_ID[TAG_ID["TRACK"] = 116] = "TRACK";
  	TAG_ID[TAG_ID["TT"] = 117] = "TT";
  	TAG_ID[TAG_ID["U"] = 118] = "U";
  	TAG_ID[TAG_ID["UL"] = 119] = "UL";
  	TAG_ID[TAG_ID["SVG"] = 120] = "SVG";
  	TAG_ID[TAG_ID["VAR"] = 121] = "VAR";
  	TAG_ID[TAG_ID["WBR"] = 122] = "WBR";
  	TAG_ID[TAG_ID["XMP"] = 123] = "XMP";
  })(TAG_ID || (TAG_ID = {}));
  var TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
  	[TAG_NAMES.A, TAG_ID.A],
  	[TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
  	[TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
  	[TAG_NAMES.APPLET, TAG_ID.APPLET],
  	[TAG_NAMES.AREA, TAG_ID.AREA],
  	[TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
  	[TAG_NAMES.ASIDE, TAG_ID.ASIDE],
  	[TAG_NAMES.B, TAG_ID.B],
  	[TAG_NAMES.BASE, TAG_ID.BASE],
  	[TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
  	[TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
  	[TAG_NAMES.BIG, TAG_ID.BIG],
  	[TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
  	[TAG_NAMES.BODY, TAG_ID.BODY],
  	[TAG_NAMES.BR, TAG_ID.BR],
  	[TAG_NAMES.BUTTON, TAG_ID.BUTTON],
  	[TAG_NAMES.CAPTION, TAG_ID.CAPTION],
  	[TAG_NAMES.CENTER, TAG_ID.CENTER],
  	[TAG_NAMES.CODE, TAG_ID.CODE],
  	[TAG_NAMES.COL, TAG_ID.COL],
  	[TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
  	[TAG_NAMES.DD, TAG_ID.DD],
  	[TAG_NAMES.DESC, TAG_ID.DESC],
  	[TAG_NAMES.DETAILS, TAG_ID.DETAILS],
  	[TAG_NAMES.DIALOG, TAG_ID.DIALOG],
  	[TAG_NAMES.DIR, TAG_ID.DIR],
  	[TAG_NAMES.DIV, TAG_ID.DIV],
  	[TAG_NAMES.DL, TAG_ID.DL],
  	[TAG_NAMES.DT, TAG_ID.DT],
  	[TAG_NAMES.EM, TAG_ID.EM],
  	[TAG_NAMES.EMBED, TAG_ID.EMBED],
  	[TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
  	[TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
  	[TAG_NAMES.FIGURE, TAG_ID.FIGURE],
  	[TAG_NAMES.FONT, TAG_ID.FONT],
  	[TAG_NAMES.FOOTER, TAG_ID.FOOTER],
  	[TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
  	[TAG_NAMES.FORM, TAG_ID.FORM],
  	[TAG_NAMES.FRAME, TAG_ID.FRAME],
  	[TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
  	[TAG_NAMES.H1, TAG_ID.H1],
  	[TAG_NAMES.H2, TAG_ID.H2],
  	[TAG_NAMES.H3, TAG_ID.H3],
  	[TAG_NAMES.H4, TAG_ID.H4],
  	[TAG_NAMES.H5, TAG_ID.H5],
  	[TAG_NAMES.H6, TAG_ID.H6],
  	[TAG_NAMES.HEAD, TAG_ID.HEAD],
  	[TAG_NAMES.HEADER, TAG_ID.HEADER],
  	[TAG_NAMES.HGROUP, TAG_ID.HGROUP],
  	[TAG_NAMES.HR, TAG_ID.HR],
  	[TAG_NAMES.HTML, TAG_ID.HTML],
  	[TAG_NAMES.I, TAG_ID.I],
  	[TAG_NAMES.IMG, TAG_ID.IMG],
  	[TAG_NAMES.IMAGE, TAG_ID.IMAGE],
  	[TAG_NAMES.INPUT, TAG_ID.INPUT],
  	[TAG_NAMES.IFRAME, TAG_ID.IFRAME],
  	[TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
  	[TAG_NAMES.LABEL, TAG_ID.LABEL],
  	[TAG_NAMES.LI, TAG_ID.LI],
  	[TAG_NAMES.LINK, TAG_ID.LINK],
  	[TAG_NAMES.LISTING, TAG_ID.LISTING],
  	[TAG_NAMES.MAIN, TAG_ID.MAIN],
  	[TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
  	[TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
  	[TAG_NAMES.MATH, TAG_ID.MATH],
  	[TAG_NAMES.MENU, TAG_ID.MENU],
  	[TAG_NAMES.META, TAG_ID.META],
  	[TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
  	[TAG_NAMES.MI, TAG_ID.MI],
  	[TAG_NAMES.MO, TAG_ID.MO],
  	[TAG_NAMES.MN, TAG_ID.MN],
  	[TAG_NAMES.MS, TAG_ID.MS],
  	[TAG_NAMES.MTEXT, TAG_ID.MTEXT],
  	[TAG_NAMES.NAV, TAG_ID.NAV],
  	[TAG_NAMES.NOBR, TAG_ID.NOBR],
  	[TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
  	[TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
  	[TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
  	[TAG_NAMES.OBJECT, TAG_ID.OBJECT],
  	[TAG_NAMES.OL, TAG_ID.OL],
  	[TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
  	[TAG_NAMES.OPTION, TAG_ID.OPTION],
  	[TAG_NAMES.P, TAG_ID.P],
  	[TAG_NAMES.PARAM, TAG_ID.PARAM],
  	[TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
  	[TAG_NAMES.PRE, TAG_ID.PRE],
  	[TAG_NAMES.RB, TAG_ID.RB],
  	[TAG_NAMES.RP, TAG_ID.RP],
  	[TAG_NAMES.RT, TAG_ID.RT],
  	[TAG_NAMES.RTC, TAG_ID.RTC],
  	[TAG_NAMES.RUBY, TAG_ID.RUBY],
  	[TAG_NAMES.S, TAG_ID.S],
  	[TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
  	[TAG_NAMES.SEARCH, TAG_ID.SEARCH],
  	[TAG_NAMES.SECTION, TAG_ID.SECTION],
  	[TAG_NAMES.SELECT, TAG_ID.SELECT],
  	[TAG_NAMES.SOURCE, TAG_ID.SOURCE],
  	[TAG_NAMES.SMALL, TAG_ID.SMALL],
  	[TAG_NAMES.SPAN, TAG_ID.SPAN],
  	[TAG_NAMES.STRIKE, TAG_ID.STRIKE],
  	[TAG_NAMES.STRONG, TAG_ID.STRONG],
  	[TAG_NAMES.STYLE, TAG_ID.STYLE],
  	[TAG_NAMES.SUB, TAG_ID.SUB],
  	[TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
  	[TAG_NAMES.SUP, TAG_ID.SUP],
  	[TAG_NAMES.TABLE, TAG_ID.TABLE],
  	[TAG_NAMES.TBODY, TAG_ID.TBODY],
  	[TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
  	[TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
  	[TAG_NAMES.TFOOT, TAG_ID.TFOOT],
  	[TAG_NAMES.TD, TAG_ID.TD],
  	[TAG_NAMES.TH, TAG_ID.TH],
  	[TAG_NAMES.THEAD, TAG_ID.THEAD],
  	[TAG_NAMES.TITLE, TAG_ID.TITLE],
  	[TAG_NAMES.TR, TAG_ID.TR],
  	[TAG_NAMES.TRACK, TAG_ID.TRACK],
  	[TAG_NAMES.TT, TAG_ID.TT],
  	[TAG_NAMES.U, TAG_ID.U],
  	[TAG_NAMES.UL, TAG_ID.UL],
  	[TAG_NAMES.SVG, TAG_ID.SVG],
  	[TAG_NAMES.VAR, TAG_ID.VAR],
  	[TAG_NAMES.WBR, TAG_ID.WBR],
  	[TAG_NAMES.XMP, TAG_ID.XMP]
  ]);
  function getTagID(tagName) {
  	var _a;
  	return (_a = TAG_NAME_TO_ID.get(tagName)) !== null && _a !== void 0 ? _a : TAG_ID.UNKNOWN;
  }
  var $ = TAG_ID;
  var SPECIAL_ELEMENTS = {
  	[NS.HTML]: /* @__PURE__ */ new Set([
  		$.ADDRESS,
  		$.APPLET,
  		$.AREA,
  		$.ARTICLE,
  		$.ASIDE,
  		$.BASE,
  		$.BASEFONT,
  		$.BGSOUND,
  		$.BLOCKQUOTE,
  		$.BODY,
  		$.BR,
  		$.BUTTON,
  		$.CAPTION,
  		$.CENTER,
  		$.COL,
  		$.COLGROUP,
  		$.DD,
  		$.DETAILS,
  		$.DIR,
  		$.DIV,
  		$.DL,
  		$.DT,
  		$.EMBED,
  		$.FIELDSET,
  		$.FIGCAPTION,
  		$.FIGURE,
  		$.FOOTER,
  		$.FORM,
  		$.FRAME,
  		$.FRAMESET,
  		$.H1,
  		$.H2,
  		$.H3,
  		$.H4,
  		$.H5,
  		$.H6,
  		$.HEAD,
  		$.HEADER,
  		$.HGROUP,
  		$.HR,
  		$.HTML,
  		$.IFRAME,
  		$.IMG,
  		$.INPUT,
  		$.LI,
  		$.LINK,
  		$.LISTING,
  		$.MAIN,
  		$.MARQUEE,
  		$.MENU,
  		$.META,
  		$.NAV,
  		$.NOEMBED,
  		$.NOFRAMES,
  		$.NOSCRIPT,
  		$.OBJECT,
  		$.OL,
  		$.P,
  		$.PARAM,
  		$.PLAINTEXT,
  		$.PRE,
  		$.SCRIPT,
  		$.SECTION,
  		$.SELECT,
  		$.SOURCE,
  		$.STYLE,
  		$.SUMMARY,
  		$.TABLE,
  		$.TBODY,
  		$.TD,
  		$.TEMPLATE,
  		$.TEXTAREA,
  		$.TFOOT,
  		$.TH,
  		$.THEAD,
  		$.TITLE,
  		$.TR,
  		$.TRACK,
  		$.UL,
  		$.WBR,
  		$.XMP
  	]),
  	[NS.MATHML]: /* @__PURE__ */ new Set([
  		$.MI,
  		$.MO,
  		$.MN,
  		$.MS,
  		$.MTEXT,
  		$.ANNOTATION_XML
  	]),
  	[NS.SVG]: /* @__PURE__ */ new Set([
  		$.TITLE,
  		$.FOREIGN_OBJECT,
  		$.DESC
  	]),
  	[NS.XLINK]: /* @__PURE__ */ new Set(),
  	[NS.XML]: /* @__PURE__ */ new Set(),
  	[NS.XMLNS]: /* @__PURE__ */ new Set()
  };
  var NUMBERED_HEADERS = /* @__PURE__ */ new Set([
  	$.H1,
  	$.H2,
  	$.H3,
  	$.H4,
  	$.H5,
  	$.H6
  ]);
  TAG_NAMES.STYLE, TAG_NAMES.SCRIPT, TAG_NAMES.XMP, TAG_NAMES.IFRAME, TAG_NAMES.NOEMBED, TAG_NAMES.NOFRAMES, TAG_NAMES.PLAINTEXT;
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tokenizer/index.js
  var State;
  (function(State) {
  	State[State["DATA"] = 0] = "DATA";
  	State[State["RCDATA"] = 1] = "RCDATA";
  	State[State["RAWTEXT"] = 2] = "RAWTEXT";
  	State[State["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
  	State[State["PLAINTEXT"] = 4] = "PLAINTEXT";
  	State[State["TAG_OPEN"] = 5] = "TAG_OPEN";
  	State[State["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
  	State[State["TAG_NAME"] = 7] = "TAG_NAME";
  	State[State["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
  	State[State["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
  	State[State["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
  	State[State["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
  	State[State["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
  	State[State["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
  	State[State["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
  	State[State["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
  	State[State["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
  	State[State["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
  	State[State["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
  	State[State["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
  	State[State["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
  	State[State["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
  	State[State["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
  	State[State["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
  	State[State["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
  	State[State["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
  	State[State["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
  	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
  	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
  	State[State["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
  	State[State["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
  	State[State["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
  	State[State["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
  	State[State["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
  	State[State["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
  	State[State["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
  	State[State["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
  	State[State["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
  	State[State["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
  	State[State["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
  	State[State["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
  	State[State["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
  	State[State["COMMENT_START"] = 42] = "COMMENT_START";
  	State[State["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
  	State[State["COMMENT"] = 44] = "COMMENT";
  	State[State["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
  	State[State["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
  	State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
  	State[State["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
  	State[State["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
  	State[State["COMMENT_END"] = 50] = "COMMENT_END";
  	State[State["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
  	State[State["DOCTYPE"] = 52] = "DOCTYPE";
  	State[State["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
  	State[State["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
  	State[State["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
  	State[State["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
  	State[State["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
  	State[State["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
  	State[State["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
  	State[State["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
  	State[State["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
  	State[State["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
  	State[State["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
  	State[State["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
  	State[State["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
  	State[State["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
  	State[State["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
  	State[State["CDATA_SECTION"] = 68] = "CDATA_SECTION";
  	State[State["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
  	State[State["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
  	State[State["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
  	State[State["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
  })(State || (State = {}));
  var TokenizerMode = {
  	DATA: State.DATA,
  	RCDATA: State.RCDATA,
  	RAWTEXT: State.RAWTEXT,
  	SCRIPT_DATA: State.SCRIPT_DATA,
  	PLAINTEXT: State.PLAINTEXT,
  	CDATA_SECTION: State.CDATA_SECTION
  };
  function isAsciiDigit(cp) {
  	return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
  }
  function isAsciiUpper(cp) {
  	return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
  }
  function isAsciiLower(cp) {
  	return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
  }
  function isAsciiLetter(cp) {
  	return isAsciiLower(cp) || isAsciiUpper(cp);
  }
  function isAsciiAlphaNumeric(cp) {
  	return isAsciiLetter(cp) || isAsciiDigit(cp);
  }
  function toAsciiLower(cp) {
  	return cp + 32;
  }
  function isWhitespace(cp) {
  	return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
  }
  function isScriptDataDoubleEscapeSequenceEnd(cp) {
  	return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
  }
  function getErrorForNumericCharacterReference(code) {
  	if (code === CODE_POINTS.NULL) return ERR.nullCharacterReference;
  	else if (code > 1114111) return ERR.characterReferenceOutsideUnicodeRange;
  	else if (isSurrogate(code)) return ERR.surrogateCharacterReference;
  	else if (isUndefinedCodePoint(code)) return ERR.noncharacterCharacterReference;
  	else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) return ERR.controlCharacterReference;
  	return null;
  }
  var Tokenizer = class {
  	constructor(options, handler) {
  		this.options = options;
  		this.handler = handler;
  		this.paused = false;
  		/** Ensures that the parsing loop isn't run multiple times at once. */
  		this.inLoop = false;
  		/**
  		* Indicates that the current adjusted node exists, is not an element in the HTML namespace,
  		* and that it is not an integration point for either MathML or HTML.
  		*
  		* @see {@link https://html.spec.whatwg.org/multipage/parsing.html#tree-construction}
  		*/
  		this.inForeignNode = false;
  		this.lastStartTagName = "";
  		this.active = false;
  		this.state = State.DATA;
  		this.returnState = State.DATA;
  		this.entityStartPos = 0;
  		this.consumedAfterSnapshot = -1;
  		this.currentCharacterToken = null;
  		this.currentToken = null;
  		this.currentAttr = {
  			name: "",
  			value: ""
  		};
  		this.preprocessor = new Preprocessor(handler);
  		this.currentLocation = this.getCurrentLocation(-1);
  		this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
  			this.preprocessor.pos = this.entityStartPos + consumed - 1;
  			this._flushCodePointConsumedAsCharacterReference(cp);
  		}, handler.onParseError ? {
  			missingSemicolonAfterCharacterReference: () => {
  				this._err(ERR.missingSemicolonAfterCharacterReference, 1);
  			},
  			absenceOfDigitsInNumericCharacterReference: (consumed) => {
  				this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
  			},
  			validateNumericCharacterReference: (code) => {
  				const error = getErrorForNumericCharacterReference(code);
  				if (error) this._err(error, 1);
  			}
  		} : void 0);
  	}
  	_err(code, cpOffset = 0) {
  		var _a, _b;
  		(_b = (_a = this.handler).onParseError) === null || _b === void 0 || _b.call(_a, this.preprocessor.getError(code, cpOffset));
  	}
  	getCurrentLocation(offset) {
  		if (!this.options.sourceCodeLocationInfo) return null;
  		return {
  			startLine: this.preprocessor.line,
  			startCol: this.preprocessor.col - offset,
  			startOffset: this.preprocessor.offset - offset,
  			endLine: -1,
  			endCol: -1,
  			endOffset: -1
  		};
  	}
  	_runParsingLoop() {
  		if (this.inLoop) return;
  		this.inLoop = true;
  		while (this.active && !this.paused) {
  			this.consumedAfterSnapshot = 0;
  			const cp = this._consume();
  			if (!this._ensureHibernation()) this._callState(cp);
  		}
  		this.inLoop = false;
  	}
  	pause() {
  		this.paused = true;
  	}
  	resume(writeCallback) {
  		if (!this.paused) throw new Error("Parser was already resumed");
  		this.paused = false;
  		if (this.inLoop) return;
  		this._runParsingLoop();
  		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
  	}
  	write(chunk, isLastChunk, writeCallback) {
  		this.active = true;
  		this.preprocessor.write(chunk, isLastChunk);
  		this._runParsingLoop();
  		if (!this.paused) writeCallback === null || writeCallback === void 0 || writeCallback();
  	}
  	insertHtmlAtCurrentPos(chunk) {
  		this.active = true;
  		this.preprocessor.insertHtmlAtCurrentPos(chunk);
  		this._runParsingLoop();
  	}
  	_ensureHibernation() {
  		if (this.preprocessor.endOfChunkHit) {
  			this.preprocessor.retreat(this.consumedAfterSnapshot);
  			this.consumedAfterSnapshot = 0;
  			this.active = false;
  			return true;
  		}
  		return false;
  	}
  	_consume() {
  		this.consumedAfterSnapshot++;
  		return this.preprocessor.advance();
  	}
  	_advanceBy(count) {
  		this.consumedAfterSnapshot += count;
  		for (let i = 0; i < count; i++) this.preprocessor.advance();
  	}
  	_consumeSequenceIfMatch(pattern, caseSensitive) {
  		if (this.preprocessor.startsWith(pattern, caseSensitive)) {
  			this._advanceBy(pattern.length - 1);
  			return true;
  		}
  		return false;
  	}
  	_createStartTagToken() {
  		this.currentToken = {
  			type: TokenType.START_TAG,
  			tagName: "",
  			tagID: TAG_ID.UNKNOWN,
  			selfClosing: false,
  			ackSelfClosing: false,
  			attrs: [],
  			location: this.getCurrentLocation(1)
  		};
  	}
  	_createEndTagToken() {
  		this.currentToken = {
  			type: TokenType.END_TAG,
  			tagName: "",
  			tagID: TAG_ID.UNKNOWN,
  			selfClosing: false,
  			ackSelfClosing: false,
  			attrs: [],
  			location: this.getCurrentLocation(2)
  		};
  	}
  	_createCommentToken(offset) {
  		this.currentToken = {
  			type: TokenType.COMMENT,
  			data: "",
  			location: this.getCurrentLocation(offset)
  		};
  	}
  	_createDoctypeToken(initialName) {
  		this.currentToken = {
  			type: TokenType.DOCTYPE,
  			name: initialName,
  			forceQuirks: false,
  			publicId: null,
  			systemId: null,
  			location: this.currentLocation
  		};
  	}
  	_createCharacterToken(type, chars) {
  		this.currentCharacterToken = {
  			type,
  			chars,
  			location: this.currentLocation
  		};
  	}
  	_createAttr(attrNameFirstCh) {
  		this.currentAttr = {
  			name: attrNameFirstCh,
  			value: ""
  		};
  		this.currentLocation = this.getCurrentLocation(0);
  	}
  	_leaveAttrName() {
  		var _a;
  		var _b;
  		const token = this.currentToken;
  		if (getTokenAttr(token, this.currentAttr.name) === null) {
  			token.attrs.push(this.currentAttr);
  			if (token.location && this.currentLocation) {
  				const attrLocations = (_a = (_b = token.location).attrs) !== null && _a !== void 0 ? _a : _b.attrs = Object.create(null);
  				attrLocations[this.currentAttr.name] = this.currentLocation;
  				this._leaveAttrValue();
  			}
  		} else this._err(ERR.duplicateAttribute);
  	}
  	_leaveAttrValue() {
  		if (this.currentLocation) {
  			this.currentLocation.endLine = this.preprocessor.line;
  			this.currentLocation.endCol = this.preprocessor.col;
  			this.currentLocation.endOffset = this.preprocessor.offset;
  		}
  	}
  	prepareToken(ct) {
  		this._emitCurrentCharacterToken(ct.location);
  		this.currentToken = null;
  		if (ct.location) {
  			ct.location.endLine = this.preprocessor.line;
  			ct.location.endCol = this.preprocessor.col + 1;
  			ct.location.endOffset = this.preprocessor.offset + 1;
  		}
  		this.currentLocation = this.getCurrentLocation(-1);
  	}
  	emitCurrentTagToken() {
  		const ct = this.currentToken;
  		this.prepareToken(ct);
  		ct.tagID = getTagID(ct.tagName);
  		if (ct.type === TokenType.START_TAG) {
  			this.lastStartTagName = ct.tagName;
  			this.handler.onStartTag(ct);
  		} else {
  			if (ct.attrs.length > 0) this._err(ERR.endTagWithAttributes);
  			if (ct.selfClosing) this._err(ERR.endTagWithTrailingSolidus);
  			this.handler.onEndTag(ct);
  		}
  		this.preprocessor.dropParsedChunk();
  	}
  	emitCurrentComment(ct) {
  		this.prepareToken(ct);
  		this.handler.onComment(ct);
  		this.preprocessor.dropParsedChunk();
  	}
  	emitCurrentDoctype(ct) {
  		this.prepareToken(ct);
  		this.handler.onDoctype(ct);
  		this.preprocessor.dropParsedChunk();
  	}
  	_emitCurrentCharacterToken(nextLocation) {
  		if (this.currentCharacterToken) {
  			if (nextLocation && this.currentCharacterToken.location) {
  				this.currentCharacterToken.location.endLine = nextLocation.startLine;
  				this.currentCharacterToken.location.endCol = nextLocation.startCol;
  				this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
  			}
  			switch (this.currentCharacterToken.type) {
  				case TokenType.CHARACTER:
  					this.handler.onCharacter(this.currentCharacterToken);
  					break;
  				case TokenType.NULL_CHARACTER:
  					this.handler.onNullCharacter(this.currentCharacterToken);
  					break;
  				case TokenType.WHITESPACE_CHARACTER: this.handler.onWhitespaceCharacter(this.currentCharacterToken);
  			}
  			this.currentCharacterToken = null;
  		}
  	}
  	_emitEOFToken() {
  		const location = this.getCurrentLocation(0);
  		if (location) {
  			location.endLine = location.startLine;
  			location.endCol = location.startCol;
  			location.endOffset = location.startOffset;
  		}
  		this._emitCurrentCharacterToken(location);
  		this.handler.onEof({
  			type: TokenType.EOF,
  			location
  		});
  		this.active = false;
  	}
  	_appendCharToCurrentCharacterToken(type, ch) {
  		if (this.currentCharacterToken) {
  			if (this.currentCharacterToken.type === type) {
  				this.currentCharacterToken.chars += ch;
  				return;
  			} else {
  				this.currentLocation = this.getCurrentLocation(0);
  				this._emitCurrentCharacterToken(this.currentLocation);
  				this.preprocessor.dropParsedChunk();
  			}
  		}
  		this._createCharacterToken(type, ch);
  	}
  	_emitCodePoint(cp) {
  		const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
  		this._appendCharToCurrentCharacterToken(type, cp < 65536 ? String.fromCharCode(cp) : String.fromCodePoint(cp));
  	}
  	_emitChars(ch) {
  		this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
  	}
  	_startCharacterReference() {
  		this.returnState = this.state;
  		this.state = State.CHARACTER_REFERENCE;
  		this.entityStartPos = this.preprocessor.pos;
  		this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
  	}
  	_isCharacterReferenceInAttribute() {
  		return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
  	}
  	_flushCodePointConsumedAsCharacterReference(cp) {
  		if (this._isCharacterReferenceInAttribute()) this.currentAttr.value += String.fromCodePoint(cp);
  		else this._emitCodePoint(cp);
  	}
  	_callState(cp) {
  		switch (this.state) {
  			case State.DATA:
  				this._stateData(cp);
  				break;
  			case State.RCDATA:
  				this._stateRcdata(cp);
  				break;
  			case State.RAWTEXT:
  				this._stateRawtext(cp);
  				break;
  			case State.SCRIPT_DATA:
  				this._stateScriptData(cp);
  				break;
  			case State.PLAINTEXT:
  				this._statePlaintext(cp);
  				break;
  			case State.TAG_OPEN:
  				this._stateTagOpen(cp);
  				break;
  			case State.END_TAG_OPEN:
  				this._stateEndTagOpen(cp);
  				break;
  			case State.TAG_NAME:
  				this._stateTagName(cp);
  				break;
  			case State.RCDATA_LESS_THAN_SIGN:
  				this._stateRcdataLessThanSign(cp);
  				break;
  			case State.RCDATA_END_TAG_OPEN:
  				this._stateRcdataEndTagOpen(cp);
  				break;
  			case State.RCDATA_END_TAG_NAME:
  				this._stateRcdataEndTagName(cp);
  				break;
  			case State.RAWTEXT_LESS_THAN_SIGN:
  				this._stateRawtextLessThanSign(cp);
  				break;
  			case State.RAWTEXT_END_TAG_OPEN:
  				this._stateRawtextEndTagOpen(cp);
  				break;
  			case State.RAWTEXT_END_TAG_NAME:
  				this._stateRawtextEndTagName(cp);
  				break;
  			case State.SCRIPT_DATA_LESS_THAN_SIGN:
  				this._stateScriptDataLessThanSign(cp);
  				break;
  			case State.SCRIPT_DATA_END_TAG_OPEN:
  				this._stateScriptDataEndTagOpen(cp);
  				break;
  			case State.SCRIPT_DATA_END_TAG_NAME:
  				this._stateScriptDataEndTagName(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPE_START:
  				this._stateScriptDataEscapeStart(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPE_START_DASH:
  				this._stateScriptDataEscapeStartDash(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPED:
  				this._stateScriptDataEscaped(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPED_DASH:
  				this._stateScriptDataEscapedDash(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPED_DASH_DASH:
  				this._stateScriptDataEscapedDashDash(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
  				this._stateScriptDataEscapedLessThanSign(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
  				this._stateScriptDataEscapedEndTagOpen(cp);
  				break;
  			case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
  				this._stateScriptDataEscapedEndTagName(cp);
  				break;
  			case State.SCRIPT_DATA_DOUBLE_ESCAPE_START:
  				this._stateScriptDataDoubleEscapeStart(cp);
  				break;
  			case State.SCRIPT_DATA_DOUBLE_ESCAPED:
  				this._stateScriptDataDoubleEscaped(cp);
  				break;
  			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
  				this._stateScriptDataDoubleEscapedDash(cp);
  				break;
  			case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
  				this._stateScriptDataDoubleEscapedDashDash(cp);
  				break;
  			case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
  				this._stateScriptDataDoubleEscapedLessThanSign(cp);
  				break;
  			case State.SCRIPT_DATA_DOUBLE_ESCAPE_END:
  				this._stateScriptDataDoubleEscapeEnd(cp);
  				break;
  			case State.BEFORE_ATTRIBUTE_NAME:
  				this._stateBeforeAttributeName(cp);
  				break;
  			case State.ATTRIBUTE_NAME:
  				this._stateAttributeName(cp);
  				break;
  			case State.AFTER_ATTRIBUTE_NAME:
  				this._stateAfterAttributeName(cp);
  				break;
  			case State.BEFORE_ATTRIBUTE_VALUE:
  				this._stateBeforeAttributeValue(cp);
  				break;
  			case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
  				this._stateAttributeValueDoubleQuoted(cp);
  				break;
  			case State.ATTRIBUTE_VALUE_SINGLE_QUOTED:
  				this._stateAttributeValueSingleQuoted(cp);
  				break;
  			case State.ATTRIBUTE_VALUE_UNQUOTED:
  				this._stateAttributeValueUnquoted(cp);
  				break;
  			case State.AFTER_ATTRIBUTE_VALUE_QUOTED:
  				this._stateAfterAttributeValueQuoted(cp);
  				break;
  			case State.SELF_CLOSING_START_TAG:
  				this._stateSelfClosingStartTag(cp);
  				break;
  			case State.BOGUS_COMMENT:
  				this._stateBogusComment(cp);
  				break;
  			case State.MARKUP_DECLARATION_OPEN:
  				this._stateMarkupDeclarationOpen(cp);
  				break;
  			case State.COMMENT_START:
  				this._stateCommentStart(cp);
  				break;
  			case State.COMMENT_START_DASH:
  				this._stateCommentStartDash(cp);
  				break;
  			case State.COMMENT:
  				this._stateComment(cp);
  				break;
  			case State.COMMENT_LESS_THAN_SIGN:
  				this._stateCommentLessThanSign(cp);
  				break;
  			case State.COMMENT_LESS_THAN_SIGN_BANG:
  				this._stateCommentLessThanSignBang(cp);
  				break;
  			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH:
  				this._stateCommentLessThanSignBangDash(cp);
  				break;
  			case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
  				this._stateCommentLessThanSignBangDashDash(cp);
  				break;
  			case State.COMMENT_END_DASH:
  				this._stateCommentEndDash(cp);
  				break;
  			case State.COMMENT_END:
  				this._stateCommentEnd(cp);
  				break;
  			case State.COMMENT_END_BANG:
  				this._stateCommentEndBang(cp);
  				break;
  			case State.DOCTYPE:
  				this._stateDoctype(cp);
  				break;
  			case State.BEFORE_DOCTYPE_NAME:
  				this._stateBeforeDoctypeName(cp);
  				break;
  			case State.DOCTYPE_NAME:
  				this._stateDoctypeName(cp);
  				break;
  			case State.AFTER_DOCTYPE_NAME:
  				this._stateAfterDoctypeName(cp);
  				break;
  			case State.AFTER_DOCTYPE_PUBLIC_KEYWORD:
  				this._stateAfterDoctypePublicKeyword(cp);
  				break;
  			case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
  				this._stateBeforeDoctypePublicIdentifier(cp);
  				break;
  			case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
  				this._stateDoctypePublicIdentifierDoubleQuoted(cp);
  				break;
  			case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
  				this._stateDoctypePublicIdentifierSingleQuoted(cp);
  				break;
  			case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
  				this._stateAfterDoctypePublicIdentifier(cp);
  				break;
  			case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
  				this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
  				break;
  			case State.AFTER_DOCTYPE_SYSTEM_KEYWORD:
  				this._stateAfterDoctypeSystemKeyword(cp);
  				break;
  			case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
  				this._stateBeforeDoctypeSystemIdentifier(cp);
  				break;
  			case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
  				this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
  				break;
  			case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
  				this._stateDoctypeSystemIdentifierSingleQuoted(cp);
  				break;
  			case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
  				this._stateAfterDoctypeSystemIdentifier(cp);
  				break;
  			case State.BOGUS_DOCTYPE:
  				this._stateBogusDoctype(cp);
  				break;
  			case State.CDATA_SECTION:
  				this._stateCdataSection(cp);
  				break;
  			case State.CDATA_SECTION_BRACKET:
  				this._stateCdataSectionBracket(cp);
  				break;
  			case State.CDATA_SECTION_END:
  				this._stateCdataSectionEnd(cp);
  				break;
  			case State.CHARACTER_REFERENCE:
  				this._stateCharacterReference();
  				break;
  			case State.AMBIGUOUS_AMPERSAND:
  				this._stateAmbiguousAmpersand(cp);
  				break;
  			default: throw new Error("Unknown state");
  		}
  	}
  	_stateData(cp) {
  		switch (cp) {
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.TAG_OPEN;
  				break;
  			case CODE_POINTS.AMPERSAND:
  				this._startCharacterReference();
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitCodePoint(cp);
  				break;
  			case CODE_POINTS.EOF:
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateRcdata(cp) {
  		switch (cp) {
  			case CODE_POINTS.AMPERSAND:
  				this._startCharacterReference();
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.RCDATA_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateRawtext(cp) {
  		switch (cp) {
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.RAWTEXT_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptData(cp) {
  		switch (cp) {
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_statePlaintext(cp) {
  		switch (cp) {
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateTagOpen(cp) {
  		if (isAsciiLetter(cp)) {
  			this._createStartTagToken();
  			this.state = State.TAG_NAME;
  			this._stateTagName(cp);
  		} else switch (cp) {
  			case CODE_POINTS.EXCLAMATION_MARK:
  				this.state = State.MARKUP_DECLARATION_OPEN;
  				break;
  			case CODE_POINTS.SOLIDUS:
  				this.state = State.END_TAG_OPEN;
  				break;
  			case CODE_POINTS.QUESTION_MARK:
  				this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
  				this._createCommentToken(1);
  				this.state = State.BOGUS_COMMENT;
  				this._stateBogusComment(cp);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofBeforeTagName);
  				this._emitChars("<");
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.invalidFirstCharacterOfTagName);
  				this._emitChars("<");
  				this.state = State.DATA;
  				this._stateData(cp);
  		}
  	}
  	_stateEndTagOpen(cp) {
  		if (isAsciiLetter(cp)) {
  			this._createEndTagToken();
  			this.state = State.TAG_NAME;
  			this._stateTagName(cp);
  		} else switch (cp) {
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.missingEndTagName);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofBeforeTagName);
  				this._emitChars("</");
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.invalidFirstCharacterOfTagName);
  				this._createCommentToken(2);
  				this.state = State.BOGUS_COMMENT;
  				this._stateBogusComment(cp);
  		}
  	}
  	_stateTagName(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this.state = State.BEFORE_ATTRIBUTE_NAME;
  				break;
  			case CODE_POINTS.SOLIDUS:
  				this.state = State.SELF_CLOSING_START_TAG;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentTagToken();
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.tagName += "�";
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default: token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
  		}
  	}
  	_stateRcdataLessThanSign(cp) {
  		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RCDATA_END_TAG_OPEN;
  		else {
  			this._emitChars("<");
  			this.state = State.RCDATA;
  			this._stateRcdata(cp);
  		}
  	}
  	_stateRcdataEndTagOpen(cp) {
  		if (isAsciiLetter(cp)) {
  			this.state = State.RCDATA_END_TAG_NAME;
  			this._stateRcdataEndTagName(cp);
  		} else {
  			this._emitChars("</");
  			this.state = State.RCDATA;
  			this._stateRcdata(cp);
  		}
  	}
  	handleSpecialEndTag(_cp) {
  		if (!this.preprocessor.startsWith(this.lastStartTagName, false)) return !this._ensureHibernation();
  		this._createEndTagToken();
  		const token = this.currentToken;
  		token.tagName = this.lastStartTagName;
  		switch (this.preprocessor.peek(this.lastStartTagName.length)) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this._advanceBy(this.lastStartTagName.length);
  				this.state = State.BEFORE_ATTRIBUTE_NAME;
  				return false;
  			case CODE_POINTS.SOLIDUS:
  				this._advanceBy(this.lastStartTagName.length);
  				this.state = State.SELF_CLOSING_START_TAG;
  				return false;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._advanceBy(this.lastStartTagName.length);
  				this.emitCurrentTagToken();
  				this.state = State.DATA;
  				return false;
  			default: return !this._ensureHibernation();
  		}
  	}
  	_stateRcdataEndTagName(cp) {
  		if (this.handleSpecialEndTag(cp)) {
  			this._emitChars("</");
  			this.state = State.RCDATA;
  			this._stateRcdata(cp);
  		}
  	}
  	_stateRawtextLessThanSign(cp) {
  		if (cp === CODE_POINTS.SOLIDUS) this.state = State.RAWTEXT_END_TAG_OPEN;
  		else {
  			this._emitChars("<");
  			this.state = State.RAWTEXT;
  			this._stateRawtext(cp);
  		}
  	}
  	_stateRawtextEndTagOpen(cp) {
  		if (isAsciiLetter(cp)) {
  			this.state = State.RAWTEXT_END_TAG_NAME;
  			this._stateRawtextEndTagName(cp);
  		} else {
  			this._emitChars("</");
  			this.state = State.RAWTEXT;
  			this._stateRawtext(cp);
  		}
  	}
  	_stateRawtextEndTagName(cp) {
  		if (this.handleSpecialEndTag(cp)) {
  			this._emitChars("</");
  			this.state = State.RAWTEXT;
  			this._stateRawtext(cp);
  		}
  	}
  	_stateScriptDataLessThanSign(cp) {
  		switch (cp) {
  			case CODE_POINTS.SOLIDUS:
  				this.state = State.SCRIPT_DATA_END_TAG_OPEN;
  				break;
  			case CODE_POINTS.EXCLAMATION_MARK:
  				this.state = State.SCRIPT_DATA_ESCAPE_START;
  				this._emitChars("<!");
  				break;
  			default:
  				this._emitChars("<");
  				this.state = State.SCRIPT_DATA;
  				this._stateScriptData(cp);
  		}
  	}
  	_stateScriptDataEndTagOpen(cp) {
  		if (isAsciiLetter(cp)) {
  			this.state = State.SCRIPT_DATA_END_TAG_NAME;
  			this._stateScriptDataEndTagName(cp);
  		} else {
  			this._emitChars("</");
  			this.state = State.SCRIPT_DATA;
  			this._stateScriptData(cp);
  		}
  	}
  	_stateScriptDataEndTagName(cp) {
  		if (this.handleSpecialEndTag(cp)) {
  			this._emitChars("</");
  			this.state = State.SCRIPT_DATA;
  			this._stateScriptData(cp);
  		}
  	}
  	_stateScriptDataEscapeStart(cp) {
  		if (cp === CODE_POINTS.HYPHEN_MINUS) {
  			this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
  			this._emitChars("-");
  		} else {
  			this.state = State.SCRIPT_DATA;
  			this._stateScriptData(cp);
  		}
  	}
  	_stateScriptDataEscapeStartDash(cp) {
  		if (cp === CODE_POINTS.HYPHEN_MINUS) {
  			this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
  			this._emitChars("-");
  		} else {
  			this.state = State.SCRIPT_DATA;
  			this._stateScriptData(cp);
  		}
  	}
  	_stateScriptDataEscaped(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.SCRIPT_DATA_ESCAPED_DASH;
  				this._emitChars("-");
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInScriptHtmlCommentLikeText);
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptDataEscapedDash(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
  				this._emitChars("-");
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.state = State.SCRIPT_DATA_ESCAPED;
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInScriptHtmlCommentLikeText);
  				this._emitEOFToken();
  				break;
  			default:
  				this.state = State.SCRIPT_DATA_ESCAPED;
  				this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptDataEscapedDashDash(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this._emitChars("-");
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.SCRIPT_DATA;
  				this._emitChars(">");
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.state = State.SCRIPT_DATA_ESCAPED;
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInScriptHtmlCommentLikeText);
  				this._emitEOFToken();
  				break;
  			default:
  				this.state = State.SCRIPT_DATA_ESCAPED;
  				this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptDataEscapedLessThanSign(cp) {
  		if (cp === CODE_POINTS.SOLIDUS) this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
  		else if (isAsciiLetter(cp)) {
  			this._emitChars("<");
  			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
  			this._stateScriptDataDoubleEscapeStart(cp);
  		} else {
  			this._emitChars("<");
  			this.state = State.SCRIPT_DATA_ESCAPED;
  			this._stateScriptDataEscaped(cp);
  		}
  	}
  	_stateScriptDataEscapedEndTagOpen(cp) {
  		if (isAsciiLetter(cp)) {
  			this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
  			this._stateScriptDataEscapedEndTagName(cp);
  		} else {
  			this._emitChars("</");
  			this.state = State.SCRIPT_DATA_ESCAPED;
  			this._stateScriptDataEscaped(cp);
  		}
  	}
  	_stateScriptDataEscapedEndTagName(cp) {
  		if (this.handleSpecialEndTag(cp)) {
  			this._emitChars("</");
  			this.state = State.SCRIPT_DATA_ESCAPED;
  			this._stateScriptDataEscaped(cp);
  		}
  	}
  	_stateScriptDataDoubleEscapeStart(cp) {
  		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
  			this._emitCodePoint(cp);
  			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
  			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  		} else if (!this._ensureHibernation()) {
  			this.state = State.SCRIPT_DATA_ESCAPED;
  			this._stateScriptDataEscaped(cp);
  		}
  	}
  	_stateScriptDataDoubleEscaped(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
  				this._emitChars("-");
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
  				this._emitChars("<");
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInScriptHtmlCommentLikeText);
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptDataDoubleEscapedDash(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
  				this._emitChars("-");
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
  				this._emitChars("<");
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInScriptHtmlCommentLikeText);
  				this._emitEOFToken();
  				break;
  			default:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  				this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptDataDoubleEscapedDashDash(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this._emitChars("-");
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
  				this._emitChars("<");
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.SCRIPT_DATA;
  				this._emitChars(">");
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  				this._emitChars("�");
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInScriptHtmlCommentLikeText);
  				this._emitEOFToken();
  				break;
  			default:
  				this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  				this._emitCodePoint(cp);
  		}
  	}
  	_stateScriptDataDoubleEscapedLessThanSign(cp) {
  		if (cp === CODE_POINTS.SOLIDUS) {
  			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
  			this._emitChars("/");
  		} else {
  			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  			this._stateScriptDataDoubleEscaped(cp);
  		}
  	}
  	_stateScriptDataDoubleEscapeEnd(cp) {
  		if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
  			this._emitCodePoint(cp);
  			for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) this._emitCodePoint(this._consume());
  			this.state = State.SCRIPT_DATA_ESCAPED;
  		} else if (!this._ensureHibernation()) {
  			this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
  			this._stateScriptDataDoubleEscaped(cp);
  		}
  	}
  	_stateBeforeAttributeName(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.SOLIDUS:
  			case CODE_POINTS.GREATER_THAN_SIGN:
  			case CODE_POINTS.EOF:
  				this.state = State.AFTER_ATTRIBUTE_NAME;
  				this._stateAfterAttributeName(cp);
  				break;
  			case CODE_POINTS.EQUALS_SIGN:
  				this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
  				this._createAttr("=");
  				this.state = State.ATTRIBUTE_NAME;
  				break;
  			default:
  				this._createAttr("");
  				this.state = State.ATTRIBUTE_NAME;
  				this._stateAttributeName(cp);
  		}
  	}
  	_stateAttributeName(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  			case CODE_POINTS.SOLIDUS:
  			case CODE_POINTS.GREATER_THAN_SIGN:
  			case CODE_POINTS.EOF:
  				this._leaveAttrName();
  				this.state = State.AFTER_ATTRIBUTE_NAME;
  				this._stateAfterAttributeName(cp);
  				break;
  			case CODE_POINTS.EQUALS_SIGN:
  				this._leaveAttrName();
  				this.state = State.BEFORE_ATTRIBUTE_VALUE;
  				break;
  			case CODE_POINTS.QUOTATION_MARK:
  			case CODE_POINTS.APOSTROPHE:
  			case CODE_POINTS.LESS_THAN_SIGN:
  				this._err(ERR.unexpectedCharacterInAttributeName);
  				this.currentAttr.name += String.fromCodePoint(cp);
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.currentAttr.name += "�";
  				break;
  			default: this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
  		}
  	}
  	_stateAfterAttributeName(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.SOLIDUS:
  				this.state = State.SELF_CLOSING_START_TAG;
  				break;
  			case CODE_POINTS.EQUALS_SIGN:
  				this.state = State.BEFORE_ATTRIBUTE_VALUE;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentTagToken();
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default:
  				this._createAttr("");
  				this.state = State.ATTRIBUTE_NAME;
  				this._stateAttributeName(cp);
  		}
  	}
  	_stateBeforeAttributeValue(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.QUOTATION_MARK:
  				this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.missingAttributeValue);
  				this.state = State.DATA;
  				this.emitCurrentTagToken();
  				break;
  			default:
  				this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
  				this._stateAttributeValueUnquoted(cp);
  		}
  	}
  	_stateAttributeValueDoubleQuoted(cp) {
  		switch (cp) {
  			case CODE_POINTS.QUOTATION_MARK:
  				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
  				break;
  			case CODE_POINTS.AMPERSAND:
  				this._startCharacterReference();
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.currentAttr.value += "�";
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default: this.currentAttr.value += String.fromCodePoint(cp);
  		}
  	}
  	_stateAttributeValueSingleQuoted(cp) {
  		switch (cp) {
  			case CODE_POINTS.APOSTROPHE:
  				this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
  				break;
  			case CODE_POINTS.AMPERSAND:
  				this._startCharacterReference();
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.currentAttr.value += "�";
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default: this.currentAttr.value += String.fromCodePoint(cp);
  		}
  	}
  	_stateAttributeValueUnquoted(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this._leaveAttrValue();
  				this.state = State.BEFORE_ATTRIBUTE_NAME;
  				break;
  			case CODE_POINTS.AMPERSAND:
  				this._startCharacterReference();
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._leaveAttrValue();
  				this.state = State.DATA;
  				this.emitCurrentTagToken();
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this.currentAttr.value += "�";
  				break;
  			case CODE_POINTS.QUOTATION_MARK:
  			case CODE_POINTS.APOSTROPHE:
  			case CODE_POINTS.LESS_THAN_SIGN:
  			case CODE_POINTS.EQUALS_SIGN:
  			case CODE_POINTS.GRAVE_ACCENT:
  				this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
  				this.currentAttr.value += String.fromCodePoint(cp);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default: this.currentAttr.value += String.fromCodePoint(cp);
  		}
  	}
  	_stateAfterAttributeValueQuoted(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this._leaveAttrValue();
  				this.state = State.BEFORE_ATTRIBUTE_NAME;
  				break;
  			case CODE_POINTS.SOLIDUS:
  				this._leaveAttrValue();
  				this.state = State.SELF_CLOSING_START_TAG;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._leaveAttrValue();
  				this.state = State.DATA;
  				this.emitCurrentTagToken();
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingWhitespaceBetweenAttributes);
  				this.state = State.BEFORE_ATTRIBUTE_NAME;
  				this._stateBeforeAttributeName(cp);
  		}
  	}
  	_stateSelfClosingStartTag(cp) {
  		switch (cp) {
  			case CODE_POINTS.GREATER_THAN_SIGN: {
  				const token = this.currentToken;
  				token.selfClosing = true;
  				this.state = State.DATA;
  				this.emitCurrentTagToken();
  				break;
  			}
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInTag);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.unexpectedSolidusInTag);
  				this.state = State.BEFORE_ATTRIBUTE_NAME;
  				this._stateBeforeAttributeName(cp);
  		}
  	}
  	_stateBogusComment(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentComment(token);
  				break;
  			case CODE_POINTS.EOF:
  				this.emitCurrentComment(token);
  				this._emitEOFToken();
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.data += "�";
  				break;
  			default: token.data += String.fromCodePoint(cp);
  		}
  	}
  	_stateMarkupDeclarationOpen(cp) {
  		if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
  			this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
  			this.state = State.COMMENT_START;
  		} else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
  			this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
  			this.state = State.DOCTYPE;
  		} else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
  			if (this.inForeignNode) this.state = State.CDATA_SECTION;
  			else {
  				this._err(ERR.cdataInHtmlContent);
  				this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
  				this.currentToken.data = "[CDATA[";
  				this.state = State.BOGUS_COMMENT;
  			}
  		} else if (!this._ensureHibernation()) {
  			this._err(ERR.incorrectlyOpenedComment);
  			this._createCommentToken(2);
  			this.state = State.BOGUS_COMMENT;
  			this._stateBogusComment(cp);
  		}
  	}
  	_stateCommentStart(cp) {
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.COMMENT_START_DASH;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN: {
  				this._err(ERR.abruptClosingOfEmptyComment);
  				this.state = State.DATA;
  				const token = this.currentToken;
  				this.emitCurrentComment(token);
  				break;
  			}
  			default:
  				this.state = State.COMMENT;
  				this._stateComment(cp);
  		}
  	}
  	_stateCommentStartDash(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.COMMENT_END;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.abruptClosingOfEmptyComment);
  				this.state = State.DATA;
  				this.emitCurrentComment(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInComment);
  				this.emitCurrentComment(token);
  				this._emitEOFToken();
  				break;
  			default:
  				token.data += "-";
  				this.state = State.COMMENT;
  				this._stateComment(cp);
  		}
  	}
  	_stateComment(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.COMMENT_END_DASH;
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				token.data += "<";
  				this.state = State.COMMENT_LESS_THAN_SIGN;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.data += "�";
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInComment);
  				this.emitCurrentComment(token);
  				this._emitEOFToken();
  				break;
  			default: token.data += String.fromCodePoint(cp);
  		}
  	}
  	_stateCommentLessThanSign(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.EXCLAMATION_MARK:
  				token.data += "!";
  				this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
  				break;
  			case CODE_POINTS.LESS_THAN_SIGN:
  				token.data += "<";
  				break;
  			default:
  				this.state = State.COMMENT;
  				this._stateComment(cp);
  		}
  	}
  	_stateCommentLessThanSignBang(cp) {
  		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
  		else {
  			this.state = State.COMMENT;
  			this._stateComment(cp);
  		}
  	}
  	_stateCommentLessThanSignBangDash(cp) {
  		if (cp === CODE_POINTS.HYPHEN_MINUS) this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
  		else {
  			this.state = State.COMMENT_END_DASH;
  			this._stateCommentEndDash(cp);
  		}
  	}
  	_stateCommentLessThanSignBangDashDash(cp) {
  		if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) this._err(ERR.nestedComment);
  		this.state = State.COMMENT_END;
  		this._stateCommentEnd(cp);
  	}
  	_stateCommentEndDash(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				this.state = State.COMMENT_END;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInComment);
  				this.emitCurrentComment(token);
  				this._emitEOFToken();
  				break;
  			default:
  				token.data += "-";
  				this.state = State.COMMENT;
  				this._stateComment(cp);
  		}
  	}
  	_stateCommentEnd(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentComment(token);
  				break;
  			case CODE_POINTS.EXCLAMATION_MARK:
  				this.state = State.COMMENT_END_BANG;
  				break;
  			case CODE_POINTS.HYPHEN_MINUS:
  				token.data += "-";
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInComment);
  				this.emitCurrentComment(token);
  				this._emitEOFToken();
  				break;
  			default:
  				token.data += "--";
  				this.state = State.COMMENT;
  				this._stateComment(cp);
  		}
  	}
  	_stateCommentEndBang(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.HYPHEN_MINUS:
  				token.data += "--!";
  				this.state = State.COMMENT_END_DASH;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.incorrectlyClosedComment);
  				this.state = State.DATA;
  				this.emitCurrentComment(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInComment);
  				this.emitCurrentComment(token);
  				this._emitEOFToken();
  				break;
  			default:
  				token.data += "--!";
  				this.state = State.COMMENT;
  				this._stateComment(cp);
  		}
  	}
  	_stateDoctype(cp) {
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this.state = State.BEFORE_DOCTYPE_NAME;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.BEFORE_DOCTYPE_NAME;
  				this._stateBeforeDoctypeName(cp);
  				break;
  			case CODE_POINTS.EOF: {
  				this._err(ERR.eofInDoctype);
  				this._createDoctypeToken(null);
  				const token = this.currentToken;
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			}
  			default:
  				this._err(ERR.missingWhitespaceBeforeDoctypeName);
  				this.state = State.BEFORE_DOCTYPE_NAME;
  				this._stateBeforeDoctypeName(cp);
  		}
  	}
  	_stateBeforeDoctypeName(cp) {
  		if (isAsciiUpper(cp)) {
  			this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
  			this.state = State.DOCTYPE_NAME;
  		} else switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				this._createDoctypeToken("�");
  				this.state = State.DOCTYPE_NAME;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN: {
  				this._err(ERR.missingDoctypeName);
  				this._createDoctypeToken(null);
  				const token = this.currentToken;
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			}
  			case CODE_POINTS.EOF: {
  				this._err(ERR.eofInDoctype);
  				this._createDoctypeToken(null);
  				const token = this.currentToken;
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			}
  			default:
  				this._createDoctypeToken(String.fromCodePoint(cp));
  				this.state = State.DOCTYPE_NAME;
  		}
  	}
  	_stateDoctypeName(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this.state = State.AFTER_DOCTYPE_NAME;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.name += "�";
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default: token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
  		}
  	}
  	_stateAfterDoctypeName(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default: if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
  			else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
  			else if (!this._ensureHibernation()) {
  				this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  			}
  		}
  	}
  	_stateAfterDoctypePublicKeyword(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
  				break;
  			case CODE_POINTS.QUOTATION_MARK:
  				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
  				token.publicId = "";
  				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
  				token.publicId = "";
  				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.missingDoctypePublicIdentifier);
  				token.forceQuirks = true;
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateBeforeDoctypePublicIdentifier(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.QUOTATION_MARK:
  				token.publicId = "";
  				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				token.publicId = "";
  				this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.missingDoctypePublicIdentifier);
  				token.forceQuirks = true;
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateDoctypePublicIdentifierDoubleQuoted(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.QUOTATION_MARK:
  				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.publicId += "�";
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.abruptDoctypePublicIdentifier);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default: token.publicId += String.fromCodePoint(cp);
  		}
  	}
  	_stateDoctypePublicIdentifierSingleQuoted(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.APOSTROPHE:
  				this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.publicId += "�";
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.abruptDoctypePublicIdentifier);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default: token.publicId += String.fromCodePoint(cp);
  		}
  	}
  	_stateAfterDoctypePublicIdentifier(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.QUOTATION_MARK:
  				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.QUOTATION_MARK:
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateAfterDoctypeSystemKeyword(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED:
  				this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
  				break;
  			case CODE_POINTS.QUOTATION_MARK:
  				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.missingDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateBeforeDoctypeSystemIdentifier(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.QUOTATION_MARK:
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
  				break;
  			case CODE_POINTS.APOSTROPHE:
  				token.systemId = "";
  				this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.missingDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.state = State.DATA;
  				this.emitCurrentDoctype(token);
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateDoctypeSystemIdentifierDoubleQuoted(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.QUOTATION_MARK:
  				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.systemId += "�";
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.abruptDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default: token.systemId += String.fromCodePoint(cp);
  		}
  	}
  	_stateDoctypeSystemIdentifierSingleQuoted(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.APOSTROPHE:
  				this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				token.systemId += "�";
  				break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this._err(ERR.abruptDoctypeSystemIdentifier);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default: token.systemId += String.fromCodePoint(cp);
  		}
  	}
  	_stateAfterDoctypeSystemIdentifier(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.SPACE:
  			case CODE_POINTS.LINE_FEED:
  			case CODE_POINTS.TABULATION:
  			case CODE_POINTS.FORM_FEED: break;
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInDoctype);
  				token.forceQuirks = true;
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  				break;
  			default:
  				this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
  				this.state = State.BOGUS_DOCTYPE;
  				this._stateBogusDoctype(cp);
  		}
  	}
  	_stateBogusDoctype(cp) {
  		const token = this.currentToken;
  		switch (cp) {
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.emitCurrentDoctype(token);
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.NULL:
  				this._err(ERR.unexpectedNullCharacter);
  				break;
  			case CODE_POINTS.EOF:
  				this.emitCurrentDoctype(token);
  				this._emitEOFToken();
  		}
  	}
  	_stateCdataSection(cp) {
  		switch (cp) {
  			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
  				this.state = State.CDATA_SECTION_BRACKET;
  				break;
  			case CODE_POINTS.EOF:
  				this._err(ERR.eofInCdata);
  				this._emitEOFToken();
  				break;
  			default: this._emitCodePoint(cp);
  		}
  	}
  	_stateCdataSectionBracket(cp) {
  		if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) this.state = State.CDATA_SECTION_END;
  		else {
  			this._emitChars("]");
  			this.state = State.CDATA_SECTION;
  			this._stateCdataSection(cp);
  		}
  	}
  	_stateCdataSectionEnd(cp) {
  		switch (cp) {
  			case CODE_POINTS.GREATER_THAN_SIGN:
  				this.state = State.DATA;
  				break;
  			case CODE_POINTS.RIGHT_SQUARE_BRACKET:
  				this._emitChars("]");
  				break;
  			default:
  				this._emitChars("]]");
  				this.state = State.CDATA_SECTION;
  				this._stateCdataSection(cp);
  		}
  	}
  	_stateCharacterReference() {
  		let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
  		if (length < 0) {
  			if (this.preprocessor.lastChunkWritten) length = this.entityDecoder.end();
  			else {
  				this.active = false;
  				this.preprocessor.pos = this.preprocessor.html.length - 1;
  				this.consumedAfterSnapshot = 0;
  				this.preprocessor.endOfChunkHit = true;
  				return;
  			}
  		}
  		if (length === 0) {
  			this.preprocessor.pos = this.entityStartPos;
  			this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
  			this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
  		} else this.state = this.returnState;
  	}
  	_stateAmbiguousAmpersand(cp) {
  		if (isAsciiAlphaNumeric(cp)) this._flushCodePointConsumedAsCharacterReference(cp);
  		else {
  			if (cp === CODE_POINTS.SEMICOLON) this._err(ERR.unknownNamedCharacterReference);
  			this.state = this.returnState;
  			this._callState(cp);
  		}
  	}
  };
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/open-element-stack.js
  var IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([
  	TAG_ID.DD,
  	TAG_ID.DT,
  	TAG_ID.LI,
  	TAG_ID.OPTGROUP,
  	TAG_ID.OPTION,
  	TAG_ID.P,
  	TAG_ID.RB,
  	TAG_ID.RP,
  	TAG_ID.RT,
  	TAG_ID.RTC
  ]);
  var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
  	...IMPLICIT_END_TAG_REQUIRED,
  	TAG_ID.CAPTION,
  	TAG_ID.COLGROUP,
  	TAG_ID.TBODY,
  	TAG_ID.TD,
  	TAG_ID.TFOOT,
  	TAG_ID.TH,
  	TAG_ID.THEAD,
  	TAG_ID.TR
  ]);
  var SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
  	TAG_ID.APPLET,
  	TAG_ID.CAPTION,
  	TAG_ID.HTML,
  	TAG_ID.MARQUEE,
  	TAG_ID.OBJECT,
  	TAG_ID.TABLE,
  	TAG_ID.TD,
  	TAG_ID.TEMPLATE,
  	TAG_ID.TH
  ]);
  var SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([
  	...SCOPING_ELEMENTS_HTML,
  	TAG_ID.OL,
  	TAG_ID.UL
  ]);
  var SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
  var SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([
  	TAG_ID.ANNOTATION_XML,
  	TAG_ID.MI,
  	TAG_ID.MN,
  	TAG_ID.MO,
  	TAG_ID.MS,
  	TAG_ID.MTEXT
  ]);
  var SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([
  	TAG_ID.DESC,
  	TAG_ID.FOREIGN_OBJECT,
  	TAG_ID.TITLE
  ]);
  var TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([
  	TAG_ID.TR,
  	TAG_ID.TEMPLATE,
  	TAG_ID.HTML
  ]);
  var TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([
  	TAG_ID.TBODY,
  	TAG_ID.TFOOT,
  	TAG_ID.THEAD,
  	TAG_ID.TEMPLATE,
  	TAG_ID.HTML
  ]);
  var TABLE_CONTEXT = /* @__PURE__ */ new Set([
  	TAG_ID.TABLE,
  	TAG_ID.TEMPLATE,
  	TAG_ID.HTML
  ]);
  var TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
  var OpenElementStack = class {
  	get currentTmplContentOrNode() {
  		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  	}
  	constructor(document, treeAdapter, handler) {
  		this.treeAdapter = treeAdapter;
  		this.handler = handler;
  		this.items = [];
  		this.tagIDs = [];
  		this.stackTop = -1;
  		this.tmplCount = 0;
  		this.currentTagId = TAG_ID.UNKNOWN;
  		this.current = document;
  	}
  	_indexOf(element) {
  		return this.items.lastIndexOf(element, this.stackTop);
  	}
  	_isInTemplate() {
  		return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
  	}
  	_updateCurrentElement() {
  		this.current = this.items[this.stackTop];
  		this.currentTagId = this.tagIDs[this.stackTop];
  	}
  	push(element, tagID) {
  		this.stackTop++;
  		this.items[this.stackTop] = element;
  		this.current = element;
  		this.tagIDs[this.stackTop] = tagID;
  		this.currentTagId = tagID;
  		if (this._isInTemplate()) this.tmplCount++;
  		this.handler.onItemPush(element, tagID, true);
  	}
  	pop() {
  		const popped = this.current;
  		if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount--;
  		this.stackTop--;
  		this._updateCurrentElement();
  		this.handler.onItemPop(popped, true);
  	}
  	replace(oldElement, newElement) {
  		const idx = this._indexOf(oldElement);
  		this.items[idx] = newElement;
  		if (idx === this.stackTop) this.current = newElement;
  	}
  	insertAfter(referenceElement, newElement, newElementID) {
  		const insertionIdx = this._indexOf(referenceElement) + 1;
  		this.items.splice(insertionIdx, 0, newElement);
  		this.tagIDs.splice(insertionIdx, 0, newElementID);
  		this.stackTop++;
  		if (insertionIdx === this.stackTop) this._updateCurrentElement();
  		if (this.current && this.currentTagId !== void 0) this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
  	}
  	popUntilTagNamePopped(tagName) {
  		let targetIdx = this.stackTop + 1;
  		do
  			targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
  		while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
  		this.shortenToLength(Math.max(targetIdx, 0));
  	}
  	shortenToLength(idx) {
  		while (this.stackTop >= idx) {
  			const popped = this.current;
  			if (this.tmplCount > 0 && this._isInTemplate()) this.tmplCount -= 1;
  			this.stackTop--;
  			this._updateCurrentElement();
  			this.handler.onItemPop(popped, this.stackTop < idx);
  		}
  	}
  	popUntilElementPopped(element) {
  		const idx = this._indexOf(element);
  		this.shortenToLength(Math.max(idx, 0));
  	}
  	popUntilPopped(tagNames, targetNS) {
  		const idx = this._indexOfTagNames(tagNames, targetNS);
  		this.shortenToLength(Math.max(idx, 0));
  	}
  	popUntilNumberedHeaderPopped() {
  		this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
  	}
  	popUntilTableCellPopped() {
  		this.popUntilPopped(TABLE_CELLS, NS.HTML);
  	}
  	popAllUpToHtmlElement() {
  		this.tmplCount = 0;
  		this.shortenToLength(1);
  	}
  	_indexOfTagNames(tagNames, namespace) {
  		for (let i = this.stackTop; i >= 0; i--) if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) return i;
  		return -1;
  	}
  	clearBackTo(tagNames, targetNS) {
  		const idx = this._indexOfTagNames(tagNames, targetNS);
  		this.shortenToLength(idx + 1);
  	}
  	clearBackToTableContext() {
  		this.clearBackTo(TABLE_CONTEXT, NS.HTML);
  	}
  	clearBackToTableBodyContext() {
  		this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
  	}
  	clearBackToTableRowContext() {
  		this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
  	}
  	remove(element) {
  		const idx = this._indexOf(element);
  		if (idx >= 0) {
  			if (idx === this.stackTop) this.pop();
  			else {
  				this.items.splice(idx, 1);
  				this.tagIDs.splice(idx, 1);
  				this.stackTop--;
  				this._updateCurrentElement();
  				this.handler.onItemPop(element, false);
  			}
  		}
  	}
  	tryPeekProperlyNestedBodyElement() {
  		return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
  	}
  	contains(element) {
  		return this._indexOf(element) > -1;
  	}
  	getCommonAncestor(element) {
  		const elementIdx = this._indexOf(element) - 1;
  		return elementIdx >= 0 ? this.items[elementIdx] : null;
  	}
  	isRootHtmlElementCurrent() {
  		return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
  	}
  	hasInDynamicScope(tagName, htmlScope) {
  		for (let i = this.stackTop; i >= 0; i--) {
  			const tn = this.tagIDs[i];
  			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
  				case NS.HTML:
  					if (tn === tagName) return true;
  					if (htmlScope.has(tn)) return false;
  					break;
  				case NS.SVG:
  					if (SCOPING_ELEMENTS_SVG.has(tn)) return false;
  					break;
  				case NS.MATHML: if (SCOPING_ELEMENTS_MATHML.has(tn)) return false;
  			}
  		}
  		return true;
  	}
  	hasInScope(tagName) {
  		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
  	}
  	hasInListItemScope(tagName) {
  		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
  	}
  	hasInButtonScope(tagName) {
  		return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
  	}
  	hasNumberedHeaderInScope() {
  		for (let i = this.stackTop; i >= 0; i--) {
  			const tn = this.tagIDs[i];
  			switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
  				case NS.HTML:
  					if (NUMBERED_HEADERS.has(tn)) return true;
  					if (SCOPING_ELEMENTS_HTML.has(tn)) return false;
  					break;
  				case NS.SVG:
  					if (SCOPING_ELEMENTS_SVG.has(tn)) return false;
  					break;
  				case NS.MATHML: if (SCOPING_ELEMENTS_MATHML.has(tn)) return false;
  			}
  		}
  		return true;
  	}
  	hasInTableScope(tagName) {
  		for (let i = this.stackTop; i >= 0; i--) {
  			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
  			switch (this.tagIDs[i]) {
  				case tagName: return true;
  				case TAG_ID.TABLE:
  				case TAG_ID.HTML: return false;
  			}
  		}
  		return true;
  	}
  	hasTableBodyContextInTableScope() {
  		for (let i = this.stackTop; i >= 0; i--) {
  			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
  			switch (this.tagIDs[i]) {
  				case TAG_ID.TBODY:
  				case TAG_ID.THEAD:
  				case TAG_ID.TFOOT: return true;
  				case TAG_ID.TABLE:
  				case TAG_ID.HTML: return false;
  			}
  		}
  		return true;
  	}
  	hasInSelectScope(tagName) {
  		for (let i = this.stackTop; i >= 0; i--) {
  			if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) continue;
  			switch (this.tagIDs[i]) {
  				case tagName: return true;
  				case TAG_ID.OPTION:
  				case TAG_ID.OPTGROUP: break;
  				default: return false;
  			}
  		}
  		return true;
  	}
  	generateImpliedEndTags() {
  		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) this.pop();
  	}
  	generateImpliedEndTagsThoroughly() {
  		while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
  	}
  	generateImpliedEndTagsWithExclusion(exclusionId) {
  		while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) this.pop();
  	}
  };
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/formatting-element-list.js
  var NOAH_ARK_CAPACITY = 3;
  var EntryType;
  (function(EntryType) {
  	EntryType[EntryType["Marker"] = 0] = "Marker";
  	EntryType[EntryType["Element"] = 1] = "Element";
  })(EntryType || (EntryType = {}));
  var MARKER = { type: EntryType.Marker };
  var FormattingElementList = class {
  	constructor(treeAdapter) {
  		this.treeAdapter = treeAdapter;
  		this.entries = [];
  		this.bookmark = null;
  	}
  	_getNoahArkConditionCandidates(newElement, neAttrs) {
  		const candidates = [];
  		const neAttrsLength = neAttrs.length;
  		const neTagName = this.treeAdapter.getTagName(newElement);
  		const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
  		for (let i = 0; i < this.entries.length; i++) {
  			const entry = this.entries[i];
  			if (entry.type === EntryType.Marker) break;
  			const { element } = entry;
  			if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
  				const elementAttrs = this.treeAdapter.getAttrList(element);
  				if (elementAttrs.length === neAttrsLength) candidates.push({
  					idx: i,
  					attrs: elementAttrs
  				});
  			}
  		}
  		return candidates;
  	}
  	_ensureNoahArkCondition(newElement) {
  		if (this.entries.length < NOAH_ARK_CAPACITY) return;
  		const neAttrs = this.treeAdapter.getAttrList(newElement);
  		const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
  		if (candidates.length < NOAH_ARK_CAPACITY) return;
  		const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
  		let validCandidates = 0;
  		for (let i = 0; i < candidates.length; i++) {
  			const candidate = candidates[i];
  			if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
  				validCandidates += 1;
  				if (validCandidates >= NOAH_ARK_CAPACITY) this.entries.splice(candidate.idx, 1);
  			}
  		}
  	}
  	insertMarker() {
  		this.entries.unshift(MARKER);
  	}
  	pushElement(element, token) {
  		this._ensureNoahArkCondition(element);
  		this.entries.unshift({
  			type: EntryType.Element,
  			element,
  			token
  		});
  	}
  	insertElementAfterBookmark(element, token) {
  		const bookmarkIdx = this.entries.indexOf(this.bookmark);
  		this.entries.splice(bookmarkIdx, 0, {
  			type: EntryType.Element,
  			element,
  			token
  		});
  	}
  	removeEntry(entry) {
  		const entryIndex = this.entries.indexOf(entry);
  		if (entryIndex !== -1) this.entries.splice(entryIndex, 1);
  	}
  	/**
  	* Clears the list of formatting elements up to the last marker.
  	*
  	* @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
  	*/
  	clearToLastMarker() {
  		const markerIdx = this.entries.indexOf(MARKER);
  		if (markerIdx === -1) this.entries.length = 0;
  		else this.entries.splice(0, markerIdx + 1);
  	}
  	getElementEntryInScopeWithTagName(tagName) {
  		const entry = this.entries.find((entry) => entry.type === EntryType.Marker || this.treeAdapter.getTagName(entry.element) === tagName);
  		return entry && entry.type === EntryType.Element ? entry : null;
  	}
  	getElementEntry(element) {
  		return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
  	}
  };
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/tree-adapters/default.js
  var defaultTreeAdapter = {
  	createDocument() {
  		return {
  			nodeName: "#document",
  			mode: DOCUMENT_MODE.NO_QUIRKS,
  			childNodes: []
  		};
  	},
  	createDocumentFragment() {
  		return {
  			nodeName: "#document-fragment",
  			childNodes: []
  		};
  	},
  	createElement(tagName, namespaceURI, attrs) {
  		return {
  			nodeName: tagName,
  			tagName,
  			attrs,
  			namespaceURI,
  			childNodes: [],
  			parentNode: null
  		};
  	},
  	createCommentNode(data) {
  		return {
  			nodeName: "#comment",
  			data,
  			parentNode: null
  		};
  	},
  	createTextNode(value) {
  		return {
  			nodeName: "#text",
  			value,
  			parentNode: null
  		};
  	},
  	appendChild(parentNode, newNode) {
  		parentNode.childNodes.push(newNode);
  		newNode.parentNode = parentNode;
  	},
  	insertBefore(parentNode, newNode, referenceNode) {
  		const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
  		parentNode.childNodes.splice(insertionIdx, 0, newNode);
  		newNode.parentNode = parentNode;
  	},
  	setTemplateContent(templateElement, contentElement) {
  		templateElement.content = contentElement;
  	},
  	getTemplateContent(templateElement) {
  		return templateElement.content;
  	},
  	setDocumentType(document, name, publicId, systemId) {
  		const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
  		if (doctypeNode) {
  			doctypeNode.name = name;
  			doctypeNode.publicId = publicId;
  			doctypeNode.systemId = systemId;
  		} else {
  			const node = {
  				nodeName: "#documentType",
  				name,
  				publicId,
  				systemId,
  				parentNode: null
  			};
  			defaultTreeAdapter.appendChild(document, node);
  		}
  	},
  	setDocumentMode(document, mode) {
  		document.mode = mode;
  	},
  	getDocumentMode(document) {
  		return document.mode;
  	},
  	detachNode(node) {
  		if (node.parentNode) {
  			const idx = node.parentNode.childNodes.indexOf(node);
  			node.parentNode.childNodes.splice(idx, 1);
  			node.parentNode = null;
  		}
  	},
  	insertText(parentNode, text) {
  		if (parentNode.childNodes.length > 0) {
  			const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
  			if (defaultTreeAdapter.isTextNode(prevNode)) {
  				prevNode.value += text;
  				return;
  			}
  		}
  		defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text));
  	},
  	insertTextBefore(parentNode, text, referenceNode) {
  		const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
  		if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) prevNode.value += text;
  		else defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text), referenceNode);
  	},
  	adoptAttributes(recipient, attrs) {
  		const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
  		for (let j = 0; j < attrs.length; j++) if (!recipientAttrsMap.has(attrs[j].name)) recipient.attrs.push(attrs[j]);
  	},
  	getFirstChild(node) {
  		return node.childNodes[0];
  	},
  	getChildNodes(node) {
  		return node.childNodes;
  	},
  	getParentNode(node) {
  		return node.parentNode;
  	},
  	getAttrList(element) {
  		return element.attrs;
  	},
  	getTagName(element) {
  		return element.tagName;
  	},
  	getNamespaceURI(element) {
  		return element.namespaceURI;
  	},
  	getTextNodeContent(textNode) {
  		return textNode.value;
  	},
  	getCommentNodeContent(commentNode) {
  		return commentNode.data;
  	},
  	getDocumentTypeNodeName(doctypeNode) {
  		return doctypeNode.name;
  	},
  	getDocumentTypeNodePublicId(doctypeNode) {
  		return doctypeNode.publicId;
  	},
  	getDocumentTypeNodeSystemId(doctypeNode) {
  		return doctypeNode.systemId;
  	},
  	isTextNode(node) {
  		return node.nodeName === "#text";
  	},
  	isCommentNode(node) {
  		return node.nodeName === "#comment";
  	},
  	isDocumentTypeNode(node) {
  		return node.nodeName === "#documentType";
  	},
  	isElementNode(node) {
  		return Object.prototype.hasOwnProperty.call(node, "tagName");
  	},
  	setNodeSourceCodeLocation(node, location) {
  		node.sourceCodeLocation = location;
  	},
  	getNodeSourceCodeLocation(node) {
  		return node.sourceCodeLocation;
  	},
  	updateNodeSourceCodeLocation(node, endLocation) {
  		node.sourceCodeLocation = {
  			...node.sourceCodeLocation,
  			...endLocation
  		};
  	}
  };
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/doctype.js
  var VALID_DOCTYPE_NAME = "html";
  var VALID_SYSTEM_ID = "about:legacy-compat";
  var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
  var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
  	"+//silmaril//dtd html pro v0r11 19970101//",
  	"-//as//dtd html 3.0 aswedit + extensions//",
  	"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  	"-//ietf//dtd html 2.0 level 1//",
  	"-//ietf//dtd html 2.0 level 2//",
  	"-//ietf//dtd html 2.0 strict level 1//",
  	"-//ietf//dtd html 2.0 strict level 2//",
  	"-//ietf//dtd html 2.0 strict//",
  	"-//ietf//dtd html 2.0//",
  	"-//ietf//dtd html 2.1e//",
  	"-//ietf//dtd html 3.0//",
  	"-//ietf//dtd html 3.2 final//",
  	"-//ietf//dtd html 3.2//",
  	"-//ietf//dtd html 3//",
  	"-//ietf//dtd html level 0//",
  	"-//ietf//dtd html level 1//",
  	"-//ietf//dtd html level 2//",
  	"-//ietf//dtd html level 3//",
  	"-//ietf//dtd html strict level 0//",
  	"-//ietf//dtd html strict level 1//",
  	"-//ietf//dtd html strict level 2//",
  	"-//ietf//dtd html strict level 3//",
  	"-//ietf//dtd html strict//",
  	"-//ietf//dtd html//",
  	"-//metrius//dtd metrius presentational//",
  	"-//microsoft//dtd internet explorer 2.0 html strict//",
  	"-//microsoft//dtd internet explorer 2.0 html//",
  	"-//microsoft//dtd internet explorer 2.0 tables//",
  	"-//microsoft//dtd internet explorer 3.0 html strict//",
  	"-//microsoft//dtd internet explorer 3.0 html//",
  	"-//microsoft//dtd internet explorer 3.0 tables//",
  	"-//netscape comm. corp.//dtd html//",
  	"-//netscape comm. corp.//dtd strict html//",
  	"-//o'reilly and associates//dtd html 2.0//",
  	"-//o'reilly and associates//dtd html extended 1.0//",
  	"-//o'reilly and associates//dtd html extended relaxed 1.0//",
  	"-//sq//dtd html 2.0 hotmetal + extensions//",
  	"-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  	"-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  	"-//spyglass//dtd html 2.0 extended//",
  	"-//sun microsystems corp.//dtd hotjava html//",
  	"-//sun microsystems corp.//dtd hotjava strict html//",
  	"-//w3c//dtd html 3 1995-03-24//",
  	"-//w3c//dtd html 3.2 draft//",
  	"-//w3c//dtd html 3.2 final//",
  	"-//w3c//dtd html 3.2//",
  	"-//w3c//dtd html 3.2s draft//",
  	"-//w3c//dtd html 4.0 frameset//",
  	"-//w3c//dtd html 4.0 transitional//",
  	"-//w3c//dtd html experimental 19960712//",
  	"-//w3c//dtd html experimental 970421//",
  	"-//w3c//dtd w3 html//",
  	"-//w3o//dtd w3 html 3.0//",
  	"-//webtechs//dtd mozilla html 2.0//",
  	"-//webtechs//dtd mozilla html//"
  ];
  var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  	...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
  	"-//w3c//dtd html 4.01 frameset//",
  	"-//w3c//dtd html 4.01 transitional//"
  ];
  var QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
  	"-//w3o//dtd w3 html strict 3.0//en//",
  	"-/w3c/dtd html 4.0 transitional/en",
  	"html"
  ]);
  var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
  var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  	...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
  	"-//w3c//dtd html 4.01 frameset//",
  	"-//w3c//dtd html 4.01 transitional//"
  ];
  function hasPrefix(publicId, prefixes) {
  	return prefixes.some((prefix) => publicId.startsWith(prefix));
  }
  function isConforming(token) {
  	return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
  }
  function getDocumentMode(token) {
  	if (token.name !== VALID_DOCTYPE_NAME) return DOCUMENT_MODE.QUIRKS;
  	const { systemId } = token;
  	if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) return DOCUMENT_MODE.QUIRKS;
  	let { publicId } = token;
  	if (publicId !== null) {
  		publicId = publicId.toLowerCase();
  		if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) return DOCUMENT_MODE.QUIRKS;
  		let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
  		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.QUIRKS;
  		prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
  		if (hasPrefix(publicId, prefixes)) return DOCUMENT_MODE.LIMITED_QUIRKS;
  	}
  	return DOCUMENT_MODE.NO_QUIRKS;
  }
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/common/foreign-content.js
  var MIME_TYPES = {
  	TEXT_HTML: "text/html",
  	APPLICATION_XML: "application/xhtml+xml"
  };
  var DEFINITION_URL_ATTR = "definitionurl";
  var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
  var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  	"attributeName",
  	"attributeType",
  	"baseFrequency",
  	"baseProfile",
  	"calcMode",
  	"clipPathUnits",
  	"diffuseConstant",
  	"edgeMode",
  	"filterUnits",
  	"glyphRef",
  	"gradientTransform",
  	"gradientUnits",
  	"kernelMatrix",
  	"kernelUnitLength",
  	"keyPoints",
  	"keySplines",
  	"keyTimes",
  	"lengthAdjust",
  	"limitingConeAngle",
  	"markerHeight",
  	"markerUnits",
  	"markerWidth",
  	"maskContentUnits",
  	"maskUnits",
  	"numOctaves",
  	"pathLength",
  	"patternContentUnits",
  	"patternTransform",
  	"patternUnits",
  	"pointsAtX",
  	"pointsAtY",
  	"pointsAtZ",
  	"preserveAlpha",
  	"preserveAspectRatio",
  	"primitiveUnits",
  	"refX",
  	"refY",
  	"repeatCount",
  	"repeatDur",
  	"requiredExtensions",
  	"requiredFeatures",
  	"specularConstant",
  	"specularExponent",
  	"spreadMethod",
  	"startOffset",
  	"stdDeviation",
  	"stitchTiles",
  	"surfaceScale",
  	"systemLanguage",
  	"tableValues",
  	"targetX",
  	"targetY",
  	"textLength",
  	"viewBox",
  	"viewTarget",
  	"xChannelSelector",
  	"yChannelSelector",
  	"zoomAndPan"
  ].map((attr) => [attr.toLowerCase(), attr]));
  var XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
  	["xlink:actuate", {
  		prefix: "xlink",
  		name: "actuate",
  		namespace: NS.XLINK
  	}],
  	["xlink:arcrole", {
  		prefix: "xlink",
  		name: "arcrole",
  		namespace: NS.XLINK
  	}],
  	["xlink:href", {
  		prefix: "xlink",
  		name: "href",
  		namespace: NS.XLINK
  	}],
  	["xlink:role", {
  		prefix: "xlink",
  		name: "role",
  		namespace: NS.XLINK
  	}],
  	["xlink:show", {
  		prefix: "xlink",
  		name: "show",
  		namespace: NS.XLINK
  	}],
  	["xlink:title", {
  		prefix: "xlink",
  		name: "title",
  		namespace: NS.XLINK
  	}],
  	["xlink:type", {
  		prefix: "xlink",
  		name: "type",
  		namespace: NS.XLINK
  	}],
  	["xml:lang", {
  		prefix: "xml",
  		name: "lang",
  		namespace: NS.XML
  	}],
  	["xml:space", {
  		prefix: "xml",
  		name: "space",
  		namespace: NS.XML
  	}],
  	["xmlns", {
  		prefix: "",
  		name: "xmlns",
  		namespace: NS.XMLNS
  	}],
  	["xmlns:xlink", {
  		prefix: "xmlns",
  		name: "xlink",
  		namespace: NS.XMLNS
  	}]
  ]);
  var SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  	"altGlyph",
  	"altGlyphDef",
  	"altGlyphItem",
  	"animateColor",
  	"animateMotion",
  	"animateTransform",
  	"clipPath",
  	"feBlend",
  	"feColorMatrix",
  	"feComponentTransfer",
  	"feComposite",
  	"feConvolveMatrix",
  	"feDiffuseLighting",
  	"feDisplacementMap",
  	"feDistantLight",
  	"feFlood",
  	"feFuncA",
  	"feFuncB",
  	"feFuncG",
  	"feFuncR",
  	"feGaussianBlur",
  	"feImage",
  	"feMerge",
  	"feMergeNode",
  	"feMorphology",
  	"feOffset",
  	"fePointLight",
  	"feSpecularLighting",
  	"feSpotLight",
  	"feTile",
  	"feTurbulence",
  	"foreignObject",
  	"glyphRef",
  	"linearGradient",
  	"radialGradient",
  	"textPath"
  ].map((tn) => [tn.toLowerCase(), tn]));
  var EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
  	TAG_ID.B,
  	TAG_ID.BIG,
  	TAG_ID.BLOCKQUOTE,
  	TAG_ID.BODY,
  	TAG_ID.BR,
  	TAG_ID.CENTER,
  	TAG_ID.CODE,
  	TAG_ID.DD,
  	TAG_ID.DIV,
  	TAG_ID.DL,
  	TAG_ID.DT,
  	TAG_ID.EM,
  	TAG_ID.EMBED,
  	TAG_ID.H1,
  	TAG_ID.H2,
  	TAG_ID.H3,
  	TAG_ID.H4,
  	TAG_ID.H5,
  	TAG_ID.H6,
  	TAG_ID.HEAD,
  	TAG_ID.HR,
  	TAG_ID.I,
  	TAG_ID.IMG,
  	TAG_ID.LI,
  	TAG_ID.LISTING,
  	TAG_ID.MENU,
  	TAG_ID.META,
  	TAG_ID.NOBR,
  	TAG_ID.OL,
  	TAG_ID.P,
  	TAG_ID.PRE,
  	TAG_ID.RUBY,
  	TAG_ID.S,
  	TAG_ID.SMALL,
  	TAG_ID.SPAN,
  	TAG_ID.STRONG,
  	TAG_ID.STRIKE,
  	TAG_ID.SUB,
  	TAG_ID.SUP,
  	TAG_ID.TABLE,
  	TAG_ID.TT,
  	TAG_ID.U,
  	TAG_ID.UL,
  	TAG_ID.VAR
  ]);
  function causesExit(startTagToken) {
  	const tn = startTagToken.tagID;
  	return tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE) || EXITS_FOREIGN_CONTENT.has(tn);
  }
  function adjustTokenMathMLAttrs(token) {
  	for (let i = 0; i < token.attrs.length; i++) if (token.attrs[i].name === DEFINITION_URL_ATTR) {
  		token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
  		break;
  	}
  }
  function adjustTokenSVGAttrs(token) {
  	for (let i = 0; i < token.attrs.length; i++) {
  		const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
  		if (adjustedAttrName != null) token.attrs[i].name = adjustedAttrName;
  	}
  }
  function adjustTokenXMLAttrs(token) {
  	for (let i = 0; i < token.attrs.length; i++) {
  		const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
  		if (adjustedAttrEntry) {
  			token.attrs[i].prefix = adjustedAttrEntry.prefix;
  			token.attrs[i].name = adjustedAttrEntry.name;
  			token.attrs[i].namespace = adjustedAttrEntry.namespace;
  		}
  	}
  }
  function adjustTokenSVGTagName(token) {
  	const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
  	if (adjustedTagName != null) {
  		token.tagName = adjustedTagName;
  		token.tagID = getTagID(token.tagName);
  	}
  }
  function isMathMLTextIntegrationPoint(tn, ns) {
  	return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
  }
  function isHtmlIntegrationPoint(tn, ns, attrs) {
  	if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
  		for (let i = 0; i < attrs.length; i++) if (attrs[i].name === ATTRS.ENCODING) {
  			const value = attrs[i].value.toLowerCase();
  			return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
  		}
  	}
  	return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
  }
  function isIntegrationPoint(tn, ns, attrs, foreignNS) {
  	return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
  }
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/parser/index.js
  var HIDDEN_INPUT_TYPE = "hidden";
  var AA_OUTER_LOOP_ITER = 8;
  var AA_INNER_LOOP_ITER = 3;
  var InsertionMode;
  (function(InsertionMode) {
  	InsertionMode[InsertionMode["INITIAL"] = 0] = "INITIAL";
  	InsertionMode[InsertionMode["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  	InsertionMode[InsertionMode["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  	InsertionMode[InsertionMode["IN_HEAD"] = 3] = "IN_HEAD";
  	InsertionMode[InsertionMode["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  	InsertionMode[InsertionMode["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  	InsertionMode[InsertionMode["IN_BODY"] = 6] = "IN_BODY";
  	InsertionMode[InsertionMode["TEXT"] = 7] = "TEXT";
  	InsertionMode[InsertionMode["IN_TABLE"] = 8] = "IN_TABLE";
  	InsertionMode[InsertionMode["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  	InsertionMode[InsertionMode["IN_CAPTION"] = 10] = "IN_CAPTION";
  	InsertionMode[InsertionMode["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  	InsertionMode[InsertionMode["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  	InsertionMode[InsertionMode["IN_ROW"] = 13] = "IN_ROW";
  	InsertionMode[InsertionMode["IN_CELL"] = 14] = "IN_CELL";
  	InsertionMode[InsertionMode["IN_SELECT"] = 15] = "IN_SELECT";
  	InsertionMode[InsertionMode["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  	InsertionMode[InsertionMode["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  	InsertionMode[InsertionMode["AFTER_BODY"] = 18] = "AFTER_BODY";
  	InsertionMode[InsertionMode["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  	InsertionMode[InsertionMode["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  	InsertionMode[InsertionMode["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  	InsertionMode[InsertionMode["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
  })(InsertionMode || (InsertionMode = {}));
  var BASE_LOC = {
  	startLine: -1,
  	startCol: -1,
  	startOffset: -1,
  	endLine: -1,
  	endCol: -1,
  	endOffset: -1
  };
  var TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([
  	TAG_ID.TABLE,
  	TAG_ID.TBODY,
  	TAG_ID.TFOOT,
  	TAG_ID.THEAD,
  	TAG_ID.TR
  ]);
  var defaultParserOptions = {
  	scriptingEnabled: true,
  	sourceCodeLocationInfo: false,
  	treeAdapter: defaultTreeAdapter,
  	onParseError: null
  };
  var Parser = class {
  	constructor(options, document, fragmentContext = null, scriptHandler = null) {
  		this.fragmentContext = fragmentContext;
  		this.scriptHandler = scriptHandler;
  		this.currentToken = null;
  		this.stopped = false;
  		/** @internal */
  		this.insertionMode = InsertionMode.INITIAL;
  		/** @internal */
  		this.originalInsertionMode = InsertionMode.INITIAL;
  		/** @internal */
  		this.headElement = null;
  		/** @internal */
  		this.formElement = null;
  		/** Indicates that the current node is not an element in the HTML namespace */
  		this.currentNotInHTML = false;
  		/**
  		* The template insertion mode stack is maintained from the left.
  		* Ie. the topmost element will always have index 0.
  		*
  		* @internal
  		*/
  		this.tmplInsertionModeStack = [];
  		/** @internal */
  		this.pendingCharacterTokens = [];
  		/** @internal */
  		this.hasNonWhitespacePendingCharacterToken = false;
  		/** @internal */
  		this.framesetOk = true;
  		/** @internal */
  		this.skipNextNewLine = false;
  		/** @internal */
  		this.fosterParentingEnabled = false;
  		this.options = {
  			...defaultParserOptions,
  			...options
  		};
  		this.treeAdapter = this.options.treeAdapter;
  		this.onParseError = this.options.onParseError;
  		if (this.onParseError) this.options.sourceCodeLocationInfo = true;
  		this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
  		this.tokenizer = new Tokenizer(this.options, this);
  		this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
  		this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
  		this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
  		this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
  	}
  	static parse(html, options) {
  		const parser = new this(options);
  		parser.tokenizer.write(html, true);
  		return parser.document;
  	}
  	static getFragmentParser(fragmentContext, options) {
  		const opts = {
  			...defaultParserOptions,
  			...options
  		};
  		fragmentContext !== null && fragmentContext !== void 0 || (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
  		const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
  		const parser = new this(opts, documentMock, fragmentContext);
  		if (parser.fragmentContextID === TAG_ID.TEMPLATE) parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
  		parser._initTokenizerForFragmentParsing();
  		parser._insertFakeRootElement();
  		parser._resetInsertionMode();
  		parser._findFormInFragmentContext();
  		return parser;
  	}
  	getFragment() {
  		const rootElement = this.treeAdapter.getFirstChild(this.document);
  		const fragment = this.treeAdapter.createDocumentFragment();
  		this._adoptNodes(rootElement, fragment);
  		return fragment;
  	}
  	/** @internal */
  	_err(token, code, beforeToken) {
  		var _a;
  		if (!this.onParseError) return;
  		const loc = (_a = token.location) !== null && _a !== void 0 ? _a : BASE_LOC;
  		const err = {
  			code,
  			startLine: loc.startLine,
  			startCol: loc.startCol,
  			startOffset: loc.startOffset,
  			endLine: beforeToken ? loc.startLine : loc.endLine,
  			endCol: beforeToken ? loc.startCol : loc.endCol,
  			endOffset: beforeToken ? loc.startOffset : loc.endOffset
  		};
  		this.onParseError(err);
  	}
  	/** @internal */
  	onItemPush(node, tid, isTop) {
  		var _a, _b;
  		(_b = (_a = this.treeAdapter).onItemPush) === null || _b === void 0 || _b.call(_a, node);
  		if (isTop && this.openElements.stackTop > 0) this._setContextModes(node, tid);
  	}
  	/** @internal */
  	onItemPop(node, isTop) {
  		var _a, _b;
  		if (this.options.sourceCodeLocationInfo) this._setEndLocation(node, this.currentToken);
  		(_b = (_a = this.treeAdapter).onItemPop) === null || _b === void 0 || _b.call(_a, node, this.openElements.current);
  		if (isTop) {
  			let current;
  			let currentTagId;
  			if (this.openElements.stackTop === 0 && this.fragmentContext) {
  				current = this.fragmentContext;
  				currentTagId = this.fragmentContextID;
  			} else ({current, currentTagId} = this.openElements);
  			this._setContextModes(current, currentTagId);
  		}
  	}
  	_setContextModes(current, tid) {
  		const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
  		this.currentNotInHTML = !isHTML;
  		this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
  	}
  	/** @protected */
  	_switchToTextParsing(currentToken, nextTokenizerState) {
  		this._insertElement(currentToken, NS.HTML);
  		this.tokenizer.state = nextTokenizerState;
  		this.originalInsertionMode = this.insertionMode;
  		this.insertionMode = InsertionMode.TEXT;
  	}
  	switchToPlaintextParsing() {
  		this.insertionMode = InsertionMode.TEXT;
  		this.originalInsertionMode = InsertionMode.IN_BODY;
  		this.tokenizer.state = TokenizerMode.PLAINTEXT;
  	}
  	/** @protected */
  	_getAdjustedCurrentElement() {
  		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  	}
  	/** @protected */
  	_findFormInFragmentContext() {
  		let node = this.fragmentContext;
  		while (node) {
  			if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
  				this.formElement = node;
  				break;
  			}
  			node = this.treeAdapter.getParentNode(node);
  		}
  	}
  	_initTokenizerForFragmentParsing() {
  		if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) return;
  		switch (this.fragmentContextID) {
  			case TAG_ID.TITLE:
  			case TAG_ID.TEXTAREA:
  				this.tokenizer.state = TokenizerMode.RCDATA;
  				break;
  			case TAG_ID.STYLE:
  			case TAG_ID.XMP:
  			case TAG_ID.IFRAME:
  			case TAG_ID.NOEMBED:
  			case TAG_ID.NOFRAMES:
  			case TAG_ID.NOSCRIPT:
  				this.tokenizer.state = TokenizerMode.RAWTEXT;
  				break;
  			case TAG_ID.SCRIPT:
  				this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
  				break;
  			case TAG_ID.PLAINTEXT: this.tokenizer.state = TokenizerMode.PLAINTEXT;
  		}
  	}
  	/** @protected */
  	_setDocumentType(token) {
  		const name = token.name || "";
  		const publicId = token.publicId || "";
  		const systemId = token.systemId || "";
  		this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
  		if (token.location) {
  			const docTypeNode = this.treeAdapter.getChildNodes(this.document).find((node) => this.treeAdapter.isDocumentTypeNode(node));
  			if (docTypeNode) this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
  		}
  	}
  	/** @protected */
  	_attachElementToTree(element, location) {
  		if (this.options.sourceCodeLocationInfo) {
  			const loc = location && {
  				...location,
  				startTag: location
  			};
  			this.treeAdapter.setNodeSourceCodeLocation(element, loc);
  		}
  		if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(element);
  		else {
  			const parent = this.openElements.currentTmplContentOrNode;
  			this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
  		}
  	}
  	/**
  	* For self-closing tags. Add an element to the tree, but skip adding it
  	* to the stack.
  	*/
  	/** @protected */
  	_appendElement(token, namespaceURI) {
  		const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
  		this._attachElementToTree(element, token.location);
  	}
  	/** @protected */
  	_insertElement(token, namespaceURI) {
  		const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
  		this._attachElementToTree(element, token.location);
  		this.openElements.push(element, token.tagID);
  	}
  	/** @protected */
  	_insertFakeElement(tagName, tagID) {
  		const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
  		this._attachElementToTree(element, null);
  		this.openElements.push(element, tagID);
  	}
  	/** @protected */
  	_insertTemplate(token) {
  		const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
  		const content = this.treeAdapter.createDocumentFragment();
  		this.treeAdapter.setTemplateContent(tmpl, content);
  		this._attachElementToTree(tmpl, token.location);
  		this.openElements.push(tmpl, token.tagID);
  		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(content, null);
  	}
  	/** @protected */
  	_insertFakeRootElement() {
  		const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
  		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(element, null);
  		this.treeAdapter.appendChild(this.openElements.current, element);
  		this.openElements.push(element, TAG_ID.HTML);
  	}
  	/** @protected */
  	_appendCommentNode(token, parent) {
  		const commentNode = this.treeAdapter.createCommentNode(token.data);
  		this.treeAdapter.appendChild(parent, commentNode);
  		if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
  	}
  	/** @protected */
  	_insertCharacters(token) {
  		let parent;
  		let beforeElement;
  		if (this._shouldFosterParentOnInsertion()) {
  			({parent, beforeElement} = this._findFosterParentingLocation());
  			if (beforeElement) this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
  			else this.treeAdapter.insertText(parent, token.chars);
  		} else {
  			parent = this.openElements.currentTmplContentOrNode;
  			this.treeAdapter.insertText(parent, token.chars);
  		}
  		if (!token.location) return;
  		const siblings = this.treeAdapter.getChildNodes(parent);
  		const textNode = siblings[(beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length) - 1];
  		if (this.treeAdapter.getNodeSourceCodeLocation(textNode)) {
  			const { endLine, endCol, endOffset } = token.location;
  			this.treeAdapter.updateNodeSourceCodeLocation(textNode, {
  				endLine,
  				endCol,
  				endOffset
  			});
  		} else if (this.options.sourceCodeLocationInfo) this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
  	}
  	/** @protected */
  	_adoptNodes(donor, recipient) {
  		for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
  			this.treeAdapter.detachNode(child);
  			this.treeAdapter.appendChild(recipient, child);
  		}
  	}
  	/** @protected */
  	_setEndLocation(element, closingToken) {
  		if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
  			const ctLoc = closingToken.location;
  			const tn = this.treeAdapter.getTagName(element);
  			const endLoc = closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
  				endTag: { ...ctLoc },
  				endLine: ctLoc.endLine,
  				endCol: ctLoc.endCol,
  				endOffset: ctLoc.endOffset
  			} : {
  				endLine: ctLoc.startLine,
  				endCol: ctLoc.startCol,
  				endOffset: ctLoc.startOffset
  			};
  			this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
  		}
  	}
  	shouldProcessStartTagTokenInForeignContent(token) {
  		if (!this.currentNotInHTML) return false;
  		let current;
  		let currentTagId;
  		if (this.openElements.stackTop === 0 && this.fragmentContext) {
  			current = this.fragmentContext;
  			currentTagId = this.fragmentContextID;
  		} else ({current, currentTagId} = this.openElements);
  		if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) return false;
  		return this.tokenizer.inForeignNode || (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML);
  	}
  	/** @protected */
  	_processToken(token) {
  		switch (token.type) {
  			case TokenType.CHARACTER:
  				this.onCharacter(token);
  				break;
  			case TokenType.NULL_CHARACTER:
  				this.onNullCharacter(token);
  				break;
  			case TokenType.COMMENT:
  				this.onComment(token);
  				break;
  			case TokenType.DOCTYPE:
  				this.onDoctype(token);
  				break;
  			case TokenType.START_TAG:
  				this._processStartTag(token);
  				break;
  			case TokenType.END_TAG:
  				this.onEndTag(token);
  				break;
  			case TokenType.EOF:
  				this.onEof(token);
  				break;
  			case TokenType.WHITESPACE_CHARACTER: this.onWhitespaceCharacter(token);
  		}
  	}
  	/** @protected */
  	_isIntegrationPoint(tid, element, foreignNS) {
  		return isIntegrationPoint(tid, this.treeAdapter.getNamespaceURI(element), this.treeAdapter.getAttrList(element), foreignNS);
  	}
  	/** @protected */
  	_reconstructActiveFormattingElements() {
  		const listLength = this.activeFormattingElements.entries.length;
  		if (listLength) {
  			const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
  			const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
  			for (let i = unopenIdx; i >= 0; i--) {
  				const entry = this.activeFormattingElements.entries[i];
  				this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
  				entry.element = this.openElements.current;
  			}
  		}
  	}
  	/** @protected */
  	_closeTableCell() {
  		this.openElements.generateImpliedEndTags();
  		this.openElements.popUntilTableCellPopped();
  		this.activeFormattingElements.clearToLastMarker();
  		this.insertionMode = InsertionMode.IN_ROW;
  	}
  	/** @protected */
  	_closePElement() {
  		this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
  		this.openElements.popUntilTagNamePopped(TAG_ID.P);
  	}
  	/** @protected */
  	_resetInsertionMode() {
  		for (let i = this.openElements.stackTop; i >= 0; i--) switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
  			case TAG_ID.TR:
  				this.insertionMode = InsertionMode.IN_ROW;
  				return;
  			case TAG_ID.TBODY:
  			case TAG_ID.THEAD:
  			case TAG_ID.TFOOT:
  				this.insertionMode = InsertionMode.IN_TABLE_BODY;
  				return;
  			case TAG_ID.CAPTION:
  				this.insertionMode = InsertionMode.IN_CAPTION;
  				return;
  			case TAG_ID.COLGROUP:
  				this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  				return;
  			case TAG_ID.TABLE:
  				this.insertionMode = InsertionMode.IN_TABLE;
  				return;
  			case TAG_ID.BODY:
  				this.insertionMode = InsertionMode.IN_BODY;
  				return;
  			case TAG_ID.FRAMESET:
  				this.insertionMode = InsertionMode.IN_FRAMESET;
  				return;
  			case TAG_ID.SELECT:
  				this._resetInsertionModeForSelect(i);
  				return;
  			case TAG_ID.TEMPLATE:
  				this.insertionMode = this.tmplInsertionModeStack[0];
  				return;
  			case TAG_ID.HTML:
  				this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
  				return;
  			case TAG_ID.TD:
  			case TAG_ID.TH:
  				if (i > 0) {
  					this.insertionMode = InsertionMode.IN_CELL;
  					return;
  				}
  				break;
  			case TAG_ID.HEAD: if (i > 0) {
  				this.insertionMode = InsertionMode.IN_HEAD;
  				return;
  			}
  		}
  		this.insertionMode = InsertionMode.IN_BODY;
  	}
  	/** @protected */
  	_resetInsertionModeForSelect(selectIdx) {
  		if (selectIdx > 0) for (let i = selectIdx - 1; i > 0; i--) {
  			const tn = this.openElements.tagIDs[i];
  			if (tn === TAG_ID.TEMPLATE) break;
  			else if (tn === TAG_ID.TABLE) {
  				this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
  				return;
  			}
  		}
  		this.insertionMode = InsertionMode.IN_SELECT;
  	}
  	/** @protected */
  	_isElementCausesFosterParenting(tn) {
  		return TABLE_STRUCTURE_TAGS.has(tn);
  	}
  	/** @protected */
  	_shouldFosterParentOnInsertion() {
  		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  	}
  	/** @protected */
  	_findFosterParentingLocation() {
  		for (let i = this.openElements.stackTop; i >= 0; i--) {
  			const openElement = this.openElements.items[i];
  			switch (this.openElements.tagIDs[i]) {
  				case TAG_ID.TEMPLATE:
  					if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) return {
  						parent: this.treeAdapter.getTemplateContent(openElement),
  						beforeElement: null
  					};
  					break;
  				case TAG_ID.TABLE: {
  					const parent = this.treeAdapter.getParentNode(openElement);
  					if (parent) return {
  						parent,
  						beforeElement: openElement
  					};
  					return {
  						parent: this.openElements.items[i - 1],
  						beforeElement: null
  					};
  				}
  			}
  		}
  		return {
  			parent: this.openElements.items[0],
  			beforeElement: null
  		};
  	}
  	/** @protected */
  	_fosterParentElement(element) {
  		const location = this._findFosterParentingLocation();
  		if (location.beforeElement) this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
  		else this.treeAdapter.appendChild(location.parent, element);
  	}
  	/** @protected */
  	_isSpecialElement(element, id) {
  		return SPECIAL_ELEMENTS[this.treeAdapter.getNamespaceURI(element)].has(id);
  	}
  	/** @internal */
  	onCharacter(token) {
  		this.skipNextNewLine = false;
  		if (this.tokenizer.inForeignNode) {
  			characterInForeignContent(this, token);
  			return;
  		}
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  				tokenInInitialMode(this, token);
  				break;
  			case InsertionMode.BEFORE_HTML:
  				tokenBeforeHtml(this, token);
  				break;
  			case InsertionMode.BEFORE_HEAD:
  				tokenBeforeHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD:
  				tokenInHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  				tokenInHeadNoScript(this, token);
  				break;
  			case InsertionMode.AFTER_HEAD:
  				tokenAfterHead(this, token);
  				break;
  			case InsertionMode.IN_BODY:
  			case InsertionMode.IN_CAPTION:
  			case InsertionMode.IN_CELL:
  			case InsertionMode.IN_TEMPLATE:
  				characterInBody(this, token);
  				break;
  			case InsertionMode.TEXT:
  			case InsertionMode.IN_SELECT:
  			case InsertionMode.IN_SELECT_IN_TABLE:
  				this._insertCharacters(token);
  				break;
  			case InsertionMode.IN_TABLE:
  			case InsertionMode.IN_TABLE_BODY:
  			case InsertionMode.IN_ROW:
  				characterInTable(this, token);
  				break;
  			case InsertionMode.IN_TABLE_TEXT:
  				characterInTableText(this, token);
  				break;
  			case InsertionMode.IN_COLUMN_GROUP:
  				tokenInColumnGroup(this, token);
  				break;
  			case InsertionMode.AFTER_BODY:
  				tokenAfterBody(this, token);
  				break;
  			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
  		}
  	}
  	/** @internal */
  	onNullCharacter(token) {
  		this.skipNextNewLine = false;
  		if (this.tokenizer.inForeignNode) {
  			nullCharacterInForeignContent(this, token);
  			return;
  		}
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  				tokenInInitialMode(this, token);
  				break;
  			case InsertionMode.BEFORE_HTML:
  				tokenBeforeHtml(this, token);
  				break;
  			case InsertionMode.BEFORE_HEAD:
  				tokenBeforeHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD:
  				tokenInHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  				tokenInHeadNoScript(this, token);
  				break;
  			case InsertionMode.AFTER_HEAD:
  				tokenAfterHead(this, token);
  				break;
  			case InsertionMode.TEXT:
  				this._insertCharacters(token);
  				break;
  			case InsertionMode.IN_TABLE:
  			case InsertionMode.IN_TABLE_BODY:
  			case InsertionMode.IN_ROW:
  				characterInTable(this, token);
  				break;
  			case InsertionMode.IN_COLUMN_GROUP:
  				tokenInColumnGroup(this, token);
  				break;
  			case InsertionMode.AFTER_BODY:
  				tokenAfterBody(this, token);
  				break;
  			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
  		}
  	}
  	/** @internal */
  	onComment(token) {
  		this.skipNextNewLine = false;
  		if (this.currentNotInHTML) {
  			appendComment(this, token);
  			return;
  		}
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  			case InsertionMode.BEFORE_HTML:
  			case InsertionMode.BEFORE_HEAD:
  			case InsertionMode.IN_HEAD:
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  			case InsertionMode.AFTER_HEAD:
  			case InsertionMode.IN_BODY:
  			case InsertionMode.IN_TABLE:
  			case InsertionMode.IN_CAPTION:
  			case InsertionMode.IN_COLUMN_GROUP:
  			case InsertionMode.IN_TABLE_BODY:
  			case InsertionMode.IN_ROW:
  			case InsertionMode.IN_CELL:
  			case InsertionMode.IN_SELECT:
  			case InsertionMode.IN_SELECT_IN_TABLE:
  			case InsertionMode.IN_TEMPLATE:
  			case InsertionMode.IN_FRAMESET:
  			case InsertionMode.AFTER_FRAMESET:
  				appendComment(this, token);
  				break;
  			case InsertionMode.IN_TABLE_TEXT:
  				tokenInTableText(this, token);
  				break;
  			case InsertionMode.AFTER_BODY:
  				appendCommentToRootHtmlElement(this, token);
  				break;
  			case InsertionMode.AFTER_AFTER_BODY:
  			case InsertionMode.AFTER_AFTER_FRAMESET: appendCommentToDocument(this, token);
  		}
  	}
  	/** @internal */
  	onDoctype(token) {
  		this.skipNextNewLine = false;
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  				doctypeInInitialMode(this, token);
  				break;
  			case InsertionMode.BEFORE_HEAD:
  			case InsertionMode.IN_HEAD:
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  			case InsertionMode.AFTER_HEAD:
  				this._err(token, ERR.misplacedDoctype);
  				break;
  			case InsertionMode.IN_TABLE_TEXT: tokenInTableText(this, token);
  		}
  	}
  	/** @internal */
  	onStartTag(token) {
  		this.skipNextNewLine = false;
  		this.currentToken = token;
  		this._processStartTag(token);
  		if (token.selfClosing && !token.ackSelfClosing) this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
  	}
  	/**
  	* Processes a given start tag.
  	*
  	* `onStartTag` checks if a self-closing tag was recognized. When a token
  	* is moved inbetween multiple insertion modes, this check for self-closing
  	* could lead to false positives. To avoid this, `_processStartTag` is used
  	* for nested calls.
  	*
  	* @param token The token to process.
  	* @protected
  	*/
  	_processStartTag(token) {
  		if (this.shouldProcessStartTagTokenInForeignContent(token)) startTagInForeignContent(this, token);
  		else this._startTagOutsideForeignContent(token);
  	}
  	/** @protected */
  	_startTagOutsideForeignContent(token) {
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  				tokenInInitialMode(this, token);
  				break;
  			case InsertionMode.BEFORE_HTML:
  				startTagBeforeHtml(this, token);
  				break;
  			case InsertionMode.BEFORE_HEAD:
  				startTagBeforeHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD:
  				startTagInHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  				startTagInHeadNoScript(this, token);
  				break;
  			case InsertionMode.AFTER_HEAD:
  				startTagAfterHead(this, token);
  				break;
  			case InsertionMode.IN_BODY:
  				startTagInBody(this, token);
  				break;
  			case InsertionMode.IN_TABLE:
  				startTagInTable(this, token);
  				break;
  			case InsertionMode.IN_TABLE_TEXT:
  				tokenInTableText(this, token);
  				break;
  			case InsertionMode.IN_CAPTION:
  				startTagInCaption(this, token);
  				break;
  			case InsertionMode.IN_COLUMN_GROUP:
  				startTagInColumnGroup(this, token);
  				break;
  			case InsertionMode.IN_TABLE_BODY:
  				startTagInTableBody(this, token);
  				break;
  			case InsertionMode.IN_ROW:
  				startTagInRow(this, token);
  				break;
  			case InsertionMode.IN_CELL:
  				startTagInCell(this, token);
  				break;
  			case InsertionMode.IN_SELECT:
  				startTagInSelect(this, token);
  				break;
  			case InsertionMode.IN_SELECT_IN_TABLE:
  				startTagInSelectInTable(this, token);
  				break;
  			case InsertionMode.IN_TEMPLATE:
  				startTagInTemplate(this, token);
  				break;
  			case InsertionMode.AFTER_BODY:
  				startTagAfterBody(this, token);
  				break;
  			case InsertionMode.IN_FRAMESET:
  				startTagInFrameset(this, token);
  				break;
  			case InsertionMode.AFTER_FRAMESET:
  				startTagAfterFrameset(this, token);
  				break;
  			case InsertionMode.AFTER_AFTER_BODY:
  				startTagAfterAfterBody(this, token);
  				break;
  			case InsertionMode.AFTER_AFTER_FRAMESET: startTagAfterAfterFrameset(this, token);
  		}
  	}
  	/** @internal */
  	onEndTag(token) {
  		this.skipNextNewLine = false;
  		this.currentToken = token;
  		if (this.currentNotInHTML) endTagInForeignContent(this, token);
  		else this._endTagOutsideForeignContent(token);
  	}
  	/** @protected */
  	_endTagOutsideForeignContent(token) {
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  				tokenInInitialMode(this, token);
  				break;
  			case InsertionMode.BEFORE_HTML:
  				endTagBeforeHtml(this, token);
  				break;
  			case InsertionMode.BEFORE_HEAD:
  				endTagBeforeHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD:
  				endTagInHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  				endTagInHeadNoScript(this, token);
  				break;
  			case InsertionMode.AFTER_HEAD:
  				endTagAfterHead(this, token);
  				break;
  			case InsertionMode.IN_BODY:
  				endTagInBody(this, token);
  				break;
  			case InsertionMode.TEXT:
  				endTagInText(this, token);
  				break;
  			case InsertionMode.IN_TABLE:
  				endTagInTable(this, token);
  				break;
  			case InsertionMode.IN_TABLE_TEXT:
  				tokenInTableText(this, token);
  				break;
  			case InsertionMode.IN_CAPTION:
  				endTagInCaption(this, token);
  				break;
  			case InsertionMode.IN_COLUMN_GROUP:
  				endTagInColumnGroup(this, token);
  				break;
  			case InsertionMode.IN_TABLE_BODY:
  				endTagInTableBody(this, token);
  				break;
  			case InsertionMode.IN_ROW:
  				endTagInRow(this, token);
  				break;
  			case InsertionMode.IN_CELL:
  				endTagInCell(this, token);
  				break;
  			case InsertionMode.IN_SELECT:
  				endTagInSelect(this, token);
  				break;
  			case InsertionMode.IN_SELECT_IN_TABLE:
  				endTagInSelectInTable(this, token);
  				break;
  			case InsertionMode.IN_TEMPLATE:
  				endTagInTemplate(this, token);
  				break;
  			case InsertionMode.AFTER_BODY:
  				endTagAfterBody(this, token);
  				break;
  			case InsertionMode.IN_FRAMESET:
  				endTagInFrameset(this, token);
  				break;
  			case InsertionMode.AFTER_FRAMESET:
  				endTagAfterFrameset(this, token);
  				break;
  			case InsertionMode.AFTER_AFTER_BODY: tokenAfterAfterBody(this, token);
  		}
  	}
  	/** @internal */
  	onEof(token) {
  		switch (this.insertionMode) {
  			case InsertionMode.INITIAL:
  				tokenInInitialMode(this, token);
  				break;
  			case InsertionMode.BEFORE_HTML:
  				tokenBeforeHtml(this, token);
  				break;
  			case InsertionMode.BEFORE_HEAD:
  				tokenBeforeHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD:
  				tokenInHead(this, token);
  				break;
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  				tokenInHeadNoScript(this, token);
  				break;
  			case InsertionMode.AFTER_HEAD:
  				tokenAfterHead(this, token);
  				break;
  			case InsertionMode.IN_BODY:
  			case InsertionMode.IN_TABLE:
  			case InsertionMode.IN_CAPTION:
  			case InsertionMode.IN_COLUMN_GROUP:
  			case InsertionMode.IN_TABLE_BODY:
  			case InsertionMode.IN_ROW:
  			case InsertionMode.IN_CELL:
  			case InsertionMode.IN_SELECT:
  			case InsertionMode.IN_SELECT_IN_TABLE:
  				eofInBody(this, token);
  				break;
  			case InsertionMode.TEXT:
  				eofInText(this, token);
  				break;
  			case InsertionMode.IN_TABLE_TEXT:
  				tokenInTableText(this, token);
  				break;
  			case InsertionMode.IN_TEMPLATE:
  				eofInTemplate(this, token);
  				break;
  			case InsertionMode.AFTER_BODY:
  			case InsertionMode.IN_FRAMESET:
  			case InsertionMode.AFTER_FRAMESET:
  			case InsertionMode.AFTER_AFTER_BODY:
  			case InsertionMode.AFTER_AFTER_FRAMESET: stopParsing(this, token);
  		}
  	}
  	/** @internal */
  	onWhitespaceCharacter(token) {
  		if (this.skipNextNewLine) {
  			this.skipNextNewLine = false;
  			if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
  				if (token.chars.length === 1) return;
  				token.chars = token.chars.substr(1);
  			}
  		}
  		if (this.tokenizer.inForeignNode) {
  			this._insertCharacters(token);
  			return;
  		}
  		switch (this.insertionMode) {
  			case InsertionMode.IN_HEAD:
  			case InsertionMode.IN_HEAD_NO_SCRIPT:
  			case InsertionMode.AFTER_HEAD:
  			case InsertionMode.TEXT:
  			case InsertionMode.IN_COLUMN_GROUP:
  			case InsertionMode.IN_SELECT:
  			case InsertionMode.IN_SELECT_IN_TABLE:
  			case InsertionMode.IN_FRAMESET:
  			case InsertionMode.AFTER_FRAMESET:
  				this._insertCharacters(token);
  				break;
  			case InsertionMode.IN_BODY:
  			case InsertionMode.IN_CAPTION:
  			case InsertionMode.IN_CELL:
  			case InsertionMode.IN_TEMPLATE:
  			case InsertionMode.AFTER_BODY:
  			case InsertionMode.AFTER_AFTER_BODY:
  			case InsertionMode.AFTER_AFTER_FRAMESET:
  				whitespaceCharacterInBody(this, token);
  				break;
  			case InsertionMode.IN_TABLE:
  			case InsertionMode.IN_TABLE_BODY:
  			case InsertionMode.IN_ROW:
  				characterInTable(this, token);
  				break;
  			case InsertionMode.IN_TABLE_TEXT: whitespaceCharacterInTableText(this, token);
  		}
  	}
  };
  function aaObtainFormattingElementEntry(p, token) {
  	let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
  	if (formattingElementEntry) {
  		if (!p.openElements.contains(formattingElementEntry.element)) {
  			p.activeFormattingElements.removeEntry(formattingElementEntry);
  			formattingElementEntry = null;
  		} else if (!p.openElements.hasInScope(token.tagID)) formattingElementEntry = null;
  	} else genericEndTagInBody(p, token);
  	return formattingElementEntry;
  }
  function aaObtainFurthestBlock(p, formattingElementEntry) {
  	let furthestBlock = null;
  	let idx = p.openElements.stackTop;
  	for (; idx >= 0; idx--) {
  		const element = p.openElements.items[idx];
  		if (element === formattingElementEntry.element) break;
  		if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) furthestBlock = element;
  	}
  	if (!furthestBlock) {
  		p.openElements.shortenToLength(Math.max(idx, 0));
  		p.activeFormattingElements.removeEntry(formattingElementEntry);
  	}
  	return furthestBlock;
  }
  function aaInnerLoop(p, furthestBlock, formattingElement) {
  	let lastElement = furthestBlock;
  	let nextElement = p.openElements.getCommonAncestor(furthestBlock);
  	for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
  		nextElement = p.openElements.getCommonAncestor(element);
  		const elementEntry = p.activeFormattingElements.getElementEntry(element);
  		const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
  		if (!elementEntry || counterOverflow) {
  			if (counterOverflow) p.activeFormattingElements.removeEntry(elementEntry);
  			p.openElements.remove(element);
  		} else {
  			element = aaRecreateElementFromEntry(p, elementEntry);
  			if (lastElement === furthestBlock) p.activeFormattingElements.bookmark = elementEntry;
  			p.treeAdapter.detachNode(lastElement);
  			p.treeAdapter.appendChild(element, lastElement);
  			lastElement = element;
  		}
  	}
  	return lastElement;
  }
  function aaRecreateElementFromEntry(p, elementEntry) {
  	const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
  	const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  	p.openElements.replace(elementEntry.element, newElement);
  	elementEntry.element = newElement;
  	return newElement;
  }
  function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
  	const tid = getTagID(p.treeAdapter.getTagName(commonAncestor));
  	if (p._isElementCausesFosterParenting(tid)) p._fosterParentElement(lastElement);
  	else {
  		const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
  		if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
  		p.treeAdapter.appendChild(commonAncestor, lastElement);
  	}
  }
  function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
  	const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  	const { token } = formattingElementEntry;
  	const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
  	p._adoptNodes(furthestBlock, newElement);
  	p.treeAdapter.appendChild(furthestBlock, newElement);
  	p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
  	p.activeFormattingElements.removeEntry(formattingElementEntry);
  	p.openElements.remove(formattingElementEntry.element);
  	p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
  }
  function callAdoptionAgency(p, token) {
  	for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
  		const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
  		if (!formattingElementEntry) break;
  		const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
  		if (!furthestBlock) break;
  		p.activeFormattingElements.bookmark = formattingElementEntry;
  		const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
  		const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
  		p.treeAdapter.detachNode(lastElement);
  		if (commonAncestor) aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
  		aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
  	}
  }
  function appendComment(p, token) {
  	p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
  }
  function appendCommentToRootHtmlElement(p, token) {
  	p._appendCommentNode(token, p.openElements.items[0]);
  }
  function appendCommentToDocument(p, token) {
  	p._appendCommentNode(token, p.document);
  }
  function stopParsing(p, token) {
  	p.stopped = true;
  	if (token.location) {
  		const target = p.fragmentContext ? 0 : 2;
  		for (let i = p.openElements.stackTop; i >= target; i--) p._setEndLocation(p.openElements.items[i], token);
  		if (!p.fragmentContext && p.openElements.stackTop >= 0) {
  			const htmlElement = p.openElements.items[0];
  			const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
  			if (htmlLocation && !htmlLocation.endTag) {
  				p._setEndLocation(htmlElement, token);
  				if (p.openElements.stackTop >= 1) {
  					const bodyElement = p.openElements.items[1];
  					const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
  					if (bodyLocation && !bodyLocation.endTag) p._setEndLocation(bodyElement, token);
  				}
  			}
  		}
  	}
  }
  function doctypeInInitialMode(p, token) {
  	p._setDocumentType(token);
  	const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
  	if (!isConforming(token)) p._err(token, ERR.nonConformingDoctype);
  	p.treeAdapter.setDocumentMode(p.document, mode);
  	p.insertionMode = InsertionMode.BEFORE_HTML;
  }
  function tokenInInitialMode(p, token) {
  	p._err(token, ERR.missingDoctype, true);
  	p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
  	p.insertionMode = InsertionMode.BEFORE_HTML;
  	p._processToken(token);
  }
  function startTagBeforeHtml(p, token) {
  	if (token.tagID === TAG_ID.HTML) {
  		p._insertElement(token, NS.HTML);
  		p.insertionMode = InsertionMode.BEFORE_HEAD;
  	} else tokenBeforeHtml(p, token);
  }
  function endTagBeforeHtml(p, token) {
  	const tn = token.tagID;
  	if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) tokenBeforeHtml(p, token);
  }
  function tokenBeforeHtml(p, token) {
  	p._insertFakeRootElement();
  	p.insertionMode = InsertionMode.BEFORE_HEAD;
  	p._processToken(token);
  }
  function startTagBeforeHead(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.HEAD:
  			p._insertElement(token, NS.HTML);
  			p.headElement = p.openElements.current;
  			p.insertionMode = InsertionMode.IN_HEAD;
  			break;
  		default: tokenBeforeHead(p, token);
  	}
  }
  function endTagBeforeHead(p, token) {
  	const tn = token.tagID;
  	if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) tokenBeforeHead(p, token);
  	else p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
  function tokenBeforeHead(p, token) {
  	p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
  	p.headElement = p.openElements.current;
  	p.insertionMode = InsertionMode.IN_HEAD;
  	p._processToken(token);
  }
  function startTagInHead(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.BASE:
  		case TAG_ID.BASEFONT:
  		case TAG_ID.BGSOUND:
  		case TAG_ID.LINK:
  		case TAG_ID.META:
  			p._appendElement(token, NS.HTML);
  			token.ackSelfClosing = true;
  			break;
  		case TAG_ID.TITLE:
  			p._switchToTextParsing(token, TokenizerMode.RCDATA);
  			break;
  		case TAG_ID.NOSCRIPT:
  			if (p.options.scriptingEnabled) p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  			else {
  				p._insertElement(token, NS.HTML);
  				p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
  			}
  			break;
  		case TAG_ID.NOFRAMES:
  		case TAG_ID.STYLE:
  			p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  			break;
  		case TAG_ID.SCRIPT:
  			p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
  			break;
  		case TAG_ID.TEMPLATE:
  			p._insertTemplate(token);
  			p.activeFormattingElements.insertMarker();
  			p.framesetOk = false;
  			p.insertionMode = InsertionMode.IN_TEMPLATE;
  			p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
  			break;
  		case TAG_ID.HEAD:
  			p._err(token, ERR.misplacedStartTagForHeadElement);
  			break;
  		default: tokenInHead(p, token);
  	}
  }
  function endTagInHead(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HEAD:
  			p.openElements.pop();
  			p.insertionMode = InsertionMode.AFTER_HEAD;
  			break;
  		case TAG_ID.BODY:
  		case TAG_ID.BR:
  		case TAG_ID.HTML:
  			tokenInHead(p, token);
  			break;
  		case TAG_ID.TEMPLATE:
  			templateEndTagInHead(p, token);
  			break;
  		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
  	}
  }
  function templateEndTagInHead(p, token) {
  	if (p.openElements.tmplCount > 0) {
  		p.openElements.generateImpliedEndTagsThoroughly();
  		if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) p._err(token, ERR.closingOfElementWithOpenChildElements);
  		p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
  		p.activeFormattingElements.clearToLastMarker();
  		p.tmplInsertionModeStack.shift();
  		p._resetInsertionMode();
  	} else p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
  function tokenInHead(p, token) {
  	p.openElements.pop();
  	p.insertionMode = InsertionMode.AFTER_HEAD;
  	p._processToken(token);
  }
  function startTagInHeadNoScript(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.BASEFONT:
  		case TAG_ID.BGSOUND:
  		case TAG_ID.HEAD:
  		case TAG_ID.LINK:
  		case TAG_ID.META:
  		case TAG_ID.NOFRAMES:
  		case TAG_ID.STYLE:
  			startTagInHead(p, token);
  			break;
  		case TAG_ID.NOSCRIPT:
  			p._err(token, ERR.nestedNoscriptInHead);
  			break;
  		default: tokenInHeadNoScript(p, token);
  	}
  }
  function endTagInHeadNoScript(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.NOSCRIPT:
  			p.openElements.pop();
  			p.insertionMode = InsertionMode.IN_HEAD;
  			break;
  		case TAG_ID.BR:
  			tokenInHeadNoScript(p, token);
  			break;
  		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
  	}
  }
  function tokenInHeadNoScript(p, token) {
  	const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
  	p._err(token, errCode);
  	p.openElements.pop();
  	p.insertionMode = InsertionMode.IN_HEAD;
  	p._processToken(token);
  }
  function startTagAfterHead(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.BODY:
  			p._insertElement(token, NS.HTML);
  			p.framesetOk = false;
  			p.insertionMode = InsertionMode.IN_BODY;
  			break;
  		case TAG_ID.FRAMESET:
  			p._insertElement(token, NS.HTML);
  			p.insertionMode = InsertionMode.IN_FRAMESET;
  			break;
  		case TAG_ID.BASE:
  		case TAG_ID.BASEFONT:
  		case TAG_ID.BGSOUND:
  		case TAG_ID.LINK:
  		case TAG_ID.META:
  		case TAG_ID.NOFRAMES:
  		case TAG_ID.SCRIPT:
  		case TAG_ID.STYLE:
  		case TAG_ID.TEMPLATE:
  		case TAG_ID.TITLE:
  			p._err(token, ERR.abandonedHeadElementChild);
  			p.openElements.push(p.headElement, TAG_ID.HEAD);
  			startTagInHead(p, token);
  			p.openElements.remove(p.headElement);
  			break;
  		case TAG_ID.HEAD:
  			p._err(token, ERR.misplacedStartTagForHeadElement);
  			break;
  		default: tokenAfterHead(p, token);
  	}
  }
  function endTagAfterHead(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.BODY:
  		case TAG_ID.HTML:
  		case TAG_ID.BR:
  			tokenAfterHead(p, token);
  			break;
  		case TAG_ID.TEMPLATE:
  			templateEndTagInHead(p, token);
  			break;
  		default: p._err(token, ERR.endTagWithoutMatchingOpenElement);
  	}
  }
  function tokenAfterHead(p, token) {
  	p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
  	p.insertionMode = InsertionMode.IN_BODY;
  	modeInBody(p, token);
  }
  function modeInBody(p, token) {
  	switch (token.type) {
  		case TokenType.CHARACTER:
  			characterInBody(p, token);
  			break;
  		case TokenType.WHITESPACE_CHARACTER:
  			whitespaceCharacterInBody(p, token);
  			break;
  		case TokenType.COMMENT:
  			appendComment(p, token);
  			break;
  		case TokenType.START_TAG:
  			startTagInBody(p, token);
  			break;
  		case TokenType.END_TAG:
  			endTagInBody(p, token);
  			break;
  		case TokenType.EOF: eofInBody(p, token);
  	}
  }
  function whitespaceCharacterInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._insertCharacters(token);
  }
  function characterInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._insertCharacters(token);
  	p.framesetOk = false;
  }
  function htmlStartTagInBody(p, token) {
  	if (p.openElements.tmplCount === 0) p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
  }
  function bodyStartTagInBody(p, token) {
  	const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  	if (bodyElement && p.openElements.tmplCount === 0) {
  		p.framesetOk = false;
  		p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
  	}
  }
  function framesetStartTagInBody(p, token) {
  	const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  	if (p.framesetOk && bodyElement) {
  		p.treeAdapter.detachNode(bodyElement);
  		p.openElements.popAllUpToHtmlElement();
  		p._insertElement(token, NS.HTML);
  		p.insertionMode = InsertionMode.IN_FRAMESET;
  	}
  }
  function addressStartTagInBody(p, token) {
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._insertElement(token, NS.HTML);
  }
  function numberedHeaderStartTagInBody(p, token) {
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	if (p.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p.openElements.currentTagId)) p.openElements.pop();
  	p._insertElement(token, NS.HTML);
  }
  function preStartTagInBody(p, token) {
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._insertElement(token, NS.HTML);
  	p.skipNextNewLine = true;
  	p.framesetOk = false;
  }
  function formStartTagInBody(p, token) {
  	const inTemplate = p.openElements.tmplCount > 0;
  	if (!p.formElement || inTemplate) {
  		if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  		p._insertElement(token, NS.HTML);
  		if (!inTemplate) p.formElement = p.openElements.current;
  	}
  }
  function listItemStartTagInBody(p, token) {
  	p.framesetOk = false;
  	const tn = token.tagID;
  	for (let i = p.openElements.stackTop; i >= 0; i--) {
  		const elementId = p.openElements.tagIDs[i];
  		if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
  			p.openElements.generateImpliedEndTagsWithExclusion(elementId);
  			p.openElements.popUntilTagNamePopped(elementId);
  			break;
  		}
  		if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) break;
  	}
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._insertElement(token, NS.HTML);
  }
  function plaintextStartTagInBody(p, token) {
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._insertElement(token, NS.HTML);
  	p.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  function buttonStartTagInBody(p, token) {
  	if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
  		p.openElements.generateImpliedEndTags();
  		p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
  	}
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  	p.framesetOk = false;
  }
  function aStartTagInBody(p, token) {
  	const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
  	if (activeElementEntry) {
  		callAdoptionAgency(p, token);
  		p.openElements.remove(activeElementEntry.element);
  		p.activeFormattingElements.removeEntry(activeElementEntry);
  	}
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  	p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function bStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  	p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function nobrStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	if (p.openElements.hasInScope(TAG_ID.NOBR)) {
  		callAdoptionAgency(p, token);
  		p._reconstructActiveFormattingElements();
  	}
  	p._insertElement(token, NS.HTML);
  	p.activeFormattingElements.pushElement(p.openElements.current, token);
  }
  function appletStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  	p.activeFormattingElements.insertMarker();
  	p.framesetOk = false;
  }
  function tableStartTagInBody(p, token) {
  	if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._insertElement(token, NS.HTML);
  	p.framesetOk = false;
  	p.insertionMode = InsertionMode.IN_TABLE;
  }
  function areaStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._appendElement(token, NS.HTML);
  	p.framesetOk = false;
  	token.ackSelfClosing = true;
  }
  function isHiddenInput(token) {
  	const inputType = getTokenAttr(token, ATTRS.TYPE);
  	return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
  }
  function inputStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._appendElement(token, NS.HTML);
  	if (!isHiddenInput(token)) p.framesetOk = false;
  	token.ackSelfClosing = true;
  }
  function paramStartTagInBody(p, token) {
  	p._appendElement(token, NS.HTML);
  	token.ackSelfClosing = true;
  }
  function hrStartTagInBody(p, token) {
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._appendElement(token, NS.HTML);
  	p.framesetOk = false;
  	token.ackSelfClosing = true;
  }
  function imageStartTagInBody(p, token) {
  	token.tagName = TAG_NAMES.IMG;
  	token.tagID = TAG_ID.IMG;
  	areaStartTagInBody(p, token);
  }
  function textareaStartTagInBody(p, token) {
  	p._insertElement(token, NS.HTML);
  	p.skipNextNewLine = true;
  	p.tokenizer.state = TokenizerMode.RCDATA;
  	p.originalInsertionMode = p.insertionMode;
  	p.framesetOk = false;
  	p.insertionMode = InsertionMode.TEXT;
  }
  function xmpStartTagInBody(p, token) {
  	if (p.openElements.hasInButtonScope(TAG_ID.P)) p._closePElement();
  	p._reconstructActiveFormattingElements();
  	p.framesetOk = false;
  	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function iframeStartTagInBody(p, token) {
  	p.framesetOk = false;
  	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function rawTextStartTagInBody(p, token) {
  	p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function selectStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  	p.framesetOk = false;
  	p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
  }
  function optgroupStartTagInBody(p, token) {
  	if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  }
  function rbStartTagInBody(p, token) {
  	if (p.openElements.hasInScope(TAG_ID.RUBY)) p.openElements.generateImpliedEndTags();
  	p._insertElement(token, NS.HTML);
  }
  function rtStartTagInBody(p, token) {
  	if (p.openElements.hasInScope(TAG_ID.RUBY)) p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
  	p._insertElement(token, NS.HTML);
  }
  function mathStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	adjustTokenMathMLAttrs(token);
  	adjustTokenXMLAttrs(token);
  	if (token.selfClosing) p._appendElement(token, NS.MATHML);
  	else p._insertElement(token, NS.MATHML);
  	token.ackSelfClosing = true;
  }
  function svgStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	adjustTokenSVGAttrs(token);
  	adjustTokenXMLAttrs(token);
  	if (token.selfClosing) p._appendElement(token, NS.SVG);
  	else p._insertElement(token, NS.SVG);
  	token.ackSelfClosing = true;
  }
  function genericStartTagInBody(p, token) {
  	p._reconstructActiveFormattingElements();
  	p._insertElement(token, NS.HTML);
  }
  function startTagInBody(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.I:
  		case TAG_ID.S:
  		case TAG_ID.B:
  		case TAG_ID.U:
  		case TAG_ID.EM:
  		case TAG_ID.TT:
  		case TAG_ID.BIG:
  		case TAG_ID.CODE:
  		case TAG_ID.FONT:
  		case TAG_ID.SMALL:
  		case TAG_ID.STRIKE:
  		case TAG_ID.STRONG:
  			bStartTagInBody(p, token);
  			break;
  		case TAG_ID.A:
  			aStartTagInBody(p, token);
  			break;
  		case TAG_ID.H1:
  		case TAG_ID.H2:
  		case TAG_ID.H3:
  		case TAG_ID.H4:
  		case TAG_ID.H5:
  		case TAG_ID.H6:
  			numberedHeaderStartTagInBody(p, token);
  			break;
  		case TAG_ID.P:
  		case TAG_ID.DL:
  		case TAG_ID.OL:
  		case TAG_ID.UL:
  		case TAG_ID.DIV:
  		case TAG_ID.DIR:
  		case TAG_ID.NAV:
  		case TAG_ID.MAIN:
  		case TAG_ID.MENU:
  		case TAG_ID.ASIDE:
  		case TAG_ID.CENTER:
  		case TAG_ID.FIGURE:
  		case TAG_ID.FOOTER:
  		case TAG_ID.HEADER:
  		case TAG_ID.HGROUP:
  		case TAG_ID.DIALOG:
  		case TAG_ID.DETAILS:
  		case TAG_ID.ADDRESS:
  		case TAG_ID.ARTICLE:
  		case TAG_ID.SEARCH:
  		case TAG_ID.SECTION:
  		case TAG_ID.SUMMARY:
  		case TAG_ID.FIELDSET:
  		case TAG_ID.BLOCKQUOTE:
  		case TAG_ID.FIGCAPTION:
  			addressStartTagInBody(p, token);
  			break;
  		case TAG_ID.LI:
  		case TAG_ID.DD:
  		case TAG_ID.DT:
  			listItemStartTagInBody(p, token);
  			break;
  		case TAG_ID.BR:
  		case TAG_ID.IMG:
  		case TAG_ID.WBR:
  		case TAG_ID.AREA:
  		case TAG_ID.EMBED:
  		case TAG_ID.KEYGEN:
  			areaStartTagInBody(p, token);
  			break;
  		case TAG_ID.HR:
  			hrStartTagInBody(p, token);
  			break;
  		case TAG_ID.RB:
  		case TAG_ID.RTC:
  			rbStartTagInBody(p, token);
  			break;
  		case TAG_ID.RT:
  		case TAG_ID.RP:
  			rtStartTagInBody(p, token);
  			break;
  		case TAG_ID.PRE:
  		case TAG_ID.LISTING:
  			preStartTagInBody(p, token);
  			break;
  		case TAG_ID.XMP:
  			xmpStartTagInBody(p, token);
  			break;
  		case TAG_ID.SVG:
  			svgStartTagInBody(p, token);
  			break;
  		case TAG_ID.HTML:
  			htmlStartTagInBody(p, token);
  			break;
  		case TAG_ID.BASE:
  		case TAG_ID.LINK:
  		case TAG_ID.META:
  		case TAG_ID.STYLE:
  		case TAG_ID.TITLE:
  		case TAG_ID.SCRIPT:
  		case TAG_ID.BGSOUND:
  		case TAG_ID.BASEFONT:
  		case TAG_ID.TEMPLATE:
  			startTagInHead(p, token);
  			break;
  		case TAG_ID.BODY:
  			bodyStartTagInBody(p, token);
  			break;
  		case TAG_ID.FORM:
  			formStartTagInBody(p, token);
  			break;
  		case TAG_ID.NOBR:
  			nobrStartTagInBody(p, token);
  			break;
  		case TAG_ID.MATH:
  			mathStartTagInBody(p, token);
  			break;
  		case TAG_ID.TABLE:
  			tableStartTagInBody(p, token);
  			break;
  		case TAG_ID.INPUT:
  			inputStartTagInBody(p, token);
  			break;
  		case TAG_ID.PARAM:
  		case TAG_ID.TRACK:
  		case TAG_ID.SOURCE:
  			paramStartTagInBody(p, token);
  			break;
  		case TAG_ID.IMAGE:
  			imageStartTagInBody(p, token);
  			break;
  		case TAG_ID.BUTTON:
  			buttonStartTagInBody(p, token);
  			break;
  		case TAG_ID.APPLET:
  		case TAG_ID.OBJECT:
  		case TAG_ID.MARQUEE:
  			appletStartTagInBody(p, token);
  			break;
  		case TAG_ID.IFRAME:
  			iframeStartTagInBody(p, token);
  			break;
  		case TAG_ID.SELECT:
  			selectStartTagInBody(p, token);
  			break;
  		case TAG_ID.OPTION:
  		case TAG_ID.OPTGROUP:
  			optgroupStartTagInBody(p, token);
  			break;
  		case TAG_ID.NOEMBED:
  		case TAG_ID.NOFRAMES:
  			rawTextStartTagInBody(p, token);
  			break;
  		case TAG_ID.FRAMESET:
  			framesetStartTagInBody(p, token);
  			break;
  		case TAG_ID.TEXTAREA:
  			textareaStartTagInBody(p, token);
  			break;
  		case TAG_ID.NOSCRIPT:
  			if (p.options.scriptingEnabled) rawTextStartTagInBody(p, token);
  			else genericStartTagInBody(p, token);
  			break;
  		case TAG_ID.PLAINTEXT:
  			plaintextStartTagInBody(p, token);
  			break;
  		case TAG_ID.COL:
  		case TAG_ID.TH:
  		case TAG_ID.TD:
  		case TAG_ID.TR:
  		case TAG_ID.HEAD:
  		case TAG_ID.FRAME:
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  		case TAG_ID.CAPTION:
  		case TAG_ID.COLGROUP: break;
  		default: genericStartTagInBody(p, token);
  	}
  }
  function bodyEndTagInBody(p, token) {
  	if (p.openElements.hasInScope(TAG_ID.BODY)) {
  		p.insertionMode = InsertionMode.AFTER_BODY;
  		if (p.options.sourceCodeLocationInfo) {
  			const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  			if (bodyElement) p._setEndLocation(bodyElement, token);
  		}
  	}
  }
  function htmlEndTagInBody(p, token) {
  	if (p.openElements.hasInScope(TAG_ID.BODY)) {
  		p.insertionMode = InsertionMode.AFTER_BODY;
  		endTagAfterBody(p, token);
  	}
  }
  function addressEndTagInBody(p, token) {
  	const tn = token.tagID;
  	if (p.openElements.hasInScope(tn)) {
  		p.openElements.generateImpliedEndTags();
  		p.openElements.popUntilTagNamePopped(tn);
  	}
  }
  function formEndTagInBody(p) {
  	const inTemplate = p.openElements.tmplCount > 0;
  	const { formElement } = p;
  	if (!inTemplate) p.formElement = null;
  	if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
  		p.openElements.generateImpliedEndTags();
  		if (inTemplate) p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
  		else if (formElement) p.openElements.remove(formElement);
  	}
  }
  function pEndTagInBody(p) {
  	if (!p.openElements.hasInButtonScope(TAG_ID.P)) p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
  	p._closePElement();
  }
  function liEndTagInBody(p) {
  	if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
  		p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
  		p.openElements.popUntilTagNamePopped(TAG_ID.LI);
  	}
  }
  function ddEndTagInBody(p, token) {
  	const tn = token.tagID;
  	if (p.openElements.hasInScope(tn)) {
  		p.openElements.generateImpliedEndTagsWithExclusion(tn);
  		p.openElements.popUntilTagNamePopped(tn);
  	}
  }
  function numberedHeaderEndTagInBody(p) {
  	if (p.openElements.hasNumberedHeaderInScope()) {
  		p.openElements.generateImpliedEndTags();
  		p.openElements.popUntilNumberedHeaderPopped();
  	}
  }
  function appletEndTagInBody(p, token) {
  	const tn = token.tagID;
  	if (p.openElements.hasInScope(tn)) {
  		p.openElements.generateImpliedEndTags();
  		p.openElements.popUntilTagNamePopped(tn);
  		p.activeFormattingElements.clearToLastMarker();
  	}
  }
  function brEndTagInBody(p) {
  	p._reconstructActiveFormattingElements();
  	p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
  	p.openElements.pop();
  	p.framesetOk = false;
  }
  function genericEndTagInBody(p, token) {
  	const tn = token.tagName;
  	const tid = token.tagID;
  	for (let i = p.openElements.stackTop; i > 0; i--) {
  		const element = p.openElements.items[i];
  		const elementId = p.openElements.tagIDs[i];
  		if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
  			p.openElements.generateImpliedEndTagsWithExclusion(tid);
  			if (p.openElements.stackTop >= i) p.openElements.shortenToLength(i);
  			break;
  		}
  		if (p._isSpecialElement(element, elementId)) break;
  	}
  }
  function endTagInBody(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.A:
  		case TAG_ID.B:
  		case TAG_ID.I:
  		case TAG_ID.S:
  		case TAG_ID.U:
  		case TAG_ID.EM:
  		case TAG_ID.TT:
  		case TAG_ID.BIG:
  		case TAG_ID.CODE:
  		case TAG_ID.FONT:
  		case TAG_ID.NOBR:
  		case TAG_ID.SMALL:
  		case TAG_ID.STRIKE:
  		case TAG_ID.STRONG:
  			callAdoptionAgency(p, token);
  			break;
  		case TAG_ID.P:
  			pEndTagInBody(p);
  			break;
  		case TAG_ID.DL:
  		case TAG_ID.UL:
  		case TAG_ID.OL:
  		case TAG_ID.DIR:
  		case TAG_ID.DIV:
  		case TAG_ID.NAV:
  		case TAG_ID.PRE:
  		case TAG_ID.MAIN:
  		case TAG_ID.MENU:
  		case TAG_ID.ASIDE:
  		case TAG_ID.BUTTON:
  		case TAG_ID.CENTER:
  		case TAG_ID.FIGURE:
  		case TAG_ID.FOOTER:
  		case TAG_ID.HEADER:
  		case TAG_ID.HGROUP:
  		case TAG_ID.DIALOG:
  		case TAG_ID.ADDRESS:
  		case TAG_ID.ARTICLE:
  		case TAG_ID.DETAILS:
  		case TAG_ID.SEARCH:
  		case TAG_ID.SECTION:
  		case TAG_ID.SUMMARY:
  		case TAG_ID.LISTING:
  		case TAG_ID.FIELDSET:
  		case TAG_ID.BLOCKQUOTE:
  		case TAG_ID.FIGCAPTION:
  			addressEndTagInBody(p, token);
  			break;
  		case TAG_ID.LI:
  			liEndTagInBody(p);
  			break;
  		case TAG_ID.DD:
  		case TAG_ID.DT:
  			ddEndTagInBody(p, token);
  			break;
  		case TAG_ID.H1:
  		case TAG_ID.H2:
  		case TAG_ID.H3:
  		case TAG_ID.H4:
  		case TAG_ID.H5:
  		case TAG_ID.H6:
  			numberedHeaderEndTagInBody(p);
  			break;
  		case TAG_ID.BR:
  			brEndTagInBody(p);
  			break;
  		case TAG_ID.BODY:
  			bodyEndTagInBody(p, token);
  			break;
  		case TAG_ID.HTML:
  			htmlEndTagInBody(p, token);
  			break;
  		case TAG_ID.FORM:
  			formEndTagInBody(p);
  			break;
  		case TAG_ID.APPLET:
  		case TAG_ID.OBJECT:
  		case TAG_ID.MARQUEE:
  			appletEndTagInBody(p, token);
  			break;
  		case TAG_ID.TEMPLATE:
  			templateEndTagInHead(p, token);
  			break;
  		default: genericEndTagInBody(p, token);
  	}
  }
  function eofInBody(p, token) {
  	if (p.tmplInsertionModeStack.length > 0) eofInTemplate(p, token);
  	else stopParsing(p, token);
  }
  function endTagInText(p, token) {
  	var _a;
  	if (token.tagID === TAG_ID.SCRIPT) (_a = p.scriptHandler) === null || _a === void 0 || _a.call(p, p.openElements.current);
  	p.openElements.pop();
  	p.insertionMode = p.originalInsertionMode;
  }
  function eofInText(p, token) {
  	p._err(token, ERR.eofInElementThatCanContainOnlyText);
  	p.openElements.pop();
  	p.insertionMode = p.originalInsertionMode;
  	p.onEof(token);
  }
  function characterInTable(p, token) {
  	if (p.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
  		p.pendingCharacterTokens.length = 0;
  		p.hasNonWhitespacePendingCharacterToken = false;
  		p.originalInsertionMode = p.insertionMode;
  		p.insertionMode = InsertionMode.IN_TABLE_TEXT;
  		switch (token.type) {
  			case TokenType.CHARACTER:
  				characterInTableText(p, token);
  				break;
  			case TokenType.WHITESPACE_CHARACTER: whitespaceCharacterInTableText(p, token);
  		}
  	} else tokenInTable(p, token);
  }
  function captionStartTagInTable(p, token) {
  	p.openElements.clearBackToTableContext();
  	p.activeFormattingElements.insertMarker();
  	p._insertElement(token, NS.HTML);
  	p.insertionMode = InsertionMode.IN_CAPTION;
  }
  function colgroupStartTagInTable(p, token) {
  	p.openElements.clearBackToTableContext();
  	p._insertElement(token, NS.HTML);
  	p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  }
  function colStartTagInTable(p, token) {
  	p.openElements.clearBackToTableContext();
  	p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
  	p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  	startTagInColumnGroup(p, token);
  }
  function tbodyStartTagInTable(p, token) {
  	p.openElements.clearBackToTableContext();
  	p._insertElement(token, NS.HTML);
  	p.insertionMode = InsertionMode.IN_TABLE_BODY;
  }
  function tdStartTagInTable(p, token) {
  	p.openElements.clearBackToTableContext();
  	p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
  	p.insertionMode = InsertionMode.IN_TABLE_BODY;
  	startTagInTableBody(p, token);
  }
  function tableStartTagInTable(p, token) {
  	if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
  		p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
  		p._resetInsertionMode();
  		p._processStartTag(token);
  	}
  }
  function inputStartTagInTable(p, token) {
  	if (isHiddenInput(token)) p._appendElement(token, NS.HTML);
  	else tokenInTable(p, token);
  	token.ackSelfClosing = true;
  }
  function formStartTagInTable(p, token) {
  	if (!p.formElement && p.openElements.tmplCount === 0) {
  		p._insertElement(token, NS.HTML);
  		p.formElement = p.openElements.current;
  		p.openElements.pop();
  	}
  }
  function startTagInTable(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.TD:
  		case TAG_ID.TH:
  		case TAG_ID.TR:
  			tdStartTagInTable(p, token);
  			break;
  		case TAG_ID.STYLE:
  		case TAG_ID.SCRIPT:
  		case TAG_ID.TEMPLATE:
  			startTagInHead(p, token);
  			break;
  		case TAG_ID.COL:
  			colStartTagInTable(p, token);
  			break;
  		case TAG_ID.FORM:
  			formStartTagInTable(p, token);
  			break;
  		case TAG_ID.TABLE:
  			tableStartTagInTable(p, token);
  			break;
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  			tbodyStartTagInTable(p, token);
  			break;
  		case TAG_ID.INPUT:
  			inputStartTagInTable(p, token);
  			break;
  		case TAG_ID.CAPTION:
  			captionStartTagInTable(p, token);
  			break;
  		case TAG_ID.COLGROUP:
  			colgroupStartTagInTable(p, token);
  			break;
  		default: tokenInTable(p, token);
  	}
  }
  function endTagInTable(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.TABLE:
  			if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
  				p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
  				p._resetInsertionMode();
  			}
  			break;
  		case TAG_ID.TEMPLATE:
  			templateEndTagInHead(p, token);
  			break;
  		case TAG_ID.BODY:
  		case TAG_ID.CAPTION:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.HTML:
  		case TAG_ID.TBODY:
  		case TAG_ID.TD:
  		case TAG_ID.TFOOT:
  		case TAG_ID.TH:
  		case TAG_ID.THEAD:
  		case TAG_ID.TR: break;
  		default: tokenInTable(p, token);
  	}
  }
  function tokenInTable(p, token) {
  	const savedFosterParentingState = p.fosterParentingEnabled;
  	p.fosterParentingEnabled = true;
  	modeInBody(p, token);
  	p.fosterParentingEnabled = savedFosterParentingState;
  }
  function whitespaceCharacterInTableText(p, token) {
  	p.pendingCharacterTokens.push(token);
  }
  function characterInTableText(p, token) {
  	p.pendingCharacterTokens.push(token);
  	p.hasNonWhitespacePendingCharacterToken = true;
  }
  function tokenInTableText(p, token) {
  	let i = 0;
  	if (p.hasNonWhitespacePendingCharacterToken) for (; i < p.pendingCharacterTokens.length; i++) tokenInTable(p, p.pendingCharacterTokens[i]);
  	else for (; i < p.pendingCharacterTokens.length; i++) p._insertCharacters(p.pendingCharacterTokens[i]);
  	p.insertionMode = p.originalInsertionMode;
  	p._processToken(token);
  }
  var TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([
  	TAG_ID.CAPTION,
  	TAG_ID.COL,
  	TAG_ID.COLGROUP,
  	TAG_ID.TBODY,
  	TAG_ID.TD,
  	TAG_ID.TFOOT,
  	TAG_ID.TH,
  	TAG_ID.THEAD,
  	TAG_ID.TR
  ]);
  function startTagInCaption(p, token) {
  	const tn = token.tagID;
  	if (TABLE_VOID_ELEMENTS.has(tn)) {
  		if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
  			p.openElements.generateImpliedEndTags();
  			p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
  			p.activeFormattingElements.clearToLastMarker();
  			p.insertionMode = InsertionMode.IN_TABLE;
  			startTagInTable(p, token);
  		}
  	} else startTagInBody(p, token);
  }
  function endTagInCaption(p, token) {
  	const tn = token.tagID;
  	switch (tn) {
  		case TAG_ID.CAPTION:
  		case TAG_ID.TABLE:
  			if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
  				p.openElements.generateImpliedEndTags();
  				p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
  				p.activeFormattingElements.clearToLastMarker();
  				p.insertionMode = InsertionMode.IN_TABLE;
  				if (tn === TAG_ID.TABLE) endTagInTable(p, token);
  			}
  			break;
  		case TAG_ID.BODY:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.HTML:
  		case TAG_ID.TBODY:
  		case TAG_ID.TD:
  		case TAG_ID.TFOOT:
  		case TAG_ID.TH:
  		case TAG_ID.THEAD:
  		case TAG_ID.TR: break;
  		default: endTagInBody(p, token);
  	}
  }
  function startTagInColumnGroup(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.COL:
  			p._appendElement(token, NS.HTML);
  			token.ackSelfClosing = true;
  			break;
  		case TAG_ID.TEMPLATE:
  			startTagInHead(p, token);
  			break;
  		default: tokenInColumnGroup(p, token);
  	}
  }
  function endTagInColumnGroup(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.COLGROUP:
  			if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE;
  			}
  			break;
  		case TAG_ID.TEMPLATE:
  			templateEndTagInHead(p, token);
  			break;
  		case TAG_ID.COL: break;
  		default: tokenInColumnGroup(p, token);
  	}
  }
  function tokenInColumnGroup(p, token) {
  	if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
  		p.openElements.pop();
  		p.insertionMode = InsertionMode.IN_TABLE;
  		p._processToken(token);
  	}
  }
  function startTagInTableBody(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.TR:
  			p.openElements.clearBackToTableBodyContext();
  			p._insertElement(token, NS.HTML);
  			p.insertionMode = InsertionMode.IN_ROW;
  			break;
  		case TAG_ID.TH:
  		case TAG_ID.TD:
  			p.openElements.clearBackToTableBodyContext();
  			p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
  			p.insertionMode = InsertionMode.IN_ROW;
  			startTagInRow(p, token);
  			break;
  		case TAG_ID.CAPTION:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  			if (p.openElements.hasTableBodyContextInTableScope()) {
  				p.openElements.clearBackToTableBodyContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE;
  				startTagInTable(p, token);
  			}
  			break;
  		default: startTagInTable(p, token);
  	}
  }
  function endTagInTableBody(p, token) {
  	const tn = token.tagID;
  	switch (token.tagID) {
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  			if (p.openElements.hasInTableScope(tn)) {
  				p.openElements.clearBackToTableBodyContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE;
  			}
  			break;
  		case TAG_ID.TABLE:
  			if (p.openElements.hasTableBodyContextInTableScope()) {
  				p.openElements.clearBackToTableBodyContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE;
  				endTagInTable(p, token);
  			}
  			break;
  		case TAG_ID.BODY:
  		case TAG_ID.CAPTION:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.HTML:
  		case TAG_ID.TD:
  		case TAG_ID.TH:
  		case TAG_ID.TR: break;
  		default: endTagInTable(p, token);
  	}
  }
  function startTagInRow(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.TH:
  		case TAG_ID.TD:
  			p.openElements.clearBackToTableRowContext();
  			p._insertElement(token, NS.HTML);
  			p.insertionMode = InsertionMode.IN_CELL;
  			p.activeFormattingElements.insertMarker();
  			break;
  		case TAG_ID.CAPTION:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  		case TAG_ID.TR:
  			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
  				p.openElements.clearBackToTableRowContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE_BODY;
  				startTagInTableBody(p, token);
  			}
  			break;
  		default: startTagInTable(p, token);
  	}
  }
  function endTagInRow(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.TR:
  			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
  				p.openElements.clearBackToTableRowContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE_BODY;
  			}
  			break;
  		case TAG_ID.TABLE:
  			if (p.openElements.hasInTableScope(TAG_ID.TR)) {
  				p.openElements.clearBackToTableRowContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE_BODY;
  				endTagInTableBody(p, token);
  			}
  			break;
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  			if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
  				p.openElements.clearBackToTableRowContext();
  				p.openElements.pop();
  				p.insertionMode = InsertionMode.IN_TABLE_BODY;
  				endTagInTableBody(p, token);
  			}
  			break;
  		case TAG_ID.BODY:
  		case TAG_ID.CAPTION:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.HTML:
  		case TAG_ID.TD:
  		case TAG_ID.TH: break;
  		default: endTagInTable(p, token);
  	}
  }
  function startTagInCell(p, token) {
  	const tn = token.tagID;
  	if (TABLE_VOID_ELEMENTS.has(tn)) {
  		if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
  			p._closeTableCell();
  			startTagInRow(p, token);
  		}
  	} else startTagInBody(p, token);
  }
  function endTagInCell(p, token) {
  	const tn = token.tagID;
  	switch (tn) {
  		case TAG_ID.TD:
  		case TAG_ID.TH:
  			if (p.openElements.hasInTableScope(tn)) {
  				p.openElements.generateImpliedEndTags();
  				p.openElements.popUntilTagNamePopped(tn);
  				p.activeFormattingElements.clearToLastMarker();
  				p.insertionMode = InsertionMode.IN_ROW;
  			}
  			break;
  		case TAG_ID.TABLE:
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  		case TAG_ID.TR:
  			if (p.openElements.hasInTableScope(tn)) {
  				p._closeTableCell();
  				endTagInRow(p, token);
  			}
  			break;
  		case TAG_ID.BODY:
  		case TAG_ID.CAPTION:
  		case TAG_ID.COL:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.HTML: break;
  		default: endTagInBody(p, token);
  	}
  }
  function startTagInSelect(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.OPTION:
  			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
  			p._insertElement(token, NS.HTML);
  			break;
  		case TAG_ID.OPTGROUP:
  			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
  			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
  			p._insertElement(token, NS.HTML);
  			break;
  		case TAG_ID.HR:
  			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
  			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
  			p._appendElement(token, NS.HTML);
  			token.ackSelfClosing = true;
  			break;
  		case TAG_ID.INPUT:
  		case TAG_ID.KEYGEN:
  		case TAG_ID.TEXTAREA:
  		case TAG_ID.SELECT:
  			if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
  				p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
  				p._resetInsertionMode();
  				if (token.tagID !== TAG_ID.SELECT) p._processStartTag(token);
  			}
  			break;
  		case TAG_ID.SCRIPT:
  		case TAG_ID.TEMPLATE: startTagInHead(p, token);
  	}
  }
  function endTagInSelect(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.OPTGROUP:
  			if (p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) p.openElements.pop();
  			if (p.openElements.currentTagId === TAG_ID.OPTGROUP) p.openElements.pop();
  			break;
  		case TAG_ID.OPTION:
  			if (p.openElements.currentTagId === TAG_ID.OPTION) p.openElements.pop();
  			break;
  		case TAG_ID.SELECT:
  			if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
  				p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
  				p._resetInsertionMode();
  			}
  			break;
  		case TAG_ID.TEMPLATE: templateEndTagInHead(p, token);
  	}
  }
  function startTagInSelectInTable(p, token) {
  	const tn = token.tagID;
  	if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
  		p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
  		p._resetInsertionMode();
  		p._processStartTag(token);
  	} else startTagInSelect(p, token);
  }
  function endTagInSelectInTable(p, token) {
  	const tn = token.tagID;
  	if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
  		if (p.openElements.hasInTableScope(tn)) {
  			p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
  			p._resetInsertionMode();
  			p.onEndTag(token);
  		}
  	} else endTagInSelect(p, token);
  }
  function startTagInTemplate(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.BASE:
  		case TAG_ID.BASEFONT:
  		case TAG_ID.BGSOUND:
  		case TAG_ID.LINK:
  		case TAG_ID.META:
  		case TAG_ID.NOFRAMES:
  		case TAG_ID.SCRIPT:
  		case TAG_ID.STYLE:
  		case TAG_ID.TEMPLATE:
  		case TAG_ID.TITLE:
  			startTagInHead(p, token);
  			break;
  		case TAG_ID.CAPTION:
  		case TAG_ID.COLGROUP:
  		case TAG_ID.TBODY:
  		case TAG_ID.TFOOT:
  		case TAG_ID.THEAD:
  			p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
  			p.insertionMode = InsertionMode.IN_TABLE;
  			startTagInTable(p, token);
  			break;
  		case TAG_ID.COL:
  			p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
  			p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  			startTagInColumnGroup(p, token);
  			break;
  		case TAG_ID.TR:
  			p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
  			p.insertionMode = InsertionMode.IN_TABLE_BODY;
  			startTagInTableBody(p, token);
  			break;
  		case TAG_ID.TD:
  		case TAG_ID.TH:
  			p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
  			p.insertionMode = InsertionMode.IN_ROW;
  			startTagInRow(p, token);
  			break;
  		default:
  			p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
  			p.insertionMode = InsertionMode.IN_BODY;
  			startTagInBody(p, token);
  	}
  }
  function endTagInTemplate(p, token) {
  	if (token.tagID === TAG_ID.TEMPLATE) templateEndTagInHead(p, token);
  }
  function eofInTemplate(p, token) {
  	if (p.openElements.tmplCount > 0) {
  		p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
  		p.activeFormattingElements.clearToLastMarker();
  		p.tmplInsertionModeStack.shift();
  		p._resetInsertionMode();
  		p.onEof(token);
  	} else stopParsing(p, token);
  }
  function startTagAfterBody(p, token) {
  	if (token.tagID === TAG_ID.HTML) startTagInBody(p, token);
  	else tokenAfterBody(p, token);
  }
  function endTagAfterBody(p, token) {
  	var _a;
  	if (token.tagID === TAG_ID.HTML) {
  		if (!p.fragmentContext) p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
  		if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
  			p._setEndLocation(p.openElements.items[0], token);
  			const bodyElement = p.openElements.items[1];
  			if (bodyElement && !((_a = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a === void 0 ? void 0 : _a.endTag)) p._setEndLocation(bodyElement, token);
  		}
  	} else tokenAfterBody(p, token);
  }
  function tokenAfterBody(p, token) {
  	p.insertionMode = InsertionMode.IN_BODY;
  	modeInBody(p, token);
  }
  function startTagInFrameset(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.FRAMESET:
  			p._insertElement(token, NS.HTML);
  			break;
  		case TAG_ID.FRAME:
  			p._appendElement(token, NS.HTML);
  			token.ackSelfClosing = true;
  			break;
  		case TAG_ID.NOFRAMES: startTagInHead(p, token);
  	}
  }
  function endTagInFrameset(p, token) {
  	if (token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
  		p.openElements.pop();
  		if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) p.insertionMode = InsertionMode.AFTER_FRAMESET;
  	}
  }
  function startTagAfterFrameset(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.NOFRAMES: startTagInHead(p, token);
  	}
  }
  function endTagAfterFrameset(p, token) {
  	if (token.tagID === TAG_ID.HTML) p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
  }
  function startTagAfterAfterBody(p, token) {
  	if (token.tagID === TAG_ID.HTML) startTagInBody(p, token);
  	else tokenAfterAfterBody(p, token);
  }
  function tokenAfterAfterBody(p, token) {
  	p.insertionMode = InsertionMode.IN_BODY;
  	modeInBody(p, token);
  }
  function startTagAfterAfterFrameset(p, token) {
  	switch (token.tagID) {
  		case TAG_ID.HTML:
  			startTagInBody(p, token);
  			break;
  		case TAG_ID.NOFRAMES: startTagInHead(p, token);
  	}
  }
  function nullCharacterInForeignContent(p, token) {
  	token.chars = "�";
  	p._insertCharacters(token);
  }
  function characterInForeignContent(p, token) {
  	p._insertCharacters(token);
  	p.framesetOk = false;
  }
  function popUntilHtmlOrIntegrationPoint(p) {
  	while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && p.openElements.currentTagId !== void 0 && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) p.openElements.pop();
  }
  function startTagInForeignContent(p, token) {
  	if (causesExit(token)) {
  		popUntilHtmlOrIntegrationPoint(p);
  		p._startTagOutsideForeignContent(token);
  	} else {
  		const current = p._getAdjustedCurrentElement();
  		const currentNs = p.treeAdapter.getNamespaceURI(current);
  		if (currentNs === NS.MATHML) adjustTokenMathMLAttrs(token);
  		else if (currentNs === NS.SVG) {
  			adjustTokenSVGTagName(token);
  			adjustTokenSVGAttrs(token);
  		}
  		adjustTokenXMLAttrs(token);
  		if (token.selfClosing) p._appendElement(token, currentNs);
  		else p._insertElement(token, currentNs);
  		token.ackSelfClosing = true;
  	}
  }
  function endTagInForeignContent(p, token) {
  	if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
  		popUntilHtmlOrIntegrationPoint(p);
  		p._endTagOutsideForeignContent(token);
  		return;
  	}
  	for (let i = p.openElements.stackTop; i > 0; i--) {
  		const element = p.openElements.items[i];
  		if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
  			p._endTagOutsideForeignContent(token);
  			break;
  		}
  		const tagName = p.treeAdapter.getTagName(element);
  		if (tagName.toLowerCase() === token.tagName) {
  			token.tagName = tagName;
  			p.openElements.shortenToLength(i);
  			break;
  		}
  	}
  }
  TAG_NAMES.AREA, TAG_NAMES.BASE, TAG_NAMES.BASEFONT, TAG_NAMES.BGSOUND, TAG_NAMES.BR, TAG_NAMES.COL, TAG_NAMES.EMBED, TAG_NAMES.FRAME, TAG_NAMES.HR, TAG_NAMES.IMG, TAG_NAMES.INPUT, TAG_NAMES.KEYGEN, TAG_NAMES.LINK, TAG_NAMES.META, TAG_NAMES.PARAM, TAG_NAMES.SOURCE, TAG_NAMES.TRACK, TAG_NAMES.WBR;
  //#endregion
  //#region node_modules/.pnpm/parse5@8.0.1/node_modules/parse5/dist/index.js
  function parseFragment(fragmentContext, html, options) {
  	if (typeof fragmentContext === "string") {
  		options = html;
  		html = fragmentContext;
  		fragmentContext = null;
  	}
  	const parser = Parser.getFragmentParser(fragmentContext, options);
  	parser.tokenizer.write(html, true);
  	return parser.getFragment();
  }
  var DocumentDataError = class extends Error {
  	constructor(code, message) {
  		super(`${code}: ${message}`);
  		this.code = code;
  		this.name = "DocumentDataError";
  	}
  };
  function parseHtmlDocument(source) {
  	checkSource(source);
  	let parsed;
  	try {
  		parsed = parseFragment(source);
  	} catch (error) {
  		throw new DocumentDataError("INVALID_DOCUMENT", errorMessage(error, "Invalid HTML."));
  	}
  	const root = {
  		type: "root",
  		children: (parsed.childNodes ?? []).map(convertHtmlNode).filter((node) => !!node)
  	};
  	checkTree(root);
  	return {
  		kind: "html",
  		root
  	};
  }
  function parseMarkdownDocument(source) {
  	checkSource(source);
  	let root;
  	try {
  		root = stripPositions(fromMarkdown(source));
  	} catch (error) {
  		throw new DocumentDataError("INVALID_DOCUMENT", errorMessage(error, "Invalid Markdown."));
  	}
  	checkTree(root);
  	return {
  		kind: "markdown",
  		root
  	};
  }
  function serializeDocument(tree, format = tree.kind) {
  	if (format !== tree.kind) throw new DocumentDataError("LOSSY_CONVERSION", `Converting ${tree.kind} to ${format} is not supported because it may be lossy.`);
  	const output = tree.kind === "html" ? tree.root.children.map((node) => serializeHtmlNode(node)).join("") : toMarkdown(tree.root, {
  		bullet: "-",
  		emphasis: "*",
  		strong: "*",
  		fences: true
  	});
  	if (new TextEncoder().encode(output).byteLength > 262144) throw new DocumentDataError("DOCUMENT_LIMIT_EXCEEDED", "Serialized document is too large.");
  	return output.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  }
  function getDocumentText(tree, location) {
  	return collectText(resolveLocation(tree, location));
  }
  function replaceDocumentText(tree, location, text) {
  	const copy = structuredClone(tree);
  	const node = resolveLocation(copy, location);
  	if (copy.kind === "html") replaceHtmlNodeText(node, text);
  	else replaceMarkdownNodeText(node, text);
  	checkTree(copy.root);
  	return copy;
  }
  function convertHtmlNode(node) {
  	if (node.nodeName === "#text") return {
  		type: "text",
  		value: node.value ?? ""
  	};
  	if (node.nodeName === "#comment") return {
  		type: "comment",
  		value: node.data ?? ""
  	};
  	if (!node.tagName) return void 0;
  	return {
  		type: "element",
  		tagName: node.tagName,
  		attributes: Object.fromEntries((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]).sort(([a], [b]) => a.localeCompare(b))),
  		children: (node.childNodes ?? []).map(convertHtmlNode).filter((child) => !!child)
  	};
  }
  function resolveLocation(tree, rawLocation) {
  	const location = rawLocation.trim();
  	if (location === "$") return tree.root;
  	if (tree.kind === "html" && /^[#.a-zA-Z][\w-]*$/.test(location)) {
  		const found = findHtml(tree.root.children, location);
  		if (!found) throw new DocumentDataError("LOCATION_NOT_FOUND", `No HTML node matches ${location}.`);
  		return found;
  	}
  	const indexes = parsePath(location);
  	let current = tree.root;
  	for (const index of indexes) {
  		current = childrenOf(current)[index];
  		if (current === void 0) throw new DocumentDataError("LOCATION_NOT_FOUND", `Document location does not exist: ${location}`);
  	}
  	return current;
  }
  function parsePath(location) {
  	if (!/^\$(?:\[\d+\])+$/.test(location)) throw new DocumentDataError("INVALID_LOCATION", `Expected $, $[0][1], or a simple HTML selector: ${location}`);
  	return [...location.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]));
  }
  function childrenOf(value) {
  	if (typeof value !== "object" || value === null || !("children" in value)) return [];
  	const children = value.children;
  	return Array.isArray(children) ? children : [];
  }
  function findHtml(nodes, selector) {
  	for (const node of nodes) if (node.type === "element") {
  		if (selector.startsWith("#") ? node.attributes.id === selector.slice(1) : selector.startsWith(".") ? (node.attributes.class ?? "").split(/\s+/).includes(selector.slice(1)) : node.tagName === selector.toLowerCase()) return node;
  		const nested = findHtml(node.children, selector);
  		if (nested) return nested;
  	}
  }
  function collectText(value) {
  	if (typeof value !== "object" || value === null) return "";
  	if ("type" in value && value.type === "comment") return "";
  	if ("value" in value && typeof value.value === "string") return value.value;
  	return childrenOf(value).map(collectText).join("");
  }
  function replaceHtmlNodeText(node, text) {
  	if (node.type === "text" || node.type === "comment") {
  		node.value = text;
  		return;
  	}
  	node.children = [{
  		type: "text",
  		value: text
  	}];
  }
  function replaceMarkdownNodeText(node, text) {
  	if ("value" in node && typeof node.value === "string") {
  		node.value = text;
  		return;
  	}
  	if ("children" in node && Array.isArray(node.children)) {
  		if (node.type === "root") node.children = [{
  			type: "paragraph",
  			children: [{
  				type: "text",
  				value: text
  			}]
  		}];
  		else node.children = [{
  			type: "text",
  			value: text
  		}];
  		return;
  	}
  	throw new DocumentDataError("INVALID_LOCATION", "The selected Markdown node has no text content.");
  }
  function serializeHtmlNode(node, parentTag) {
  	if (node.type === "text") return parentTag && RAW_TEXT_ELEMENTS.has(parentTag) ? node.value : escapeHtmlText(node.value);
  	if (node.type === "comment") return `<!--${node.value.replaceAll("--", "- -")}-->`;
  	const attributes = Object.entries(node.attributes).sort(([left], [right]) => left.localeCompare(right)).map(([name, value]) => ` ${name}="${escapeHtmlAttribute(value)}"`).join("");
  	const start = `<${node.tagName}${attributes}>`;
  	if (VOID_ELEMENTS.has(node.tagName)) return start;
  	return `${start}${node.children.map((child) => serializeHtmlNode(child, node.tagName)).join("")}</${node.tagName}>`;
  }
  var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  	"area",
  	"base",
  	"br",
  	"col",
  	"embed",
  	"hr",
  	"img",
  	"input",
  	"link",
  	"meta",
  	"source",
  	"track",
  	"wbr"
  ]);
  var RAW_TEXT_ELEMENTS = /* @__PURE__ */ new Set([
  	"script",
  	"style",
  	"xmp",
  	"iframe",
  	"noembed",
  	"noframes",
  	"plaintext"
  ]);
  var escapeHtmlText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  var escapeHtmlAttribute = (value) => escapeHtmlText(value).replaceAll("\"", "&quot;");
  function checkSource(source) {
  	if (new TextEncoder().encode(source).byteLength > 262144) throw new DocumentDataError("DOCUMENT_LIMIT_EXCEEDED", "Document source is too large.");
  }
  function checkTree(root) {
  	let count = 0;
  	const visit = (node, depth) => {
  		count += 1;
  		if (count > 5e4 || depth > 64) throw new DocumentDataError("DOCUMENT_LIMIT_EXCEEDED", "Document tree exceeds its node or depth limit.");
  		for (const child of childrenOf(node)) visit(child, depth + 1);
  	};
  	visit(root, 0);
  }
  function stripPositions(value) {
  	if (Array.isArray(value)) return value.map(stripPositions);
  	if (typeof value !== "object" || value === null) return value;
  	return Object.fromEntries(Object.entries(value).filter(([key]) => key !== "position").map(([key, child]) => [key, stripPositions(child)]));
  }
  function errorMessage(error, fallback) {
  	return error instanceof Error ? error.message : fallback;
  }
  //#endregion
  //#region ../turbowarp-named-data/dist/composition.js
  var NAMED_DATA_REGISTRY_SYMBOL_KEY = "@kubohiroya/turbowarp-named-data/registry/2.0";
  var NAMED_DATA_REGISTRY_SYMBOL = Symbol.for(NAMED_DATA_REGISTRY_SYMBOL_KEY);
  var NAMED_DATA_KINDS = [
  	"structured",
  	"document",
  	"binary",
  	"asset"
  ];
  var NAMED_DATA_SCOPES = ["target", "project"];
  var NAMED_DATA_REPRESENTATIONS = [
  	"json",
  	"yaml",
  	"html",
  	"markdown",
  	"raw"
  ];
  var NAMED_DATA_ERROR_CODES = [
  	"NAMED_DATA_INVALID_REF",
  	"NAMED_DATA_INCOMPATIBLE_VERSION",
  	"NAMED_DATA_NAMESPACE_CONFLICT",
  	"NAMED_DATA_PROVIDER_NOT_FOUND",
  	"NAMED_DATA_NOT_FOUND",
  	"NAMED_DATA_KIND_MISMATCH",
  	"NAMED_DATA_SCOPE_MISMATCH",
  	"NAMED_DATA_REPRESENTATION_UNSUPPORTED",
  	"NAMED_DATA_INVALID_METADATA",
  	"NAMED_DATA_BODY_TOO_LARGE",
  	"NAMED_DATA_ABORTED",
  	"NAMED_DATA_PROVIDER_RELEASED"
  ];
  var NamedDataError = class extends Error {
  	constructor(code, message, options) {
  		super(`${code}: ${message}`, options);
  		this.code = code;
  		this.name = "NamedDataError";
  	}
  };
  var LIFECYCLE_SYMBOL = Symbol.for("@kubohiroya/turbowarp-named-data/lifecycle/2.0");
  var NAMESPACE_PATTERN = /^[a-z][a-z0-9.-]{0,63}$/u;
  var errorCodes = new Set(NAMED_DATA_ERROR_CODES);
  var NamedDataRegistry = class {
  	constructor() {
  		this.contractVersion = "2.0";
  		this.symbolKey = NAMED_DATA_REGISTRY_SYMBOL_KEY;
  		this.providers = /* @__PURE__ */ new Map();
  		this.handles = /* @__PURE__ */ new Set();
  	}
  	registerProvider(provider, options = {}) {
  		requireNamespace(provider.namespace);
  		if (this.providers.has(provider.namespace)) throw new NamedDataError("NAMED_DATA_NAMESPACE_CONFLICT", `Namespace is already registered: ${provider.namespace}`);
  		if (!NAMED_DATA_KINDS.includes(provider.kind)) throw new NamedDataError("NAMED_DATA_INVALID_REF", `Unknown provider kind: ${provider.kind}`);
  		const entry = {
  			provider,
  			lifetime: options.lifetime ?? "session"
  		};
  		this.providers.set(provider.namespace, entry);
  		let active = true;
  		return {
  			namespace: provider.namespace,
  			unregister: async () => {
  				if (!active) return;
  				active = false;
  				if (this.providers.get(provider.namespace) === entry) {
  					this.providers.delete(provider.namespace);
  					await this.releaseHandlesForNamespace(provider.namespace);
  					await provider.release("shutdown");
  				}
  			}
  		};
  	}
  	canResolve(reference, representation) {
  		try {
  			validateReferenceShape(reference, representation);
  			const provider = this.providers.get(reference.namespace)?.provider;
  			return provider?.kind === reference.kind && provider.canResolve(reference, representation);
  		} catch {
  			return false;
  		}
  	}
  	async stat(reference, representation, context = {}) {
  		const provider = this.resolveProvider(reference, representation, context);
  		throwIfAborted(context.signal);
  		try {
  			const metadata = await provider.stat(reference, representation, context);
  			throwIfAborted(context.signal);
  			validateMetadata(metadata, reference, representation);
  			return metadata;
  		} catch (error) {
  			throw normalizeProviderError(error);
  		}
  	}
  	async openBody(reference, representation, context = {}) {
  		const provider = this.resolveProvider(reference, representation, context);
  		throwIfAborted(context.signal);
  		let opened;
  		try {
  			opened = await provider.openBody(reference, representation, context);
  			validateMetadata(opened, reference, representation);
  			if (!(opened.body instanceof Uint8Array) && !(opened.body instanceof ReadableStream)) throw new NamedDataError("NAMED_DATA_INVALID_METADATA", "Provider returned an invalid body.");
  		} catch (error) {
  			throw normalizeProviderError(error);
  		}
  		if (context.signal?.aborted) {
  			await opened.release("abort");
  			throw abortedError();
  		}
  		let released = false;
  		let abortListener;
  		const tracked = {
  			namespace: reference.namespace,
  			release: async (reason = "complete") => {
  				if (released) return;
  				released = true;
  				if (abortListener && context.signal) context.signal.removeEventListener("abort", abortListener);
  				this.handles.delete(tracked);
  				await opened.release(reason);
  			}
  		};
  		this.handles.add(tracked);
  		if (context.signal) {
  			abortListener = () => {
  				Promise.resolve(tracked.release("abort")).catch(() => void 0);
  			};
  			context.signal.addEventListener("abort", abortListener, { once: true });
  			if (context.signal.aborted) {
  				await tracked.release("abort");
  				throw abortedError();
  			}
  		}
  		return Object.freeze({
  			reference: Object.freeze({ ...opened.reference }),
  			nativeRepresentation: opened.nativeRepresentation,
  			representation: opened.representation,
  			mediaType: opened.mediaType,
  			...opened.byteLength === void 0 ? {} : { byteLength: opened.byteLength },
  			...opened.digest === void 0 ? {} : { digest: opened.digest },
  			revision: opened.revision,
  			replayable: opened.replayable,
  			body: opened.body,
  			release: tracked.release
  		});
  	}
  	async clearSession() {
  		const handles = [...this.handles];
  		this.handles.clear();
  		await Promise.allSettled(handles.map((handle) => handle.release("shutdown")));
  		const sessionEntries = [...this.providers.entries()].filter(([, entry]) => entry.lifetime === "session");
  		for (const [namespace] of sessionEntries) this.providers.delete(namespace);
  		await Promise.allSettled(sessionEntries.map(([, entry]) => entry.provider.release("shutdown")));
  		await Promise.allSettled([...this.providers.values()].map((entry) => entry.provider.clearSession?.()));
  	}
  	resolveProvider(reference, representation, context) {
  		validateReference(reference, representation, context);
  		const provider = this.providers.get(reference.namespace)?.provider;
  		if (!provider) throw new NamedDataError("NAMED_DATA_PROVIDER_NOT_FOUND", `No provider can resolve namespace: ${reference.namespace}`);
  		if (provider.kind !== reference.kind) throw new NamedDataError("NAMED_DATA_KIND_MISMATCH", `Provider kind ${provider.kind} does not match ${reference.kind}.`);
  		if (!provider.canResolve(reference, representation)) throw new NamedDataError("NAMED_DATA_REPRESENTATION_UNSUPPORTED", `Provider ${reference.namespace} does not support representation: ${representation}`);
  		return provider;
  	}
  	async releaseHandlesForNamespace(namespace) {
  		const handles = [...this.handles].filter((handle) => handle.namespace === namespace);
  		await Promise.allSettled(handles.map((handle) => handle.release("shutdown")));
  	}
  };
  function installNamedDataRegistry(runtime) {
  	const host = runtime;
  	const existing = host[NAMED_DATA_REGISTRY_SYMBOL];
  	if (existing !== void 0) return requireCompatibleRegistry(existing);
  	const registry = new NamedDataRegistry();
  	Object.defineProperty(host, NAMED_DATA_REGISTRY_SYMBOL, {
  		configurable: true,
  		enumerable: false,
  		writable: false,
  		value: registry
  	});
  	return registry;
  }
  function bindNamedDataRegistryLifecycle(runtime, registry) {
  	const host = runtime;
  	const existing = host[LIFECYCLE_SYMBOL];
  	if (existing !== void 0) {
  		if (existing.registry !== registry) throw new NamedDataError("NAMED_DATA_INCOMPATIBLE_VERSION", "Runtime already has a lifecycle binding for a different registry.");
  		existing.references += 1;
  		return lifecycleUnbind(runtime, host, existing);
  	}
  	const listener = () => {
  		registry.clearSession();
  	};
  	runtime.on("PROJECT_STOP_ALL", listener);
  	const binding = {
  		registry,
  		listener,
  		references: 1
  	};
  	Object.defineProperty(host, LIFECYCLE_SYMBOL, {
  		configurable: true,
  		enumerable: false,
  		writable: false,
  		value: binding
  	});
  	return lifecycleUnbind(runtime, host, binding);
  }
  function lifecycleUnbind(runtime, host, binding) {
  	let active = true;
  	return () => {
  		if (!active || host[LIFECYCLE_SYMBOL] !== binding) return;
  		active = false;
  		binding.references -= 1;
  		if (binding.references > 0) return;
  		runtime.off?.("PROJECT_STOP_ALL", binding.listener);
  		delete host[LIFECYCLE_SYMBOL];
  	};
  }
  function requireCompatibleRegistry(value) {
  	if (typeof value !== "object" || value === null || value.contractVersion !== "2.0" || value.symbolKey !== "@kubohiroya/turbowarp-named-data/registry/2.0") throw new NamedDataError("NAMED_DATA_INCOMPATIBLE_VERSION", `Runtime slot ${NAMED_DATA_REGISTRY_SYMBOL_KEY} contains an incompatible service.`);
  	return value;
  }
  function validateReference(reference, representation, context) {
  	validateReferenceShape(reference, representation);
  	if (reference.scope === "target" && context.target === void 0) throw new NamedDataError("NAMED_DATA_SCOPE_MISMATCH", "Target scope requires target context.");
  	if (reference.scope === "project" && context.project === void 0) throw new NamedDataError("NAMED_DATA_SCOPE_MISMATCH", "Project scope requires project context.");
  	throwIfAborted(context.signal);
  }
  function validateReferenceShape(reference, representation) {
  	if (!reference || typeof reference !== "object") throw invalidReference();
  	requireNamespace(reference.namespace);
  	if (typeof reference.name !== "string" || reference.name.length === 0 || reference.name.length > 256 || containsControlCharacter(reference.name) || !NAMED_DATA_KINDS.includes(reference.kind) || !NAMED_DATA_SCOPES.includes(reference.scope) || !NAMED_DATA_REPRESENTATIONS.includes(representation)) throw invalidReference();
  }
  function validateMetadata(metadata, reference, representation) {
  	if (metadata.representation !== representation || !isNativeRepresentation(metadata.reference.kind, metadata.nativeRepresentation) || metadata.reference.namespace !== reference.namespace || metadata.reference.name !== reference.name || metadata.reference.kind !== reference.kind || metadata.reference.scope !== reference.scope || typeof metadata.mediaType !== "string" || metadata.mediaType.length === 0 || typeof metadata.revision !== "string" || metadata.revision.length === 0 || typeof metadata.replayable !== "boolean" || metadata.byteLength !== void 0 && (!Number.isSafeInteger(metadata.byteLength) || metadata.byteLength < 0) || metadata.digest !== void 0 && !/^sha256-[A-Za-z0-9_-]+$/u.test(metadata.digest)) throw new NamedDataError("NAMED_DATA_INVALID_METADATA", "Provider returned invalid metadata.");
  }
  function isNativeRepresentation(kind, representation) {
  	if (kind === "structured") return representation === "json" || representation === "yaml";
  	if (kind === "document") return representation === "html" || representation === "markdown";
  	return representation === "raw";
  }
  function requireNamespace(namespace) {
  	if (typeof namespace !== "string" || !NAMESPACE_PATTERN.test(namespace)) throw invalidReference("Invalid namespace.");
  }
  function containsControlCharacter(value) {
  	return [...value].some((character) => {
  		const code = character.codePointAt(0) ?? 0;
  		return code <= 31 || code === 127;
  	});
  }
  function invalidReference(message = "Invalid named-data reference.") {
  	return new NamedDataError("NAMED_DATA_INVALID_REF", message);
  }
  function throwIfAborted(signal) {
  	if (signal?.aborted) throw abortedError();
  }
  function abortedError() {
  	return new NamedDataError("NAMED_DATA_ABORTED", "Named-data operation was aborted.");
  }
  function normalizeProviderError(error) {
  	if (error instanceof NamedDataError) return error;
  	if (error instanceof Error && "code" in error && typeof error.code === "string" && errorCodes.has(error.code)) return new NamedDataError(error.code, error.message, { cause: error });
  	return new NamedDataError("NAMED_DATA_PROVIDER_RELEASED", "Provider operation failed.", { cause: error });
  }
  function configuredFlag(name) {
  	const value = globalThis.__TW_NAMED_DATA_FEATURE_FLAGS__?.[name];
  	return value === true || value === "true";
  }
  Object.freeze({ NAMED_DATA_REGISTRY_MVP: configuredFlag("NAMED_DATA_REGISTRY_MVP") });
  //#endregion
  //#region src/document-provider.ts
  var DOCUMENT_DATA_NAMESPACE = "document";
  var DocumentNamedDataProvider = class {
  	constructor(store) {
  		this.store = store;
  		this.namespace = DOCUMENT_DATA_NAMESPACE;
  		this.kind = "document";
  		this.handles = /* @__PURE__ */ new Set();
  		this.released = false;
  	}
  	canResolve(reference, representation) {
  		return !this.released && reference.namespace === this.namespace && reference.name.trim().length > 0 && reference.kind === this.kind && reference.scope === "target" && (representation === "html" || representation === "markdown");
  	}
  	stat(reference, representation, context) {
  		const result = this.resolve(reference, representation, context);
  		return this.metadata(reference, representation, result.bytes.byteLength, result.binding.revision);
  	}
  	openBody(reference, representation, context) {
  		const result = this.resolve(reference, representation, context);
  		const handle = Symbol("document-body");
  		this.handles.add(handle);
  		let released = false;
  		return {
  			...this.metadata(reference, representation, result.bytes.byteLength, result.binding.revision),
  			body: result.bytes,
  			release: (reason) => {
  				if (!released) {
  					released = true;
  					this.handles.delete(handle);
  				}
  			}
  		};
  	}
  	clearSession() {
  		this.handles.clear();
  	}
  	release(reason) {
  		this.released = true;
  		this.handles.clear();
  	}
  	resolve(reference, representation, context) {
  		if (this.released) throw new NamedDataError("NAMED_DATA_PROVIDER_RELEASED", "The document provider was released.");
  		if (context.signal?.aborted) throw new NamedDataError("NAMED_DATA_ABORTED", "Body resolution was aborted.");
  		if (reference.namespace !== this.namespace || reference.name.trim().length === 0) throw new NamedDataError("NAMED_DATA_INVALID_REF", "Invalid document reference.");
  		if (reference.kind !== this.kind) throw new NamedDataError("NAMED_DATA_KIND_MISMATCH", `Expected document, received ${reference.kind}.`);
  		if (reference.scope !== "target" || !context.target) throw new NamedDataError("NAMED_DATA_SCOPE_MISMATCH", "Document data requires target scope and target context.");
  		if (representation !== "html" && representation !== "markdown") throw new NamedDataError("NAMED_DATA_REPRESENTATION_UNSUPPORTED", `Documents cannot be rendered as ${representation}.`);
  		const binding = this.store.get(context.target, reference.name);
  		if (!binding) throw new NamedDataError("NAMED_DATA_NOT_FOUND", `Document does not exist: ${reference.name}`);
  		if (binding.tree.kind !== representation) throw new NamedDataError("NAMED_DATA_REPRESENTATION_UNSUPPORTED", `Cross-format ${binding.tree.kind} to ${representation} conversion may be lossy.`);
  		const bytes = new TextEncoder().encode(serializeDocument(binding.tree));
  		if (bytes.byteLength > 262144) throw new NamedDataError("NAMED_DATA_BODY_TOO_LARGE", "Serialized document is too large.");
  		if (context.signal?.aborted) throw new NamedDataError("NAMED_DATA_ABORTED", "Body resolution was aborted.");
  		return {
  			binding,
  			bytes
  		};
  	}
  	metadata(reference, representation, byteLength, revision) {
  		return {
  			reference: { ...reference },
  			nativeRepresentation: representation,
  			representation,
  			mediaType: representation === "html" ? "text/html; charset=utf-8" : "text/markdown; charset=utf-8",
  			byteLength,
  			revision: String(revision),
  			replayable: true
  		};
  	}
  };
  //#endregion
  //#region src/extension.ts
  var blockDefinitions = block_definitions_default.blocks;
  var DocumentDataExtension = class {
  	constructor(enabled = isDocumentDataMvpEnabled()) {
  		this.enabled = enabled;
  		this.registries = /* @__PURE__ */ new WeakMap();
  		this.nextRevision = 1;
  		const runtime = Scratch.vm?.runtime;
  		if (enabled) {
  			this.provider = new DocumentNamedDataProvider({ get: (target, name) => this.registries.get(target)?.get(name) });
  			if (runtime) {
  				this.namedDataRegistry = installNamedDataRegistry(runtime);
  				this.namedDataRegistration = this.namedDataRegistry.registerProvider(this.provider, { lifetime: "persistent" });
  				if (runtime.on) {
  					this.unbindNamedDataRegistryLifecycle = bindNamedDataRegistryLifecycle(runtime, this.namedDataRegistry);
  					runtime.on("RUNTIME_DISPOSED", () => {
  						this.dispose();
  					});
  				}
  			}
  		}
  		runtime?.on?.("PROJECT_STOP_ALL", () => this.clearRuntimeState());
  	}
  	getNamedDataProvider() {
  		return this.provider;
  	}
  	getNamedDataRegistry() {
  		return this.namedDataRegistry;
  	}
  	async dispose() {
  		await this.namedDataRegistration?.unregister();
  		this.unbindNamedDataRegistryLifecycle?.();
  	}
  	getInfo() {
  		return {
  			id: extensionConfig.id,
  			name: Scratch.translate(block_definitions_default.extensionName),
  			docsURI: extensionConfig.docsURI,
  			blockIconURI: extensionConfig.blockIconURI,
  			blocks: this.enabled ? blockDefinitions.map((block) => this.toScratchBlock(block)) : [],
  			menus: Object.fromEntries(Object.entries(block_definitions_default.menus).map(([id, menu]) => [id, this.toScratchMenu(menu)]))
  		};
  	}
  	parseHtml(args, util) {
  		this.setBinding(util.target, this.name(args.NAME), parseHtmlDocument(Scratch.Cast.toString(args.TEXT)));
  	}
  	parseMarkdown(args, util) {
  		this.setBinding(util.target, this.name(args.NAME), parseMarkdownDocument(Scratch.Cast.toString(args.TEXT)));
  	}
  	hasDocument(args, util) {
  		return this.registryFor(util.target).has(this.name(args.NAME));
  	}
  	deleteDocument(args, util) {
  		const name = this.name(args.NAME);
  		if (!this.registryFor(util.target).delete(name)) this.notFound(name);
  	}
  	documentKind(args, util) {
  		return this.requireBinding(util.target, args.NAME).tree.kind;
  	}
  	getDocumentText(args, util) {
  		return getDocumentText(this.requireBinding(util.target, args.NAME).tree, Scratch.Cast.toString(args.LOCATION));
  	}
  	replaceDocumentText(args, util) {
  		const name = this.name(args.NAME);
  		const updated = replaceDocumentText(this.requireBindingByName(util.target, name).tree, Scratch.Cast.toString(args.LOCATION), Scratch.Cast.toString(args.TEXT));
  		this.setBinding(util.target, name, updated);
  	}
  	serializeDocument(args, util) {
  		const format = Scratch.Cast.toString(args.FORMAT);
  		if (format !== "html" && format !== "markdown") throw new DocumentDataError("INVALID_DOCUMENT", `Unknown document format: ${format}`);
  		return serializeDocument(this.requireBinding(util.target, args.NAME).tree, format);
  	}
  	name(value) {
  		const name = Scratch.Cast.toString(value).trim();
  		if (!name) throw new DocumentDataError("INVALID_NAME", "Document name cannot be empty.");
  		return name;
  	}
  	registryFor(target) {
  		let registry = this.registries.get(target);
  		if (!registry) {
  			registry = /* @__PURE__ */ new Map();
  			this.registries.set(target, registry);
  		}
  		return registry;
  	}
  	setBinding(target, name, tree) {
  		this.registryFor(target).set(name, {
  			tree,
  			revision: this.nextRevision++
  		});
  	}
  	requireBinding(target, rawName) {
  		return this.requireBindingByName(target, this.name(rawName));
  	}
  	requireBindingByName(target, name) {
  		const binding = this.registries.get(target)?.get(name);
  		if (!binding) this.notFound(name);
  		return binding;
  	}
  	notFound(name) {
  		throw new DocumentDataError("DOCUMENT_NOT_FOUND", `Document does not exist: ${name}`);
  	}
  	clearRuntimeState() {
  		this.registries = /* @__PURE__ */ new WeakMap();
  		this.provider?.clearSession();
  	}
  	toScratchBlock(block) {
  		return {
  			opcode: block.opcode,
  			blockType: Scratch.BlockType[block.blockType],
  			text: Scratch.translate(block.text),
  			arguments: Object.fromEntries(Object.entries(block.arguments).map(([name, argument]) => [name, {
  				type: Scratch.ArgumentType[argument.type],
  				defaultValue: argument.defaultValue,
  				...argument.menu ? { menu: argument.menu } : {}
  			}]))
  		};
  	}
  	toScratchMenu(menu) {
  		return {
  			acceptReporters: menu.acceptReporters,
  			items: menu.items
  		};
  	}
  };
  //#endregion
  //#region src/index.ts
  if (extensionConfig.unsandboxed && !Scratch.extensions.unsandboxed) throw new Error(`${extensionConfig.name} must run unsandboxed.`);
  Scratch.extensions.register(new DocumentDataExtension());
  //#endregion

})(Scratch);
