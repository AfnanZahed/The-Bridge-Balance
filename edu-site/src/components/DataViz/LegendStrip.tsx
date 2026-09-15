/**
 * LegendStrip — plain HTML legend strip used beneath charts so readers never
 * have to rely on color-matching alone (dataviz discipline). Renderless helper.
 */

import React from "react";

export interface LegendStripProps {
  /** Label + CSS color pairs. Colors are inline `style.background` values. */
  items: Array<{ label: string; color: string }>;
}

export default function LegendStrip({
  items,
}: LegendStripProps): React.ReactElement {
  return (
    <div className="tbb-chart-legend" role="list" aria-label="Chart legend">
      {items.map((item) => (
        <span key={item.label} className="tbb-chart-legend__item" role="listitem">
          <span
            className="tbb-chart-legend__swatch"
            style={{ background: item.color } as React.CSSProperties}
            aria-hidden="true"
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}