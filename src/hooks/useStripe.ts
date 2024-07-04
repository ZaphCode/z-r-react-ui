import {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";


function useStripe(props) {
    const [stripe, setStripe] = useState()
    useEffect(() => {
        (async () => {
            const stripeClient = await loadStripe("pk_test_51MOBXpG8UXDxPRbaBv41bKqV9i6l8bRHrk3SIIaAX82KIREPkczI6RE7fMS99fDc4uQxOnuZuuAfl3VyAjw4czYT00yxTqZ0PE")


        })();
    }, []);
}

export default useStripe;