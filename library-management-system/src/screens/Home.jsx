
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import "./Home.css";

export default function Home() {
    const [books, setbooks] = useState([]);

    useEffect(() => {
        fetchBooks();

    }, []);

    async function fetchBooks() {
        const res = await axios.get("http://localhost:3000/books");
        setbooks(res.data);
        console.log(books.length);
    }

    const removeBook = (id) => {
        console.log(id);
        axios.delete('http://localhost:3000/books/${id}');
        setbooks(books.filter((book) => book.id != id));
    };


    return (
        <div>
            <ol className="ol-list list-group list-group-numbered">
                {books.map((book, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{book.title}</div>
                                {book.author}
                            </div>
                            <span className="badge text-bg-primary rounded-pill">
                                {(book.isbn || "").length}
                            </span>

                            <button
                                onClick={() => removeBook(book.id)}
                                className="btn btn-danger"
                            >
                                Remove
                            </button>
                        </li>
                    );
                })}
            </ol>

        </div>
    );
}
