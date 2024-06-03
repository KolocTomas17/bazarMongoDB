import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";

import CatView from "./CatView/CatView";
import CatList from "./CatList/CatList";
import CatCreateForm from "./CatCreateForm/CatCreateForm";
import CatUpdateForm from "./CatUpdateForm/CatUpdateForm";
import CreatedCat from "./CatCreateForm/CreatedCat";
import CatDeleted from "./CatView/CatDeleted";


import CarView from "./CarView/CarView";
import CarList from "./CarList/CarList";
import CarCreateForm from "./CarCreateForm/CarCreateForm";
import CarUpdateForm from "./CarUpdateForm/CarUpdateForm";
import CreatedCar from "./CarCreateForm/CreatedCar";
import CarDeleted from "./CarView/CarDeleted";

export default function AppRouters() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/cat/:id" element={<CatView />} />
                <Route path="/cats" element={<CatList />} />
                <Route path="/createcat" element={<CatCreateForm />} />
                <Route path="/updatecat/:id" element={<CatUpdateForm />} />
                <Route path="/createdcat/:id" element={<CreatedCat />} />
                <Route path="/deletedcat/:id" element={<CatDeleted />} />

                <Route path="/car/:id" element={<CarView />} />
                <Route path="/cars" element={<CarList />} />
                <Route path="/createcar" element={<CarCreateForm />} />
                <Route path="/updatecar/:id" element={<CarUpdateForm />} />
                <Route path="/createdcar/:id" element={<CreatedCar />} />
                <Route path="/deletedcar/:id" element={<CarDeleted />} />
            </Routes>  
        </BrowserRouter>
    )
    
}