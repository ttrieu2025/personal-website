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
];

const Formulasheetitems = [
  { id: 3, code: "MATH 264", pdf: "./Math264.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-264.tex", title: "MATH 264 Formula Sheet" },
  { id: 4, code: "MATH 256", pdf: "./Math256.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-256.tex", title: "MATH 256 Formula Sheet" },
  { id: 5, code: "MATH 253", pdf: "./Math253.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-253.tex", title: "MATH 253 Formula Sheet" },
];

function Resources() {
  const [current, setCurrent] = useState(Insightitems[0]);

  return (
    <div className="flex justify-center items-start min-h-screen mt-12 px-6 pb-12">
      {/* MAIN CONTAINER - Increased max-width to 7xl (or max-w-full for maximum width) */}
      <div className="flex flex-col md:flex-row gap-8 bg-[#111111] border border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 max-w-7xl w-full">
        
        {/* SIDEBAR: List of Items */}
        <div className="w-full md:w-1/4 flex flex-col gap-8">
          <div>
            <h3 className="text-white font-extrabold text-xs tracking-[0.2em] uppercase mb-4 opacity-50">
              Insights
            </h3>
            <div className="flex flex-col gap-2">
              {Insightitems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(item)}
                  className={`text-left px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                    current.id === item.id 
                    ? "bg-white text-black" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-extrabold text-xs tracking-[0.2em] uppercase mb-4 opacity-50 ">
              Formula Sheets
            </h3>
            <div className="flex flex-col gap-2">
              {Formulasheetitems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(item)}
                  className={`text-left px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                    current.id === item.id 
                    ? "bg-white text-black" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 flex flex-col gap-6">
          <div className="header">
            <h2 className="text-white font-extrabold text-3xl tracking-tight">
              {current.title || current.code}
            </h2>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-black/40 h-[700px]">
            <iframe
              src={current.pdf}
              title="PDF Viewer"
              className="w-full h-full border-0"
            />
          </div>

          {/* DYNAMIC FOOTER: Reserved space to prevent container jumping */}
          <div className="min-h-[24px]"> 
            {current.href ? (
              <p className="text-gray-500 text-sm italic">
                This is the{" "}
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  source code
                </a>{" "}
                in LaTeX that you can copy and edit. Good luck with your study!
              </p>
            ) : (
              <p className="text-gray-500 text-sm italic opacity-70">
                  Note: If the PDF doesn't load, try refreshing or checking your browser's PDF settings.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Resources;