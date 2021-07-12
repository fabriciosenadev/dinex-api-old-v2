import { EntityRepository, Repository } from "typeorm";
import { PayMethodLaunch } from "../models/PayMethodLaunch";

@EntityRepository(PayMethodLaunch)
 export class PayMethodLaunchRepository extends Repository<PayMethodLaunch> {

 }