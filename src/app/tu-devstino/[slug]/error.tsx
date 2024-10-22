"use client"
export default function Error() {
  return (
    <div className="w-full flex items-center flex-col justify-center pt-14">
      <h1 className="text-4xl text-zinc-300 pb-4">Error</h1>
      <button
        className="text-xl text-zinc-300 bg-red-800 px-5 py-3 rounded-xl"
        onClick={() => window.location.reload()}
      >
        Intententa de nuevo
      </button>
    </div>
  );
}