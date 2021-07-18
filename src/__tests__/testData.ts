import { Applicable } from "../models/enums/Applicable";
import { PayMethod } from "../models/enums/PayMethod";
import { Status } from "../models/enums/Status";

const newUser = {
    full_name: "User Example",
    email: "user@example.com",
    password: "U2FsdGVkX185UQ1hgyMGAbhVixwpcZyxJ79/jM+yD1M=",
    verifyPass: "U2FsdGVkX189hEIbMbH4toFPs7qtu2BaTeTIG52Umz8="
};

const newCategory = {
    name: "Category Test",
    applicable: Applicable.In
};

const newLaunch = {
    date: "2021-07-11",
    category_id: 1,
    description: "Launch description",
    value: 100.00,
    status: Number(Status.Received)
};

const newPayMethod = {
    pay_method: Number(PayMethod.Debit),
};

export { newUser, newCategory, newLaunch, newPayMethod };