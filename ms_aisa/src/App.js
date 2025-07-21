import "./App.css";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "./site/siteLayout";
import Home from "./site/outlet/home/home";
import Gallery from "./site/outlet/gallery/gallery/gallery";
import Map from "./site/outlet/map/map";
import Signup from "./site/outlet/user/signup/signup";
import Info from "./site/outlet/user/info/info";
import GalleryWrite from "./site/outlet/gallery/galleryWrite/galleryWrite";
import GalleryDetail from "./site/outlet/gallery/galleryDetail/galleryDetail";

function App() {
    return (
        <>
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery.go" element={<Gallery />} />
                    <Route path="/gallery.wrtie" element={<GalleryWrite />} />
                    <Route path="/gallery.detail/:no" element={<GalleryDetail />} />
                    <Route path="/map.go" element={<Map />} />
                    <Route path="/signup.go" element={<Signup />} />
                    <Route path="/info.go" element={<Info />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
