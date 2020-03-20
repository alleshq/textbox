import withAuth from "../util/withAuth";
import Page from "../components/Page";
import theme from "../theme";
import config from "../config";
import { useState } from "react";
import axios from "axios";

const Homepage = props => {
  if (props.user) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("Untitled Document");
    const [markdown, setMarkdown] = useState(false);
    const [highlight, setHighlight] = useState(true);

    const createDocument = () => {
      if (!content.trim()) return;

      axios
        .post(
          `${config.apiUrl}/new`,
          {
            title,
            content,
            markdown,
            highlight
          },
          {
            headers: {
              Authorization: props.user.sessionToken
            }
          }
        )
        .then(res => {
          location.href = `/${res.data.code}`;
        })
        .catch(() => {});
    };

    return (
      <Page user={props.user}>
        <h1>
          Hey<span style={{ color: theme.yellow }}>,</span>{" "}
          {props.user.nickname}
          {props.user.plus ? (
            <sup style={{ color: theme.green }}>+</sup>
          ) : (
            <></>
          )}
        </h1>
        <input
          onInput={e => setTitle(e.target.value)}
          placeholder="Title..."
          defaultValue="Untitled Document"
          onFocus={e => {
            if (e.target.value === e.target.defaultValue) {
              e.target.value = "";
              setTitle(e.target.defaultValue);
            }
          }}
          onBlur={e => {
            if (!e.target.value.trim()) {
              e.target.value = e.target.defaultValue;
              setTitle(e.target.defaultValue);
            }
          }}
        />
        <textarea
          onInput={e => setContent(e.target.value)}
          placeholder="Content..."
        ></textarea>
        <div className="docOptions">
          <div
            onClick={() => setMarkdown(!markdown)}
            style={{ background: markdown ? theme.foreground : undefined }}
          >
            <p>Markdown</p>
          </div>
          <div
            onClick={() => setHighlight(!highlight)}
            style={{ background: highlight ? theme.foreground : undefined }}
          >
            <p>Highlighting</p>
          </div>
          <div onClick={createDocument}>
            <p>Create</p>
          </div>
        </div>

        <style jsx>{`
          textarea,
          input {
            width: 100%;
            box-sizing: border-box;
            background: ${theme.textfield};
            border: solid 1px #000000;
            padding: 10px;
            color: #ffffff;
          }

          input {
            margin-bottom: 10px;
            font-size: 25px;
          }

          textarea {
            resize: none;
            height: 300px;
            font-size: 15px;
            tab-size: 2;
            -moz-tab-size: 2;
          }

          .docOptions {
            display: flex;
          }

          .docOptions div {
            cursor: pointer;
            padding: 20px;
            margin: 20px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            border: solid 5px transparent;
            transition: 0.1s;
          }

          .docOptions div:hover {
            border-color: ${theme.foreground};
          }

          .docOptions div:nth-child(1) {
            margin-left: 0;
          }

          .docOptions div:nth-child(3) {
            margin-right: 0;
            background: ${theme.orange};
          }

          .docOptions div:nth-child(3):hover {
            border-color: transparent;
          }

          @media screen and (max-width: 640px) {
            .docOptions div {
              margin: 5px;
              padding: 5px;
            }
          }

          @media screen and (max-width: 400px) {
            .docOptions {
              display: block;
            }

            .docOptions div {
              margin: 5px 0;
            }
          }
        `}</style>
      </Page>
    );
  } else {
    return (
      <Page>
        <h1>
          Textbox<span>_</span>
        </h1>
        <p>
          Textbox is a simple service built by{" "}
          <a href="https://alles.cx" className="normal">
            Alles
          </a>{" "}
          for uploading and sharing simple text documents or code. There is
          optional markdown and code highlighting support built in to the
          service, and you can edit or delete docs at any time. Each doc has a
          short 6-character id, such as{" "}
          <a href="/69abwj" className="normal">
            69abwj
          </a>
          .
        </p>
        <p>
          You appear to be signed out of your AllesID right now. If you have an
          account,{" "}
          <a
            href={`https://alles.cx/login?redirect=${encodeURIComponent(
              "https://textbox.alles.cx"
            )}`}
            className="normal"
          >
            sign in here
          </a>
          .
        </p>

        <style jsx>{`
          h1 span {
            animation: cursorFlash 1s infinite;
          }

          @keyframes cursorFlash {
            0% {
              opacity: 1;
            }
            40% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            90% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </Page>
    );
  }
};

export default withAuth(Homepage, true);
