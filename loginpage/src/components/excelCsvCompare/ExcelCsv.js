import React, { useState } from 'react';

const ExcelCsv = () => {
  const [excelFileName, setExcelFileName] = useState('');
  const [csvFileName, setCsvFileName] = useState('');

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) setExcelFileName(file.name);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCsvFileName(file.name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-6 p-6 font-serif">
      <div className="max-w-6xl w-full px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
           EXCEL AND CSV COMPARE
        </h1>

        <div className="bg-purple-600 rounded-xl shadow-md p-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-white font-bold w-full">
            
            <div className="flex flex-col w-full">
              <label className="mb-1">
                Excel File:
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleExcelUpload}
                  className="mt-2 p-2 rounded text-black bg-white w-full"
                />
              </label>
              {excelFileName && (
                <p className="mt-1 text-sm text-yellow-200">Uploaded: {excelFileName}</p>
              )}
            </div>

           
            <div className="flex flex-col w-full">
              <label className="mb-1">
                CSV File:
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="mt-2 p-2 rounded text-black bg-white w-full"
                />
              </label>
              {csvFileName && (
                <p className="mt-1 text-sm text-yellow-200">Uploaded: {csvFileName}</p>
              )}
            </div>
          </div>

          <button
            className="mt-4 px-6 py-2 rounded-lg font-semibold bg-green-400 hover:bg-green-600 text-black transition duration-300 w-full lg:w-1/3 self-center"
            disabled={!excelFileName || !csvFileName}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelCsv;
