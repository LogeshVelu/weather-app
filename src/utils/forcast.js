import axios from "axios";


const forcast = async(latitude, longitude, callback) => {
    console.log(latitude, longitude)
    const URL = `https://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${latitude},${longitude}&units=f`;
    try{
        const res = await axios.get(URL)
        console.log('Success', res.data)
        callback(undefined, res.data?.current?.weather_descriptions+' It is currently ' + res.data.current.temperature + ' degrees out. There is a ' + res?.data?.current?.precip + ' % chance of rain.');
        return res.data;
    }catch(error){
        if(error?.response?.data){
            callback('Unable to find location..!', undefined);
        }else{  
            callback('Unable to connect weather services!', undefined);
        }
    }
    
}

export default forcast;