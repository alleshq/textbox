import withAuth from "../util/withAuth";
import Page from "../components/Page";

const Homepage = props => (
  <Page>
    <h1>We're using JetBrains Mono</h1>
    <p>const Homepage = user !== null ? props {'=>'} (</p>
  </Page>
);

export default withAuth(Homepage, true);
