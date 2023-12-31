import CancelButton from "../components/button/Cancel-button";
import DeleteButton from "../components/button/Delete-button";

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 backdrop-filter backdrop-blur-md bg-transparent"
        onClick={onClose}
      ></div>
      <div className="fixed z-50 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 w-80 md:w-96 h-auto text-white backdrop-blur-2xl bg-white/10  gap-4 p-4 rounded-2xl ">
        <div className="">
          <span>Are you sure you want to delete this note?</span>
          <div className=" flex gap-4 mt-4">
            <CancelButton onClick={onClose} color="purple" />
            <DeleteButton onClick={onConfirm} color="red" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
