import React, { useState } from 'react'

const ExcelCsv = () => {
  const [excelFileName, setExcelFileName] = useState('');
  const [csvFileName, setCsvFileName] = useState('');

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if(file){
      setExcelFileName(file.name);
    }
  };

  const handleCsvUpload = (e) =>{
    const file = e.target.files[0];
    if(file){
      setCsvFileName(file.name);
    }
  };









  return (
     <div className="bg-violet-500 p-6 md:p-12 flex flex-col gap-6 font-serif text-center ">
      <h2 className="text-white text-2xl font-bold">Upload Excel and CSV</h2>

      
      <div>
        <label className="block font-medium mb-1">Upload Excel File (.xlsx):</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleExcelUpload}
          className="block w-full text-sm text-gray-600"
        />
        {excelFileName && <p className="text-green-600 mt-1">✅ {excelFileName} uploaded</p>}
      </div>

      
      <div>
        <label className="block font-medium mb-1">Upload CSV File (.csv):</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCsvUpload}
          className="block w-full text-sm text-gray-600"
        />
        {csvFileName && <p className="text-green-600 mt-1">✅ {csvFileName} uploaded</p>}
      </div>
    </div>
  );
};


export default ExcelCsv