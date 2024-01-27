import { AppDataSource } from "../../datasource";
import { Post } from "../entity/post.entity";
import { SavePostDto } from "../../dto/entity.dto";

const postRepository = AppDataSource.getRepository(Post)

export const createPost = async (savePostDto: SavePostDto): Promise<void> => {
    const { location, contact, name, todo, payment, time, unit } = savePostDto

    await postRepository.save({
        location,
        contact,
        name,
        todo,
        payment,
        time,
        unit
    })
}