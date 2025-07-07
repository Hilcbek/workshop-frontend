const NotFound = () => {
  return (
    <div className="md:min-h-[90vh] flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <h1 className="text-7xl font-extrabold text-red-500 mb-4">404 😵</h1>
      <p className="text-2xl text-gray-800 mb-2">
        Uh-oh! You found the secret void. 🌌
      </p>
      <p className="text-gray-600 mb-6">
        Sadly, there’s nothing here. Not even cookies. 🍪❌
      </p>
      <a
        href="/"
        className="inline-block bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition"
      >
        🏠 Back to Safety
      </a>
    </div>
  );
};

export default NotFound;
