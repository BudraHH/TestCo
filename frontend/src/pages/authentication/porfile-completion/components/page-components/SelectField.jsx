import { memo } from "react";

const SelectField = memo(({ id, label, value, onChange, options, ...props }) => (
    <div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-palatte-light mb-2">
            {label}
        </label>
        <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
            <select
                id={id}
                value={value}
                onChange={onChange}
                {...props}
                className="w-full bg-transparent text-palatte-light placeholder-palatte-dark focus:outline-none p-2 cursor-pointer"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
));

export default SelectField;
