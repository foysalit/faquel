import * as faker from 'faker';

export function getFakeDataForColumn (column: any): any {
    const typeKey = column.type.constructor.name;

    if (typeKey === 'Function') {
        if (column.type.key === 'TINYINT') {
            return faker.random.arrayElement([0, 1]);
        }
        
        if (column.type.key === 'DATE') {
            return generateDate();
        }
    }

    if (typeKey === 'String') {
        if (column.type === 'TIMESTAMP') {
            return generateDate();
        }

        if (column.type.includes('SET(')) {
            const validData = column.type.replace('SET(', '').replace(')', '').replace(/'/ig, '').split(',');
            return faker.random.arrayElement(validData);
        }
    }

    if (isNumber(typeKey)) {
        return generateNumber(column);
    }

    if (isString(typeKey)) {
        return generateString(column);
    }

    if (isDate(typeKey)) {
        return generateDate();
    }

    if (typeKey === 'ENUM') {
        return faker.random.arrayElement(column.values);
    }
};

const isNumber = (type: string): boolean => {
    return type.includes('SMALLINT')
        || type.includes('MEDIUMINT')
        || type.includes('INTEGER')
        || type.includes('BIGINT')
        || type.includes('TINYINT')
        || type.includes('DECIMAL')
        || type.includes('FLOAT')
        || type.includes('NUMERIC')
        || type.includes('DOUBLE')
        || type.includes('BIGINT');
};

const generateNumber = (column: any) => {
    const options: any = {};

    if (column.type._length) {
        let power = column.type._length;

        if (column.type._decimals) {
            power = power - column.type._decimals;
        }

        options.max = 10 ** (power - 1);
    }

    if (column.type._decimals) {
        options.precision = 1 / (10 ** column.type._decimals);
    }

    return faker.random.number(options);
};

const isString = (type: string): boolean => {
    return type.includes('VARCHAR')
        || type.includes('STRING')
        || type.includes('CHAR')
        || type.includes('TEXT');
};

const generateString = (column: any): string => {
    const str = faker.lorem.sentences();

    if (column.type._length && str.length > column.type._length) {
        return str.substr(0, column.type._length);
    }

    return str;
};

const isDate = (type: string): boolean => {
    return type.includes('DATE')
        || type.includes('DATETIME')
        || type.includes('DATEONLY');
};

const generateDate = () => {
    return faker.date.past();
};