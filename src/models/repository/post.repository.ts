import { AppDataSource } from "../../datasource";
import { Post } from "../entity/post.entity";
import { SavePostDto } from "../../dto/entity.dto";
import { NotFoundException } from "@nestjs/common";
import { Location } from "../entity/location.entity";

const postRepository = AppDataSource.getRepository(Post)
const locationRepository = AppDataSource.getRepository(Location)

export const createPost = async (savePostDto: SavePostDto): Promise<void> => {
    const { location, contact, name, todo, payment, time, unit } = savePostDto

    const thisPost = await postRepository.save({
        contact,
        name,
        todo,
        payment,
        time,
        unit
    })

    location.map(async (x: string) => {
        await locationRepository.save({
            postId: thisPost.postId,
            location: x
        })
    })
}

export const findPostById = async (postId: number) => {
    const post = await postRepository.findOneBy({ postId })
    if(!post) throw new NotFoundException()

    return post
}