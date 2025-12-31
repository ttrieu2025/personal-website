import { useState } from "react";

const Blogitems = [
  {
    id: 1,
    title: "Lagrange Multipliers in Optimization",
    pdf: "./Lagrange.pdf",
    comment: "Optimization notes",
  },
  {
    id: 2,
    title: "A Story about L'Hopital's Rule",
    pdf: "./LHopital.pdf",
    comment: "Limits",
  },
  {
    id: 3,
    title: "Notes on Maxwell's Equations",
    pdf: "./Maxwell.pdf",
    comment: "Some mathematicians and physicists argue that Euler's Identity or Einstein's Mass-Energy Equivalence Equation is the most elegant equation that humans have ever discovered. However, I stand with Maxwell's Equations on this topic because of the beauty in their mathematical formulation as well as their applications in engineering disciplines. While a passion for designing technology is a reason for me to pursue Electrical Engineering, studying the language of these equations is what keeps the fire alive.",
  },
];


function Blogs() {
  const [current, next] = useState(Blogitems[0]);

  return (
    <div className="blogs-layout">
      <div className="blog-list" >
        {Blogitems.map((item) => (
          <div>
            <a
              key={item.id}
              className={`Blogitems${current.id === item.id ? "active" : ""
                }`}
              onClick={() => next(item)}
            >
              {item.title}
            </a>
            <br />
          </div>
        ))}
      </div>


      <div className="blog-viewer">
        <h2>{current.title}</h2>
        <p>{current.comment}</p>

        <iframe
          src={current.pdf}
          title={current.title}
          width="100%"
          height="600px"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}

export default Blogs;