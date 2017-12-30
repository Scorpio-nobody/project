/*  animate函数用于让元素动画
 *  @dom   被移动的元素
 *  @obj   是一个对象 ，每一个属性是css属性，每一个属性值是目标值
 *  @time  动画花费的时间  以毫秒值为单位
 *  @callback 回调函数
 */
function animate(dom,obj,time,callback){
   // 写一个轮子 兼容一下
   var getCSS = function(dom){
       // 检测是否具备getCSS能力
       if(window.getComputedStyle){
         return getComputedStyle(dom);
       }else{
        // 检测css的写法
         return dom.currentStyle
       }
    }
   // console.log("目标是",obj)
   // obj是一个数据结构 装的是目标值 
   // 为了计算总长我们要得到当前值
   var nowObj = {};
   // 获取当前的css样式对象
   var nowCss = getCSS(dom);
   // 定义频率
   var pinlv = 20;
   // 求总次数
   var allCount = time/pinlv;
   // 循环obj
   for(var i in obj){
   	// 每次循环都给nowObj一个对应的值
   	// console.log(obj[i])
   	// 如何获取元素的当前css样式
   	nowObj[i] = parseInt(nowCss[i]);
   }
   // console.log("当前是",nowObj)
   //定义一个新的步长obj
   var stepObj ={};
   // 循环obj  然后计算步长
   for(var i in obj){
   	stepObj[i] = (obj[i]-nowObj[i])/allCount;
   }
   // console.log("步长是",stepObj);
   // 一次动多长的距离
   var count = 0;
   // 要知道当前的obj中的属性的值
   // 然后与obj中的目标值进行取差值运算 然后得到的值是要被改变的总值
   var timer = setInterval(function(){
   	// console.log(count)
   	// 计数器
   	 count++;
   	// 循环赋值
   	 for(var i in obj){
   	 	// 规则是：原始的值，加上步长*步数
         if(i.toLowerCase() === "opacity"){
            dom.style.opacity= nowObj[i]+ stepObj[i]*count;
            dom.style.filter = "alpha(opacity="+(nowObj[i]+ stepObj[i]*count)*100+")"
         }else{
            dom.style[i] =  nowObj[i]+ stepObj[i]*count +"px";
         }
   	 }
   	 // 给timer一个停止的条件 
   	 // 当count>=allCount的时候
   	 if(count>=allCount){
   	 	clearInterval(timer)
   	 	// 停表之后 瞬间将dom的属性都设置为目标值
   	 	for(var i in obj){
   	 		if(i.toLowerCase() === "opacity"){
               dom.style.opacity= obj[i];
               dom.style.filter = "alpha(opacity="+obj[i]*100+")";
            }else{
               dom.style[i] = obj[i]+"px";
            }
   	 	}
   	 	// 判断callback是否存在，如果存在则执行不存在则不执行
   	 	// if(callback){callback();}
   	 	// 短路语法 等价于55行的判断
   	 	callback && callback();
   	 }
   },pinlv)
	 
}