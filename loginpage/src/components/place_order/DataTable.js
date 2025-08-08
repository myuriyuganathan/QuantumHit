import React, { useState } from "react";

const DataTable = ({ fileData, rowCount, onPlaceOrder }) => {
  const headers = fileData[0] || [];
  const rows = fileData.slice(1, rowCount === "All" ? undefined : parseInt(rowCount));

  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((_, i) => i));
    }
  };

  const toggleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const placeOrder = () => {
    alert(`Placed order for rows: ${selectedRows.join(", ")}`);
  };

  return (
    <div className="mt-4 bg-white rounded-xl p-4 shadow-md overflow-x-auto max-w-full">
      <table className="w-full border-collapse text-left table-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-center">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedRows.length === rows.length && rows.length > 0}
              />
            </th>
            {headers.map((header, i) => (
              <th
                key={i}
                className="border border-gray-300 p-2 font-semibold text-gray-700 text-xs break-words max-w-[130px]"
              >
                {header}
              </th>
            ))}
            <th className="border border-gray-300 p-2 font-semibold text-gray-700 text-xs text-center max-w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(i)}
                  onChange={() => toggleSelectRow(i)}
                />
              </td>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-gray-300 p-2 text-gray-600 text-xs break-words max-w-[130px]"
                >
                  {cell}
                </td>
              ))}
              <td className="border border-gray-300 p-2 text-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition"
                  onClick={() => alert(`Placed order for row ${i + 1}`)}
                >
                  Place Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRows.length > 0 && (
        <div className="mt-2 text-center">
          <button
            onClick={placeOrder}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Place Order for Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
