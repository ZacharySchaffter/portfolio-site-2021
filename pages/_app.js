import "styles/globals.scss";
// Components
import Layout from "/components/Layout";

function App({ Component, pageProps }) {
  const { background, flush, ...staticPageProps } = pageProps;
  return (
    <Layout background={background} flush={flush}>
      <Component {...staticPageProps} />
    </Layout>
  );
}

export default App;
