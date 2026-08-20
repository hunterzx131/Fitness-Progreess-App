import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tdee from "./pages/Tdee";
import Infographics from "./pages/Infographics";

function App () {
  return(
    <BrowserRouter>
      <nav className="bg-slate-300 border-b border-slate-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive 
                ? "font-semibold text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tdee"
            end
            className={({ isActive }) =>
              isActive 
                ? "font-semibold text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }
          >
            TDEE Calculator
          </NavLink>
          <NavLink
            to="/infographics"
            end
            className={({ isActive }) =>
              isActive 
                ? "font-semibold text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }
          >
            Learn
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/tdee" element={<Tdee/>}/>
        <Route path="/infographics" element={<Infographics/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;