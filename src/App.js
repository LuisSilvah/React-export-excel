import "./styles.css";
import DownloadExcel from "./def";
import books from "./books";

export default function App() {

  return (
    <div className="App">
      <h1>React excel export sandbox</h1>
      {books && (
        <DownloadExcel
        fileName="top-90-books"
        data={books}
        buttonLabel="Export top 90 books"
      />
      )}
    </div>
  );
}
