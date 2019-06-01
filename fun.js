function ShowHide(id) {
    const creditWindow = document.getElementById(id);
    let displayType;
    if(creditWindow.id == 'settings-tab'){
        displayType = 'grid'
    }else{
        displayType = 'block'
    }

    if(creditWindow.style.display == displayType){
        creditWindow.style.display = 'none';
    }else{
        creditWindow.style.display = displayType;
    }
}
function UnitSwitch(id) {
    const checkBox = document.getElementById(id);
    if(checkBox.checked == true){
        api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    }else{
        api_url = 'https://api.wheretheiss.at/v1/satellites/25544/?&units=miles';
    }
}
function CenterISS(id){
    const checkBox = document.getElementById(id);
    if(checkBox.checked == true){
        centerISS = true;
    }else{
        centerISS = false;
    }
}
function PathISS(id) {
    const checkBox = document.getElementById(id);
    if (checkBox.checked == true) {
        // Do Something
    }else{
        // Do Something
    }
}
function CloseTab(id) {
    const tab = document.getElementById(id);
    tab.style.display = 'none';
}