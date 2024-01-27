import { AppDataSource } from "../../datasource";
import { Post } from "../entity/post.entity";
import { SavePostDto } from "../../dto/entity.dto";
import { NotFoundException } from "@nestjs/common";

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

export const findPostById = async (postId: number) => {
    const post = await postRepository.findOneBy({ postId })
    if(!post) throw new NotFoundException()

    return post
}