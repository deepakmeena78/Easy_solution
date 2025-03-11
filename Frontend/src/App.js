import { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";
import Footer from "./Components/Home/Footer";
import Routing from "./Components/Routing";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";

function App() { 

  return (
    <>
      <Header />
      <Toaster />
      <Routing />
      <Footer />
    </>
  );
}

export default App;
