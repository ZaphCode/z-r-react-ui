import { getAuthUserCards } from "../../api/card";
import TrashIcon from "../../components/icons/TrashIcon";
import useFetch from "../../hooks/useFetch";

const PaymentMethodsView = () => {
  const { data, loading, err } = useFetch(getAuthUserCards, {});

  if (loading) return <div>Loading...</div>;

  if (err) return <div>Error: {err.message}</div>;

  return (
    <div className="w-5/6 flex flex-col">
      {data && data.length > 0 ? (
        <div className="w-5/6 flex flex-col gap-y-5">
          {data.map((card) => (
            <div className="relative">
              <div
                className={`cursor-pointer transition-all ease-in-out duration-300 `}
                onClick={() => {}}
              >
                <div className="p-3 w-full bg-white">
                  <div key={card.id} className="flex justify-between p-2">
                    <p className="pfont truncate w-2/3">
                      <b className="text-sm mr-2 ">{card.brand}</b> "{card.name}
                      "
                    </p>
                    <p className="pfont">**** **** **** {card.last4}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 -right-12">
                <button className="hover:scale-110 hover:text-red-500 transition-all ease-in duration-200">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-1/2 pfont text-gray-600 py-6 bg-white shadow-lg shadow-gray-200 text-center flex flex-col">
          No cards saved to display
        </div>
      )}
      <div>
        <button className="border-2 my-7 border-neutral-600 text-neutral-600 px-5 py-2">
          Add card
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodsView;
