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
        <body onload="pageLoaded()">
        <script>
            function pageLoaded() {
                // Speed up the audio 3x so the test doesn't take 10 seconds.
                var audio = document.getElementById("audio");
                audio.loop = true;
                audio.play();
            }
        </script>
        <audio id="audio" src="drh.mp3" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
