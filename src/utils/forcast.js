import axios from "axios";


const forcast = async(latitude, longitude, callback) => {
    console.log('weather:::',latitude, longitude, process.env.WEATHERSTACK_KEY)
    const URL = `https://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${latitude},${longitude}&units=f`;
    try{
        const { data } = await axios.get(URL);
        console.log('Success', data)
        callback(undefined, data?.current?.weather_descriptions+' It is currently ' + data.current.temperature + ' degrees out. There is a ' + data?.current?.precip + ' % chance of rain.');
        return data;
    }catch(error){
        if(error?.response?.data){
            console.log('test:::',)
            callback(error?.response?.data?.error?.info || 'Unable to find location..!', undefined);
        }else{  
            callback('Unable to connect weather services!', undefined);
        }
    }
    
}

export default forcast;