import { getCustomRepository } from "typeorm";
import { PayMethodLaunch } from "../models/PayMethodLaunch";
import { PayMethodLaunchRepository } from "../repository/PayMethodLaunchRepository";

export class PayMethodLaunchService {
    public static async addPayMethodRelationToLaunch(payMethodLaunch: PayMethodLaunch) {
        const payMethodLaunchRepository = await this.payMethodLaunchRepository();
        const launchRelation = payMethodLaunchRepository.create(payMethodLaunch);
        return await payMethodLaunchRepository.save(launchRelation);
    }

    private static async payMethodLaunchRepository() {
        return getCustomRepository(PayMethodLaunchRepository);
    }
}