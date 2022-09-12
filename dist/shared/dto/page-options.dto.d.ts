export declare class PageOptionsDto {
    readonly page: number;
    readonly take: number;
    readonly category: any;
    readonly minPrice: number;
    readonly maxPrice: number;
    readonly location: string;
    readonly minBuilt: number;
    readonly maxBuilt: number;
    readonly minLength: number;
    readonly maxLength: number;
    readonly minBeam: number;
    readonly maxBeam: number;
    readonly sort: string;
    get skip(): number;
}
