import axios from "axios"


const getitems = (url) => axios.get(url);
const createitem = (url, item) => axios.post(url, item);


export const getMenuData = async (resturantID) => {
    try {
        const { data } = await getitems(`https://api.eatba.tk/menu/${resturantID}`);
        return data
    }
    catch (error) {
        console.log(error)
    }
}


export const getNearbyResturants = async () => {
    try {
        const { data } = await getitems(`https://api.eatba.tk/restaurants`);
        return data
    }
    catch (error) {
        console.log(error)
    }
}

// export const searchRequirement = async (depID, type) => {
//     try {
//         //console.log (todo)
//         const { data } = await createitem("http://127.0.0.1:8000/api/search/requirement", { "dep_id": depID, "type": type });

//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }