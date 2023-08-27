import { GoogleBooksLoader, GoogleBooksViewer } from "react-google-books";

function Goo() {
  const [pesquisa, setPesquisa] = useState("Biblioteca");
  const navigate = useNavigate();

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
export default Goo;
