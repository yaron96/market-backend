import { PageOptionsDto } from './page-options.dto';
interface IPageMetaDtoParameters {
    pageOptionsDto: PageOptionsDto;
    itemCount: number;
}
export declare class PageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters);
}
export {};
