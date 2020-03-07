import withAuth from "../../util/withAuth";
import Page from "../../components/Page";
import config from "../../config";
import theme from "../../theme";
import axios from "axios";
import { withRouter } from "next/router";
import Link from "next/link";
import { useState, createRef } from "react";

const DocPage = props => {
  if (props.doc && props.doc.author.id === props.user.id) {
    const textarea = createRef();
    const [content, setContent] = useState(props.doc.content);

    const discardChanges = () => {
      textarea.current.value = props.doc.content;
      setContent(props.doc.content);
    };

    const deleteDocument = () => {
      if (!content.trim()) return;
      axios
        .post(
          `${config.apiUrl}/doc/${props.doc.id}/delete`,
          {},
          {
            headers: {
              Authorization: props.user.sessionToken
            }
          }
        )
        .then(() => {
          location.href = "/";
        })
        .catch(() => {});
    };

    const updateDocument = () => {
      if (!content.trim()) return;
      if (content !== props.doc.content) {
        axios
          .post(
            `${config.apiUrl}/doc/${props.doc.id}/edit`,
            {
              content
            },
            {
              headers: {
                Authorization: props.user.sessionToken
              }
            }
          )
          .then(() => {
            location.href = `/${props.doc.id}`;
          })
          .catch(() => {});
      } else {
        location.href = `/${props.doc.id}`;
      }
    };

    return (
      <Page
        title={`${props.doc.id}/edit`}
        user={props.user}
        breadcrumbs={[
          {
            name: props.doc.id,
            href: "/[id]",
            as: `/${props.doc.id}`
          },
          {
            name: "edit"
          }
        ]}
      >
        <header>
          <h1>{props.doc.name}</h1>
        </header>
        <textarea
          ref={textarea}
          defaultValue={props.doc.content}
          onInput={e => setContent(e.target.value)}
        ></textarea>
        <div className="docOptions">
          <div onClick={discardChanges}>
            <p>Discard</p>
          </div>
          <div onClick={deleteDocument}>
            <p>Delete</p>
          </div>
          <div onClick={updateDocument}>
            <p>Update</p>
          </div>
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

          textarea {
            width: 100%;
            height: 300px;
            resize: none;
            margin-top: 10px;
            box-sizing: border-box;
            background: ${theme.textfield};
            border: solid 1px #000000;
            padding: 10px;
            color: #ffffff;
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

          .docOptions div:nth-child(1) {
            margin-left: 0;
            background: ${theme.blue};
          }

          .docOptions div:nth-child(2) {
            background: ${theme.orange};
          }

          .docOptions div:nth-child(3) {
            margin-right: 0;
            background: ${theme.green};
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
  }
};

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

  return {
    doc
  };
};

export default withRouter(withAuth(DocPage, true));
