import theme from "../theme";

import Head from "next/head";
import Link from "next/link";

import Header from "./Header";

export default props => (
  <div className="pageContainer">
    <Head>
      <title>{props.title ? `textbox/${props.title}/` : `textbox/`}</title>
      <link rel="shortcut icon" href="/icon.png" />
    </Head>

    <Header user={props.user} />
    <main>
      <div className="innerMain">{props.children}</div>
    </main>

    <style jsx>{`
      .pageContainer {
        display: flex;
        flex-flow: column;
        min-height: 100vh;
      }

      main {
        padding: 20px;
        flex-grow: 1;
      }

      .innerMain {
        max-width: 1000px;
        margin: 20px auto;
      }
    `}</style>

    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900&display=swap");
      @import url("https://use.fontawesome.com/releases/v5.12.0/css/all.css");

      body {
        font-family: JetBrainsMono, sans-serif;
        margin: 0;
        background: ${theme.background};
        color: #ffffff;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      a.normal {
        color: white;
        text-decoration: underline;
      }

      a.nocolor {
        text-decoration: underline;
      }

      @font-face {
        font-family: "JetBrainsMono";
        src: url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Regular.woff2")
            format("woff2"),
          url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Regular.woff")
            format("woff"),
          url("https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/ttf/JetBrainsMono-Regular.ttf")
            format("truetype");
        font-weight: 400;
        font-style: normal;
      }
    `}</style>
  </div>
);
