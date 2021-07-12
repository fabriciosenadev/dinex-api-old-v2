import { EntityRepository, Repository } from "typeorm";
import { Launch } from "../models/Launch";

@EntityRepository(Launch)
 export class LaunchRepository extends Repository<Launch> {

 }