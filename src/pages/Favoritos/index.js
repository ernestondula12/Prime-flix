
import { useEffect, useState } from "react";
import './favoritos.css';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeflix");
        
        //verificando existencia da lista no localstorage
        setFilmes(JSON.parse(minhaLista) || []);


    }, [])


    function excluirFilme(id){

        //Filtrando filmes contidos no nosso array ou lista de filmes
        let filtroFilmes = filmes.filter((item) => {

            //Filtrar todos os itens que não são iguais ao que foi clicado

            return (item.id !== id)

        }) 

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso");

    }

    return(

        <div className="meus-filmes">
            <h1>Meus Filmes Favoritos</h1>

            {filmes.length === 0 && <span>Voce não possui nenhum filme salvo :(</span>}

               <ul>
                    {filmes.map((item) => {

                        return(

                            <li key={item.id}>
                                <span>{item.title}</span>

                                <div>
                                    <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                    <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                                </div>
                            </li>

                        )


                    })}
               </ul>

        </div>
    )

}

export default Favoritos;