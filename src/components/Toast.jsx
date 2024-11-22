import CloseIcon from './icons/CloseIcon';
import ErrorIcon from './icons/ErrorIcon';

function Toast({ message, onClose }) {
  return (
    <div
      id="toast-danger"
      className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <ErrorIcon />
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <CloseIcon />
      </button>
    </div>
  );
}

export default Toast;