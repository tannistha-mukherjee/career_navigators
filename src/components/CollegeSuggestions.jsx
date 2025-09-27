// CollegeSuggestions.jsx
import React, { useState } from "react";
import { MapPin, GraduationCap, X } from "lucide-react";

const CollegeSuggestions = () => {
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const colleges = [
    {
      title: "NIT Srinagar",
      location: "Jammu & Kashmir",
      seats: "6,000+",
      cutoff: "JEE Main 90+ percentile",
      fees: "₹1.2 LPA",
      highlights: ["Great placement", "Research Labs", "Beautiful Campus"],
      admissionProcess: "JEE Main + JoSAA Counseling",
      region: "jk",
    },
    {
      title: "University of Jammu",
      location: "Jammu",
      seats: "4,000+",
      cutoff: "Merit / CUET",
      fees: "₹50K - ₹80K",
      highlights: ["Good faculty", "Affordable", "Regional focus"],
      admissionProcess: "CUET / State Counseling",
      region: "jk",
    },
    {
      title: "IIT Delhi",
      location: "Delhi",
      seats: "1,200+",
      cutoff: "JEE Advanced Rank 1-5000",
      fees: "₹2.5 LPA",
      highlights: [
        "Top placements",
        "World-class research",
        "Global reputation",
      ],
      admissionProcess: "JEE Advanced + Counseling",
      region: "outside",
    },
    {
      title: "NIT Trichy",
      location: "Tamil Nadu",
      seats: "8,000+",
      cutoff: "JEE Main 97+ percentile",
      fees: "₹1.6 LPA",
      highlights: ["Excellent placement", "Top-ranked NIT", "Strong alumni"],
      admissionProcess: "JEE Main + JoSAA Counseling",
      region: "outside",
    },
    {
      title: "University of Delhi",
      location: "Delhi",
      seats: "10,000+",
      cutoff: "CUET Merit",
      fees: "₹30K - ₹70K",
      highlights: [
        "Affordable",
        "Vibrant campus life",
        "Diverse opportunities",
      ],
      admissionProcess: "CUET + Counseling",
      region: "outside",
    },
  ];

  const filteredColleges =
    filter === "all"
      ? colleges
      : colleges.filter((c) =>
          filter === "jk" ? c.region === "jk" : c.region === "outside"
        );

  return (
    <div className="flex justify-center mt-4">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-blue-900 transition-all duration-300 bg-blue-200 rounded-2xl shadow-md hover:shadow-xl hover:bg-blue-300 hover:scale-105 active:scale-95"
      >
        View Suggested Colleges
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Suggested Colleges
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter */}
            <div className="mb-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2"
              >
                <option value="all">All</option>
                <option value="jk">In Jammu & Kashmir</option>
                <option value="outside">Outside J&K</option>
              </select>
            </div>

            {/* College Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredColleges.map((college, idx) => (
                <div
                  key={idx}
                  className="rounded-xl shadow-lg border p-4 hover:shadow-xl transition-all duration-200"
                >
                  <h3 className="text-lg font-bold text-blue-700">
                    {college.title}
                  </h3>
                  <p className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {college.location}
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Seats:</strong> {college.seats}
                  </p>
                  <p className="text-sm">
                    <strong>Cutoff:</strong> {college.cutoff}
                  </p>
                  <p className="text-sm">
                    <strong>Fees:</strong> {college.fees}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Admission:</strong> {college.admissionProcess}
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                    {college.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeSuggestions;
