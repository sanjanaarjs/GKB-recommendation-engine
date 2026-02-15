export interface ColorSwatch {
    label: string;
    hex: string;
}

export interface ColorSwatchesProps {
    colors: ColorSwatch[];
    maxVisible?: number;
}
