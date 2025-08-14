![Skrift button cover](https://react.email/static/covers/render.png)

<div align="center"><strong>@skrift/render</strong></div>
<div align="center">Transform React components into HTML email templates.</div>
<br />
<div align="center">
<a href="https://react.email">Website</a> 
<span> · </span>
<a href="https://github.com/maxscn/skrift">GitHub</a> 
<span> · </span>
<a href="https://react.email/discord">Discord</a>
</div>

## Install

Install component from your command line.

#### With yarn

```sh
yarn add @skrift/render -E
```

#### With npm

```sh
npm install @skrift/render -E
```

## Getting started

Convert React components into a HTML string.

```jsx
import { MyTemplate } from "../components/MyTemplate";
import { render } from "@skrift/render";

const html = await render(<MyTemplate firstName="Jim" />);
```

## License

MIT License
