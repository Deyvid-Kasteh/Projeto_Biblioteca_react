import { GoogleBooksLoader, GoogleBooksViewer } from "react-google-books";

function GooogleApi() {

    const script = document.createElement("script");
    script.src = "https://www.google.com/books/jsapi.js";

  return (
    <div>
      <GoogleBooksLoader>
        <GoogleBooksViewer
          loadingComponent={<div>Loading...</div>}
          errorComponent={<div>Error loading viewer.</div>}
          initialWidth={600}
          initialHeight={800}
          isbn="0738531367"
        />
      </GoogleBooksLoader>
    </div>
  );
}
export default GooogleApi;
