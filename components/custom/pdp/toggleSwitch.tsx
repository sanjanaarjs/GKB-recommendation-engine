interface InStockToggleProps {
    enabled: boolean;
    onChange: (val: boolean) => void;
}

export default function InStockToggle({
    enabled,
    onChange,
}: InStockToggleProps) {
    return (
        <div className="flex items-center gap-2 my-[40px]">
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => onChange(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    enabled ? "bg-green-500" : "bg-gray-300"
                }`}
            >
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                        enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>

            <label
                onClick={() => onChange(!enabled)}
                className="cursor-pointer select-none font-helvetica font-light text-[1rem] leading-[22px] text-black"
            >
                Show only stores with available stocks
            </label>
        </div>
    );
}
