var config;

function getParam():any {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi,
        ( m, key, value ):any => { vars[key] = value !== undefined ? value : '';}
    );
    return vars;
}

function getServer(){
    var server=getParam().server;
    if(server==null)server="https://reducshare.com";
    if(!server.startsWith("http"))server="http://"+server;
    return server;
}


function getModels(filter="") {
    fetch(getServer()+"/assets/config.json").then(function (r) {
        r.json().then(function (data) {
            config = data;
            var s = "<table style='display: inline-block;width:100%;margin-left:1vw;' cellpadding='15px'><tr><th></th><th></th></tr>";
            config.modeles.forEach((modele) => {
                if((filter.length==0 && modele.score>14) || (modele.score>10 && filter.length>0 && (modele.tags.length==0 || modele.tags.indexOf(filter)>-1))){
                    var desc=modele.description;
                    if(desc==null)desc=modele.label;
                    desc=desc+" "+modele.conditions;
                    if(modele.id==null)modele["id"]="";
                    var run_url="https://reducshare.com/?command=add_pseudo,add_shop("+modele.tags+"),add_promo("+modele.id+")";
                    var test_button="<br><div style='margin-top:4px;padding:5px;font-size: x-small;pointer-events: none;' class='btn btn-secondary'>Tester</div>";

                    if(modele.share_bonus>0)
                        desc=desc+"<br><span style='font-size: small;color:gray;'>";
                    if(modele.direct_bonus>0)desc=desc+"Quand il récupère le coupon, le client gagne immédiatement "
                            +modele.direct_bonus+modele.symbol+", et ";
                    else
                        desc=desc+"Le client récupère le coupon et ";

                    if(modele.share_bonus>0)desc=desc+"son gain augmente de 1"
                            +modele.symbol+" supplémentaire chaque fois qu'il le partage "+(1/modele.share_bonus)+" fois</span>";
                    s = s + "<tr><td style='width:100px;text-align: center;margin:0px;'><a href='"+run_url+"'><img src='"+modele.picture+"' style='width:80px;'>"+test_button+"</a></td><td>" + desc + "</td>";

                    s=s+"</tr>"
                }
            });
            s = s + "</table>";
            document.getElementById("zoneModels").innerHTML = s;
        });
    });
}


function createFaq(template:string="",zone:HTMLElement,file:string="/config.json"){
    fetch(getServer()+"/assets/"+file).then(function (r:any) {
        r.json().then(function (config) {
            var i = 0;
            var s = "";
            if (config.faqs != null) {
                config.faqs.forEach((faq) => {
                    if (!faq.id)
                        faq.id = "faq_" + i;
                    else
                        faq.id="faq_"+faq.id;

                    s =s + template;
                    for(var j=0;j<3;j++){
                        s=s.replace("faq_title", faq.title);
                        if(faq.content.startsWith("http") || faq.content.endsWith("html")){
                            faq.content="<div class='embed-responsive embed-responsive-16by9'><iframe width='100%' class='embed-responsive-item' src='"+faq.content+"' frameborder='0'></iframe></div>";
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
