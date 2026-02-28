import Chat from './components/Chat';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white-800 mb-6">
        Simple AI Chatbot (Gemini Powered)
      </h1>
      <Chat />
    </div>
  );
}

export default App;