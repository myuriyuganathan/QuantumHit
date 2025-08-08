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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 mt-6 p-6 font-serif">
      <div className="max-w-6xl w-full px-4">
        <h1 className="text-3xl font-bold text-purple-800 mb-8">
          📊 Upload and View Equity Data
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-end gap-6 max-w-3xl mx-auto w-full">
          <div className="flex flex-col text-black font-bold w-full">
            <label className="mb-2"></label>
            <FileUpload label="Upload Equity CSV" onFileParsed={handleUpload} />
            <button
              className={`mt-4 px-6 py-2 rounded-lg font-semibold ${
                equityData
                  ? "bg-green-600 text-black hover:bg-green-700"
                  : "bg-black text-white cursor-not-allowed"
              } transition duration-300`}
              onClick={() => setView("equity")}
              disabled={!equityData}
            >
              Show Equity
            </button>
          </div>
        </div>

        {view === "equity" && equityData && (
          <div className="bg-white rounded-2xl shadow-lg p-10 mt-10 min-h-[500px]">
            <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
              📈 Equity Chart
            </h2>
            <EquityChart data={equityData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
