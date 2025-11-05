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

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: theme,
      displayMode: "single",
      isTransparent: false,
      locale: "en",
      interval: "1m",
      disableInterval: false,
      height: 400,
      symbol: symbol,
      showIntervalTabs: true,
      support_host: "https://www.tradingview.com",
    });
    container.current.appendChild(script);
    return () => {
      if (container.current) container.current.innerHTML = "";
    };
  }, [symbol, theme]);

  return (
    <div
      className="tradingview-widget-container order-1 shadow-2xl  "
      ref={container}
      style={{
        width: "100%",
        borderRadius: "1.2rem",
        overflow: "hidden",
      }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "1.2rem",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
