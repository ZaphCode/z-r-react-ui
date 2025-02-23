import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getAuthUserCards } from "../../api/card";
import Spinner from "../../components/ui/Spinner";
import { useCheckoutTabsStore } from "../../stores/checkoutTabs";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { CardTemp, useCheckoutDataStore } from "../../stores/checkoutData";
import { useAuthStore } from "../../stores/auth";
import useModal from "../../hooks/useModal";
import Modal from "../../components/ui/Modal";

const PaymentView = () => {
  // Fetch
  const { data, loading, err } = useFetch(getAuthUserCards, {});
  // Stores
  const saveCardCheck = useCheckoutDataStore((s) => s.saveNewCard);
  const selectedCard = useCheckoutDataStore((s) => s.selectedPaymentMethod);
  const authUser = useAuthStore((s) => s.user);
  const newCard = useCheckoutDataStore((s) => s.newCard);
  const setNewCard = useCheckoutDataStore((s) => s.setNewCard);
  const setSelectedTab = useCheckoutTabsStore((s) => s.setSelectedTab);
  const setPM = useCheckoutDataStore((s) => s.setSelectPaymentMethod);
  const setSaveCardCheck = useCheckoutDataStore((s) => s.setSaveNewCard);
  const [cardName, setCardName] = useState("");
  const [isOpen, open, close] = useModal();
  // Local state
  const [newCardReady, setNewCardReady] = useState(false);
  const [newCardSelected, setNewCardSelected] = useState(false);
  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  //* Functions
  function handleCheckboxChange() {
    if (!cardName && !saveCardCheck) {
      open();
    }
    setSaveCardCheck(!saveCardCheck);
  }

  const handleNextStep = async () => {
    if (!stripe || !elements) return toast.error("Stripe is not loaded");

    if (newCardSelected && newCard) {
      setPM(newCard);
    }

    if (newCardSelected && !newCard) {
      if (!newCardReady)
        return toast.error("Please fill in the card details", {
          duration: 3000,
          position: "bottom-right",
        });

      const card = elements.getElement(CardElement);

      if (!card) return toast.error("Card element not found");

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
        billing_details: {
          name: cardName || "New Card",
          phone: authUser?.customer_id,
        },
        metadata: { customer_id: authUser?.customer_id },
      });

      if (error) return toast.error("Failed to create payment method");

      const cardFromPM = paymentMethod.card;

      if (!cardFromPM) return toast.error("Card not found");

      const newCardTemp: CardTemp = {
        name: cardName || "New Card",
        payment_id: paymentMethod.id,
        ...cardFromPM,
      };

      setNewCard(newCardTemp);
      setPM(newCardTemp);
    }

    setSelectedTab("Confirmation");
  };

  useEffect(() => {
    if (!data || data.length === 0) setNewCardSelected(true);
    else setNewCardSelected(false);

    if (newCard && newCard.name === selectedCard?.name)
      setNewCardSelected(true);
  }, [data]);

  return (
    <div className="w-5/6 flex flex-col items-center mx-auto">
      <h3 className="text-center mb-4 mt-5 pfont text-lg font-semibold">
        Payment
      </h3>
      <form className="bg-white relative shadow-lg shadow-gray-200 mb-3 w-3/5 p-7">
        {(newCardSelected && newCard) || newCard ? (
          <div>
            <p className="pfont text-gray-600">
              <b>{newCard.name} </b>
              <b>{newCard.brand}</b> **** **** **** {newCard.last4}
            </p>
          </div>
        ) : (
          <CardElement
            onChange={(e) =>
              !e.empty && e.complete
                ? setNewCardReady(true)
                : setNewCardReady(false)
            }
          />
        )}
        <div className="absolute top-6 -right-10">
          <input
            onChange={(e) => {
              setNewCardSelected(e.target.checked);
              if (newCardSelected && newCard) setPM(newCard);
              else {
                setPM(null);
                setNewCardReady(false);
              }
            }}
            className={"scale-150"}
            checked={newCardSelected}
            type={"radio"}
            name=" "
            radioGroup="sexo"
          />
        </div>
      </form>
      <div className="pb-4 px-16 border-b-2 border-gray-300 mb-7">
        <label
          htmlFor="Option1"
          className="flex cursor-pointer items-start gap-4"
        >
          <div className="flex items-center">
            &#8203;
            <input
              disabled={!newCardSelected}
              type="checkbox"
              className="size-8 rounded border-gray-300"
              checked={saveCardCheck}
              onChange={handleCheckboxChange}
            />
          </div>
          <div
            className={`font-medium ${
              !newCardSelected ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {cardName ? (
              <p>
                Save "
                <button className="underline font-semibold" onClick={open}>
                  {cardName}
                </button>
                " for future payments
              </p>
            ) : (
              <p>Save card for future payments</p>
            )}
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
            <div className="w-5/6 p-3 flex flex-col gap-y-5">
              {data.map((card) => (
                <div
                  className={`cursor-pointer transition-all ease-in-out duration-300 ${
                    !newCardSelected && selectedCard?.name === card.name
                      ? "shadow-lg shadow-neutral-300 scale-105 "
                      : ""
                  }`}
                  onClick={() => {
                    setPM(card);
                    setNewCardSelected(false);
                  }}
                >
                  <div className="p-3 w-full bg-white">
                    <div key={card.id} className="flex justify-between p-2">
                      <p className="pfont truncate w-2/3">
                        <b className="text-sm mr-2 ">{card.brand}</b> "
                        {card.name}"
                      </p>
                      <p className="pfont">**** **** **** {card.last4}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-1/2 pfont text-gray-600 py-6 bg-white shadow-lg shadow-gray-200 text-center flex flex-col">
              No cards saved to display
            </div>
          )}
        </div>
      ) : (
        <div>
          {!loading && err && (
            <div className="w-3-4 px-5 pfont text-red-900 py-6 bg-white shadow-lg shadow-gray-200 text-center flex flex-col">
              ⚠ Error getting your saved cards
            </div>
          )}
        </div>
      )}
      <div className="mt-9">
        <button
          onClick={handleNextStep}
          className="border-2 text-gray-600 border-gray-600 px-5 py-2"
        >
          Continue
        </button>
      </div>
      <Modal closeFn={close} isOpen={isOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            close();
          }}
          className="w-full p-1"
        >
          <h4>Type the card name:</h4>
          <input
            autoFocus
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="New Card"
            className="bg-gray-100 focus:border-none my-2 py-2 px-4"
          />
          <div className="flex justify-center">
            <button onClick={close} className="underline font-bold">
              OK
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentView;
