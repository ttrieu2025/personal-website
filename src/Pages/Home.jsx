
function Home() {
  return (
    <div className="page flex justify-center">
      <div
        className="
          bg-[#171716]
          rounded-2xl
          p-16
          max-w-5xl
          w-full
          shadow-lg
        "
      >
        <div className="intro flex gap-12 items-center">
          {/* Text */}
          <div className="intro-text flex flex-col gap-4 flex-1">
            <h2 className="font-bold text-3xl">Hi, I'm Trieu</h2>
            <p className="text-lg leading-relaxed">
              I am a 2nd-year Electrical Engineering student at UBC,
              focused on building a strong foundation in control and systems.
            </p>
          </div>

          {/* Image */}
          <div className="intro-image flex justify-center flex-1">
            <img
              src="/profile.png"
              alt="Circuit"
              className="
                rounded-lg
                shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:scale-105
                cursor-pointer
              "
              style={{
                width: "100%",
                maxWidth: "950px",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
