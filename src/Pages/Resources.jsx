import { useState } from "react";

const Blogitems = [
  { id: 1, title: "MATH 256", pdf: "./Math256.pdf", href: "https://www.overleaf.com/read/zkqrdfbvtrjr#6f311d"},
  { id: 2, title: "MATH 253", pdf: "./Math253.pdf", href: "https://www.overleaf.com/read/nqpjjnwgywwd#17331a" },
];

function Blogs() {
  const [current, setCurrent] = useState(Blogitems[0]);

  return (
    <div className="blogs-layout">
      <div className="blog-list">
        {Blogitems.map((item) => (
          <div key={item.id}>
            <button
              className={`Blogitems${current.id === item.id ? " active" : ""}`}
              onClick={() => setCurrent(item)}
            >
              {item.title}
            </button>
            <br />
          </div>
        ))}
      </div>

      <div className="blog-viewer">
        <h2>{current.title}</h2>
        <iframe
          src={current.pdf}
          width="800px"
          height="500px"
          style={{ border: "none" }}
        />
<p>
        This is the{" "}
        <a
          href={current.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          source code
        </a>{" "}
        that you can copy and edit. Good luck with your study!
      </p>
      </div>
    </div>
  );
}

export default Blogs;
