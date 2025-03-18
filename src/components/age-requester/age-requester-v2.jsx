import axios from "axios";
import { useEffect, useState } from "react";

export default function AgeRequester({ firstname }) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [onError, setError] = useState(false);
    console.log('Render !');

    useEffect(() => {
        //! Effect (Requete)
        //? Necessaire pour gérer le cleanup 
        //? (-> Effet de bord avec le Mode Strict)
        let ignore = false;
        const controller = new AbortController();

        //? Modification du state
        setLoading(true);
        setData(null);
        setError(false);

        //? Fonction async pour utiliser la syntaxe "await"
        (async () => {
            //? Lancement de la Requete
            try {
                const response = await axios.get('https://api.agify.io/', {
                    signal: controller.signal,
                    params: { name: firstname, country_id: 'be' }
                });

                if (ignore) return;

                //? Traitement en cas de succes
                setData(response.data);
                setLoading(false);
            }
            catch (error) {
                if (ignore) return;

                //? Traitement en cas d'erreur
                setError(true);
                setLoading(false);
            }
        })();

        return () => {
            //! Cleanup
            ignore = true;
            controller.abort();
        };
    }, [firstname]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : !!data ? (
                <p>L'age de {data.name} est de {data.age} !</p>
            ) : onError && (
                <p>Une erreur s'est produite 😭</p>
            )}
        </div>
    );
}