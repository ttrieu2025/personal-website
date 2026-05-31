import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Insightitems = [
    {
    id: 1,
    title: "Superposition in Circuit Analysis",
    pdf: "./superposition.pdf",
  },
  {
    id: 2,
    title: "Lagrange Multipliers in Optimization",
    pdf: "./Lagrange.pdf",
  },
  {
    id: 3,
    title: "Maxwell's Equations in Physics",
    pdf: "./Maxwell.pdf",
  },
];

const Formulasheetitems = [
  { id: 4, code: "ELEC 221", pdf: "./Elec221.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/elec-221.tex", title: "ELEC 221 Formula Sheet" },
  { id: 5, code: "MATH 264", pdf: "./Math264.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-264.tex", title: "MATH 264 Formula Sheet" },
  { id: 6, code: "MATH 256", pdf: "./Math256.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-256.tex", title: "MATH 256 Formula Sheet" },
  { id: 7, code: "MATH 253", pdf: "./Math253.pdf", href: "https://github.com/ttrieu2025/latex-code/blob/main/math-253.tex", title: "MATH 253 Formula Sheet" },
];

function Resources() {
  const [current, setCurrent] = useState(Insightitems[0]);
  const [numPages, setNumPages] = useState(null);
  const [mobilePdfWidth, setMobilePdfWidth] = useState(320);
  const mobileViewerRef = useRef(null);

  useEffect(() => {
    const updatePdfWidth = () => {
      if (!mobileViewerRef.current) return;

      setMobilePdfWidth(Math.max(280, Math.min(mobileViewerRef.current.clientWidth - 8, 760)));
    };

    updatePdfWidth();

    const resizeObserver = new ResizeObserver(updatePdfWidth);
    if (mobileViewerRef.current) {
      resizeObserver.observe(mobileViewerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const selectResource = (item) => {
    setCurrent(item);
    setNumPages(null);
  };

  return (
    <div className="flex justify-center items-start min-h-screen mt-12 px-2 pb-12 sm:px-6">
      {/* MAIN CONTAINER - Increased max-width to 7xl (or max-w-full for maximum width) */}
      <div className="flex flex-col md:flex-row gap-8 bg-[#111111] border border-white/10 shadow-2xl rounded-[2.5rem] p-4 md:p-12 max-w-7xl w-full">
        
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
                  onClick={() => selectResource(item)}
                  className={`flex flex-col px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
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
            <div className="flex flex-col gap-2 items-center">
              {Formulasheetitems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => selectResource(item)}
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

          <div className="relative hidden w-full rounded-2xl overflow-hidden border border-white/5 bg-black/40 h-[700px] md:block">
            <iframe
              src={current.pdf}
              title="PDF Viewer"
              className="w-full h-full border-0"
            />
          </div>

          <div
            ref={mobileViewerRef}
            className="w-full rounded-2xl border border-white/5 bg-black/40 p-1 md:hidden"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {numPages ? `${numPages} pages` : "Loading"}
              </span>
              <a
                href={current.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 min-w-28 items-center justify-center rounded-full bg-white px-1 py-2 text-center text-sm font-bold leading-none !text-black">
                {" "} Download
              </a>
            </div>

            <Document
              key={current.pdf}
              file={current.pdf}
              loading={
                <div className="flex min-h-48 items-center justify-center text-sm text-gray-500">
                  Loading
                </div>
              }
              error={
                <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-gray-500">
                  <span>PDF preview unavailable.</span>
                  <a
                    href={current.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
                  >
                    Open PDF
                  </a>
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              <div className="flex flex-col items-center gap-4">
                {Array.from(new Array(numPages || 0), (_, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="overflow-hidden rounded-xl bg-white shadow-lg"
                  >
                    <Page
                      pageNumber={index + 1}
                      width={mobilePdfWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                ))}
              </div>
            </Document>
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
                  Any feedback or comments on these papers are greatly appreciated. Feel free to contact me.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Resources;
