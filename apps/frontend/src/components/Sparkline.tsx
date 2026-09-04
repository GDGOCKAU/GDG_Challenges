interface SparklineProps {
  color: string;
  points?: number[];
  width?: number;
  height?: number;
}

export default function Sparkline({ color, points = [], width = 80, height = 32 }: SparklineProps) {
  if (points.length < 2) return <div style={{ width, height }} />;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points
    .map(
      (v, i) =>
        `${(i / (points.length - 1)) * width},${height - ((v - min) / (max - min || 1)) * height}`,
    )
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline points={`0,${height} ${pts} ${width},${height}`} stroke="none" fill={color} opacity="0.08" />
      <polyline
        points={pts}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}
