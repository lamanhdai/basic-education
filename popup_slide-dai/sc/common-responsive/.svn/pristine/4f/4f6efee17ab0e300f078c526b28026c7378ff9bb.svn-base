var AeonGaSetting = function(url, settings){
	this.settings = settings;
	this.setting = {};
	this.sc = "";
	this.url = url;
	this.is_ssl = (this.url.match(/^https:.*/)) ? true : false;
	this.url.match(/https?:\/\/([^\/]+).*/);
	this.domain = RegExp.$1;
	this.url.match(/https?:\/\/[^\/]+(.*)/);
	this.path = RegExp.$1;
	this.obj = {};
	this.aeonRelatedDomains = ['www.aeon.jp','www.aeon-laketown.jp','.aeonsc.jp','www.aeonh-mail.jp','.aeon-h.jp','mail.aeon-laketown.jp','fofa.jp']
	
	// constructor
	this._init = function(){
		
		if(this.domain.match(/aeon\.jp/)){
			this.obj = new AeonJP(this);
		}else if(this.domain.match(/aeonsc\.jp/)){
			this.obj = new AeonscJP(this);
		}else if(this.domain.match(/^aeon\-laketown\.jp/)){
			this.obj = new AeonJP(this);
		}else if(this.domain.match(/aeonh\-mail\.jp/)){
			this.obj = new HokkaidoMail(this);
		}else if(this.domain.match(/^mail\.aeon\-laketown\.jp/)){
			this.obj = new LakeMail(this);
		}else{
			this.obj = new AeonJP(this);
		}
		
		this.setSetting();
	};
	this.getID = function(){
		return this.setting.id;
	};
	// devoluted function
	this.getSC = function(){
		return this.obj.getSC();
	}
	this.getCookiePath = function(){
		return this.setting.cookie_path;
	};
	this.setSetting = function(){
		if(this.isExistKey(this.getSC())){
			this.setting = this.settings[this.getSC()];
			return true;
		}
	};
	this.isExistKey = function(key){
		if(typeof(this.settings[key]) == 'undefined'){
			if(typeof(console) == 'object'){
				console.error("error: id of GA is not found ! please check your setting \nsc_name="+key);
			}
		}else{
			return true;
		}
	};
	this.isAeonRelatedDomain = function(access_domain, link_domain){
		if( access_domain != link_domain ){
			for(i in this.aeonRelatedDomains){
				if((link_domain+" ").indexOf(this.aeonRelatedDomains[i]+" ") !== -1) return true;
			}
		}
		return false;
	}
	
	//class for mailmaga by laketown
	var LakeMail = function(_parent){
		this.getSC = function(){
			return 'mori';
		};
	};
	// class for mailmaga by hokkaido
	var HokkaidoMail = function(_parent){
		this.getSC = function(){
			_parent.url.match(/https:\/\/www\.aeonh\-mail\.jp\/([^\-]+)\-entry.html/);
			return RegExp.$1;
		};
	};
	
	// class for aeonsc.jp
	var AeonscJP = function(_parent){
		this.getSC = function(){
			
			// campaign by HONBU KIKAKU
			if(_parent.url.match(/https:\/\/www\.aeonsc\.jp\/cam\/.*/)){
				return 'sc';
			};
			if(_parent.url.match(/https:\/\/www\.aeonsc\.jp\/senryuu\/.*/)){
				return 'sc';
			};
			
			// mori
			if(_parent.url.match(/https:\/\/www\.aeonsc\.jp\/mori\/.*/)){
				return 'mori';
			};

			
			if(_parent.is_ssl){
				// search sc_name from https://www.aeonsc.jp/<sc_name>/<path>
				_parent.url.match(/https?:\/\/[^\/]+\/([^\/]+)\/.*/);
				return RegExp.$1;
			}else{
				// search sc_name from http://<sc_name>.aeonsc.jp/<path>
				_parent.url.match(/https?:\/\/([^\.]+)\..*\/.*/);
				return RegExp.$1;
			}
		};
	};
	
	// class for aeon.jp
	var AeonJP = function(_parent){
		this.getSC = function(){
			// sc is already detected
			if(_parent.sc) return _parent.sc;
			
			for(var i in _parent.settings){
				var arrPath = _parent.settings[i]['path'].split(',');
				var arrSearch = _parent.settings[i]['search'].split(',');
				if( arrPath instanceof Array){
					
					for(var j in arrPath){
						// check settings
						if(typeof(arrSearch[j]) != 'string'){
							if(typeof(console) == 'object'){
								console.error("error:setting error [sc]=>"+i+",[path]=>"+arrPath[j]);
							}
							continue;
						}
						if( this.matchDomain(_parent.settings[i]['domain']) && this.matchPath(arrSearch[j], arrPath[j])){
							_parent.sc = i;
							return i;
						}
					}
				}else{
					if( this.matchDomain(_parent.settings[i]['domain']) && this.matchPath(_parent.settings[i]['search'], _parent.settings[i]['path'])){
						_parent.sc = i;
						return i;
					}
				}
			}
			if(typeof(console) == 'object'){
				console.error("error: id of GA is not found ! please check your setting \n[domain]=>"+_parent.domain+"\n[path]=>"+_parent.path);
			}
			return false;
		};
		this.matchDomain = function(target_domain){
			return ((" "+_parent.domain+" ").indexOf(" "+target_domain+" ") !== -1) ? true : false;
		}
		this.matchPath = function(search, target_path){
			if(typeof(eval("this.match"+search)) == 'function'){
				// function is exist
				return (eval("this.match"+search)(_parent.path,target_path) === true) ? true : false;
			}else{
				if(typeof(console) == 'object'){
					console.error("error:function [ match"+search+"(path,target_path) ] is not exists !");
					return false;
				}
			}
		}
		this.matchAll = function(path,target_path){
			return ((" "+path+" ").indexOf(" "+target_path+" ") !== -1) ? true : false;
		};
		this.matchPrefix = function(path,target_path){
			return ((" "+path).indexOf(" "+target_path) !== -1)? true : false;
		};
		this.matchMatch = function(path,target_path){
			return (path.match(target_path))? true : false;
		};
	};
	// init class
	this._init();
}
// settings for GA id
// search : "All" or "Prefix"
var sc_settings = {
'hokkaido':{
	'domain':'www.aeon.jp',
	'path':'/sc/hokkaido/',
	'search':'Prefix',
	'cookie_path':'/sc/hokkaido/',
	'id':'UA-25570508-1'
},
'asahikawanishi':{
	'domain':'www.aeon.jp',
	'path':'/sc/asahikawanishi/',
	'search':'Prefix',
	'cookie_path':'/sc/asahikawanishi/',
	'id':'UA-25570508-2'
},
'kushiroshowa':{
	'domain':'www.aeon.jp',
	'path':'/sc/kushiroshowa/',
	'search':'Prefix',
	'cookie_path':'/sc/kushiroshowa/',
	'id':'UA-25570508-3'
},
'sapporonaebo':{
	'domain':'www.aeon.jp',
	'path':'/sc/sapporonaebo/',
	'search':'Prefix',
	'cookie_path':'/sc/sapporonaebo/',
	'id':'UA-25570508-4'
},
'sapporohassamu':{
	'domain':'www.aeon.jp',
	'path':'/sc/sapporohassamu/',
	'search':'Prefix',
	'cookie_path':'/sc/sapporohassamu/',
	'id':'UA-25570508-5'
},
'tomakomai':{
	'domain':'www.aeon.jp',
	'path':'/sc/tomakomai/',
	'search':'Prefix',
	'cookie_path':'/sc/tomakomai/',
	'id':'UA-25570508-6'
},
'sapporohiraoka':{
	'domain':'www.aeon.jp',
	'path':'/sc/sapporohiraoka/',
	'search':'Prefix',
	'cookie_path':'/sc/sapporohiraoka/',
	'id':'UA-25570508-7'
},
'nayoro':{
	'domain':'www.aeon.jp',
	'path':'/sc/nayoro/',
	'search':'Prefix',
	'cookie_path':'/sc/nayoro/',
	'id':'UA-25570508-8'
},
'sapporosoen':{
	'domain':'www.aeon.jp',
	'path':'/sc/sapporosoen/',
	'search':'Prefix',
	'cookie_path':'/sc/sapporosoen/',
	'id':'UA-25570508-9'
},
'sapporomotomachi':{
	'domain':'www.aeon.jp',
	'path':'/sc/sapporomotomachi/',
	'search':'Prefix',
	'cookie_path':'/sc/sapporomotomachi/',
	'id':'UA-25570508-10'
},
'sapporonishioka':{
	'domain':'www.aeon.jp',
	'path':'/sc/sapporonishioka/',
	'search':'Prefix',
	'cookie_path':'/sc/sapporonishioka/',
	'id':'UA-25570508-11'
},
'sc':{
	'domain':'www.aeon.jp',
	'path':'/sc/,\/sc\/[^\/]+\.html$,/sc/cam/,/sc/sp/,/sc/mail/,/sc/map/,/sc/bargain_summer/',
       'search':'All,Match,Prefix,Prefix,Prefix,Prefix,Prefix',
	'cookie_path':'/sc/',
	'id':'UA-11691428-9'
},
'tomiya':{
	'domain':'www.aeon.jp',
	'path':'/sc/tomiya/',
	'search':'Prefix',
	'cookie_path':'/sc/tomiya/',
	'id':'UA-25590454-1'
},
'moriokaminami':{
	'domain':'www.aeon.jp',
	'path':'/sc/moriokaminami/',
	'search':'Prefix',
	'cookie_path':'/sc/moriokaminami/',
	'id':'UA-25590454-2'
},
'ishinomaki':{
	'domain':'www.aeon.jp',
	'path':'/sc/ishinomaki/',
	'search':'Prefix',
	'cookie_path':'/sc/ishinomaki/',
	'id':'UA-25590454-3'
},
'rifu':{
	'domain':'www.aeon.jp',
	'path':'/sc/rifu/',
	'search':'Prefix',
	'cookie_path':'/sc/rifu/',
	'id':'UA-25590454-4'
},
'mikawa':{
	'domain':'www.aeon.jp',
	'path':'/sc/mikawa/',
	'search':'Prefix',
	'cookie_path':'/sc/mikawa/',
	'id':'UA-25590454-5'
},
'omagari':{
	'domain':'www.aeon.jp',
	'path':'/sc/omagari/',
	'search':'Prefix',
	'cookie_path':'/sc/omagari/',
	'id':'UA-25590454-6'
},
'yamagatakita':{
	'domain':'www.aeon.jp',
	'path':'/sc/yamagatakita/',
	'search':'Prefix',
	'cookie_path':'/sc/yamagatakita/',
	'id':'UA-25590454-7'
},
'yamagataminami':{
	'domain':'www.aeon.jp',
	'path':'/sc/yamagataminami/',
	'search':'Prefix',
	'cookie_path':'/sc/yamagataminami/',
	'id':'UA-25590454-8'
},
'aeontown-koriyama':{
	'domain':'www.aeon.jp',
	'path':'/sc/aeontown-koriyama/',
	'search':'Prefix',
	'cookie_path':'/sc/aeontown-koriyama/',
	'id':'UA-25590454-9'
},
'sendainakayama':{
	'domain':'www.aeon.jp',
	'path':'/sc/sendainakayama/',
	'search':'Prefix',
	'cookie_path':'/sc/sendainakayama/',
	'id':'UA-25590454-10'
},
'aeontown-shiogama':{
	'domain':'www.aeon.jp',
	'path':'/sc/aeontown-shiogama/',
	'search':'Prefix',
	'cookie_path':'/sc/aeontown-shiogama/',
	'id':'UA-25590454-11'
},
'izumiosawa':{
	'domain':'www.aeon.jp',
	'path':'/sc/izumiosawa/',
	'search':'Prefix',
	'cookie_path':'/sc/izumiosawa/',
	'id':'UA-25590454-12'
},
'fukushima':{
	'domain':'www.aeon.jp',
	'path':'/sc/fukushima/',
	'search':'Prefix',
	'cookie_path':'/sc/fukushima/',
	'id':'UA-25590454-13'
},
'mori':{
	'domain':'www.aeon-laketown.jp',
	'path':'/mori/',
	'search':'Prefix',
	'cookie_path':'/mori/',
	'id':'UA-25619720-2'
},
'laketown':{
	'domain':'www.aeon-laketown.jp',
	'path':'/',
	'search':'Prefix',
	'cookie_path':'/',
	'id':'UA-25619720-1'
},
'tsuchiura':{
	'domain':'www.aeon.jp',
	'path':'/sc/tsuchiura/',
	'search':'Prefix',
	'cookie_path':'/sc/tsuchiura/',
	'id':'UA-25593134-1'
},
'shimotsuma':{
	'domain':'www.aeon.jp',
	'path':'/sc/shimotsuma/',
	'search':'Prefix',
	'cookie_path':'/sc/shimotsuma/',
	'id':'UA-25593134-2'
},
'sanoshintoshi':{
	'domain':'www.aeon.jp',
	'path':'/sc/sanoshintoshi/',
	'search':'Prefix',
	'cookie_path':'/sc/sanoshintoshi/',
	'id':'UA-25593134-3'
},
'oyama':{
	'domain':'www.aeon.jp',
	'path':'/sc/oyama/',
	'search':'Prefix',
	'cookie_path':'/sc/oyama/',
	'id':'UA-25593134-4'
},
'funabashi':{
	'domain':'www.aeon.jp',
	'path':'/sc/funabashi/',
	'search':'Prefix',
	'cookie_path':'/sc/funabashi/',
	'id':'UA-25594316-12'
},
'higashikurume':{
    'domain':'www.aeon.jp',
    'path':'/sc/higashikurume/',
    'search':'Prefix',
    'cookie_path':'/sc/higashikurume/',
    'id':'UA-25594316-13'
},
'urawamisono':{
	'domain':'www.aeon.jp',
	'path':'/sc/urawamisono/',
	'search':'Prefix',
	'cookie_path':'/sc/urawamisono/',
	'id':'UA-25593134-5'
},
'kitatoda':{
	'domain':'www.aeon.jp',
	'path':'/sc/kitatoda/',
	'search':'Prefix',
	'cookie_path':'/sc/kitatoda/',
	'id':'UA-25593134-6'
},
'yono':{
	'domain':'www.aeon.jp',
	'path':'/sc/yono/',
	'search':'Prefix',
	'cookie_path':'/sc/yono/',
	'id':'UA-25593134-7'
},
'itabashi':{
	'domain':'www.aeon.jp',
	'path':'/sc/itabashi/',
	'search':'Prefix',
	'cookie_path':'/sc/itabashi/',
	'id':'UA-25593134-8'
},
'kamisato':{
	'domain':'www.aeon.jp',
	'path':'/sc/kamisato/',
	'search':'Prefix',
	'cookie_path':'/sc/kamisato/',
	'id':'UA-25593134-9'
},
'noa-senmonten':{
	'domain':'www.aeon.jp',
	'path':'/sc/noa-senmonten/',
	'search':'Prefix',
	'cookie_path':'/sc/noa-senmonten/',
	'id':'UA-25593134-10'
},
'tsudanuma':{
	'domain':'www.aeon.jp',
	'path':'/sc/tsudanuma/',
	'search':'Prefix',
	'cookie_path':'/sc/tsudanuma/',
	'id':'UA-25594316-1'
},
'chiba-kashiwa':{
	'domain':'www.aeon.jp',
	'path':'/sc/chiba-kashiwa/',
	'search':'Prefix',
	'cookie_path':'/sc/chiba-kashiwa/',
	'id':'UA-25594316-2'
},
'yachiyomidorigaoka':{
	'domain':'www.aeon.jp',
	'path':'/sc/yachiyomidorigaoka/',
	'search':'Prefix',
	'cookie_path':'/sc/yachiyomidorigaoka/',
	'id':'UA-25594316-3'
},
'marinpia-senmonkan':{
	'domain':'www.aeon.jp',
	'path':'/sc/marinpia-senmonkan/',
	'search':'Prefix',
	'cookie_path':'/sc/marinpia-senmonkan/',
	'id':'UA-25594316-4'
},
'choshi':{
	'domain':'www.aeon.jp',
	'path':'/sc/choshi/',
	'search':'Prefix',
	'cookie_path':'/sc/choshi/',
	'id':'UA-25594316-5'
},
'yumiru-kamatori':{
	'domain':'www.aeon.jp',
	'path':'/sc/yumiru-kamatori/',
	'search':'Prefix',
	'cookie_path':'/sc/yumiru-kamatori/',
	'id':'UA-25594316-6'
},
'hadano':{
	'domain':'www.aeon.jp',
	'path':'/sc/hadano/',
	'search':'Prefix',
	'cookie_path':'/sc/hadano/',
	'id':'UA-25594316-7'
},
'oyumino':{
	'domain':'www.aeon.jp',
	'path':'/sc/oyumino/',
	'search':'Prefix',
	'cookie_path':'/sc/oyumino/',
	'id':'UA-25594316-8'
},
'sagamihara':{
	'domain':'www.aeon.jp',
	'path':'/sc/sagamihara/',
	'search':'Prefix',
	'cookie_path':'/sc/sagamihara/',
	'id':'UA-25594316-9'
},
'chigasaki':{
	'domain':'www.aeon.jp',
	'path':'/sc/chigasaki/',
	'search':'Prefix',
	'cookie_path':'/sc/chigasaki/',
	'id':'UA-25594316-10'
},
'niigataminami':{
	'domain':'www.aeon.jp',
	'path':'/sc/niigataminami/',
	'search':'Prefix',
	'cookie_path':'/sc/niigataminami/',
	'id':'UA-25590650-1'
},
'shibata':{
	'domain':'www.aeon.jp',
	'path':'/sc/shibata/',
	'search':'Prefix',
	'cookie_path':'/sc/shibata/',
	'id':'UA-25590650-2'
},
'sakudaira':{
	'domain':'www.aeon.jp',
	'path':'/sc/sakudaira/',
	'search':'Prefix',
	'cookie_path':'/sc/sakudaira/',
	'id':'UA-25590650-3'
},
'kahoku':{
	'domain':'www.aeon.jp',
	'path':'/sc/kahoku/',
	'search':'Prefix',
	'cookie_path':'/sc/kahoku/',
	'id':'UA-25590650-4'
},
'okyozuka':{
	'domain':'www.aeon.jp',
	'path':'/sc/okyozuka/',
	'search':'Prefix',
	'cookie_path':'/sc/okyozuka/',
	'id':'UA-25590650-5'
},
'ogaki':{
	'domain':'www.aeon.jp',
	'path':'/sc/ogaki/',
	'search':'Prefix',
	'cookie_path':'/sc/ogaki/',
	'id':'UA-25590651-1'
},
'hamamatsuichino':{
	'domain':'www.aeon.jp',
	'path':'/sc/hamamatsuichino/',
	'search':'Prefix',
	'cookie_path':'/sc/hamamatsuichino/',
	'id':'UA-25590651-2'
},
'fujinomiya':{
	'domain':'www.aeon.jp',
	'path':'/sc/fujinomiya/',
	'search':'Prefix',
	'cookie_path':'/sc/fujinomiya/',
	'id':'UA-25590651-3'
},
'nagoyadomemae':{
	'domain':'www.aeon.jp',
	'path':'/sc/nagoyadomemae/',
	'search':'Prefix',
	'cookie_path':'/sc/nagoyadomemae/',
	'id':'UA-25590651-4'
},
'chikusa':{
	'domain':'www.aeon.jp',
	'path':'/sc/chikusa/',
	'search':'Prefix',
	'cookie_path':'/sc/chikusa/',
	'id':'UA-25590651-5'
},
'fuso':{
	'domain':'www.aeon.jp',
	'path':'/sc/fuso/',
	'search':'Prefix',
	'cookie_path':'/sc/fuso/',
	'id':'UA-25590651-6'
},
'kakamigahara':{
	'domain':'www.aeon.jp',
	'path':'/sc/kakamigahara/',
	'search':'Prefix',
	'cookie_path':'/sc/kakamigahara/',
	'id':'UA-25590651-7'
},
'atsuta':{
	'domain':'www.aeon.jp',
	'path':'/sc/atsuta/',
	'search':'Prefix',
	'cookie_path':'/sc/atsuta/',
	'id':'UA-25590651-8'
},
'odaka':{
	'domain':'www.aeon.jp',
	'path':'/sc/odaka/',
	'search':'Prefix',
	'cookie_path':'/sc/odaka/',
	'id':'UA-25590651-9'
},
'arimatsu':{
	'domain':'www.aeon.jp',
	'path':'/sc/arimatsu/',
	'search':'Prefix',
	'cookie_path':'/sc/arimatsu/',
	'id':'UA-25590651-10'
},
'kanazawashimeno':{
	'domain':'www.aeon.jp',
	'path':'/sc/kanazawashimeno/',
	'search':'Prefix',
	'cookie_path':'/sc/kanazawashimeno/',
	'id':'UA-25590651-11'
},
'fujiminami':{
	'domain':'www.aeon.jp',
	'path':'/sc/fujiminami/',
	'search':'Prefix',
	'cookie_path':'/sc/fujiminami/',
	'id':'UA-25590651-12'
},
'yokkaichikita':{
	'domain':'www.aeon.jp',
	'path':'/sc/yokkaichikita/',
	'search':'Prefix',
	'cookie_path':'/sc/yokkaichikita/',
	'id':'UA-25590651-13'
},
'meiwa':{
	'domain':'www.aeon.jp',
	'path':'/sc/meiwa/',
	'search':'Prefix',
	'cookie_path':'/sc/meiwa/',
	'id':'UA-25590651-14'
},
'powercity-yokkaichi':{
	'domain':'www.aeon.jp',
	'path':'/sc/powercity-yokkaichi/',
	'search':'Prefix',
	'cookie_path':'/sc/powercity-yokkaichi/',
	'id':'UA-25590651-15'
},
'nagoyaminato':{
	'domain':'www.aeon.jp',
	'path':'/sc/nagoyaminato/',
	'search':'Prefix',
	'cookie_path':'/sc/nagoyaminato/',
	'id':'UA-25590651-16'
},
'kasugai':{
    'domain':'www.aeon.jp',
    'path':'/sc/kasugai/',
    'search':'Prefix',
    'cookie_path':'/sc/kasugai/',
    'id':'UA-25590651-17'
},
'kuwana':{
    'domain':'www.aeon.jp',
    'path':'/sc/kuwana/',
    'search':'Prefix',
    'cookie_path':'/sc/kuwana/',
    'id':'UA-25590651-18'
},
'tsu':{
    'domain':'www.aeon.jp',
    'path':'/sc/tsu/',
    'search':'Prefix',
    'cookie_path':'/sc/tsu/',
    'id':'UA-25590651-19'
},
'takanohara':{
	'domain':'www.aeon.jp',
	'path':'/sc/takanohara/',
	'search':'Prefix',
	'cookie_path':'/sc/takanohara/',
	'id':'UA-25590455-1'
},
'naratomigaoka':{
	'domain':'www.aeon.jp',
	'path':'/sc/naratomigaoka/',
	'search':'Prefix',
	'cookie_path':'/sc/naratomigaoka/',
	'id':'UA-25590455-2'
},
'toyonakamidorigaoka':{
	'domain':'www.aeon.jp',
	'path':'/sc/toyonakamidorigaoka/',
	'search':'Prefix',
	'cookie_path':'/sc/toyonakamidorigaoka/',
	'id':'UA-25590455-3'
},
'rakunan':{
	'domain':'www.aeon.jp',
	'path':'/sc/rakunan/',
	'search':'Prefix',
	'cookie_path':'/sc/rakunan/',
	'id':'UA-25590455-4'
},
'kumiyama':{
	'domain':'www.aeon.jp',
	'path':'/sc/kumiyama/',
	'search':'Prefix',
	'cookie_path':'/sc/kumiyama/',
	'id':'UA-25590455-5'
},
'oumihachiman':{
	'domain':'www.aeon.jp',
	'path':'/sc/oumihachiman/',
	'search':'Prefix',
	'cookie_path':'/sc/oumihachiman/',
	'id':'UA-25590455-6'
},
'dainichi':{
	'domain':'www.aeon.jp',
	'path':'/sc/dainichi/',
	'search':'Prefix',
	'cookie_path':'/sc/dainichi/',
	'id':'UA-25590652-1'
},
'hineno':{
	'domain':'www.aeon.jp',
	'path':'/sc/hineno/',
	'search':'Prefix',
	'cookie_path':'/sc/hineno/',
	'id':'UA-25590652-2'
},
'inagawa':{
	'domain':'www.aeon.jp',
	'path':'/sc/inagawa/',
	'search':'Prefix',
	'cookie_path':'/sc/inagawa/',
	'id':'UA-25590652-3'
},
'kasaihojyo':{
	'domain':'www.aeon.jp',
	'path':'/sc/kasaihojyo/',
	'search':'Prefix',
	'cookie_path':'/sc/kasaihojyo/',
	'id':'UA-25590652-4'
},
'himejiootsu':{
	'domain':'www.aeon.jp',
	'path':'/sc/himejiootsu/',
	'search':'Prefix',
	'cookie_path':'/sc/himejiootsu/',
	'id':'UA-25590652-5'
},
'himeji-rivercity':{
	'domain':'www.aeon.jp',
	'path':'/sc/himeji-rivercity/',
	'search':'Prefix',
	'cookie_path':'/sc/himeji-rivercity/',
	'id':'UA-25590652-6'
},
'itamikoya':{
	'domain':'www.aeon.jp',
	'path':'/sc/itamikoya/',
	'search':'Prefix',
	'cookie_path':'/sc/itamikoya/',
	'id':'UA-25590652-7'
},
'ibaraki':{
	'domain':'www.aeon.jp',
	'path':'/sc/ibaraki/',
	'search':'Prefix',
	'cookie_path':'/sc/ibaraki/',
	'id':'UA-25590652-8'
},
'akashi':{
	'domain':'www.aeon.jp',
	'path':'/sc/akashi/',
	'search':'Prefix',
	'cookie_path':'/sc/akashi/',
	'id':'UA-25590652-10'
},
'hiezu':{
	'domain':'www.aeon.jp',
	'path':'/sc/hiezu/',
	'search':'Prefix',
	'cookie_path':'/sc/hiezu/',
	'id':'UA-25588269-1'
},
'tottorikita':{
	'domain':'www.aeon.jp',
	'path':'/sc/tottorikita/',
	'search':'Prefix',
	'cookie_path':'/sc/tottorikita/',
	'id':'UA-25588269-2'
},
'tsuyama':{
	'domain':'www.aeon.jp',
	'path':'/sc/tsuyama/',
	'search':'Prefix',
	'cookie_path':'/sc/tsuyama/',
	'id':'UA-25588269-3'
},
'ayagawa':{
	'domain':'www.aeon.jp',
	'path':'/sc/ayagawa/',
	'search':'Prefix',
	'cookie_path':'/sc/ayagawa/',
	'id':'UA-25588269-4'
},
'takamatsu':{
	'domain':'www.aeon.jp',
	'path':'/sc/takamatsu/',
	'search':'Prefix',
	'cookie_path':'/sc/takamatsu/',
	'id':'UA-25588269-5'
},
'matsue':{
	'domain':'www.aeon.jp',
	'path':'/sc/matsue/',
	'search':'Prefix',
	'cookie_path':'/sc/matsue/',
	'id':'UA-25588269-6'
},
'yahatahigashi':{
	'domain':'www.aeon.jp',
	'path':'/sc/yahatahigashi/',
	'search':'Prefix',
	'cookie_path':'/sc/yahatahigashi/',
	'id':'UA-25588269-7'
},
'kamagaya':{
	'domain':'www.aeon.jp',
	'path':'/sc/kamagaya/',
	'search':'Prefix',
	'cookie_path':'/sc/kamagaya/',
	'id':'UA-25594316-11'
},
'iwaki':{
	'domain':'www.aeon.jp',
	'path':'/sc/iwaki/',
	'search':'Prefix',
	'cookie_path':'/sc/iwaki/',
	'id':'UA-25590454-14'
}
};

