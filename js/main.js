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
            var s = "<table style='display: inline-block;width:80vw;margin-left:3vw;' cellpadding='15px'><tr><th></th><th></th></tr>";
            config.modeles.forEach(function (modele) {
                if ((filter.length == 0 && modele.score > 14) || (modele.score > 10 && filter.length > 0 && (modele.tags.length == 0 || modele.tags.indexOf(filter) > -1))) {
                    var desc = modele.description;
                    if (desc == null)
                        desc = modele.label;
                    desc = desc + " " + modele.conditions;
                    if (modele.id == null)
                        modele["id"] = "";
                    var run_url = "https://reducshare.com/?command=add_shop,add_promo(" + modele.id + ")";
                    var test_button = "<br><div style='margin-top:4px;padding:5px;font-size: x-small;pointer-events: none;' class='btn btn-secondary'>Tester</div>";
                    if (modele.share_bonus > 0)
                        desc = desc + "<br><small>la promotion commence à " + modele.direct_bonus + modele.symbol + ", et augmente de 1" + modele.symbol + " supplémentaire chaque fois qu'il la partage " + (1 / modele.share_bonus) + " fois</small>";
                    s = s + "<tr><td style='width:100px;text-align: center;margin:0px;'><a href='" + run_url + "'><img src='" + modele.picture + "' style='width:80px;'>" + test_button + "</a></td><td>" + desc + "</td>";
                    s = s + "</tr>";
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
                    if (!faq.id)
                        faq.id = "faq_" + i;
                    else
                        faq.id = "faq_" + faq.id;
                    s = s + template;
                    for (var j = 0; j < 3; j++) {
                        s = s.replace("faq_title", faq.title);
                        if (faq.content.startsWith("http")) {
                            faq.content = "<iframe src='" + faq.content + "' frameborder='0'></iframe>";
                        }
                        s = s.replace("faq_content", faq.content);
                        s = s.replace("faq_id", faq.id);
                        s = s.replace("faq_head_id", "head_" + faq.id);
                    }
                });
            }
            zone.innerHTML = s;
        });
    });
}
