import { FaUserEdit, FaCheckCircle, FaHandsHelping, FaStar } from "react-icons/fa";

const steps = [
    {
        icon: <FaUserEdit className="text-white text-xl" />, 
        title: "Register and Post Help Request",
        description: "Sign up and post your help request with relevant details. This helps in finding the right helper for you.",
    },
    {
        icon: <FaCheckCircle className="text-white text-xl" />, 
        title: "Admin Review and Approval",
        description: "Our team will review your request. If everything is clear, it will be approved and made visible to helpers.",
    },
    {
        icon: <FaHandsHelping className="text-white text-xl" />, 
        title: "Helper Assigned & Scheduling",
        description: "Once approved, the best available helper will be assigned and a schedule will be set for assistance.",
    },
    {
        icon: <FaStar className="text-white text-xl" />, 
        title: "Help Completed & Feedback",
        description: "After receiving help, you can provide feedback and rate your experience to improve the platform.",
    }
];

function HowItWorks() {
    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-[var(--light-blue)] py-16 px-6 md:px-16 text-gray-900">
            <h2 className="text-center text-3xl font-bold mb-8">How Our Platform Works</h2>
            <p className="text-center text-lg text-gray-600 mb-12">
                Our process is simple and transparent. Here’s how you can request and receive help effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md border-l-4 border-[var(--dark-blue)]">
                        <div className="w-12 h-12 bg-[var(--dark-blue)] flex items-center justify-center rounded-full">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Step {index + 1} | {step.title}</h3>
                            <p className="text-gray-700 mt-2">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HowItWorks;