import { Anime } from "./anime";

export class Studio {
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