import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <audio id="audio" autoplay>
  <source src="drh.mp3" />
</audio>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
