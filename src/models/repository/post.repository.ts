import { AppDataSource } from "../../datasource";
import { Post } from "../entity/post.entity";
import { FindAllPostDto, SavePostDto, locationDto } from "../../dto/entity.dto";
import { NotFoundException } from "@nestjs/common";
import { Location } from "../entity/location.entity";
import { DISTANCE, distance } from "../../util/function/distance";

const postRepository = AppDataSource.getRepository(Post)
const locationRepository = AppDataSource.getRepository(Location)

export const createPost = async (savePostDto: SavePostDto): Promise<void> => {
    const { seniorId, location, contact, name, todo, payment, time, unit } = savePostDto

    const thisPost = await postRepository.save({
        seniorId,
        contact,
        name,
        todo,
        payment,
        time,
        unit
    })

    location.map(async (x: locationDto) => {
        await locationRepository.save({
            postId: thisPost.postId,
            location: x.location,
            latitude: x.latitude,
            longitude: x.longitude
        })
    })
}

export const findPostById = async (postId: number) => {
    const post = await postRepository.findOneBy({ postId })
    if(!post) throw new NotFoundException()

    return post
}

export const findAllPost = async (findAllPostDto: FindAllPostDto) => {
    const { latitude, longitude } = findAllPostDto
    return (await locationRepository.find()).filter(async location => {
        await distance(location.latitude, location.longitude, latitude, longitude) <= DISTANCE
    })
}