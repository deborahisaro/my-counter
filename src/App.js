import { useState } from "react";

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p style={{ fontStyle: "italic", color: "#888" }}>No books yet — add one above.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {books.map((book, index) => (
        <li key={index} style={{ border: "1px solid #ddd", borderRadius: 6, padding: 16, marginBottom: 12 }}>
          <h2 style={{ margin: "0 0 4px" }}>{book.title}</h2>
          <p style={{ margin: "0 0 4px" }}><strong>Author:</strong> {book.author}</p>
          <p style={{ margin: "0 0 12px" }}>{book.summary}</p>
          <button onClick={() => onEdit(index)} style={{ marginRight: 8 }}>✏️ Edit</button>
          <button onClick={() => onDelete(index)} style={{ color: "red" }}>🗑 Delete</button>
        </li>
      ))}
    </ul>
  );
}

function EditModal({ book, onSave, onCancel }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [summary, setSummary] = useState(book.summary);

  function handleSave() {
    if (!title.trim() || !author.trim()) {
      alert("Title and author are required.");
      return;
    }
    onSave({ title, author, summary });
  }

  return (
    <div style={{ border: "2px solid #f0a500", borderRadius: 6, padding: 16, marginBottom: 12, background: "#fffdf0" }}>
      <h3 style={{ marginTop: 0 }}>Edit Book</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 8, padding: 8 }}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 8, padding: 8 }}
      />
      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={3}
        style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
      />
      <button onClick={handleSave} style={{ marginRight: 8 }}>💾 Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [books, setBooks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  function handleAddBook() {
    if (!title.trim() || !author.trim()) {
      alert("Please fill in at least the title and author.");
      return;
    }
    setBooks([...books, { title, author, summary }]);
    setTitle("");
    setAuthor("");
    setSummary("");
  }

  function handleDelete(index) {
    if (window.confirm(`Delete "${books[index].title}"?`)) {
      setBooks(books.filter((_, i) => i !== index));
    }
  }

  function handleEdit(index) {
    setEditingIndex(index);
  }

  function handleSaveEdit(updatedBook) {
    const updated = [...books];
    updated[editingIndex] = updatedBook;
    setBooks(updated);
    setEditingIndex(null);
  }

  function handleCancelEdit() {
    setEditingIndex(null);
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px", fontFamily: "sans-serif" }}>
      <h1>Library</h1>

      {/* Add Book Form */}
      <div style={{ border: "1px solid #ddd", borderRadius: 6, padding: 16, marginBottom: 24 }}>
        <h2 style={{ marginTop: 0 }}>Add a Book</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8, padding: 8 }}
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          style={{ display: "block", width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      {/* Edit Form (shows inline when editing) */}
      {editingIndex !== null && (
        <EditModal
          book={books[editingIndex]}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Book List */}
      <BookList
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}