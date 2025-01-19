import base_url from "./baseUrl"
import commonApi from "./commonApi"

export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, 'POST', "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, 'POST', "", data)
}

export const createRoomApi = async (header, data) => {
    return await commonApi(`${base_url}/addroom`, 'POST', header, data)
}

export const fetchRoomsApi = async (header) => {
    return await commonApi(`${base_url}/getrooms`, 'GET', header, "")
}

export const deleteRoomApi = async (id, header) => {
    return await commonApi(`${base_url}/deleteroom/${id}`, 'DELETE', header, {})
}

export const updateRoomApi = async (id, header, data) => {
    return await commonApi(`${base_url}/updateroom/${id}`, 'PUT', header, data)
}

export const joinRoomApi = async (id, header) => {
    return await commonApi(`${base_url}/joinroom/${id}`, 'POST', header, {})
}

export const fetchJoinedRoomApi = async (header) => {
    return await commonApi(`${base_url}/getjoinedrooms`, 'GET', header, "")
}

export const sendMessageApi = async (id, header, data) => {
    return await commonApi(`${base_url}/sendmessage/${id}`, 'POST', header, data)
}

export const fetchMessageApi = async (id, header) => {
    return await commonApi(`${base_url}/fetchmessages/${id}`, 'GET', header, "")
}