type ServiceStreetUrlParameters = {
    latitude: number;
    longitude: number;
    bearing: number;
    tilt: number;
    pitch: number;
};

const ServiceStreetUrl = function ({ latitude, longitude, bearing, tilt, pitch }: ServiceStreetUrlParameters): string {
    const url = `https://www.google.com/maps?q&layer=c&cbll=${latitude},${longitude}&cbp=11,${bearing},${tilt},0,${pitch}&source=embed&output=svembed`;
    return url;
};

export default ServiceStreetUrl;