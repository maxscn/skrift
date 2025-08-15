![Skrift cover](https://react.document/static/covers/skrift.png)

<div align="center"><strong>Skrift</strong></div>
<div align="center">The next generation of writing documents.<br />High-quality, unstyled components for creating documents.</div>
<br />
<div align="center">
<a href="https://react.document">Website</a> 
<span> · </span>
<a href="https://github.com/maxscn/skrift">GitHub</a> 
<span> · </span>
<a href="https://react.document/discord">Discord</a>
</div>

## Getting started

To get started, open a new shell and run:

```sh
npx create-document
```

This will create a new folder called `documents` with a few document templates.

## Commands

### `document dev`

Starts a local development server that will watch your files and automatically rebuild your document when you make changes.

```sh
npx skrift dev
```

### `document export`

Generates the plain HTML files of your documents into a `out` directory.

```sh
npx skrift export
```

## Setting Up the Environment

When working in the CLI, a lot of friction can get introduced with installing it and rebuilding for every change. To avoid that, we have a script that can be linked globally to directly run the source code of the CLI. You can use it the same as you would the standard CLI.

### 1. Link `skrift` globally

```sh
pnpm link ./dev -g
```

### 2. Run the CLI

```sh
document-dev [command] [flags]
```

## License

MIT License
