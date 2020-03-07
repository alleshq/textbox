import withAuth from "../../util/withAuth";
import Page from "../../components/Page";
import config from "../../config";
import theme from "../../theme";
import hljs from "highlight.js";
import "../../node_modules/highlight.js/styles/darkula.css";
import marked from "marked";
import insane from "insane";
import moment from "moment";
import axios from "axios";
import { withRouter } from "next/router";
import Link from "next/link";

marked.setOptions({
  breaks: true,
  highlight: (code, lang) =>
    lang && hljs.getLanguage(lang)
      ? hljs.highlight(lang, code).value
      : hljs.highlightAuto(code).value
});

const DocPage = props =>
  props.doc ? (
    <Page
      title={props.doc.id}
      user={props.user}
      breadcrumbs={[
        {
          name: props.doc.id
        }
      ]}
    >
      <header>
        <h1>
          {props.doc.name}
          {props.doc.author.id === props.user.id ? (
            <>
              {" "}
              <Link href="/[id]/edit" as={`/${props.doc.id}/edit`}>
                <a>
                  <i className="fas fa-edit"></i>
                </a>
              </Link>
            </>
          ) : (
            <></>
          )}
        </h1>
        <p
          title={
            props.doc.editedAt
              ? `Edited at ${moment(props.doc.editedAt).format("LLL")}`
              : "Never Edited"
          }
        >
          By{" "}
          <a href={`https://alles.cx/u/${props.doc.author.username}`}>
            @{props.doc.author.username}
          </a>{" "}
          at {moment(props.doc.createdAt).format("LLL")}
        </p>
      </header>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: props.doc.html }}
      ></div>

      <style jsx>{`
        header {
          background: ${theme.foreground};
          padding: 10px;
          box-sizing: border-box;
        }

        header h1 {
          margin: 0;
          font-size: 20px;
        }

        header p {
          margin: 0;
          margin-top: 5px;
          font-size: 10px;
        }

        header a {
          font-weight: bold;
        }

        .content {
          padding: 10px;
          white-space: ${props.doc.markdown ? "normal" : "pre-wrap"};
        }
      `}</style>
    </Page>
  ) : (
    <Page title="ERROR" user={props.user}>
      <header>
        <h1>404: Document Not Found</h1>
      </header>
      <div className="content">
        <p>
          This document could not be found. It could have expired or been
          deleted.
        </p>
        <p>
          Perhaps you could{" "}
          <Link href="/">
            <a>create a new one</a>
          </Link>
          .
        </p>
      </div>

      <style jsx>{`
        header {
          background: ${theme.foreground};
          padding: 10px;
          box-sizing: border-box;
        }

        header h1 {
          margin: 0;
          font-size: 20px;
        }

        .content {
          padding: 10px;
        }
      `}</style>
    </Page>
  );

DocPage.getInitialProps = async ctx => {
  var doc;
  try {
    doc = (
      await axios.get(
        `${config.apiUrl}/doc/${encodeURIComponent(ctx.query.id)}`
      )
    ).data;
  } catch (err) {
    return { doc: null };
  }

  if (doc.highlight && doc.markdown) {
    doc.html = marked(hljs.highlightAuto(doc.content).value);
  } else if (doc.highlight) {
    doc.html = hljs.highlightAuto(doc.content).value;
  } else if (doc.markdown) {
    doc.html = marked(insane(doc.content));
  } else {
    doc.html = insane(doc.content);
  }

  return {
    doc
  };
};

export default withRouter(withAuth(DocPage, true));
