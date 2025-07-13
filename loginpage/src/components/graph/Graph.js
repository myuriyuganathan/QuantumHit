import React, { useState } from "react";
import EquityChart from "./equity/EquityChart";
import FileUpload from "./equity/UploadFile";

const Graph = () => {
  const [equityData, setEquityData] = useState(null);
  const [view, setView] = useState(null);

  const handleUpload = (fileData) => {
    const lines = fileData.content.trim().split("\n");
    if (lines.length === 0) return;

    const headers = lines[0].split(",");
    const objects = lines.slice(1).map((line) => {
      const values = line.split(",");
      const entry = {};
      headers.forEach((key, index) => {
        entry[key] = values[index];
      });
      return entry;
    });

    setEquityData(objects);
  };

  return (
    <>
      
      <div className="bg-violet-500 p-6 md:p-12 flex flex-col gap-6 font-serif text-center ">
        <h2 className="text-white text-2xl font-bold">📊 Upload and View Equity Data</h2>

        <div className="flex flex-col md:flex-row md:items-end gap-6 text-black font-semibold justify-center">
          <div className="flex flex-col space-y-2">
            <FileUpload label="Upload Equity CSV" onFileParsed={handleUpload} />
            <button
              className={`mt-2 px-4 py-2 rounded-lg font-semibold ${
                equityData ? "bg-green-600 hover:bg-green-700" : "bg-blue-400 cursor-not-allowed"
              } text-white transition duration-300`}
              onClick={() => setView("equity")}
              disabled={!equityData}
            >
              Show Equity
            </button>
          </div>
        </div>
      </div>

     
      {view === "equity" && equityData && (
        <div className="bg-white p-8 min-h-screen w-full">
          <EquityChart data={equityData} />
        </div>
      )}
    </>
  );
};

export default Graph;
