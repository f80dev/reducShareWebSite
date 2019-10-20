var config;
function getParam() {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (m, key, value) { vars[key] = value !== undefined ? value : ''; });
    return vars;
}
function getModels(filter) {
    if (filter === void 0) { filter = ""; }
    fetch("https://reducshare.com/assets/config.json").then(function (r) {
        r.json().then(function (data) {
            config = data;
            var s = "<table style='display: inline-block;width:70vw;margin-left:10vw;' cellpadding='15px'><tr><th></th><th></th></tr>";
            config.modeles.forEach(function (modele) {
                if ((filter.length == 0 && modele.score > 14) || (modele.score > 8 && filter.length > 0 && (modele.tags.length == 0 || modele.tags.indexOf(filter) > -1))) {
                    var desc = modele.description;
                    if (desc == null)
                        desc = modele.label;
                    desc = desc + " " + modele.conditions;
                    if (modele.share_bonus > 0)
                        desc = desc + "<br><small>1" + modele.symbol + " supplémentaire pour " + (1 / modele.share_bonus) + " partages</small>";
                    s = s + "<tr><td><img src='" + modele.picture + "' style='width:80px;'></td><td>" + desc + "</td></tr>";
                }
            });
            s = s + "</table>";
            document.getElementById("zoneModels").innerHTML = s;
        });
    });
}
