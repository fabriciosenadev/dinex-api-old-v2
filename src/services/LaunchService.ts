import { getCustomRepository } from "typeorm";
import { Launch } from "../models/Launch";
import { PayMethodLaunch } from "../models/PayMethodLaunch";
import { LaunchRepository } from "../repository/LaunchRepository";
import { PayMethodLaunchService } from "./PayMethodLaunchService";


export class LaunchService {
    public static async createAsync(launch: Launch, payMethodLaunch: PayMethodLaunch) {
        const launchRepository = await this.launchRepository();

        const newLaunch = await launchRepository.create(launch);
        await launchRepository.save(newLaunch);

        if (payMethodLaunch !== undefined) {
            payMethodLaunch.launch_id = newLaunch.id;
            const newPayMethod = await this.addPayMethodRelationToLaunch(payMethodLaunch);
            return { launch: newLaunch, payMethodLaunch: newPayMethod };
        }
        else
            return { launch: newLaunch };
    }

    public static async updateAsync() {
        // TODO: need to be implemented
    }

    public static async deleteAsync() {
        // TODO: need to be implemented
    }

    private static async launchRepository() {
        return getCustomRepository(LaunchRepository);
    }

    private static async addPayMethodRelationToLaunch(payMethodLaunch: PayMethodLaunch) {
        return await PayMethodLaunchService.addPayMethodRelationToLaunch(payMethodLaunch);
    }
}