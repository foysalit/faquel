import { expect } from 'chai';
import { Sequelize } from 'sequelize';

import { Person, PersonSchema } from './fixtures';
import { generateEntryFromModel, generateEntryFromSchema } from '../src';

describe('Faquel', async () => {
    let sequelize: any, models: any = {};

    before(async () => {
        sequelize = new Sequelize({
            database: 'faquel_test',
            dialect: 'sqlite',
            username: 'root',
            password: '',
            storage: ':memory:',
        });

        models['Person'] = Person.init(sequelize);
        await sequelize.sync();
    });

    after(async () => {
        await sequelize.drop();
    });

    describe('generateEntryFromModel()', function () {
        it('Generates fake data based on column datatype', function () {
            const person = generateEntryFromModel(Person);
            expect(person).to.have.all.keys(Object.keys(models.Person.rawAttributes));

            expect(person.name).to.be.a("string");

            expect(person.dob).to.be.a("date");
            // test that auto generated fields are also tackled
            expect(person.createdAt).to.be.a("date");

            expect(person.id).to.be.a("number").above(0);
            expect(person.id % 1).to.equal(0);
            expect(person.annualIncome).to.be.a("number");
            expect(person.annualIncome % 1).to.be.above(0);
        });

        it('Generates fake data from externally passed faker methods', function () {
            const person = generateEntryFromModel(Person, {
                name: 'date.future'
            });
            
            expect(person.name).to.be.instanceOf(Date);
        });

        it('saves fake entry in database', async function () {
            const person = await models.Person.create(generateEntryFromModel(Person));
            const fromDb = await models.Person.findByPk(person.id);
            expect(person.dataValues).to.eql(fromDb.dataValues);
        });
    });

    describe('generateEntryFromSchema()', function () {
        it('Generates fake data based on column datatype', function () {
            const person = generateEntryFromSchema(PersonSchema);
            expect(person).to.have.all.keys(Object.keys(PersonSchema));

            expect(person.name).to.be.a("string");

            expect(person.dob).to.be.a("date");

            expect(person.annualIncome).to.be.a("number");
            expect(person.annualIncome % 1).to.be.above(0);
        });

        it('saves fake entry in database', async function () {
            const person = await models.Person.create(generateEntryFromSchema(PersonSchema));
            const fromDb = await models.Person.findByPk(person.id);
            expect(person.dataValues).to.eql(fromDb.dataValues);
        });
    });
});