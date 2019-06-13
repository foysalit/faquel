### Faquel
Generate fake data for your sequelize model directly from your sequelize schema.

### Installation
Install from npm `npm i faquel`

### Usage
This library exports a single function `generateEntryFromModel` that takes 2 arguments. First argument is a sequelize model instance which will be used as reference to generate fake data. Second argument is an optional object config that you can use to overwrite the default generated fake data with custom faker methods. Follow the examples below to get a better understanding.

#### Example 1
Let's start with a model that looks like:

```
export class Person extends Model {
    static init(sequelize: any) {
        const inst = super.init({
            name: {
                type: DataTypes.CHAR(20),
            },
            annualIncome: {
                type: DataTypes.DOUBLE(11, 2),
            },
            dob: {
                type: DataTypes.DATEONLY
            },
            option: {
                type: DataTypes.ENUM("1", "2", "3", "4"),
                allowNull: true,
            },
        }, {
            modelName: 'Person',
            timestamps: true,
            sequelize,
        });

        return inst;
    };
};
```

Assuming that you have followed sequelize guide and setup your *initialized* models in a container named `models`.

```
import { generateEntryFromModel } from 'faquel';

// other code.... i.e: setup for sequelize 
...

const fakePerson = generateEntryFromModel(models.Person);
/*
    fakePerson = { 
        id: 26651,
        name: 'Cupiditate nulla del',
        annualIncome: 80886196623.68,
        monthlyIncome: 20656,
        dob: 2018-08-09T13:37:39.846Z,
        option: '3',
        createdAt: 2019-01-03T00:12:40.279Z,
        updatedAt: 2018-08-29T13:52:40.877Z 
    };
*/
```

#### Example 2
That's great and all but the name doesnt look like a real name here, does it? This library uses faker.js under the hood and faker has a lot of nifty methods that can generate "realistic" data. Fortunately, you can use those too. 

```
const fakePerson = generateEntryFromModel(models.Person, {
    name: 'name.findName'
});
/*
    fakePerson = { 
        ... other columns
        name: 'John Doe',
        ... other columns
    };
*/
```

Notice how the name looks more like a real name in the example above? that's because of the 2nd object parameter we are passing to the `generateEntryFromModel` function specifies that the `name` column should use the `faker.name.findName()` method to generate it's value.

You can pass any [faker method](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html) name as a string like the example above.

### Contribute
PRs are more than welcome since right now, the library only supports a few of the column types from sequelize. 

To run the lib locally, you can clone the repo then run the following commands:

- `npm i` to install the dependencies
- `npm run build:watch` to compile typescript code and run the compiled code through nodemon so that you can develop without restarting the builder over and over again.
- `npm test` to run the only couple of tests we have right now. 