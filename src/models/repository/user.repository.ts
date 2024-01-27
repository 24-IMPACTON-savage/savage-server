import { Senior } from "../entity/senior.entity";
import { Worker } from "../entity/worker.entity";
import { AppDataSource } from "../../datasource";
import { SaveSeniorDto, SaveWorkerDto } from "../../dto/entity.dto";
import { NotFoundException } from "@nestjs/common";

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
    const { name, address, contact, hashed } = saveSeniorDto;
    await seniorRepository.save({
        name,
        hashed,
        address,
        contact,
    });
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

export const findByContactFromWorker = async (contact: string) => {
    const worker = await workerRepository.findOneBy({ contact });
    if(!worker) throw new NotFoundException()
    return worker
}

export const findSeniorByContact = async (contact: string) => {
    const senior = await seniorRepository.findOneBy({contact})
    if(!senior) throw new NotFoundException()
    return senior
} 

export const findSeniorById = async (seniorId: number) => {
    const senior = await seniorRepository.findOneBy({seniorId})
    if(!senior) throw new NotFoundException()
    return senior
}