import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Navbar />
      <main className="mx-20">
        <Hero />
      </main>
    </>
  );
}

export default App;
