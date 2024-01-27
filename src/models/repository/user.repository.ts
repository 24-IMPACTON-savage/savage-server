import { Senior } from "../entity/senior.entity";
import { Worker } from "../entity/worker.entity";
import { AppDataSource } from "../../datasource";
import { SaveSeniorDto, SaveWorkerDto } from "../../dto/entity.dto";

const seniorRepository = AppDataSource.getRepository(Senior);
const workerRepository = AppDataSource.getRepository(Worker);

export const isExistContact = async (contact: string): Promise<boolean> => {
    const isExistSenior = await seniorRepository.findOneBy({ contact });
    const isExistWorker = await workerRepository.findOneBy({ contact });

    if (isExistSenior || isExistWorker) return true;
    return false;
};

export const saveSenior = async (
    saveSeniorDto: SaveSeniorDto
): Promise<void> => {
    const { name, address, contact } = saveSeniorDto;
    const newSenior = new Senior();
    newSenior.name = name;
    newSenior.address = address;
    newSenior.contact = contact;
    await seniorRepository.save(newSenior);
};

export const saveWorker = async (
    saveWorkerDto: SaveWorkerDto
): Promise<void> => {
    const { name, contact, introduce, country, expr, hashed, passport } = saveWorkerDto;
    await workerRepository.save({
        name,
        contact,
        introduce,
        country,
        expr,
        hashed,
        passport
    });
};

export const findByContact = async (contact: string) => {
    const senior = await seniorRepository.findOneBy({ contact });
    if (!senior) {
        const worker = await workerRepository.findOneBy({ contact });
        if (!worker) return null;
        return worker;
    }
    return senior;
};
