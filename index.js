//#region // Global Variables
const mapDisplay = L.map('map', {
    zoom: 5,
    minZoom: 2,
    maxZoom: 10,
    zoomControl: false
});
const tileInfo = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};
const tiles = L.tileLayer(tileInfo.url, { attribution: tileInfo.attribution });
const zoomIcon = L.control.zoom({
    position: 'topright'
});
const fullScreenIcon = new L.Control.Fullscreen({
    position: 'topright'
});
const mapScale = L.control.scale({
    imperial: false
});
const markerIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/320px-International_Space_Station.svg.png',
    iconSize: [94, 60]
});
const markerPoint = L.marker([90, 0], {
    icon: markerIcon,
    title: 'Internation Space Station'
});
const circleRadius = L.circle([90,0], {
    radius: 80000,
    color: '#9c27b0',
    weight: 1
});
let api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
let centerISS = true;
//#endregion

function DrawMap() {
    mapDisplay.setView([0,0]);
    tiles.addTo(mapDisplay);
    mapDisplay.addControl(zoomIcon);
    mapDisplay.addControl(fullScreenIcon);
    mapScale.addTo(mapDisplay);
    markerPoint.addTo(mapDisplay);
    circleRadius.addTo(mapDisplay);
}
DrawMap();

async function GetData_ISS(){
    const promise = await fetch(api_url);
    const data = await promise.json();
    // console.log(data);
    return data;
}

async function UpdateData(){
    const pos_data = await GetData_ISS();
    const latLng = L.latLng(pos_data.latitude.toFixed(2), pos_data.longitude.toFixed(2));
    // console.log(latLng);
    let unit;
    let radiusObservation;
    if(pos_data.units == 'kilometers'){
        unit = 'km';
        radiusObservation = 80;
    }else{
        unit = 'miles';
        radiusObservation = 50;
    }
    if(centerISS){
        mapDisplay.panTo(latLng);
    }
    markerPoint.setLatLng(latLng);
    circleRadius.setLatLng(latLng);
    const iss_id = document.getElementById('iss-id');
    const iss_velocity = document.getElementById('iss-velocity');
    const iss_latitude = document.getElementById('iss-latitude');
    const iss_longitude = document.getElementById('iss-longitude');
    const iss_altitude = document.getElementById('iss-altitude');
    const iss_visibility = document.getElementById('iss-visibility');
    const iss_observability = document.getElementById('iss-observability');
    iss_id.innerHTML = pos_data.id;
    iss_velocity.innerHTML =  pos_data.velocity.toFixed(2) + ' ' + unit +'/h';
    iss_latitude.innerHTML =  pos_data.latitude.toFixed(2) + ' °';
    iss_longitude.innerHTML= pos_data.longitude.toFixed(2) + ' °';
    iss_altitude.innerHTML =  pos_data.altitude.toFixed(2) + ' ' + unit;
    iss_observability.innerHTML =  "Clearly observable within " + radiusObservation + unit + " radius of it's position for a limited time window.";
    if(pos_data.visibility == 'eclipsed'){
        iss_visibility.innerHTML =  "The ISS is in Earth's Shadow.";
    }else{
        iss_visibility.innerHTML =  "The ISS is in Daylight.";
    }
}

setInterval(() => {
    UpdateData();
}, 1000);