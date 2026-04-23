import { Search } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  placeholder?: string;
  children?: ReactNode;
}

export default function FilterBar({
  search,
  onSearch,
  placeholder = "Search...",
  children,
}: Props) {
  return (
    <div className="filter-bar">
      <div className="search-input-wrap">
        <Search size={14} />
        <input
          className="form-input"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
}
