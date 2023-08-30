const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="p-4">
      <div className="mb-4 text-lg font-medium dark:text-slate-200">
        {message}
      </div>
      <div className="flex justify-end">
        <Button
          className="mr-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
