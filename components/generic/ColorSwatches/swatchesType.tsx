export interface ColorSwatch {
    label: string;
    hex: string;
    is_current?: string;
}

export interface ColorSwatchesProps {
    colors: ColorSwatch[];
    maxVisible?: number;
}
