function Home() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100 px-4">
        <div className="max-w-2xl bg-white p-10 rounded-2xl shadow-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6">
            Welcome to <span className="text-purple-600">Google File Upload</span> Project
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            A simple and secure platform to store, preview, and manage your personal files with ease.
          </p>
        </div>
      </div>
    );
  }
  
  export default Home;
  
  