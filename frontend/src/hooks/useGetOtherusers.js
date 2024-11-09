import axios from "axios"
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { otherUsers } from "../redux/userSlice"
const useGetOtherusers = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchotherusers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otherusers/${id}`, {
                    withCredentials: true
                });
                dispatch(otherUsers(res?.data?.otherusers))
            } catch (error) {
                console.log(error)
            }
        }
        fetchotherusers();
    }, [])

}

export default useGetOtherusers;