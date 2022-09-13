import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import Details from "./Details";
import SearchParams from "./SearchParams";

const App = () => {
  const theme = useState("darkblue")
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />}></Route>
            <Route path="/" element={<SearchParams />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));