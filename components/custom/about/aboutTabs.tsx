"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PresentTab from "./presentTab";
import LegacyTab from "./legacyTab";
import LeadersTab from "./leadersTab";
import AwardsTab from "./awardsTab";

export default function AboutTabs() {
    return (
        <div className="w-full bg-black">
            <Tabs defaultValue="present" className="w-full">
                {/* Tabs header */}
                <TabsList
                    className="
            relative
            flex
            justify-between
            bg-transparent
            rounded-none
            h-16
            px-8
            w-full
            overflow-x-auto
          "
                >
                    <TabItem value="present" label="Our present" />
                    <TabItem value="legacy" label="Our legacy" />
                    <TabItem value="leaders" label="Our leaders" />
                    <TabItem value="awards" label="Our awards" />
                </TabsList>

                {/* Content */}
                <div>
                    <TabsContent value="present">
                        <PresentTab />
                    </TabsContent>
                    <TabsContent value="legacy">
                        <LegacyTab />
                    </TabsContent>
                    <TabsContent value="leaders">
                        <LeadersTab />
                    </TabsContent>
                    <TabsContent value="awards">
                        <AwardsTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

function TabItem({ value, label }: { value: string; label: string }) {
    return (
        <TabsTrigger
            value={value}
            className="
        relative
        text-white/70
        text-base
        font-normal
        px-6
        h-full
        rounded-none
        data-[state=active]:text-white
        data-[state=active]:font-medium
        data-[state=active]:after:content-['']
        data-[state=active]:after:absolute
        data-[state=active]:after:left-0
        data-[state=active]:after:bottom-0
        data-[state=active]:after:h-[2px]
        data-[state=active]:after:w-full
        data-[state=active]:after:bg-primary-100
        data-[state=active]:bg-transparent

      "
        >
            {label}
        </TabsTrigger>
    );
}
