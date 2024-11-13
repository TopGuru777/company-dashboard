import React from 'react';

interface CompanyListItemProps {
  company: { id: number; name: string };
  selected: boolean;
  onSelect: (id: number) => void;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({ company, selected, onSelect }) => (
  <li className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(company.id)}
        aria-label={`Select ${company.name}`}
        className="mr-2"
      />
      <span className="text-lg font-medium">{company.name}</span>
    </div>
  </li>
);

export default CompanyListItem;