obj = new AeonGaSetting(document.location.href, sc_settings);

/*
// debug
if(typeof(console) == 'object'){
	console.log("url="+obj.url);
	console.log("id="+obj.getID());
	console.log("sc="+obj.getSC());
	console.log("cookie_path="+obj.getCookiePath());
}
*/

var _gaq = _gaq || [];
  _gaq.push(['_setAccount', obj.getID()]);

//cross domain settings for aeon.jp/sc/xxx
  _gaq.push(['_setDomainName', 'none']);
  _gaq.push(['_setAllowLinker', true]);

  _gaq.push(['_addOrganic', 'images.google','q']);
  _gaq.push(['_addOrganic', 'biglobe','q',true]);
  _gaq.push(['_addOrganic', 'azby.search.nifty','q',true]);
  _gaq.push(['_addOrganic', 'nifty','q',true]);
  _gaq.push(['_addOrganic', 'infoseek','qt']);
  _gaq.push(['_addOrganic', 'rakuten','qt']);
  _gaq.push(['_addOrganic', 'livedoor-search','q',true]);
  _gaq.push(['_addOrganic', 'naver.jp','q',true]);
  _gaq.push(['_addOrganic', 'so-net','query']);
  _gaq.push(['_addOrganic', 'fresheye','kw']);
  _gaq.push(['_addOrganic', 'auone','q',true]);
  _gaq.push(['_addOrganic', 'ocnsearch', 'MT']);
  _gaq.push(['_addOrganic', 'hi-ho', 'search']);
  _gaq.push(['_addOrganic', 'odn','search']);
  _gaq.push(['_addOrganic', 'eonet','search']);
  _gaq.push(['_addOrganic', 'toppa','search']);
  _gaq.push(['_addOrganic', 'partners.search.goo', 'MT']);
  _gaq.push(['_addOrganic', 'goo', 'MT']);
  _gaq.push(['_addOrganic', 'bsearch.goo', 'MT']);
  _gaq.push(['_addOrganic', 'excite','search']);
  _gaq.push(['_addOrganic', 'asahi','Keywords']);
  _gaq.push(['_addOrganic', 's.luna.tv', 'q']);
  _gaq.push(['_addOrganic', 'lunascape', 'p']);
  _gaq.push(['_addOrganic', 'hatena', 'word']);
  _gaq.push(['_addOrganic', 'ecnavi', 'Keywords']);
  _gaq.push(['_addOrganic', 'cybozu', 'Keywords']);
  _gaq.push(['_addOrganic', 'cocacola', 'Keywords']);
  _gaq.push(['_addOrganic', 'picmy.jp', 'Keywords']);
  _gaq.push(['_addOrganic', 'adingo.jp', 'Keywords']);
  _gaq.push(['_addOrganic', 'adingosearch', 'Keywords']);
  _gaq.push(['_addOrganic', 'pex.jp', 'Keywords']);
  _gaq.push(['_addOrganic', 'went.jp', 'Keywords']);
  _gaq.push(['_addOrganic', 'unisearch.jp', 'keyword']);
  _gaq.push(['_addOrganic', 'tnc.jword.jp', 'q']);
  _gaq.push(['_addOrganic', 't-com.jword.jp', 'q']);
  _gaq.push(['_addOrganic', 'search.jword.jp', 'name']);
  _gaq.push(['_addOrganic', 'twitter', 'q']);

