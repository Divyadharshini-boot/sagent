import axios from "axios";

const BASE_URL = "http://localhost:8080/members";

export const registerMember = (member) => {
    return axios.post(BASE_URL, member);
};
