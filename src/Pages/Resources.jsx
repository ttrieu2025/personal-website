import { useState } from "react";


const Insightitems = [
  {
    id: 1,
    title: "Lagrange Multipliers in Optimization",
    pdf: "./Lagrange.pdf",
    comment: "When dealing with problems such as proving inequalities or finding maxima and minima, a constraint is often provided. Lagrange multipliers method is introduced as a powerful tool to solve such problems.",
  },
  {
    id: 2,
    title: "Notes on Maxwell's Equations",
    pdf: "./Maxwell.pdf",
    comment: "Maxwell's equations are elegant not only because of their mathematical formulation but also because of their physical insights and applications in engineering disciplines.",
  },
];

const Formulasheetitems = [
  { id: 3, code: "MATH 256", pdf: "./Math256.pdf", href: "https://www.overleaf.com/read/zkqrdfbvtrjr#6f311d", title: "MATH 256 Formula Sheet"},
  { id: 4, code: "MATH 253", pdf: "./Math253.pdf", href: "https://www.overleaf.com/read/nqpjjnwgywwd#17331a", title: "MATH 253 Formula Sheet"},
];


function Resources() {
  const [current, setCurrent] = useState(Insightitems[0]);

  return (
    <div className="blogs-layout">
      <div className="blog-list">
        <button-fake> INSIGHTS </button-fake>
        {Insightitems.map((item) => (
          <div key={item.id}>
            <button
              className={`Insightitems${current.id === item.id ? " active" : ""}`}
              onClick={() => setCurrent(item)}
            >
              {item.title}
            </button>
            <br />
          </div>
        ))}
        <button-fake> FORMULA SHEETS </button-fake>
        {Formulasheetitems.map((item) => (
          <div key={item.id}>
            <button
              className={`Formulasheetitems${current.id === item.id ? " active" : ""}`}
              onClick={() => setCurrent(item)}
            >
              {item.code}
            </button>
            <br />
          </div>
        ))}
      </div>

      

<div className="blog-viewer">
  <h2>{current.title}</h2>
  {/* {current.comment && <p>{current.comment}</p>} */}
  <iframe
    src={current.pdf}
    width="800px"
    height="500px"
    style={{ border: "none" }}
  />
  
  {/* Only show LaTeX link for Formula Sheets */}
  {current.href && (
    <p>
      This is the{" "}
      <a
        href={current.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "underline" }}
      >
        source code
      </a>{" "}
      in LaTex that you can copy and edit. Good luck with your study!
    </p>
  )}
</div>
</div>
  );
}

export default Resources;

