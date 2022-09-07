import Room from "../models/room.js";
import Hotel from "../models/hotel.js";

export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}});
        res.status(201).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom = async (req,res,next) => {
    try {
        const savedRoom = await newRoom.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true});
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId;

    try {
        await Room.findByIdAndDelete(req.params.id);
        await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id}});
        res.status(204).json("Room has been deleted");
    } catch (error) {
        next(error);
    }
}

export const getRoom = async (req,res,next) => {
    try {
        const Room = await Room.findById(req.params.id);
        res.status(200).json(Room);
    } catch (error) {
        next(error);
    }
}

export const getRooms = async (req,res,next) => {
    try {
        const Rooms = await Room.find(req.params.id);
        res.status(200).json(Rooms);
    } catch (error) {
        next(error);
    }
}
