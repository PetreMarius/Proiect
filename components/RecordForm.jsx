import { useRouter } from "next/router";
import React, { useState } from "react";

const RecordForm = ({ entry, onSubmit }) => {
  const router = useRouter();
  const [data, setData] = useState(entry);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleToggleCompletion = () => {
    setData({ ...data, completed: !data.completed });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {entry._id ? "Actualizează sarcina" : "Creează o sarcină nouă"}
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Denumirea sarcinii
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introdu titlul sarcinii"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Descrierea sarcinii
          </label>
          <textarea
            id="content"
            rows="4"
            value={data.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detalii despre sarcină..."
          ></textarea>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="completed"
            checked={data.completed}
            onChange={handleToggleCompletion}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="completed" className="text-sm text-gray-700">
            Marchează ca finalizată
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Anulează
          </button>
          <button
            type="button"
            onClick={() => onSubmit(data)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
          >
            {entry._id ? "Actualizează" : "Creează"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
