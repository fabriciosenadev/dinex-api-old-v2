import { EntityRepository, Repository } from "typeorm";
import { CategoryUser } from "../models/CategoryUser";

@EntityRepository(CategoryUser)
 export class CategoryUserRepository extends Repository<CategoryUser> {

 }