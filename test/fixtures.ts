import { Model, DataTypes } from 'sequelize';

export const PersonSchema = {
    name: {
        type: DataTypes.CHAR(20),
    },
    annualIncome: {
        type: DataTypes.DOUBLE(5, 2),
    },
    monthlyIncome: {
        type: DataTypes.MEDIUMINT({length: 7}),
    },
    dob: {
        type: DataTypes.DATEONLY
    },
    tabc_region: {
        type: DataTypes.ENUM("1", "2", "3", "4"),
        allowNull: true,
    },
};

export class Person extends Model {
    static init(sequelize: any) {
        const inst = super.init(PersonSchema, {
            modelName: 'Person',
            timestamps: true,
            sequelize,
        });

        return inst;
    };
};