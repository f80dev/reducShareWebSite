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
                if ((filter.length == 0 && modele.score > 14) || (modele.score > 10 && filter.length > 0 && (modele.tags.length == 0 || modele.tags.indexOf(filter) > -1))) {
                    var desc = modele.description;
                    if (desc == null)
                        desc = modele.label;
                    desc = desc + " " + modele.conditions;
                    if (modele.share_bonus > 0)
                        desc = desc + "<br><small>Et grace à ReducShare il gagne 1" + modele.symbol + " supplémentaire chaque fois qu'il partage le bon plan " + (1 / modele.share_bonus) + " fois</small>";
                    s = s + "<tr><td><img src='" + modele.picture + "' style='width:80px;'></td><td>" + desc + "</td></tr>";
                }
            });
            s = s + "</table>";
            document.getElementById("zoneModels").innerHTML = s;
        });
    });
}
function createFaq(template, zone, file) {
    if (template === void 0) { template = ""; }
    if (file === void 0) { file = "https://reducshare.com/assets/config.json"; }
    fetch(file).then(function (r) {
        r.json().then(function (config) {
            var i = 0;
            var s = "";
            if (config.faqs != null) {
                config.faqs.forEach(function (faq) {
                    s = s + template.replace("#faq_title", faq.title);
                    s = s.replace("#faq_content", faq.content);
                    if (!faq.id)
                        faq.id = "faq" + i;
                    s = s.replace("#faq_id", faq.id);
                    s = s.replace("#faq_head_id", "faq_head" + i);
                });
            }
            zone.innerHTML = s;
        });
    });
}
