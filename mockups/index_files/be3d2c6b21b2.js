$(document).ready(function(){prepareOmnibox();});function omnibox(ele,types,options){if(ele.data('select2')){return;}
var data=[];if(options===undefined){options={}}
if(options.variables){for(var idx in options.variables){var v='@'+options.variables[idx].name.toLowerCase();data.push({id:v,text:v+" - "+options.variables[idx].display})}}
if(types===undefined){types='cg';}
var placeholder=null;if(types=='g'){placeholder=gettext("Enter one or more contact groups");}
else{placeholder=gettext("Recipients, enter contacts or groups");}
ele.attr('placeholder',placeholder);var q='';if(!options.createSearchChoice&&types.indexOf('u')>=0){options.createSearchChoice=arbitraryNumberOption;}
var multiple=true;if(options.multiple!=undefined){multiple=options.multiple;}
return ele.removeClass("loading").select2({placeholder:placeholder,data:data,allowClear:false,selectOnBlur:false,minimumInputLength:0,multiple:multiple,initSelection:function(element,callback){var initial=$(element).val();element.select2('data',[]);if(initial){initial=eval(initial);callback(initial);}},createSearchChoice:options.createSearchChoice,ajax:{url:"/contact/omnibox/?types="+types,dataType:'json',data:function(term,page,context){q=term;return{search:term,page:page};},results:function(response,page,context){if(data){if(q){q=q.toLowerCase();if(q.indexOf('@')==0){for(var idx in data){var variable=data[idx];if(variable.id.indexOf(q)==0){response.results.unshift(variable);}}}}}
return response;}},escapeMarkup:function(m){return m;},containerCssClass:"omnibox-select2",formatSelection:formatOmniboxSelection,formatResult:formatOmniboxOption});}
function prepareOmnibox(){omnibox($(".omni_widget"));}
function initializeOmnibox(initial){var options={placeholder:gettext("Recipients, enter contacts or groups"),minimumInputLength:0,multiple:true,ajax:{url:"/contact/omnibox/",dataType:'json',data:function(term,page){return{search:term,page:page};},results:function(data,page){return data;}},escapeMarkup:function(m){return m;},containerCssClass:"omnibox-select2",formatSelection:formatOmniboxSelection,formatResult:formatOmniboxOption,createSearchChoice:arbitraryNumberOption};var omnibox=$("#omnibox").removeClass("loading").select2(options);if(initial){$("#omnibox").select2('data',initial);$("#omni-select2").show();$("#loading").hide();$("#send-message .ok").text(gettext("Send Message")).removeClass("disabled");}}
function arbitraryNumberOption(term,data){if(anon_org){return null;}
if($(data).filter(function(){return this.text.localeCompare(term)===0;}).length===0){if(!isNaN(parseFloat(term))&&isFinite(term)){return{id:"n-"+term,text:term};}}}
function formatOmniboxSelection(item){if(item.length==0){return"";}
return formatOmniboxItem(item);}
function formatOmniboxOption(item,container,query){if(query.term[0]=="+"){query.term=query.term.substring(1,query.length);}
return formatOmniboxItem(item);}
function formatOmniboxItem(item){var text=(item.extra!=null)?(item.text+" ("+item.extra+")"):item.text;var clazz='';if(item.id.indexOf("g-")==0){clazz='omni-group';}else if(item.id.indexOf("c-")==0){clazz='omni-contact';}else if(item.id.indexOf("u-")==0){if(item.scheme=='tel'){clazz='omni-tel';}else if(item.scheme=='twitter'){clazz='omni-twitter';}}
return'<div class="omni-option '+clazz+'">'+text+'</div>';}
if(typeof console=="undefined"){this.console={log:function(msg){}};}
function getCookie(name){var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
var csrftoken=getCookie('csrftoken');function csrfSafeMethod(method){return(/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));}
$.ajaxSetup({crossDomain:false,beforeSend:function(xhr,settings){if(!csrfSafeMethod(settings.type)){xhr.setRequestHeader("X-CSRFToken",csrftoken);}}});$(document).ready(function(){$('iframe').each(function(){var url=$(this).attr("src");if(url.indexOf("youtube.com")>=0){if(url.indexOf("?")>=0){$(this).attr("src",url+"&wmode=transparent");}else{$(this).attr("src",url+"?wmode=transparent");}}});$('ul.nav li.dropdown').hover(function(){$(this).find('.dropdown-menu').stop(true,true).delay(200).fadeIn();},function(){$(this).find('.dropdown-menu').stop(true,true).delay(200).fadeOut();});$(".pollrun-select-btn").on('click',pollRunSelectHandle);});function pollRunSelect(pollRunId){$("input#pollrun").val(pollRunId);$("form[name=pollrun]").submit();}
function pollRunSelectHandle(){pollRunSelect($(this).data('id'));$("#pollrun-text > span.text").text($(this).text());}
function getCheckedIds(){return Array();}
bindRefreshBlock();function bindRefreshBlock(){$('[data-toggle=dropdown]').on('focus',function(){dropDownOpen=true;hideTooltip();checkBlockRefresh();});$('[data-toggle=dropdown]').on('blur',function(){dropDownOpen=false;hideTooltip();checkBlockRefresh();});}
var dropDownOpen=false;var rowsChecked=getCheckedIds().length>0;function checkBlockRefresh(){$("#pjax").data('no-pjax',(dropDownOpen||rowsChecked));}
function getStartTime(){if($("#later-option").attr("checked")){return moment(new Date($("#start-datetime-value").val()*1000));}else{return moment();}}
function getStartHour(){var time=getStartTime();var hour=time.getHours();if(hour>12){hour=hour-12+"pm";}else{hour+="am";}
return hour;}
function update_schedule(){}
function updateDailySelection(){var selected=0;$('.btn-group > .btn').each(function(){if($(this).hasClass('active')){selected+=parseInt($(this).attr("value"));}});$("#repeat-days-value").val(selected);}
function scheduleSelection(event){event.stopPropagation();if($(this).attr('data-toggle')!='button'){$(this).toggleClass('active');}
var selected=$('.btn-group > .btn.active').length;if(selected==0&&!$(this).hasClass('active')){$(this).toggleClass('active');}
updateDailySelection();}
function hideTooltip(){$(".tooltip").fadeOut();}
function updateFile(){var file=$("#csv_file").val();while(file.indexOf("\\")>=0){file=file.substring(file.indexOf("\\")+1,file.length);}
$("#file-field").val(file);}
function intersect(a,b){var ai=0,bi=0;var result=new Array();while(ai<a.length&&bi<b.length){if(a[ai]<b[bi]){ai++;}else if(a[ai]>b[bi]){bi++;}else{result.push(a[ai]);ai++;bi++;}}
return result;}
function numericComparator(a,b){return a-b;}
function messageTextareaLengthCheck(){var length=$(this).val().length;var messages=Math.ceil(length/160);var left=messages*160-length;if(messages<2){$("#counter").text(""+left);}else{$("#counter").text(""+left+" / "+messages);}}
function initMessageLengthCounter(textarea,counter){function onKeyUp(){var ta=$(textarea);if(ta){var val=ta.val()
var length=0;if(val){length=val.length;}
var messages=Math.ceil(length/160);var left=messages*160-length;if(length==0){$(counter).text(""+160);}else if(messages<2){$(counter).text(""+left);}else{$(counter).text(""+left+" / "+messages);}}}
$(textarea).keyup(onKeyUp);onKeyUp();}
function toggle_section(){var shrink;$(".form-section").each(function(){var visible=$(this);if(visible.find('.expanded').is(":visible")){hide_section(visible);shrink=visible;}});var row=$(this).parent('.form-section');if(!shrink||(shrink&&row.attr("id")!=shrink.attr("id"))){var expanded=row.find('.expanded');if(expanded.is(":visible")){hide_section(row);}else{expand_section(row);}}}
function hide_section(section){if(!section.hasClass("error")){section.addClass('expandable');}
try{eval("update_"+section.attr("id")+"()");}catch(e){}
section.find('.section-icon').animate({'font-size':'35px','width':'40px','height':'40px'},200,function(){});section.find('.expanded').hide();section.find('.summary').fadeIn('slow');}
function expand_section(section){section.removeClass('expandable');section.find('.section-icon').animate({'font-size':'80px','width':'100px','height':'100px'},200,function(){});section.find('.expanded').slideDown('fast');section.find('.summary').hide();}
function setDatetimeValue(datetimeText,datepickerInstance,nextStart){var datetime=null;if(nextStart){datetime=nextStart;}else{datetime=new Date(datetimeText.replace(" at",""));}
var seconds=parseInt(datetime.getTime()/1000);$('#start-datetime-value').val(seconds);update_schedule();}
function resetStartDatetime(){var datetime=$("#start-datetime");if(datetime.val()=="Later"){datetime.val("");}datetime.focus();}
function startDatetimeClick(){$("#later-option").click();}
(function(){var ENTER,TAB,filters,findMatches,__hasProp=Object.prototype.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key];}function ctor(){this.constructor=child;}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child;};if(!(String.prototype.trim!=null)){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"");};}
if(!(String.prototype.rtrim!=null)){String.prototype.rtrim=function(){return this.replace(/^\s+/,"");};}
if(!(String.prototype.ltrim!=null)){String.prototype.ltrim=function(){return this.replace(/\s+$/,"");};}
if(!(String.prototype.strip!=null)){String.prototype.strip=function(){return this.replace(/^\s+|\s+$/g,"");};}
TAB=9;ENTER=13;filters=[{name:'title_case',display:'changes to title case'},{name:'capitalize',display:'capitalizes the first letter'},{name:'first_word',display:'takes only the first word'},{name:'remove_first_word',display:'takes everything after the first word'},{name:'upper_case',display:'upper cases all letters'},{name:'lower_case',display:'lower cases all letters'},{name:'read_digits',display:'reads back a number in a friendly way'}];findMatches=function(query,data,start,lastIdx,prependChar){var display,matched,name,nextDot,option,results,suffix,_i,_len;if(prependChar==null)prependChar=void 0;matched={};results=[];for(_i=0,_len=data.length;_i<_len;_i++){option=data[_i];if(option.name.indexOf(query)===0){nextDot=option.name.indexOf('.',lastIdx+1);if(nextDot===-1){if(prependChar){name=start+prependChar+option.name;}else{name=option.name;}
display=option.display;}else{name="";suffix=option.name.substring(lastIdx+1,nextDot);if(start.length>0&&start!==suffix)name=start+".";name+=suffix;if(name.indexOf(query)!==0)continue;display=null;}
if(!(name in matched)){matched[name]=name;results.push({name:name,display:display});}}}
return results;};this.useFontCheckbox=function(selector,displayLabel){var checkboxes,chkBox,ele,glyphCheck;if(displayLabel==null)displayLabel=false;checkboxes=$(selector);checkboxes.each(function(){var controlGroup,help,html,input,label;input=$(this);controlGroup=input.parents('.form-group');label=controlGroup.children("label").text();help=input.parent().children(".help-block");html="<div class='form-group font-checkbox'>";html+="<label";if(!displayLabel)html+=" id='checkbox-label'";html+=" class='control-label' for='";html+=input.prop('id');html+="'>";html+=label;html+="</label>";html+="<div class='controls field-input";if(input.prop('checked'))html+=" checked";html+="'>";html+="<div class='hidden-input hide'>";html+="<input name='"+input.prop('name')+"' id='"+input.prop('id')+"' type='"+input.prop('type')+"' ";if(input.prop('checked'))html+=" checked";html+="/>";html+="</div>";html+="<div class='glyph notif-checkbox'></div><div></div>";if(help){if(!displayLabel){html+="<div class='help-block'><label for='";html+=input.prop('id');html+="'>"+help.text()+"</label></div>";}else{html+="<p class='help-block'>"+help.text()+"</p>";}}
html+="</div></div>";return controlGroup.replaceWith(html);});ele=$(".font-checkbox");glyphCheck=ele.children('.controls').children('.glyph.notif-checkbox');glyphCheck.on('click',function(){var cell,ipt;cell=$(this).parent('.field-input');ipt=cell.children().children("input[type='checkbox']");if(ipt.prop('checked')){cell.removeClass('checked');return ipt.prop('checked',false);}else{cell.addClass('checked');return ipt.prop('checked',true);}});chkBox=ele.find("input[type=checkbox]");return chkBox.on('change',function(){var cell;cell=ele.find('.field-input');if($(this).prop('checked')){return cell.addClass('checked');}else{return cell.removeClass('checked');}});};this.select2div=function(selector,width,placeholder,add_prefix){var child,children,ele,option,options,selected,_i,_len;if(width==null)width="350px";if(placeholder==null)placeholder=null;if(add_prefix==null)add_prefix=null;ele=$(selector);children=ele.children('option');options=[];selected=null;for(_i=0,_len=children.length;_i<_len;_i++){child=children[_i];if(child.value){option={id:child.value,text:child.label};if(child.selected)selected=option;options.push(option);}}
ele.replaceWith("<input width='"+width+"' name='"+ele.attr('name')+"' style='width:"+width+"' id='"+ele.attr('id')+"'/>");ele=$(selector);if(add_prefix){ele.select2({name:name,data:options,placeholder:placeholder,query:function(query){var d,data,_j,_len2,_ref;data={results:[]};_ref=this['data'];for(_j=0,_len2=_ref.length;_j<_len2;_j++){d=_ref[_j];if(d.text.toLowerCase().indexOf(query.term.toLowerCase().strip())!==-1){data.results.push({id:d.id,text:d.text});}}
if(data.results.length===0&&query.term.strip().length>0){data.results.push({id:'[_NEW_]'+query.term,text:add_prefix+query.term});}
return query.callback(data);},createSearchChoice:function(term,data){return data;}});}else{ele.select2({minimumResultsForSearch:99,data:options,placeholder:placeholder});}
if(selected)return ele.data('select2').data(selected);};this.initAtMessageText=function(selector,completions){if(completions==null)completions=null;if(!completions)completions=window.message_completions;return $(selector).atwho({at:"@",limit:15,insert_space:false,max_len:100,data:completions,callbacks:{before_insert:function(value,item,selectionEvent){var data,hasMore,option,_i,_len;data=this.settings['@']['data'];hasMore=false;for(_i=0,_len=data.length;_i<_len;_i++){option=data[_i];if(option.name.indexOf(value)===0&&option.name!==value){hasMore=true;break;}}
if(selectionEvent.keyCode===TAB&&hasMore){value+='.';}else{value+=' ';}
return value;},filter:function(query,data,search_key){var d,filterQuery,flag,found,lastIdx,match,name,q,regexp,results,start,_i,_len;q=query.toLowerCase();lastIdx=q.lastIndexOf('.');start=q.substring(0,lastIdx);results=findMatches(q,data,start,lastIdx);if(results.length>0)return results;flag="@";flag="(?:^|\\s)"+flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g,"\\$&");regexp=new RegExp("([A-Za-z0-9_+-.]*\\|)([A-Za-z0-9_+-.]*)","gi");match=regexp.exec(q);if(match){name=q.substring(0,q.indexOf('|'));found=false;for(_i=0,_len=data.length;_i<_len;_i++){d=data[_i];if(d.name===name){found=true;break;}}
if(!found)return results;filterQuery=match[2];lastIdx=q.lastIndexOf('|')+1;start=q.substring(0,lastIdx-1);filterQuery=q.substring(lastIdx);results=findMatches(filterQuery,filters,start,q.lastIndexOf('|'),'|');}
return results;},tpl_eval:function(tpl,map){if(!map.display)tpl="<li data-value='${name}'>${name}</li>";try{return tpl.replace(/\$\{([^\}]*)\}/g,function(tag,key,pos){return map[key];});}catch(error){return"";}},highlighter:function(li,query){return li;},matcher:function(flag,subtext){var match,regexp;flag="(?:^|\\s)"+flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g,"\\$&");regexp=new RegExp(flag+"([A-Za-z0-9_+-.\\|]*)$|"+flag+"([^\\x00-\\xff]*)$","gi");match=regexp.exec(subtext);if(match){return match[2]||match[1];}else{return null;}}},tpl:"<li data-value='${name}'>${name} (<span>${display}</span>)</li>"});};this.Modal=(function(){function Modal(title,message){var modal,modalClose;this.title=title;this.message=message;modal=this;this.autoDismiss=true;this.ele=$('#modal-template').clone();this.ele.data('object',this);this.ele.attr('id','active-modal');this.keyboard=true;modalClose=this.ele.find('.close');modalClose.on('click',function(){return modal.dismiss();});}
Modal.prototype.setIcon=function(icon){this.icon=icon;return this.ele.find('.icon').addClass('glyph').addClass(this.icon);};Modal.prototype.setPrimaryButton=function(buttonName){var primary;if(buttonName==null)buttonName=gettext('Ok');primary=this.ele.find('.primary');return primary.text(buttonName);};Modal.prototype.setTertiaryButton=function(buttonName,handler){var tertiary;if(buttonName==null)buttonName='Options';tertiary=this.ele.find('.tertiary');tertiary.text(buttonName);tertiary.on('click',handler);return tertiary.show();};Modal.prototype.show=function(){var modal;modal=this;this.ele.on('hidden',function(){if(modal.listeners&&modal.listeners.onDismiss){return modal.listeners.onDismiss(modal);}});this.ele.find('#modal-title').html(this.title);if(this.message){this.ele.find('#modal-message').html(this.message);}else{this.ele.find('#modal-message').hide();}
return this.ele.modal({show:true,backdrop:'static',keyboard:this.keyboard});};Modal.prototype.addListener=function(event,listener){return this.listeners[event]=listener;};Modal.prototype.setListeners=function(listeners,autoDismiss){var modal,primary;this.listeners=listeners;this.autoDismiss=autoDismiss!=null?autoDismiss:true;modal=this;primary=this.ele.find('.primary');if(this.listeners.onPrimary){return primary.off('click').on('click',function(){if(modal.listeners.onBeforePrimary){if(modal.listeners.onBeforePrimary(modal))return;}
modal.listeners.onPrimary(modal);if(modal.autoDismiss)return modal.dismiss();});}else{if(modal.autoDismiss){return primary.on('click',function(){return modal.dismiss();});}}};Modal.prototype.setMessage=function(message){this.message=message;};Modal.prototype.dismiss=function(){this.ele.modal('hide');return this.ele.remove();};Modal.prototype.addClass=function(className){return this.ele.addClass(className);};Modal.prototype.focusFirstInput=function(){return this.ele.find("input,textarea").filter(':first').focus();};return Modal;})();this.ConfirmationModal=(function(_super){__extends(ConfirmationModal,_super);function ConfirmationModal(title,message){var modal,secondary;ConfirmationModal.__super__.constructor.call(this,title,message);modal=this;secondary=this.ele.find('.secondary');secondary.on('click',function(){return modal.dismiss();});secondary.show();}
ConfirmationModal.prototype.hideSecondaryButton=function(){return this.ele.find('.secondary').hide();};ConfirmationModal.prototype.setForm=function(form){return this.ele.find('.modal-body .form').append(form);};ConfirmationModal.prototype.getForm=function(){return this.ele.find('.modal-body .form').children(0);};ConfirmationModal.prototype.show=function(){ConfirmationModal.__super__.show.call(this);return this.focusFirstInput();};ConfirmationModal.prototype.setListeners=function(listeners,autoDismiss){var modal,secondary;if(autoDismiss==null)autoDismiss=true;ConfirmationModal.__super__.setListeners.call(this,listeners,autoDismiss);modal=this;if(modal.listeners.onSecondary){secondary=this.ele.find('.secondary');return secondary.on('click',function(){return modal.listeners.onSecondary(modal);});}};return ConfirmationModal;})(this.Modal);this.Modax=(function(_super){__extends(Modax,_super);function Modax(title,url){var modal;this.url=url;Modax.__super__.constructor.call(this,title,null);modal=this;this.ele.find('.primary').on('click',function(){return modal.submit();});}
Modax.prototype.setRedirectOnSuccess=function(redirectOnSuccess){this.redirectOnSuccess=redirectOnSuccess;};Modax.prototype.setListeners=function(listeners,autoDismiss){if(autoDismiss==null)autoDismiss=false;return Modax.__super__.setListeners.call(this,listeners,autoDismiss);};Modax.prototype.show=function(){var modal;Modax.__super__.show.call(this);this.ele.find('.loader').show();modal=this;return fetchPJAXContent(this.url,"#active-modal .fetched-content",{onSuccess:function(){modal.ele.find('.loader').hide();modal.submitText=modal.ele.find(".form-actions input[type='submit']").val();modal.ele.find(".primary").text(modal.submitText);modal.focusFirstInput();if(modal.listeners&&modal.listeners.onFormLoaded){modal.listeners.onFormLoaded();}
modal.wireEnter();return prepareOmnibox();}});};Modax.prototype.wireEnter=function(){var modal;modal=this;return modal.ele.find("form").on('keydown',function(e){if(e.keyCode===ENTER){modal.submit();return false;}});};Modax.prototype.submit=function(){var modal,postData;modal=this;modal.ele.find('.primary').text(gettext("Processing..")).addClass("disabled");postData=modal.ele.find('form').serialize();return fetchPJAXContent(this.url,'#active-modal .fetched-content',{postData:postData,shouldIgnore:function(data){var ignore;ignore=/success-script/i.test(data);return ignore;},onIgnore:function(xhr){var redirect;if(!modal.redirectOnSuccess){modal.ele.find(".primary").removeClass("disabled").text(modal.submitText);}
if(modal.listeners){if(modal.listeners.onCompleted)modal.listeners.onCompleted(xhr);if(modal.listeners.onSuccess)modal.listeners.onSuccess(xhr);}
if(modal.redirectOnSuccess){modal.ele.find('.fetched-content').hide();modal.ele.find('.loader').show();redirect=xhr.getResponseHeader("Temba-Success");if(redirect){return document.location.href=redirect;}else{return modal.dismiss();}}else{return modal.dismiss();}},onSuccess:function(){modal.ele.find(".primary").removeClass("disabled").text(modal.submitText);if(modal.listeners&&modal.listeners.onCompleted){return modal.listeners.onCompleted();}else{modal.wireEnter();return modal.focusFirstInput();}}});};return Modax;})(this.ConfirmationModal);$(function(){return $('.uv-send-message').click(function(){return UserVoice.push(['show',{}]);});});}).call(this);(function(){var hideSection,showSection,_bindToggle,_initializeForm,_submitFormax;showSection=function(section){var ie;ie=section.parents("html").hasClass("ie");if(section.data("readonly"))return;if(ie||section.data("action")==='fixed'){section.find(".formax-form").show();section.find(".formax-icon").css({"font-size":"80px",width:"80px",height:"80px"});}else{section.find(".formax-icon").animate({"font-size":"80px",width:"80px",height:"80px"},100);section.find(".formax-form").slideDown("fast",function(){return section.find("input[type=text]:first").focus();});}
return section.find(".formax-summary").hide();};hideSection=function(section){var ie;if(section.data("action")==='fixed')return;ie=section.parents("html").hasClass("ie");if(ie){section.find(".formax-summary").show();return section.find(".formax-form").hide();}else{section.find(".formax-icon").animate({"font-size":"35px",width:"40px",height:"40px"},100);section.find(".formax-summary").fadeIn("slow");return section.find(".formax-form").hide();}};window.fetchData=function(section){var url;if(section.data("href")){url=section.data('href');return fetchPJAXContent(url,"#"+section.attr("id")+" > .formax-container",{headers:{"X-FORMAX":true},onSuccess:function(){section.data("loaded",true);_initializeForm(section);if(section.data("fixed")){showSection(section);}else{_bindToggle(section.find(".formax-icon"));}
return section.show();}});}else{return section.data("loaded",true);}};_initializeForm=function(section){var action,buttonName,form,onLoad;action=section.data('action');form=section.find("form");if(action==='formax'||action==='redirect'||action==='open'){buttonName=section.data("button");if(!buttonName)buttonName=gettext("Save");form.off("submit").on("submit",_submitFormax);if(!section.data("nobutton")){form.append("<input type=\"submit\" class=\"btn btn-primary submit-button\" value=\""+buttonName+"\"/>");form.find(".form-actions").remove();}
form.find(".submit-button").on("click",function(){return $(this).addClass("disabled").attr("enabled",false);});onLoad=section.data("onload");if(onLoad)eval_(onLoad)();if(!section.data("fixed"))_bindToggle(section.find(".formax-summary"));if(action==='open'){showSection(section);window.scrollTo(0,section.offset().top);}}
if(action==='fixed')return form.attr("action",section.data("href"));};_submitFormax=function(e){var followRedirects,form,section;e.preventDefault();form=$(this);section=form.parents("li");followRedirects=section.data("action")==='redirect';return fetchPJAXContent(section.data("href"),"#"+section.attr("id")+" > .formax-container",{postData:form.serialize(),headers:{"X-FORMAX":true},followRedirects:followRedirects,onSuccess:function(){var dependents,formax_form;_initializeForm(section);formax_form=section.find(".formax-form");if(formax_form.hasClass("errors")){section.find(".formax-summary").hide();formax_form.show();}else{if(section.data("action")!=='fixed')hideSection(section);}
dependents=section.data("dependents");if(dependents){return $(dependents).each(function(){return fetchData($(this));});}}});};_bindToggle=function(bindTo){var action,section;section=bindTo.parents("li");action=section.data('action');if(action==='fixed'){return showSection(section);}else if(action==='formax'||action==='redirect'||action==='open'){return bindTo.off("click").on("click",function(){section=$(this);if(!bindTo.tagName!=="formax")section=bindTo.parents("li");$("ul.formax > li").each(function(){if($(this).attr("id")!==section.attr("id")){return hideSection($(this));}});if(section.find(".formax-form").is(":visible")){return hideSection(section);}else{return showSection(section);}});}else if(action==='link'){return bindTo.off("click").on("click",function(){return document.location.href=section.data('href');});}};$(function(){$('li .formax-summary').each(function(){var section;section=$(this);return _bindToggle(section);});$('.formax li').each(function(){var section;section=$(this);return _initializeForm(section);});return $('li .formax-icon').each(function(){var section;section=$(this);return _bindToggle(section);});});}).call(this);function getCheckedIds(){var checkedIds=Array();var checks=$(".object-row.checked");for(var i=0;i<checks.length;i++){checkedIds.push(parseInt($(checks[i]).data("object-id")));}
rowsChecked=checkedIds.length>0;checkBlockRefresh();return checkedIds.sort(numericComparator);}
function getLabeledIds(labelId){var objectRowsIds=Array();var labeled=$(".lbl[data-id='"+labelId+"']");for(var i=0;i<labeled.length;i++){var id=parseInt($(labeled[i]).parents(".object-row").data("object-id"))
objectRowsIds.push(id);}
return objectRowsIds.sort(numericComparator);}
function getObjectRowLabels(objectId){var labelIds=Array();var labels=$(".object-row[data-object-id='"+objectId+"']").find(".lbl");for(var i=0;i<labels.length;i++){labelIds.push(parseInt($(labels[i]).data("id")));}
return labelIds.sort(numericComparator);}
function runActionOnObjectRows(action){var objectIds=getCheckedIds();jQuery.ajaxSettings.traditional=true;fetchPJAXContent("","#pjax",{postData:{objects:objectIds,action:action,pjax:'true'},forceReload:true});}
function unlabelObjectRows(labelId){var objectsIds=getCheckedIds();var addLabel=false;jQuery.ajaxSettings.traditional=true;fetchPJAXContent("","#pjax",{postData:{objects:objectsIds,label:labelId,add:addLabel,action:'unlabel',pjax:'true'},forceReload:true});}
function labelObjectRows(labelId){labelObjectRows(labelId,false)}
function labelObjectRows(labelId,forceRemove){var objectRowsIds=getCheckedIds();var labeledIds=getLabeledIds(labelId);var addLabel=false;for(var i=0;i<objectRowsIds.length;i++){var found=false;for(var j=0;j<labeledIds.length;j++){if(objectRowsIds[i]==labeledIds[j]){found=true;break;}}
if(!found){addLabel=true;break;}}
var checkbox=$('.lbl-menu[data-id="'+labelId+'"] .glyph');if(checkbox.hasClass("checked-child")){addLabel=true;}
if(checkbox.hasClass("checked")){addLabel=false;}
if(forceRemove){addLabel=false;}
jQuery.ajaxSettings.traditional=true;lastChecked=getCheckedIds();if(objectRowsIds.length==0){showWarning('{% trans "No rows selected" %}','{% trans "Please select one or more rows before continuing." %}');return;}
postLabelChanges(objectRowsIds,labelId,addLabel);}
function recheckIds(){if(lastChecked){for(var i=0;i<lastChecked.length;i++){$(".object-row[data-object-id='"+lastChecked[i]+"']").addClass('checked');}
$(".list-buttons").show();updateLabelMenu();}}
function clearLabelMenu(){$('.lbl-menu .glyph').removeClass('checked').removeClass('partial').removeClass('checked-child');}
function updateLabelMenu(){clearLabelMenu();var objectRowsIds=getCheckedIds();var updatedLabels=Object()
for(var i=0;i<objectRowsIds.length;i++){var labelIds=getObjectRowLabels(objectRowsIds[i]);for(var j=0;j<labelIds.length;j++){var labelId=labelIds[j];if(!updatedLabels[labelId]){var labeledIds=getLabeledIds(labelId);var objectRowIdsWithLabel=intersect(objectRowsIds,labeledIds);var label=$('.lbl-menu[data-id="'+labelId+'"] .glyph');if(objectRowIdsWithLabel.length==objectRowsIds.length){label.addClass("checked");label.removeClass("partial");var parentLabel=$($('.lbl-menu[data-id="'+labelId+'"]').parents('.dropdown-submenu').find('.lbl-menu')[0]);if(parentLabel){var parentBox=$(parentLabel.children(".glyph")[0]);if(!parentBox.hasClass('checked')){parentBox.addClass('checked-child');}}}else{label.addClass("partial");var parentLabel=$($('.lbl-menu[data-id="'+labelId+'"]').parents('.dropdown-submenu').find('.lbl-menu')[0]);if(parentLabel){var parentBox=$(parentLabel.children(".glyph")[0]);if(!parentBox.hasClass('checked')){parentBox.addClass('checked-child');}}}
updatedLabels[labelId]=true;}}}}
$(document).on('click','td.object-row-checkbox',function(e){e.stopPropagation();e.preventDefault();$(".list-buttons").show();var row=$(this).parent('tr');if(row.hasClass("checked")){row.removeClass("checked");var checks=$(".object-row.checked");if(checks.length==0){$('.list-buttons').hide();}}else{row.addClass("checked");}
updateLabelMenu();return false;});$(document).ready(function(){$(".page-content").on('click',".object-btn-label",function(){labelObjectRows($(this).data('id'));});if($('.object-btn-unlabel').length>0){if(current_label_id){$(".page-content").on('click',".object-btn-unlabel",function(){labelObjectRows(current_label_id,true);});}}
$(".page-content").on('click',".object-btn-restore",function(){runActionOnObjectRows("restore");});$(".page-content").on('click',".object-btn-archive",function(){runActionOnObjectRows("archive");});$(".page-content").on('click',".object-btn-delete",function(){runActionOnObjectRows("delete");});$(".page-content").on('click',".object-btn-resend",function(){runActionOnObjectRows("resend");});});