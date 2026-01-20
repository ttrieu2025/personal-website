import { useState } from "react";

const Insightitems = [
  {
    id: 1,
    title: "Lagrange Multipliers in Optimization",
    pdf: "./Lagrange.pdf",
  },
  {
    id: 2,
    title: "Notes on Maxwell's Equations",
    pdf: "./Maxwell.pdf",
  },
    {
    id: 3,
    title: "Kiepert’s Theorem in Triangle Geometry",
    pdf: "./Kiepert.pdf",
  },
];

const Formulasheetitems = [
  { id: 3, code: "MATH 256", pdf: "./Math256.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-256.tex", title: "MATH 256 Formula Sheet"},
  { id: 4, code: "MATH 253", pdf: "./Math253.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-253.tex", title: "MATH 253 Formula Sheet"},
];

function Resources() {
  const [current, setCurrent] = useState(Insightitems[0]);

  return (
    <div className="page pt-20">
      <div className="blog-list pt-5">
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
        <h2 class="font-bold">{current.title}</h2><br/>
        <iframe
          src={current.pdf}
          className="w-full h-full border-0"

          style={{ 
            border: "none",
            width: "800px",
            maxWidth: "100%",
            height: "500px"
          }}
        />
        
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