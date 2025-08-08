import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import * as XLSX from 'xlsx';

const PlaceOrder = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState([]); 
  const [originalData, setOriginalData] = useState([]); // new state for full data
  const [filteredData, setFilteredData] = useState([]);
  const [rowCount, setRowCount] = useState("All");
  const [systemName, setSystemName] = useState("M_LDEQ_54");

  const selectedHeaders = [
    "Account", "BasketTag", "OrderId", "ParentOrderId", "Action", "Quantity",
    "Symbol", "TimeInForce", "OrderType", "LmtPrice", "OrderRef", "Percentage"
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploaded(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (!Array.isArray(jsonData) || jsonData.length === 0) {
        alert("Excel file is empty or invalid.");
        setIsUploaded(false);
        setFileName('');
        setFileData([]);
        setFilteredData([]);
        return;
      }

      const headerRow = jsonData[0].map(h => (h || '').toString());
      const headerIndexes = headerRow
        .map((h, i) => selectedHeaders.includes(h) ? i : -1)
        .filter(i => i !== -1);

      // Build filteredRows with selected columns only (including headers)
      const filteredRows = jsonData.map(row => headerIndexes.map(i => row[i] || ''));

      setFileData(filteredRows);
      setOriginalData(filteredRows);   // set full original data
      setFilteredData(filteredRows);   // show all initially
    } catch (err) {
      alert("Failed to read Excel file. Please upload a valid XLSX file.");
      setIsUploaded(false);
      setFileName('');
      setFileData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    if (originalData.length === 0) {
      setFilteredData([]);
      return;
    }

    if (systemName === "All") {
      setFilteredData(originalData);
      return;
    }

    const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, '');
    const normalizedHeaders = originalData[0].map(normalize);
    const orderRefIndex = normalizedHeaders.indexOf(normalize("OrderRef"));

    if (orderRefIndex === -1) {
      setFilteredData(originalData);
      return;
    }

    const filtered = originalData.filter((row, idx) => {
      if (idx === 0) return true;
      return row[orderRefIndex]?.trim().toLowerCase() === systemName.trim().toLowerCase();
    });

    setFilteredData(filtered);
  }, [systemName]);

  const handlePlaceOrder = (rowData) => {
    alert(`Placing order for Symbol: ${rowData[6]}, Quantity: ${rowData[5]}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-serif">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📝 Place Order Trade</h1>

        <div className="bg-violet-500 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-end gap-6">

          <div className="flex flex-col text-white font-bold">
            <label className="mb-2">Excel File Upload</label>
            <label
              className={`relative cursor-pointer px-6 py-2 rounded-lg transition duration-300 ${
                isUploaded
                  ? 'bg-green-600 text-black hover:bg-green-700'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isUploaded ? 'Uploaded ✅' : 'Upload XLSX File'}
              <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" />
            </label>
            {fileName && <span className="mt-2 text-xs">{fileName}</span>}
          </div>

          <div className="flex flex-col text-white font-bold">
            <label className="mb-2">System Name</label>
            <select
              className="rounded-lg px-4 py-2 text-black font-semibold"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
            >
              <option value="All">All</option>
              <option value="M_LDEQ_54">M_LDEQ_54</option>
              <option value="TRADQ2">TRADQ2</option>
              <option value="MARKETX">MARKETX</option>
            </select>
          </div>

          <div className="flex flex-col text-white font-bold">
            <label className="mb-2">Count</label>
            <select
              className="rounded-lg px-4 py-2 text-black font-semibold"
              value={rowCount}
              onChange={(e) => setRowCount(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="All">All</option>
            </select>
          </div>

        </div>

        {filteredData.length > 0 ? (
          <DataTable
            fileData={filteredData}
            rowCount={rowCount}
            onPlaceOrder={handlePlaceOrder}
          />
        ) : (
          <div className="mt-6 text-center text-gray-600">Upload a file and select a system to see data here.</div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
