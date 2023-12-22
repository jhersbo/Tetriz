(function(jq){
    "use strict";
    jq.app.page.define({
        init: init,
        display: display
    }, "index");

    console.log(jq.app);

    function init($page){
        var _this = this,
            $ = _this.$;

        console.log($page);

        $page.on("click", "#canvas", function(){$(this).css("border", "1px solid red")});
    }

    function display(subject){
        var _this = this,
            $page = _this.activePage;
        
        $page.find("#canvas").css("border", "1px solid black");
    }

    function toggleBorder(element){
        var _this = this;
        var $ = _this.$;

        
    }
    

})(jQuery.fn);