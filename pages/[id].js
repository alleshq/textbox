import withAuth from "../util/withAuth";
import Page from "../components/Page";
import theme from "../theme";

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
    <div className="content">
        <p>{props.doc.content}</p>
    </div>

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
        }
    `}</style>
  </Page>
);

DocPage.getInitialProps = ctx => {
  return {
    doc: {
      id: "69abwj",
      name: "Untitled Document",
      content: "const Homepage = user !== null ? props => () : props => ();",
      type: "javascript"
    }
  };
};

export default withAuth(DocPage, true);
