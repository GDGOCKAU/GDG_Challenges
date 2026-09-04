import { colorForName, getInitials } from '../theme';

interface AvatarProps {
  name: string;
  size?: number;
  fontSize?: number;
  isCurrentUser?: boolean;
  ring?: string;
}

export default function Avatar({
  name,
  size = 36,
  fontSize = 12,
  isCurrentUser = false,
  ring,
}: AvatarProps) {
  const background = isCurrentUser ? '#3A7CF5' : colorForName(name || '');

  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 select-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: background,
        color: '#FFFFFF',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        boxShadow: ring ? `0 0 0 3px ${ring}` : undefined,
      }}
    >
      {getInitials(name)}
    </div>
  );
}
