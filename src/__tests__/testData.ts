import { Applicable } from "../models/enums/Applicable";

const newUser = {
    full_name: "User Example",
    email: "user@example.com",
    password: "U2FsdGVkX185UQ1hgyMGAbhVixwpcZyxJ79/jM+yD1M=",
    verifyPass: "U2FsdGVkX189hEIbMbH4toFPs7qtu2BaTeTIG52Umz8="
};

const newCategory = {
    name: "Category Test",
    applicable: Applicable.In
}

export { newUser, newCategory };