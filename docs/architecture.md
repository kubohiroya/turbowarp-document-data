# Architecture

The extension stores immutable replacement bindings in `WeakMap<Target, Map<Name, Binding>>`. HTML input becomes a small typed tree normalized from parse5; Markdown input becomes a position-free mdast tree. Revisions increase whenever a binding is replaced.

The block API operates on documents. The Named Data provider is a read-only adapter over the same binding store and produces replayable UTF-8 bytes for HTTP consumers. It implements the canonical `@kubohiroya/turbowarp-named-data` composition contract and registers in the runtime registry with persistent lifetime. Project stop clears bindings and session handles without unregistering the provider.

Cross-format serialization is rejected because HTML and Markdown conversion may be lossy. This package never describes parsed HTML as safe or sanitized.
