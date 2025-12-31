import { useState } from "react";

const Blogitems = [
  {
    id: 1,
    title: "Lagrange Multipliers in Optimization",
    pdf: "./Lagrange.pdf",
    comment: "When dealing with problems such as proving inequalities or finding maxima and minima, a constraint is often provided. Lagrange multipliers method is introduced as a powerful tool to solve such problems.",
  },
  {
    id: 2,
    title: "A discussion on Kiepert's Theorem",
    pdf: "./Kiepert.pdf",
    comment: "A brief discussion on a series of well-known geometry theorems and their generalization, Kiepert's Theorem.",
  },
  {
    id: 3,
    title: "Notes on Maxwell's Equations",
    pdf: "./Maxwell.pdf",
    comment: "Maxwell's equations are elegant not only because of the mathematical formulation but also their physical intiutions and applications in engineering disciplines.",
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
        <p>{current.comment}</p>

      <iframe src={current.pdf} 
      title={current.title} 
      width="800px" 
      height="600px" 
      style={{ border: "none" }} 
      />
      </div>
    </div>
  );
}

export default Blogs;