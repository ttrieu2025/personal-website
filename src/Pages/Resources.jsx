import { useState } from "react";

const Blogitems = [
  {
    id: 1,
    title: "MATH 256",
    pdf: "./Math256.pdf",
  },
  {
    id: 2,
    title: "MATH 253",
    pdf: "./Math253.pdf",
  },
];


function Blogs() {
  const [current, next] = useState(Blogitems[0]);

  return (
    <div className="blogs-layout">
      <div className="blog-list" >
        {Blogitems.map((item) => (
          <div>
            <button
              key={item.id}
              className={`Blogitems${current.id === item.id ? "active" : ""
                }`}
              onClick={() => next(item)}
            >
              {item.title}
            </button>
            <br />
          </div>
        ))}
      </div>


      <div className="blog-viewer">
        <h2>{current.title}</h2>

      <iframe src={current.pdf} 
          width="800px" 
          height="500px" 
          style={{ border: "none" }} 
      />
      </div>
    </div>
  );
}

export default Blogs;