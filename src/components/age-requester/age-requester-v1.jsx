import axios from "axios";
import { useEffect, useState } from "react";

export default function AgeRequester({ firstname }) {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [onError, setError] = useState(false);
    console.log('Render !');

    useEffect(() => {
        //! Effect (Requete)
        let ignore = false;
        const controller = new AbortController();

        setLoading(true);
        setData(null);
        setError(false);

        axios.get('https://api.agify.io/', {
            signal: controller.signal,
            params: { name: firstname, country_id: 'be' }
        }).then(response => {
            if (ignore) return;

            setData(response.data);
            setLoading(false);
        }).catch(error => {
            if (ignore) return;

            setError(true);
            setLoading(false);
        })

        return () => {
            //! Cleanup
            ignore = true;
            controller.abort();
        };
    }, [firstname]);

    return (
        <div>
            Requester...
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