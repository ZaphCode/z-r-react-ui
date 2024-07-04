import { useState } from "react";
import { useAsyncOnMount } from "../../../hooks/useAsyncOnMount";
import { getStripe } from "../../../lib/stripe";
import {Stripe, StripeCardElement} from "@stripe/stripe-js";
import useFetch from "../../../hooks/useFetch";
import { getAuthUserCards } from "../../../api/card";
import Spinner from "../../../components/Spinner";
import { useCheckoutTabsStore } from "../../../stores/checkoutTabs";

const PaymentView = () => {
  const [cardElement, setCardElement] = useState<StripeCardElement | null>();
  const [saveCardCheck, setSaveCardCheck] = useState(false);
  const setSelectedTab = useCheckoutTabsStore((store) => store.setSelectedTab);
  const [cardComplete, setCardComplete] = useState<boolean>()
  const { data, loading, err } = useFetch(getAuthUserCards, {});
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useAsyncOnMount(async () => {
    const stripeInstance = await getStripe()

    if (!stripeInstance) {
      return;
    }

    setStripe(stripeInstance)

    if (!stripe) {
        return;
    }

    const card = stripe.elements().create("card", {
      style: { base: { fontSize: "18px" } },
    });

    setCardElement(card);
    card.mount("#card-element");

    card.on("change", (event) => {
        console.log("aaa", event)
        if (event.complete) {
          setCardComplete(true);
        }
    });

    card.on("focus", () => {
        console.log("focus");
    });
  });

  const handleNextStep = () => {
    // validate card has valid data
    if (!cardComplete) {
      alert("Please fill in your card details");
      return;
    }

    stripe?.createPaymentMethod({
      type: "card",
      card: cardElement!,
    }).then((result) => {
      if (result.error) {
        alert("An error occured while processing your payment");
        return;
      }

      console.log(result.paymentMethod)
    });

    setSelectedTab("Confirmation");
  }

  return (
    <div className="w-5/6 flex flex-col items-center mx-auto">
      <h3 className="text-center mb-4 mt-5 pfont text-lg font-semibold">
        Payment
      </h3>
      <form className="bg-white shadow-lg shadow-gray-200 mb-3 w-3/5 p-7">
        <div id="card-element">{/* Stripe card element here */}</div>
      </form>
      <div className="pb-4 px-16 border-b-2 border-gray-300 mb-7">
        <label
          htmlFor="Option1"
          className="flex cursor-pointer items-start gap-4"
        >
          <div className="flex items-center">
            &#8203;
            <input
              type="checkbox"
              className="size-8 rounded border-gray-300"
              id="Option1"
              checked={saveCardCheck}
              onChange={() => setSaveCardCheck(!saveCardCheck)}
            />
          </div>
          <div>
            <strong className="font-medium text-gray-600">
              Save card for future payments
            </strong>
          </div>
        </label>
      </div>
      {loading && (
        <div className="">
          <Spinner />
          <p className="text-gray-500 pfont text-sm">Loading your cards...</p>
        </div>
      )}
      {!err ? (
        <div className="w-5/6 flex justify-center">
          {data && data.length > 0 ? (
            <div className="bg-white w-full p-3 flex flex-col">
              {data.map((card) => (
                <div key={card.id} className="flex justify-between p-2">
                  <p className="pfont">{card.brand}</p>
                  <p className="pfont">**** **** **** {card.last4}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-1/2 pfont text-gray-600 py-6 bg-white shadow-lg shadow-gray-200 text-center flex flex-col">
              ⚠ No cards saved to display
            </div>
          )}
        </div>
      ) : (
        // error
        <div></div>
      )}
      <div className="mt-9">
        <button
          onClick={handleNextStep}
          className="border-2 text-gray-600 border-gray-600 px-5 py-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentView;
