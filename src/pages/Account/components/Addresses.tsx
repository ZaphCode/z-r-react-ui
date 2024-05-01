import { getAuthUserAddresses } from "../../../api/addresses";
import Modal from "../../../components/Modal";
import useFetch from "../../../hooks/useFetch";
import useModal from "../../../hooks/useModal";

const Addresses = () => {
  const { data, err } = useFetch(getAuthUserAddresses, {});
  const [isNewAddrModalOpen, openNewAddrModal, closeNewAddrModal] = useModal();

  if (err) return <div>Error! {err.message}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <h4 className="font-bold pfont mb-3 text-neutral-700">
            My Addresses
          </h4>
          {data.length > 0 ? (
            <div></div>
          ) : (
            <div>
              <p className="text-neutral-500 text-lg">
                <b className="text-neutral-700">!</b> No registered addresses
                yet. It´s needed to have at least one to make a order, so your
                should create one.
              </p>
            </div>
          )}
          <button onClick={openNewAddrModal} className="underline mt-3 text-lg">
            Add new +
          </button>
          <Modal isOpen={isNewAddrModalOpen} closeFn={closeNewAddrModal}>
            <div className="w-72">
              <h3 className="text-2xl pfont font-bold">Hello world!</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, soluta blanditiis, consequatur minus harum
                cupiditate nam autem delectus molestias, in doloribus
                reprehenderit quasi ipsa. Iure illum saepe aperiam officia
                inventore ducimus possimus similique beatae, odio, laboriosam
                tempora aut, non voluptate culpa ipsum? Eaque libero facere
                cumque eius tempore cum rerum!
              </p>
            </div>
          </Modal>
        </div>
        <div className="">
          <div className="">
            <img
              className="max-h-60 w-full border-b-8 border-r-8 border-double border-gray-100"
              src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <h4 className="pfont text-lg font-semibold text-neutral-700 mt-3">
              Z&H Locations
            </h4>
            <p className="text-neutral-500 mt-2">
              From our headquarters at 123 Main Street to our regional office at
              456 Oak Avenue, <b className="text-neutral-700">Z&H</b>'s
              addresses are strategically positioned for your convenience.
              <br /> Connect with us easily for support, consultations, or just
              a friendly chat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
