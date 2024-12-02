import { memo } from "react";

const InputField = memo(({ id, label, value, onChange, ...props }) => (
    <div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-palatte-light mb-2">
            {label}
        </label>
        <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
            <input
                id={id}
                value={value}
                onChange={onChange}
                {...props}
                className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
            />
        </div>
    </div>
));

export default InputField;
