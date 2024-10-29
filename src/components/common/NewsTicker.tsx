import React, { useEffect, useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";

const NewsTicker = () => {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
      setTimestamp(`${hours}:${minutes}:${seconds}.${milliseconds}`);
    }, 50);

    const fetchHeadlines = async () => {
      try {
        const response = await fetch("/api/ticker");
        const data = await response.json();
        if (data.headlines) {
          setHeadlines(data.headlines);
        }
      } catch (error) {
        console.error("Error fetching headlines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeadlines();
    const headlineInterval = setInterval(fetchHeadlines, 300000);

    return () => {
      clearInterval(timer);
      clearInterval(headlineInterval);
    };
  }, []);

  return (
    <div className="w-full text-primary p-[5px] md:p-3 font-mono">
      <div className="flex items-center text-[8px] md:text-sm whitespace-nowrap overflow-hidden">
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Terminal className="h-4 w-4" />
          <span className="text-green-600">[{timestamp}]</span>
          <span className="text-blue-800 hidden md:block">AI Agents:</span>
          &nbsp;
        </div>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <span className="text-primary animate-[typing_3s_steps(40,end)]">
              Spawning AI Agents
            </span>
            <span className="animate-[blink_1s_step-end_infinite]">_</span>
            <span className="text-gray-400">(｡◕‿◕｡)</span>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <div className="animate-[ticker_5s_linear_infinite] md:animate-[ticker_15s_linear_infinite] flex items-center">
              {headlines.map((headline, index) => (
                <React.Fragment key={index}>
                  <span className="inline-flex items-center whitespace-nowrap">
                    {headline}
                  </span>
                  <ArrowRight className="mx-4 h-4 w-4 flex-shrink-0" />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink {
          from,
          to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
