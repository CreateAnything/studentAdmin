export type LevelItem = { name: string; min: number; max: number };
export interface ChartProps extends LevelItem {
	count: number;
	percentage: number;
}
