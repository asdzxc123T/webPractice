import { Route, Routes } from "react-router-dom";
import "./App.css";
import SiteLayout from "./site/siteLayout";
import Home from "./site/home/home";
import Gallery from "./site/gallery/gallery";
import Notice from "./site/notice/notice";

function App() {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/gallery.go" element={<Gallery />} />
                <Route path="/notice.go" element={<Notice />} />
            </Route>
        </Routes>
    );
}

export default App;
