
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import { toast } from "react-toastify";

//importando o css do toast
import api from "../../services/api";


function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        async function loadFilme(){

            /*Requisição sendo feita de forma assincrona e nisto retorna uma promise
                e como sendo uma promise devemos lidar com casos de sucesso e erro usando
                o then e o catch
            */

            await api.get(`/movie/${id}`, {

                params:{

                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR"
                }
            })
            .then((response) => {

                setFilme(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(() => {

                console.log("FILME NÃO ENCONTRADO");
                navigate("/", { replace: true});
                return;
            })

        }

        loadFilme();

        return () => {

            console.log("COMPONENTE FOI DESMONTADO");
        }


    }, [])

    function salvarFilme(){

        const minhaLista = localStorage.getItem("@primeflix");

        //verificando se a lista existe e se ela não existir vamos criar um array vazio

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //Verificando se existe mais de um filme na lista
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){

            toast.warn("Esse filme já esta na sua lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");

    }

    if(loading){

        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )

    }


    return(

        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alert={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span><br/>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>

    )

}

export default Filme;