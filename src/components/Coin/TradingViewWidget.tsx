// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget({
  symbol,
  theme,
}: {
  symbol: string | null;
  theme: string;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const isDark = theme === "dark";
  const bgColor = isDark ? "#0c1427" : "#ffffff";
  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      hide_top_toolbar: true,
      hide_volume: true,
      interval: "D",
      style: "3",
      symbol: symbol,
      theme: theme,
      timezone: "Asia/Tehran",
      autosize: true,
      save_image: false,
      backgroundColor: bgColor,

      support_host: "https://www.tradingview.com",
    });
    container.current?.appendChild(script);
  }, [symbol, theme]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
