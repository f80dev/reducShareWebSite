var config;
function start() {
    fetch("https://reducshare.com/assets/config.json").then(function (r) {
        r.json().then(function (data) {
            config = data;
            var s = "<table style='display: inline-block;width:90vw;margin-left:5vw;' cellpadding='15px'><tr><th></th><th></th></tr>";
            config.modeles.forEach(function (modele) {
                if (modele.score > 14) {
                    var desc = modele.description;
                    if (desc == null)
                        desc = modele.label;
                    s = s + "<tr><td><img src='" + modele.picture + "' style='width:60px;'></td><td>" + desc + " " + modele.conditions + "</td></tr>";
                }
            });
            s = s + "</table>";
            document.getElementById("zoneModels").innerHTML = s;
        });
    });
}
