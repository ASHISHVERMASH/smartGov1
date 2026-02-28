import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar"; // Navbar import karein
import Toast from "./components/Toast";   // Toast import karein

function App() {
  return (
    <BrowserRouter>
      {/* Toast sabse upar rahega taaki wo kisi bhi UI ke upar layer ban sake */}
      <Toast /> 
      
      {/* Navbar yahan rahega taaki wo har page (Home, Login, Dashboard) par dikhe */}
      <Navbar /> 
      
      {/* Main content routing ke hisaab se yahan change hota rahega */}
      <main className="min-h-screen">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;