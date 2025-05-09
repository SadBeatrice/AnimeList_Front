import { Studio } from "./studio";
import { Category } from "./category";

export class Anime {
    id: number;
    name: string;
    synopsis: string;
    year: number;
    studio: Studio;
    categories: Category[] = [];

    constructor(
        id: number = 0,
        name: string = "",
        synopsis: string = "",
        year: number = 0,
        studio: Studio = new Studio(0, ""),
        categories: Category[] = []
    ) {
        this.id = id;
        this.name = name;
        this.synopsis = synopsis;
        this.year = year;
        this.studio = studio;
        this.categories = categories;
    }
}