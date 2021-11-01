import axios from 'axios';
export let GetValue = (userName,key,feedName) => {
    return axios({
        url: `https://io.adafruit.com/api/v2/${userName}/feeds/${feedName}/data?limit=1`,
        method: 'get',
        headers: {
            "X-AIO-Key": `${key}`,
            "Content-Type": 'application/json',
        },
    }).then(res=>res.data[0].value);
}

export let PostValue = async (userName,key,feedName,value) =>{
    await axios({
        url: `https://io.adafruit.com/api/v2/${userName}/feeds/${feedName}/data`,
        method: 'POST',
        data:{value},
        headers: {
            "X-AIO-Key": `${key}`,
            "Content-Type": 'application/json',
        }})
}
export let Value_control =(id,name,value) => {
    return JSON.stringify(
        {"id":id,
        "name":name,
        "data":value,
        "unit":""}
        )
}
