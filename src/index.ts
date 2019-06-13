import * as faker from 'faker';
import invoke from 'lodash.invoke';
import { getFakeDataForColumn } from './datatype-to-faker';

interface columnToFakerMap {
    [key: string]: string;
};

/**
 * Function generateEntryFromModel
 * 
 * @param Entity - Any Sequelize Model instance 
 * @param fakerMap - optional object that can overwrite generated values by column. 
 * For example, if your model has a column `name` of type STRING, a value for this will be automatically generated.
 * However, if you want, you can pass {name: 'name.findName'} to ensure that instead of getting a random value, you get a proper name, generated by faker.name.findName() method
 * 
 */
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