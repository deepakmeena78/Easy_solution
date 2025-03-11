import { useEffect, useState } from "react";

// Custom Card component
function Card({ children, className }) {
    return (
        <div className={`relative p-5 rounded-lg border transition duration-300 hover:scale-105 ${className}`}>
            {children}
        </div>
    );
}

// Custom Button component
function Button({ children, className }) {
    return (
        <button className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition ${className}`}>
            {children}
        </button>
    );
}

function Prime() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        let isMounted = true;

        fetch("https://api.example.com/pricing") // Replace with actual API
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setPlans(Array.isArray(data?.plans) ? data.plans : []);
                }
            })
            .catch(() => {
                // Fallback data in case of API failure
                setPlans([
                    { title: "Basic", price: "$5/mo", billed: "Billed annually", description: "Basic features", additional: "Limited access", highlighted: false },
                    { title: "Pro", price: "$15/mo", billed: "Billed annually", description: "All features", additional: "Unlimited access", highlighted: true },
                    { title: "Enterprise", price: "$30/mo", billed: "Billed annually", description: "Enterprise-level support", additional: "Custom features", highlighted: false }
                ]);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="flex-1 p-2">
            <div className="p-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AirDroid Personal Pricing Plan</h2>

                {/* Pricing Cards - Now Aligned at the Top */}
                <div className=" mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
                    {plans.length > 0 ? (
                        plans.map((plan, index) => (
                            <Card key={index} className={plan.highlighted ? "bg-blue-900 text-white" : "bg-white text-gray-900 border-gray-300"}>
                                {plan.highlighted && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-b-lg">
                                        Best Value
                                    </div>
                                )}

                                <div className="text-center">
                                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                                    <p className="text-2xl font-bold mb-1">{plan.price}</p>
                                    {plan.billed && <p className="text-sm opacity-80 mb-3">{plan.billed}</p>}

                                    <Button>Buy Now</Button>

                                    <ul className="text-sm mt-3 space-y-1">
                                        {plan.description && (
                                            <li className="flex items-center justify-center gap-2">
                                                ✅ {plan.description}
                                            </li>
                                        )}
                                        {plan.additional && (
                                            <li className="flex items-center justify-center gap-2">
                                                ✅ {plan.additional}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No plans available.</p>
                    )}
                </div>

                {/* Footer Benefits */}
                <div className="flex justify-center items-center gap-4 mt-4 text-gray-600 text-sm flex-wrap">
                    <p>💰 Money Back Guarantee</p>
                    <p>🔒 Secure Online Payment</p>
                    <p>💲 VAT Included in All Prices</p>
                    <p>🛠 Free Professional Support</p>
                </div>
            </div>
        </div>
    );
}

export default Prime;
