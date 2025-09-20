import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import type { OldMarket } from "../../utils/types/markets";

function SwiperCard({ symbol }: { symbol: string }) {
  const [related, setRelated] = useState<OldMarket[] | null>(null);

  async function getRelated(): Promise<void> {
    try {
      const response = await axios.get(
        `https://crypto-tracker-backend-xt56.onrender.com/related/coin/${symbol}`
      );
      setRelated(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err, "Error fetching related coins");
    }
  }

  useEffect(() => {
    getRelated();
    console.log(related);
  }, [symbol]);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tabs = ["ارزهای محبوب", "ارز های مشابه", "بیشترین سود", "بیشترین ضرر"];
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTab = tabRefs.current[activeIndex];

  const rect = currentTab  && currentTab.getBoundingClientRect();


  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="p-2 ">
        <ul className="relative flex items-center gap-4 text-subtle">
          {tabs.map((tab, index) => (
            <li
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                activeIndex === index ? "text-purple-600" : "text-gray-600"
              }`}
            >
              {tab}
            </li>
          ))}
          <span className="absolute right-0 top-full  h-1 w-24 bg-green-400 rounded-sm "></span>
        </ul>
      </div>
    </div>
  );
}

export default SwiperCard;
