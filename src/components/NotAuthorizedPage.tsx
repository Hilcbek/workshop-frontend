const NotAuthorizedPage = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-yellow-50 text-center px-4">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">🛑 Oops!</h1>
      <p className="text-xl text-gray-700 mb-6">
        Looks like you wandered somewhere you shouldn't be... 🤭
      </p>
      <p className="text-md text-gray-600 mb-8">
        This page is off-limits. Even the 🐱‍👤 ninjas can't get in!
      </p>
      <a
        href="/"
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded transition"
      >
        🚀 Take me Home
      </a>
    </div>
  );
}

export default NotAuthorizedPage;
