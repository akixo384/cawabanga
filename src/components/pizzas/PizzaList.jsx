import PizzaCard from "./PizzaCard";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Error from "../Error";
function PizzaList(){
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchPizzas() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    "https://661c0b88e7b95ad7fa6994c9.mockapi.io/pizza"
                );
                const data = await res.json();
                setPizzas(data);
            
            }
            catch(e){
                console.error(e);
                setIsError(true)
            } finally {
                setIsLoading(false);
            }
        }

        fetchPizzas();
    }, []);

    return(
        <section className="pizzas-page">
            <div className="container">
                <h1 className="title">Choice your pizza</h1>
                <div className="row">
                    {isLoading ? (<Loading />) :
                    (pizzas.map((pizza) => <PizzaCard pizza={pizza} key={pizza.id} />))
                    }
                    
                </div>
                {isError && <Error />}
            </div>
        </section>
    );
}

export default PizzaList;
