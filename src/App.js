import { useState } from "react";

function BookList({ books }) {
  return (
    <ul>
      {books.map((book, index) => (
        <li key={index}>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p>{book.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [books, setBooks] = useState([]);

  function handleAddBook() {
   if (!title.trim()) {
  alert("Please fill in all fields before submitting.");
  return;  
}
    setBooks([...books, { title, author, summary }]);
    setTitle("");
    setAuthor("");
    setSummary("");
  }

  return (
    <div>
      <h1>Library</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <button onClick={handleAddBook}>Add Book</button>

      <BookList books={books} />
    </div>
  );
}