import withAuth from "../util/withAuth";
import Page from "../components/Page";
import theme from "../theme";
import hljs from "highlight.js";
import "../node_modules/highlight.js/styles/darkula.css";
import marked from "marked";
import insane from "insane";

marked.setOptions({
  breaks: true
});

const DocPage = props => (
  <Page
    title={props.doc.id}
    breadcrumbs={[
      {
        name: props.doc.id
      }
    ]}
  >
    <header>
      <h1>{props.doc.name}</h1>
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

      h1 {
        margin: 0;
        font-size: 20px;
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
Test:
- a
- b
- c

a
b
    `,
    highlight: false,
    markdown: true
  };

  if (doc.highlight && doc.markdown) {
    doc.html = marked(hljs.highlightAuto(doc.content).value);
  } else if (doc.highlight) {
    doc.html = hljs.highlightAuto(doc.content).value;
  } else if (doc.markdown) {
    doc.html = insane(marked(doc.content));
  } else {
    doc.html = insane(doc.content);
  }

  return {
    doc
  };
};

export default withAuth(DocPage, true);
