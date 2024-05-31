type ServiceStreetParameters = {
    latitude: number;
    longitude: number;
    bearing: number;
    tilt: number;
    pitch: number;
};

const ServiceStreet = function ({ latitude, longitude, bearing, tilt, pitch }: ServiceStreetParameters): string {
    const url = `https://www.google.com/maps?q&layer=c&cbll=${latitude},${longitude}&cbp=11,${bearing},${tilt},0,${pitch}&source=embed&output=svembed`;
    return url;
};

export default ServiceStreet;