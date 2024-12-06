
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importando as nossas paginas que farão as nossas rotas

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Favoritos from "./pages/Favoritos";
import Erro from "./pages/Erro";

//Importando componentes

import Header from "./components/Header";

function RoutesApp(){

    return(

        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home />}/>
                <Route path="/filme/:id" element={ <Filme />}/>
                <Route path="/favoritos" element={ <Favoritos />}/>


                <Route path="*" element={ <Erro /> }/>
            </Routes>
        </BrowserRouter>

    )

}

export default RoutesApp;