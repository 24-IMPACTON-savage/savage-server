import { AppDataSource } from "../../datasource";
import { Post } from "../entity/post.entity";
import { FindAllPostDto, SavePostDto, locationDto } from "../../dto/entity.dto";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Location } from "../entity/location.entity";
import { DISTANCE, distance } from "../../util/function/distance";
import { ModifyDto } from "@src/dto/logic.dto";

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

export const findAllLocationByPostId = async (postId: number) => {
    return await locationRepository.findBy({ postId })
}

export const modifyPosting = async (modifyDto: ModifyDto, postId: number) => {
    let {name, todo, payment, unit, time, contact} = modifyDto

    const thisPost = await findPostById(postId)

    name = name ? name : thisPost.name
    todo = todo ? todo : thisPost.todo
    payment = payment ? payment: thisPost.payment 
    unit = unit ? unit : thisPost.unit 
    time = time ? time : thisPost.time
    contact = contact ? contact : thisPost.contact

    await postRepository.update({
        postId: thisPost.postId,
    },{
        seniorId: thisPost.seniorId,
        name,
        todo,
        payment,
        unit,
        time,
        contact
    })
}

export const removePosting = async (postId: number, seniorId: number) => {
    const thisPost = await findPostById(postId)
    if(!thisPost) throw new NotFoundException()

    if(thisPost.seniorId !== seniorId) throw new ForbiddenException()

    await postRepository.remove(thisPost)
}