jQuery(document).ready(function(){
//For Downloads
	filetypes = /\.doc$|\.xls$|\.exe$|\.zip$|\.pdf$|\.mp3$|\.psd$/i;
	jQuery('a').each(function(){
		 if ( typeof(jQuery(this).attr("href")) == 'string' && jQuery(this).attr("href").match(filetypes)) {
			jQuery(this).click(function() {
			_gaq.push(['_trackEvent','InternalLink','DownLoads',jQuery(this).attr("href")])
			})
       		 }
    	});

//For Outbounds
	jQuery('a').filter(function() {
		return this.hostname && this.hostname !== location.hostname
	}).click(function(){
		_gaq.push(['_trackEvent','ExternalLink','Click',jQuery(this).attr("href")])
	});

//CROSS DOMAIN LINKER
	jQuery('a').filter(function() {
		return obj.isAeonRelatedDomain(location.hostname, this.hostname);
	}).click(function(){
		if(jQuery(this).attr('target') == '_blank'){
			var target =jQuery(this).attr("href");
			_gaq.push(
				function(){
					var pageTracker = _gat._getTrackerByName();
					window.open(pageTracker._getLinkerUrl(target));
				}
			); 
			return false;
		}else{
			_gaq.push(['_link', jQuery(this).attr("href")]); return false;
		}
	});

	//top page -> when click the js slider event
	jQuery("#mainVisual").click(function() {
		var anchorTags_ga = this.getElementsByTagName("a");
		var gavalue = anchorTags_ga[0].href;
		_gaq.push(['_trackEvent','TopMainBanner','Click',gavalue]);
	});
	//side page -> when click wide bnr event
	jQuery("#sideMobileLower, #sideMobileUpper").click(function() {
		var anchorTags_ga = this.getElementsByTagName("a");
		var gavalue = anchorTags_ga[0].href;
		_gaq.push(['_trackEvent','SideareaBanner','Click',gavalue]);
	});

});

  _gaq.push(['_setCookiePath', obj.getCookiePath()]);
  _gaq.push(['_trackPageview']);
  _gaq.push(['_trackPageLoadTime']);

 _gaq.push(['t2._setAccount', 'UA-11691428-1']);
 
 _gaq.push(['t2._setDomainName', 'none']);
 _gaq.push(['t2._setAllowLinker', true]);

 _gaq.push(['t2._trackPageview']);
 _gaq.push(['t2._trackPageLoadTime']);


/*******************************************************
  Google Tag Manager Code Begin
  ****************************************************** */

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayerCommon','GTM-K3VP3G');

dataLayerCommon = dataLayerCommon || [];
dataLayerCommon.push({
  "event": "SCNameLoaded",
  "SCName": obj.getSC()
});

/*******************************************************
  Google Tag Manager Code End
  ****************************************************** */
