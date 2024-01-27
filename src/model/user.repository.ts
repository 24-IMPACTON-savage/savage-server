import { Repository } from "typeorm";
import { Senior } from "./senior.entity";
import { Worker } from "./worker.entity";

export class UserRepository {
    constructor(
        private readonly seniorRepository: Repository<Senior>,
        private readonly workerRepository: Repository<Worker>,
    ) {}

    async findOneByContact(contact: string): Promise<boolean> {
        const isExistInSenior = await this.seniorRepository.findOneBy({contact})
        const isExistInWorker = await this.workerRepository.findOneBy({contact})

        if(isExistInSenior || isExistInWorker) return true
        return false
    }

    async saveSenior(contact: string, name: string, address: string): Promise<void> {
        await this.seniorRepository.save({
            contact, name, address
        })
    }
}