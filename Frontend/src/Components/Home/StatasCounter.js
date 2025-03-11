import { useEffect, useState } from "react";
import "../../App.css";

// Counter component
function Counter({ end, label }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Duration in ms
        const increment = end / (duration / 20);

        const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(counter);
                setCount(end);
            } else {
                setCount(Math.floor(start));
            }
        }, 20);

        return () => clearInterval(counter);
    }, [end]);

    return (
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-green-100 shadow-md">
            <h2 className="text-3xl font-bold text-green-600">{count}+</h2>
            <p className="text-gray-700">{label}</p>
        </div>
    );
}

// Main Component
function StatasCounter() {
    const stats = [
        { end: 1200, label: "Help" },
        { end: 1000, label: "Help providers" },
        { end: 700, label: "Good Review" },
    ];

    return (
        <div className="bg-green-50 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {stats.map((stat, index) => (
                    <Counter key={index} end={stat.end} label={stat.label} />
                ))}
            </div>
        </div>
    );
}

export default StatasCounter;
