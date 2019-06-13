import * as faker from 'faker';
import invoke from 'lodash.invoke';
import { getFakeDataForColumn } from './datatype-to-faker';

interface columnToFakerMap {
    [key: string]: string;
};

export function generateEntryFromModel (Entity: any, fakerMap:columnToFakerMap = {}) {
    const entry: any = {};

    Object.keys(Entity.rawAttributes).forEach(column => {
        if (fakerMap[column]) {
            entry[column] = invoke(faker, fakerMap[column]);
        } else {
            entry[column] = getFakeDataForColumn(Entity.rawAttributes[column]);
        }
    });

    return entry;
};