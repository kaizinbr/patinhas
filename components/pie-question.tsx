"use client";

import { Pie, PieChart } from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

type Slice = { name: string; value: number; fill: string };

export default function PieQuestion({ data }: { data: Slice[] }) {
    const config: ChartConfig = Object.fromEntries(
        data.map((slice) => [slice.name, { label: slice.name }])
    );

    return (
        <ChartContainer config={config} className="mx-auto aspect-square max-h-80 w-full">
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    stroke="#ffffff"
                    strokeWidth={2}
                    label={(entry: { percent?: number }) => `${Math.round((entry.percent ?? 0) * 100)}%`}
                />
                <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="flex-wrap gap-y-1"
                />
            </PieChart>
        </ChartContainer>
    );
}