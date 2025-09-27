import React, { useState } from "react";
import {
  CheckCircle,
  Calendar,
  BookOpen,
  School,
  FileText,
  Users,
  ChevronDown,
  ChevronUp,
  Edit,
  CreditCard,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdmissionTracker = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [expandedStep, setExpandedStep] = useState(null);
  const [notifyOn, setNotifyOn] = useState(true);

  const steps = [
    {
      id: 1,
      title: "Course Selection",
      date: "March 15",
      icon: BookOpen,
      description: "Choose your preferred course",
    },
    {
      id: 2,
      title: "College Selection",
      date: "March 22",
      icon: School,
      description: "Select colleges and submit applications",
    },
    {
      id: 3,
      title: "Admission Deadline",
      date: "April 30",
      icon: Calendar,
      description: "Final date for application submission",
      hasDropdown: true,
      subSteps: [
        {
          id: "form-fillup",
          title: "Application Form Fillup",
          description: "Complete and submit your admission application form",
          icon: Edit,
          status: "completed",
        },
        {
          id: "fees-payment",
          title: "Fees Payment",
          description: "Pay the required application and processing fees",
          icon: CreditCard,
          status: "current",
        },
      ],
    },
    {
      id: 4,
      title: "Document Verification",
      date: "May 15",
      icon: FileText,
      description: "Verify and submit required documents",
    },
    {
      id: 5,
      title: "Orientation Day",
      date: "June 10",
      icon: Users,
      description: "Attend college orientation program",
    },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "current":
        return "text-blue-600";
      default:
        return "text-gray-400";
    }
  };

  const getCurrentStatusText = () => {
    const current = steps.find((step) => step.id === currentStep);
    return current ? `${current.title}, ${current.date}` : "";
  };

  // Function to handle notify toggle and toast
  const handleNotify = () => {
    const nextValue = !notifyOn;
    setNotifyOn(nextValue);
    toast[nextValue ? "success" : "info"](
      nextValue ? "Notifications turned on!" : "Notifications turned off!",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admission Process</h1>
              <p className="text-blue-100 text-lg">
                Track your admission journey
              </p>
            </div>
            {/* Notify Me Button */}
            <button
              onClick={handleNotify}
              className={`font-semibold px-5 py-2 rounded-lg shadow transition ml-2 ${
                notifyOn
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {notifyOn ? "Notify Me" : "Off Notify"}
            </button>
          </div>
        </div>

        {/* Current Status */}
        <div className="px-6 py-6 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500 rounded-full p-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-blue-900">
                  Current: {getCurrentStatusText()}
                </h2>
              </div>
              <p className="text-blue-700">
                Your admission process is in progress
              </p>
            </div>
            <div className="bg-blue-500 rounded-full p-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="px-6 py-8">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-200 rounded-full"></div>
            <div
              className="absolute left-8 top-8 w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full transition-all duration-1000"
              style={{
                height: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            ></div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => {
                const status = getStepStatus(step.id);
                const IconComponent = step.icon;

                return (
                  <div key={step.id} className="relative flex items-center">
                    {/* Step Circle */}
                    <div
                      className={`
                      relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 
                      ${
                        status === "completed"
                          ? "bg-green-500 border-green-500"
                          : status === "current"
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-300"
                      }
                      shadow-lg transition-all duration-300
                    `}
                    >
                      {status === "completed" ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <IconComponent
                          className={`w-8 h-8 ${
                            status === "current"
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="ml-6 flex-1">
                      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`text-xl font-semibold ${getStatusColor(
                              status
                            )}`}
                          >
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-sm font-medium px-3 py-1 rounded-full ${
                                status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : status === "current"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {step.date}
                            </span>
                            {step.hasDropdown && (
                              <button
                                onClick={() =>
                                  setExpandedStep(
                                    expandedStep === step.id ? null : step.id
                                  )
                                }
                                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${getStatusColor(
                                  status
                                )}`}
                              >
                                {expandedStep === step.id ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              status === "completed"
                                ? "bg-green-500"
                                : status === "current"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span
                            className={`text-sm font-medium ${
                              status === "completed"
                                ? "text-green-600"
                                : status === "current"
                                ? "text-blue-600"
                                : "text-gray-500"
                            }`}
                          >
                            {status === "completed"
                              ? "Completed"
                              : status === "current"
                              ? "In Progress"
                              : "Pending"}
                          </span>
                        </div>

                        {/* Dropdown Content for Admission Deadline */}
                        {step.hasDropdown && expandedStep === step.id && (
                          <div className="mt-6 border-t border-gray-200 pt-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                              Application Process Steps
                            </h4>
                            <div className="space-y-4">
                              {step.subSteps.map((subStep) => {
                                const SubIconComponent = subStep.icon;
                                return (
                                  <div
                                    key={subStep.id}
                                    className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                  >
                                    {/* Sub-step Icon */}
                                    <div
                                      className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                                        subStep.status === "completed"
                                          ? "bg-green-100"
                                          : subStep.status === "current"
                                          ? "bg-blue-100"
                                          : "bg-gray-100"
                                      }`}
                                    >
                                      {subStep.status === "completed" ? (
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                      ) : (
                                        <SubIconComponent
                                          className={`w-6 h-6 ${
                                            subStep.status === "current"
                                              ? "text-blue-600"
                                              : "text-gray-400"
                                          }`}
                                        />
                                      )}
                                    </div>

                                    {/* Sub-step Content */}
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h5
                                          className={`font-semibold ${
                                            subStep.status === "completed"
                                              ? "text-green-700"
                                              : subStep.status === "current"
                                              ? "text-blue-700"
                                              : "text-gray-500"
                                          }`}
                                        >
                                          {subStep.title}
                                        </h5>
                                        <span
                                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                                            subStep.status === "completed"
                                              ? "bg-green-200 text-green-800"
                                              : subStep.status === "current"
                                              ? "bg-blue-200 text-blue-800"
                                              : "bg-gray-200 text-gray-600"
                                          }`}
                                        >
                                          {subStep.status === "completed"
                                            ? "Done"
                                            : subStep.status === "current"
                                            ? "Active"
                                            : "Pending"}
                                        </span>
                                      </div>
                                      <p className="text-gray-600 text-sm">
                                        {subStep.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Update Progress
              </h3>
              <p className="text-gray-600">
                Click to simulate moving to the next step
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep <= 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentStep(Math.min(steps.length, currentStep + 1))
                }
                disabled={currentStep >= steps.length}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdmissionTracker;
