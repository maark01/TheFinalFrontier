import { db } from '../../db/model'
import { SqlStore } from '../../db/sql-store'
import { Astronaut } from './model'



export interface AstronautQuery {
    getAllAstronauts(): Promise<Astronaut[]>
}

export class SqlAstronautQuery extends SqlStore implements AstronautQuery {
    getAllAstronauts = async (): Promise<any> => {
       return await this.query<Astronaut, db.Astronaut>('SELECT pas.id, pas.name, pas.bio, ps.name, pi.image_url FROM public.astronaut pas JOIN public.status ps ON ps.id = pas.id JOIN public.image pi ON pi.id = pa.id ORDER BY pas.id ASC',
        [], 
        this.parseAstronaut)
    }

    private parseAstronaut(row: db.Astronaut): Astronaut {
        return {
            id: +row.id,
            name: row.name,
            bio: row.bio
        }
    }
}