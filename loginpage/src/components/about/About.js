import React from 'react'

const About = () => {
  return (
    <>
      <div className='p-6 bg-violet-500'>
        <div className="text-white text-xl font-serif font-bold text-left">ABOUT</div>
      </div>

      <div className="p-6 bg-white text-gray-800 space-y-8 text-left">
        <section className="border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">📉About Quantum Hit</h2>
          <p>
            Quantum Hit is a modern trade analysis and comparison platform created to simplify how traders and analysts interact with financial data. It was built with a clear vision:
          </p>
          <p className="italic mt-2">
            To empower users to make smarter trade decisions by visualizing and comparing CSV and Excel data effortlessly.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">🔧 Project Build</h2>
          <p>This project is built using:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
            <li><strong>Frontend:</strong> ReactJS with Tailwind CSS for a clean, responsive UI</li>
            <li><strong>Backend:</strong> Node.js with Express.js for handling API logic</li>
            <li><strong>Database:</strong> PostgreSQL to manage user authentication and order tracking</li>
            <li><strong>Data Processing:</strong> File parsing and comparison of Excel/CSV files</li>
            <li><strong>Visualization:</strong> Plotly for graphing equity performance</li>
          </ul>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">⚙️ How It Works</h2>
          <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
            <li>✅ Upload Excel/CSV files containing trade data</li>
            <li>🔍 Filter by system name, date, or parameters</li>
            <li>📉 Compare files to detect mismatches or strategy gaps</li>
            <li>📊 Visualize equity trends and trade performance</li>
            <li>🧾 Place trades based on selected filtered rows</li>
            <li>🔐 Login System with JWT for secure access</li>
          </ul>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">👨‍💻 Built & Maintained By</h2>
          <p>
            Quantum Hit is actively developed and maintained by a passionate team of engineers with deep interest in fintech tools and automation.
          </p>
        </section>

        <section className="border-b pb-4">
          <h3 className="text-xl font-semibold mt-4">👑 Founder</h3>
          <p><strong>Tharun Bharath Ravichandran</strong></p>
          <p>CEO of Quantitative Pvt Ltd</p>
          <p className="italic">A visionary in the fintech space who leads the design and strategy of Quantum Hit.</p>
        </section>

        <section className="border-b pb-4">
          <h3 className="text-xl font-semibold mt-4">🧑‍💻 Website Developed By</h3>
          <p><strong>Myuri Yuganathan</strong></p>
          <p className="italic">Sole developer of the Quantum Hit platform, handling UI, backend, and database integration.</p>
        </section>

        <section className="pb-4">
          <h3 className="text-xl font-semibold mt-4">🧠 Strategy Developers</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li><strong>Keerthi</strong></li>
            <li><strong>Dhanush Bharath</strong></li>
          </ul>
          <p className="italic mt-1">Contributed to the core trading strategies and data logic behind Quantum Hit.</p>
        </section>
      </div>
    </>
  )
}

export default About
