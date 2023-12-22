(function($){
    "use strict";

    const app = {
        page: {
            define: define,
            subject: {},
            _getPage: _getPage,
            _init: _init,
            _display: _display
        },
        utils: {
            breadcrumbs: {
                path: localStorage.getItem("utils-breadcrumbs-path") ?? ""
            },
            session: {
                key: sessionStorage.getItem("utils-session-key") ?? ""
            },
            viewport: {}
        }
    }

    $.extend($.fn, {app: app});

    function define(obj, name){
        const _this = this;

        _this.$ = $;

        if(name != undefined && name.trim() != ""){
            _this.name = name;
        } else {
            throw new ReferenceError("Page name is not defined");
        }

        if(obj === undefined || Object.entries(obj).length === 0){
            throw new ReferenceError("Must provide initialization object");
        } else {
            const funcKeys = [
                "init",
                "display"
            ]
    
            let hasKeys = true;
    
            funcKeys.forEach((key) => {
                if(!Object.keys(obj).includes(key) || !hasKeys){
                    hasKeys = false;
                }
            })
    
            if(!hasKeys){
                throw new TypeError("Incorrect types in initialization object");
            }

            funcKeys.forEach((key) => {
                _this[key] = obj[key];
            })
        }

        _setup(_this);

    }

    
    function _setup(_this){
        var $page = _this._getPage();

        _this._init($page)
        .then(function($page){
            _this._display(_this.subject, $page);
        })
        .catch(function(error){
            console.error(error);
        })
    }

    function _init($page){
        var _this = this;
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                try{
                    _this.init($page);
                    resolve($page);
                } catch (error){
                    reject(error);
                }
            })
        })
    }

    function _display(subject, $page){
        var _this = this;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    initializeBreadCrumbs(_this, $page)
                    _this.display(subject);
                    resolve($page);
                } catch (error){
                    reject(error);
                }
            })
        })
    }

    function _getPage(){
        var _this = this,
            $page = $("#" + _this.name);
        
        _this.activePage = $page;
        
        return $page;
    }

    //TODO: this dont work
    function initializeBreadCrumbs(_this, $page){
        var title = $page.data("title");
        var breadCrumbs = $.fn.app.utils.breadcrumbs;
        var existingPath = breadCrumbs.path;
        var $breadCrumbsContainer = $page.find("div.breadcrumbs");
        if(existingPath != undefined && existingPath != null){
            // if(existingPath.split(" > ").includes(title)){
            //     if(existingPath.indexOf(title) === existingPath.length - 1){
            //         // do nothing
            //     } else {
            //         existingPath = existingPath.split(" > ").splice(existingPath.indexOf(title), 1).join(" > ") + " > " + title;
            //         breadCrumbs.path = existingPath;
            //     }
            // } else if (existingPath.trim() === ""){
                
            //     existingPath = title;
            //     breadCrumbs.path = existingPath;
            // } else {
                
            //     existingPath += " > " + title;
            //     breadCrumbs.path = existingPath;
                
            // }
            localStorage.setItem("utils-breadcrumbs-path", existingPath);
            $breadCrumbsContainer.html(existingPath);
        }
    }

})(jQuery);