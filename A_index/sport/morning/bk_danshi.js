﻿// JavaScript Document
var dbs  = null;
var data = null;
var window_hight	=	0; //窗口高度
var window_lsm		=	0; //窗口联赛名
function loaded(league,thispage,p){
	var league = encodeURI(league);
	$.getJSON("bk_danshi_data.php?leaguename="+league+"&CurrPage="+thispage+"&callback=?",function(json){	
		var pagecount	=	json.fy.p_page;
		var page		=	json.fy.page;
		var fenye		=	"";
		window_hight	=	json.dh;
		window_lsm		=	json.lsm;
		if(dbs !=null){
			if(thispage==0 && p!='p'){	
				data = dbs;
				dbs  = json.db;  
			}else{
				dbs  = json.db;  
				data = dbs;
			}
		}else{
			dbs  = json.db;
			data = dbs;
		}	
		if(pagecount == "error1"){
			
			$("#datashow").html('<tr><td  colspan="5" align="center" style="background:#fff;">末登录,无法查看赛事信息.</td></tr>');
			$("#top").html("");
		}else if(pagecount == "error2"){
			$("#datashow").html('<tr><td  id=\"location\"  colspan="5" align="center" style="background:#fff;">对不起,您点击页面太快,请在60秒后进行操作</td></tr><script>check();</script>');
			$("#top").html("");
		}else if(pagecount == 0){
			$("#datashow").html('<tr><td  colspan="5" align="center" style="background:#fff;">暂无赛事</td></tr>');
			$("#top").html('');
		}else{
			//分页
			fenye+=(page+1)+"/"+pagecount+"页&nbsp;&nbsp;";
			fenye+="<select id=\"fenye\" onchange=\"fenye()\">";
			for(var i=0; i<pagecount; i++){
				if(i != page){
					fenye+="<option  value=\""+i+"\">"+(i+1)+"</option>";
				}else{
					fenye+="<option selected=\"selected\" value=\""+i+"\">"+(i+1)+"</option>";
				}
				
			}
			fenye+="</select>";
			$("#top").html(fenye);
			
			var htmls="";
			var lsm = "";
			for(var i=0; i<dbs.length; i++){
				if(dbs[i]["Match_Ho"]!="0" || dbs[i]["Match_DxDpl"]!="0" || dbs[i]["Match_DsDpl"]!="0"){
				if(lsm != dbs[i]["Match_Name"]){
					lsm = dbs[i]["Match_Name"];
					htmls+='<tr>';
					htmls+='	<td  colspan="5"  class="b_hline">';
					htmls+='		<table  border="0"  cellpadding="0"  cellspacing="0"  width="100%"><tbody>';
					htmls+='			<tr>';
					htmls+='				<td  class="legicon" >';
					htmls+='				<span  id="'+lsm+'"  class="showleg"><span  id="LegOpen"></span> </span>';
					htmls+='				</td>';
					htmls+="				<td  class=\"leg_bar\" onclick=\"javascript:check_one('"+lsm+"');\">"+lsm+"</td>";
					htmls+='				<td  class="IN">';
										
					htmls+='				</td>';
					htmls+='			</tr>';
					htmls+='		</tbody></table>';
					htmls+='	</td>';
					htmls+=' </tr>';
				}

                    htmls+="<tr  id=\"TR_01-"+dbs[i]["Match_ID"]+"\"    *class*=\"\">";
                    htmls+="	<td  rowspan=\"2\" width=\"18%\"  class=\"b_cen\">"+dbs[i]["Match_Date"]+"</td>";
                    htmls+="	<td  rowspan=\"2\" width=\"18%\" class=\"b_cen\">"+dbs[i]["Match_Master"]+" <br>";
                    htmls+= dbs[i]["Match_Guest"]+" </td>";

                    htmls+="	<td  class=\"b_rig\" width=\"22%\"  id=\""+dbs[i]["Match_ID"]+"_PRH\"><span  class=\"con\">"+((dbs[i]["Match_ShowType"]=="H" && dbs[i]["Match_Ho"]!="0")? dbs[i]["Match_RGG"] :"")+"</span> <span  class=\"ratio\">"+(dbs[i]["Match_Ho"]<="0" ? "" :("<a href=\"javascript:void(0)\" title=\""+dbs[i]["Match_Master"]+"\" onclick=\"javascript:setbet('篮球单式','让球-"+(dbs[i]["Match_ShowType"]=="H"?"主让":"客让")+dbs[i]["Match_RGG"]+"-"+dbs[i]["Match_Master"]+"','"+dbs[i]["Match_ID"]+"','Match_Ho','1','0','"+dbs[i]["Match_Master"]+"');\" style='"+(dbs[i]["Match_Ho"]!=data[i]["Match_Ho"] && data[i]["Match_ID"]==dbs[i]["Match_ID"]?"background:#FFCC00":"")+"'>"+formatNumber(dbs[i]["Match_Ho"],2)+"</a>"))+"</span></td>";
                    htmls+="	<td  class=\"b_rig\" width=\"22%\"  id=\""+dbs[i]["Match_ID"]+"_POUC\"><span  class=\"con\">"+(dbs[i]["Match_DxGG1"]!="O" ? dbs[i]["Match_DxGG1"].replace('O','大') :"")+"</span> <span  class=\"ratio\">"+(dbs[i]["Match_DxDpl"]=="0" ? "" :("<a href=\"javascript:void(0)\" title=\"大\" onclick=\"javascript:setbet('篮球单式','大小-"+dbs[i]["Match_DxGG1"]+"','"+dbs[i]["Match_ID"]+"','Match_DxDpl','1','0','"+dbs[i]["Match_DxGG1"]+"');\" style='"+(dbs[i]["Match_DxGG1"]!=data[i]["Match_DxGG1"] && data[i]["Match_ID"]==dbs[i]["Match_ID"]?"background:#FFCC00":"")+"'>"+formatNumber(dbs[i]["Match_DxDpl"],2)+"</a>"))+"</span></td>";
                    htmls+="	<td  class=\"b_cen\"  id=\""+dbs[i]["Match_ID"]+"_PO\">"+(dbs[i]["Match_DsDpl"]>"0" ? "单" :"")+"&nbsp;"+(dbs[i]["Match_DsDpl"]<="0" ? "" :("<a href=\"javascript:void(0)\" title=\"单\" onclick=\"javascript:setbet('篮球单式','单双-单','"+dbs[i]["Match_ID"]+"','Match_DsDpl','0','0','单');\" style='"+(dbs[i]["Match_DsDpl"]!=data[i]["Match_DsDpl"] && data[i]["Match_ID"]==dbs[i]["Match_ID"]?"background:#FFCC00":"")+"'>"+formatNumber(dbs[i]["Match_DsDpl"],2)+"</a>"))+"</td>";

                    htmls+="</tr>";
                    htmls+="<tr  id=\"TR1_01-"+dbs[i]["Match_ID"]+"\"    *class*=\"\">";

                    htmls+="<td  class=\"b_rig\"  id=\""+dbs[i]["Match_ID"]+"_PRC\"><span  class=\"con\">"+((dbs[i]["Match_ShowType"]=="C" && dbs[i]["Match_Ho"]!="0")? dbs[i]["Match_RGG"] :"")+"</span> <span  class=\"ratio\">"+(dbs[i]["Match_Ao"]<="0" ? "" :("<a href=\"javascript:void(0)\" title=\""+dbs[i]["Match_Guest"]+"\" onclick=\"javascript:setbet('篮球单式','让球-"+(dbs[i]["Match_ShowType"]=="H"?"主让":"客让")+dbs[i]["Match_RGG"]+"-"+dbs[i]["Match_Guest"]+"','"+dbs[i]["Match_ID"]+"','Match_Ao','1','0','"+dbs[i]["Match_Guest"]+"');\" style='"+(dbs[i]["Match_Ao"]!=data[i]["Match_Ao"] && data[i]["Match_ID"]==dbs[i]["Match_ID"]?"background:#FFCC00":"")+"'>"+formatNumber(dbs[i]["Match_Ao"],2)+"</a>"))+"</span></td>";
                    htmls+="<td  class=\"b_rig\"  id=\""+dbs[i]["Match_ID"]+"_POUH\"><span  class=\"con\">"+(dbs[i]["Match_DxGG2"]!="U" ? dbs[i]["Match_DxGG2"].replace('U','小') :"")+"</span> <span  class=\"ratio\">"+(dbs[i]["Match_DxXpl"]=="0" ? "" :("<a href=\"javascript:void(0)\" title=\"小\" onclick=\"javascript:setbet('篮球单式','大小-"+dbs[i]["Match_DxGG2"]+"','"+dbs[i]["Match_ID"]+"','Match_DxXpl','1','0','"+dbs[i]["Match_DxGG2"]+"');\" style='"+(dbs[i]["Match_DxXpl"]!=data[i]["Match_DxXpl"] && data[i]["Match_ID"]==dbs[i]["Match_ID"]?"background:#FFCC00":"")+"'>"+formatNumber(dbs[i]["Match_DxXpl"],2)+"</a>"))+"</span></td>";
                    htmls+="<td  class=\"b_cen\"  id=\""+dbs[i]["Match_ID"]+"_PE\">"+(dbs[i]["Match_DsSpl"]!="0" ? "双" :"")+"&nbsp;"+(dbs[i]["Match_DsDpl"]<="0" ? "" :("<a href=\"javascript:void(0)\" title=\"双\" onclick=\"javascript:setbet('篮球单式','单双-双','"+dbs[i]["Match_ID"]+"','Match_DsSpl','0','0','双');\" style='"+(dbs[i]["Match_DsDpl"]!=data[i]["Match_DsDpl"] && data[i]["Match_ID"]==dbs[i]["Match_ID"]?"background:#FFCC00":"")+"'>"+formatNumber(dbs[i]["Match_DsSpl"],2)+"</a>"))+"</td>";


                    htmls+="</tr>";
			
			}
			}
			
			if(htmls == ""){
				htmls = '<tr><td  colspan="5" align="center" style="background:#fff;">暂无赛事</td></tr>';
			}
			$("#datashow").html(htmls);
		}
		document.documentElement.scrollTop	=	$("#top_f5").val(); //导航标题高度
		$("#top_f5").val('0');
		gdt();
	})
}
/*
$(document).ready(function(){
	$("#xzls").click(function(){ //选择联赛
		if(window_lsm.length > 2000){
			if(window.XMLHttpRequest){ //Mozilla, Safari, IE7 
				if(!window.ActiveXObject){ // Mozilla, Safari, 
					JqueryDialog.Open('篮美单式', 'dialog.php?lsm='+window_lsm, 600, window_hight);
				}else{ //IE7
					JqueryDialog.Open('篮美单式', 'dialog.php?lsm=lqds', 600, window_hight);
				}
			}else{ //IE6
				JqueryDialog.Open('篮美单式', 'dialog.php?lsm=lqds', 600, window_hight);
			}
		}else{
			JqueryDialog.Open('篮美单式', 'dialog.php?lsm='+window_lsm, 600, window_hight);
		}
	});
});*/