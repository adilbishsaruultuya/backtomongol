export default function ToggleEnglish({
  isEnabled,
  setIsEnabled,
}: {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span>英語版を追加</span>
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={() => setIsEnabled(!isEnabled)}
        className="toggle"
      />
    </div>
  );
}
