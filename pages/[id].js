import withAuth from "../util/withAuth";
import Page from "../components/Page";
import theme from "../theme";
import hljs from "highlight.js";
import "../node_modules/highlight.js/styles/darkula.css";
import marked from "marked";
import insane from "insane";
import moment from "moment";

marked.setOptions({
  breaks: true,
  highlight: (code, lang) => hljs.highlight(lang, code).value
});

const DocPage = props => (
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
      <h1>{props.doc.name}</h1>
      <p title={props.doc.editedAt ? `Edited at ${moment(props.doc.editedAt).format("LLL")}` : "Never Edited"}>By <a href={`https://alles.cx/u/${props.doc.author}`}>@{props.doc.author}</a> at {moment(props.doc.createdAt).format("LLL")}</p>
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
);

DocPage.getInitialProps = () => {
  const doc = {
    id: "69abwj",
    name: "Untitled Document",
    content: `
hello world
\`\`\`js
alert("hi");
window.location.href = "https://abaer.dev";
doThing(true, null);
\`\`\`
    `,
    highlight: false,
    markdown: true,
    author: "archie",
    createdAt: new Date(0),
    editedAt: new Date(100000000000)
  };

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

export default withAuth(DocPage, true);
