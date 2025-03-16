interface StatusFilterProps {
  status: string;
  setStatus: (status: string) => void;
}

export default function StatusFilter({ status, setStatus }: StatusFilterProps) {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="select select-bordered"
    >
      <option value="">All Status</option>
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  );
}
