import { BadRequestException } from "@nestjs/common"
import { FindAllPostDto, SavePostDto } from "../dto/entity.dto"
import { createPost, findAllPost, findPostById } from "../models/repository/post.repository"
import { findSeniorByContact } from "../models/repository/user.repository"
import { unitEnum } from "../util/types/writepost.types"
import { Request, Response } from "express"

const writePost = async (req: Request, res: Response) => {
    const { contact } = req.payload as any
    const { location, todo, payment, unit, time, latitude, longitude } = req.body

    const thisUser = await findSeniorByContact(contact)

    const thisUnit = 
        unit == unitEnum.hour ? unitEnum.hour :
        unit == unitEnum.day ? unitEnum.day :
        unit == unitEnum.month ? unitEnum.month :
        unit == unitEnum.week ? unitEnum.week :
        unitEnum.transaction

    const savePostDto: SavePostDto = {
        seniorId: thisUser.seniorId,
        contact,
        name: thisUser!.name,
        location,
        todo,
        payment,
        unit: thisUnit,
        time,
    }
    await createPost(savePostDto);

    return res.status(201).json({
        data: null,
        statusCode: 201,
        statusMsg: "Created"
    })
}

const getPost = async (req: Request, res: Response) => {
    const postId = Number(req.params.postId)

    const thisPost = await findPostById(postId);

    return res.status(200).json({
        data: thisPost,
        statusCode: 200,
        statusMsg: "OK"
    })
}

const getPostList = async (req: Request, res: Response) => {
    const { latitude, longitude } = req.query
    if(!latitude || !longitude) throw new BadRequestException()
    const findAllPostDto: FindAllPostDto = {
        latitude: Number(latitude),
        longitude: Number(longitude)
    }

    const postList = await findAllPost(findAllPostDto)

    return res.status(200).json({
        data: postList,
        statusCode: 200,
        statusMsg: "OK"
    })
}

export {
    writePost,
    getPost,
    getPostList
}