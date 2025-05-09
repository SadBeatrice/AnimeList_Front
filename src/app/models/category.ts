import { Anime } from "./anime";

export class Category {
    id: number;
    name: string;
    animes: Anime[];

    constructor(
        id: number = 0,
        name: string = "",
        animes: Anime[] = []
    ) {
        this.id = id;
        this.name = name;
        this.animes = animes;
    }
}