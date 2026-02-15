import { Button } from "@/components/ui/button";
import {
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import PlpPriceRangeFilter from "./plpPriceRangeFilter";
import Text from "@/components/generic/Text";
import { XIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function SheetDemo() {
    const filterTabs = [
        { value: "sort", label: "Sort" },
        { value: "category", label: "Category" },
        { value: "gender", label: "Gender" },
        { value: "frameColour", label: "Frame Colour" },
        { value: "shape", label: "Shape" },
        { value: "price", label: "Price" },
        { value: "brands", label: "Brands" },
        { value: "material", label: "Material" },
        { value: "lensType", label: "Lens type" },
        { value: "lensColor", label: "Lens color" },
        { value: "prescription", label: "Prescription" },
        { value: "noseBridge", label: "Nose Bridge" },
    ];

    const sortOptions = [
        { value: "popular", label: "Popular" },
        { value: "priceHighToLow", label: "Price (high to low)" },
        { value: "priceLowToHigh", label: "Price (low to high)" },
        { value: "newArrivals", label: "New arrivals" },
    ];

    const categoryOptions = [
        { value: "sunglasses", label: "Sunglasses" },
        { value: "eyeglasses", label: "Eyeglasses" },
        { value: "contact-lenses", label: "Contact lenses" },
    ];

    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    const colorOptions = [
        { label: "Black", value: "black", color: "bg-black" },
        { label: "Brown", value: "brown", color: "bg-[#6B4F3B]" },
        { label: "Gunmetal", value: "gunmetal", color: "bg-[#4B4B4B]" },
        { label: "Grey", value: "grey", color: "bg-gray-500" },
        { label: "Blue", value: "blue", color: "bg-[#2D5B75]" },
        { label: "Silver", value: "silver", color: "bg-gray-300" },
        { label: "Green", value: "green", color: "bg-green-700" },
        { label: "White", value: "white", color: "bg-white border" },
        { label: "Beige", value: "beige", color: "bg-[#F5F5DC]" },
        {
            label: "Transparent",
            value: "transparent",
            color: "bg-white border border-gray-200",
        },
        { label: "Copper", value: "copper", color: "bg-[#B87333]" },
        { label: "Yellow", value: "yellow", color: "bg-yellow-400" },
        { label: "Red", value: "red", color: "bg-red-600" },
        { label: "Orange", value: "orange", color: "bg-orange-500" },
        { label: "Purple", value: "purple", color: "bg-purple-600" },
    ];

    return (
        <SheetContent
            side="right"
            className="w-full lg:w-96 lg:min-w-[43%] gap-0 [&>button>svg:not(.keep)]:hidden"
        >
            <SheetHeader className="shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] px-10 py-6 absolute h-[72px] w-full bg-white flex-row justify-center">
                <SheetTitle className="text-center text-2xl w-full">
                    <Text size="productTitle" weight="bold">
                        Sort & Filter by
                    </Text>
                </SheetTitle>
                <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                    <XIcon className="size-5" />
                    <span className="sr-only">Close</span>
                </SheetClose>
            </SheetHeader>
            <div className="grid gap-4 mt-[72px]">
                <Tabs
                    defaultValue="sort"
                    className="flex h-full flex-row gap-0"
                >
                    {/* Left side tab list */}
                    <TabsList
                        className="flex flex-col w-35 rounded-none h-full items-start bg-background-grey-light p-0
                            overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300
                        "
                    >
                        {filterTabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="w-full justify-center text-center text-sm lg:text-xl font-light py-6 lg:py-8 px-0 rounded-none data-[state=active]:shadow-none
                                    data-[state=active]:font-bold cursor-pointer"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Right side tab content */}
                    <div className="flex-1 px-4 lg:px-8 py-6">
                        <TabsContent value="sort">
                            <RadioGroup
                                defaultValue="popular"
                                className="space-y-4"
                            >
                                {sortOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center space-x-3"
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={option.value}
                                            className="w-5 h-5
                                                data-[state=checked]:bg-black
                                                data-[state=checked]:border-black
                                                data-[state=checked]:text-white"
                                        />
                                        <Label
                                            htmlFor={option.value}
                                            className="text-lg cursor-pointer"
                                        >
                                            <Text
                                                size="customText7"
                                                weight="normal"
                                            >
                                                {option.label}
                                            </Text>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </TabsContent>

                        <TabsContent value="category">
                            <div className="grid grid-cols-2 gap-4">
                                {categoryOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="relative"
                                    >
                                        {/* Hide default checkbox */}
                                        <Checkbox
                                            id={option.value}
                                            className="peer sr-only"
                                        />
                                        {/* designing new label */}
                                        <Label
                                            htmlFor={option.value}
                                            className="cursor-pointer py-2 px-4 lg:py-4 lg:px-6 rounded-full border text-base
                                                        border-gray-300 text-black
                                                        peer-data-[state=checked]:border-black
                                                        peer-data-[state=checked]:bg-white"
                                        >
                                            <Text
                                                size="customText7"
                                                weight="normal"
                                            >
                                                {option.label}
                                            </Text>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="gender">
                            <RadioGroup
                                defaultValue="male"
                                className="grid grid-cols-2 gap-4 max-w-md"
                            >
                                {genderOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="relative"
                                    >
                                        {/* Hide default radio circle */}
                                        <RadioGroupItem
                                            value={option.value}
                                            id={option.value}
                                            className="peer sr-only"
                                        />
                                        {/* designing Custom radio */}
                                        <Label
                                            htmlFor={option.value}
                                            className="flex items-center justify-center w-full py-2 px-4 lg:py-4 lg:px-6
                                                            rounded-full border text-base cursor-pointer
                                                            border-gray-300 text-black
                                                            peer-data-[state=checked]:border-black
                                                            peer-data-[state=checked]:bg-white"
                                        >
                                            <Text
                                                size="customText7"
                                                weight="normal"
                                            >
                                                {option.label}
                                            </Text>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </TabsContent>

                        <TabsContent value="frameColour">
                            <div className="grid grid-cols-2 gap-4">
                                {colorOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="relative flex items-center"
                                    >
                                        {/* Hide default checkbox */}
                                        <input
                                            type="checkbox"
                                            id={option.value}
                                            className="peer sr-only"
                                        />
                                        {/* designing new label */}
                                        <label
                                            htmlFor={option.value}
                                            className={`w-full cursor-pointer py-2 px-4 lg:py-4 lg:px-6 rounded-full border text-base flex items-center gap-2
                                                            border-gray-300 text-black transition
                                                            peer-checked:border-black peer-checked:bg-white`}
                                        >
                                            {/* Color Circle */}
                                            <span
                                                className={`w-4 h-4 rounded-full ${option.color}`}
                                            />
                                            <Text
                                                size="customText7"
                                                weight="normal"
                                            >
                                                {option.label}
                                            </Text>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="shape">
                            <p className="text-gray-600">
                                Shape filters go here
                            </p>
                        </TabsContent>

                        <TabsContent value="price">
                            <PlpPriceRangeFilter />
                        </TabsContent>

                        <TabsContent value="brands">
                            <p className="text-gray-600">
                                Brands filters go here
                            </p>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
}
