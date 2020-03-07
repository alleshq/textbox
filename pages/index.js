import withAuth from "../util/withAuth";
import Page from "../components/Page";

const Homepage = props => (
  <Page>
    <h1>hi</h1>
  </Page>
);

export default withAuth(Homepage, true);
