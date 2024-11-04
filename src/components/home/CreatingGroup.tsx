import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";
import Modal from "react-responsive-modal";
import CreatingGroupModal from "./CreatingGroupModal";
import { Dispatch, SetStateAction } from "react";

interface CreatingGroupProps {
  redownloadGroupsList: Dispatch<SetStateAction<void>>;
}

const CreatingGroup: React.FC<CreatingGroupProps> = ({
  redownloadGroupsList,
}) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          onOpenModal();
        }}
        className="text-green-500"
      >
        <IoIosAddCircle className="w-[30px] h-[30px] hover:opacity-90 hover:scale-105" />
      </button>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "creating-modal",
        }}
      >
        <CreatingGroupModal
          redownloadGroupsList={redownloadGroupsList}
          onClose={onCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CreatingGroup;
