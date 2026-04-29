import axios  from "axios";

const geocode = async(address, callback) => {
    const mapboxURl =`https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${process.env.MAPBOX_TOKEN}`
    try{
        const res = await axios.get(mapboxURl);
        // console.log('features:::', res.data.features[0])
        if(res.data.features.length === 0){
            callback('Unable to find location, Try another search!', undefined)
        }else{
            callback(undefined, {
                latitude: res.data.features[0].properties.coordinates.latitude,
                longitude:res.data.features[0].properties.coordinates.longitude,
                location:res.data.features[0].properties?.full_address
            })
        }
    } catch (error){
        callback('Unable to connect to location services!', undefined)
    }
    
}

export default geocode ;