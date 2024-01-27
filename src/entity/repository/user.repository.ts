import { Senior } from "../entity/senior.entity";
import { Worker } from "../entity/worker.entity";
import { AppDataSource } from "../datasource";

const seniorRepository = AppDataSource.getRepository(Senior);
const workerRepository = AppDataSource.getRepository(Worker);

export const isExistContact = async (contact: string): Promise<boolean> => {
    const isExistSenior = await seniorRepository.findOneBy({ contact });
    const isExistWorker = await workerRepository.findOneBy({ contact });

    if (isExistSenior || isExistWorker) return true;
    return false;
};

export const saveSenior = async (name: string, address: string, contact: string): Promise<void> => {
    await seniorRepository.save({name, address, contact})
}