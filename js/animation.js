function SortAnimation(){
    this.Histry = [];   //排序的动画帧记录
    this.timer = '';    //计时器
    this.sortType = {   //排序类型的函数数组
        bubble:[bubbleSort,bubbleSortDom],
        insert:[insertSort,insertSortDom],
        select:[selectSort,selectSortDom],
        quick:[quickSort,quickSortDom],
        merge:[mergeSort,mergeSortDom],
        shell:[shellSort,shellSortDom]
    };
    this.sort = quickSort;  //对应的排序类型
    this.sortDom = quickSortDom;   //对应的排序类型的Dom
    this.speed = 50;    //多少毫秒更新一次动画
    this.arr = [];  //原始数组
    this.sortRes = [];  //结果数组
    this.point = 0;   //当前的节点
    this.max = 0;   //数据的最大值

    this.init = function(){    //初始化
        this.createNums(100);   //随机生成100个数据
        this.changeArr($("textarea[name=arr]").val());  //将js的数据写入到HTML
        this.getMax(this.arr);  //获得数组的最大值
        this.initDom(this.arr,this.max);    //打印初始图形
        this.sortRes = this.sort(this.arr); //生成动画帧数据
        $("input[name=maxNode]").val(this.Histry.length);   //写入数据帧的最大值
        this.addEvent();    //添加监视器事件
        return;
    }
    this.createNums = function(num){   //从Sort接收num，随机生成数组
        if(num>1000){   //超规模警告
            alert("请输入不大于1000的数据规模");
            $("input[name=arrLen]").val(1000);
            return this.arr;
        }
        arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(Math.floor(Math.random()*100+1));  //在local_arr中塞入100以下的整数
        }
        $("textarea[name=arr]").html(JSON.stringify(arr));     //修改HTML的textarea
        $("textarea[name=arr]").val(JSON.stringify(arr));
        return this.arr;
    }
    this.changeArr = function(modifyedArr){    //将js的arr修改为HTML的textAreaArr
        var strArr = modifyedArr.substring(1,modifyedArr.length-1).split(",");  //","为分隔符分割modifyedArr
        for(var i = 0;i<strArr.length;i++){
            if(isNaN(strArr[i])){
                alert("请输入有效的数据");  //发现无效数据发出警告，并终止修改
                return;
            }
        }
        this.arr = [];  //清空js的arr
        for(var i = 0;i<strArr.length;i++){
            this.arr.push(parseInt(strArr[i])); //将新数据写入到arr中
        }
        $("textarea[name=present_arr]").html(JSON.stringify(arr));  //修改当前数据列表
        $("textarea[name=present_arr]").val(JSON.stringify(arr));
        this.getMax(this.arr);  //获取数组的最大值
        return;
    }
    this.getMax = function(arr){    //获取数组的最大值，确定可视化图形之间的比例
        var max = arr[0];
        for(var i=0;i<arr.length;i++){
            if(max<arr[i]){
                max = arr[i];
            }
        }
        this.max = max; //确认数组最大值
        return;
    }
    this.createNumsEvent = function(arr){    //随机生成数据事件
        this.stopAnimation();  //暂停动画
        this.createNums($("input[name=arrLen]").val());   //创建随机数组
        return;
    }
    this.flashEvent = function(arr){    //刷新事件
        this.stopAnimation();  //暂停动画
        this.Histry = [];   //清空Histry历史记录
        this.point = 0; //归零节点位置
        this.changeArr($("textarea[name=arr]").val());    //将js的arr修改为HTML的textAreaArr
        this.sortRes = this.sort(this.arr); //使用sort算法排序数组arr，将排序结果写入sortRes中，并将排序过程写入Histry中
        this.initDom(this.arr,this.max);    //打印初始图形
        $("input[name=maxNode]").val(this.Histry.length);
        return;
    }
    this.addEvent = function(){    //添加事件
        var that = this;    //将this引用赋值给that，避免this引用的改变而丢失对象
        $("body").click(function(event) {   //使用jQuery的$来监视html发生的body事件
            var target = event.target;  //添加事件触发标志
            if(target.type == 'button'){
                var id = target.id;
                if(id=='createNums'){   //如果是createNums按钮，触发creatNums事件
                    that.createNumsEvent();
                }else if(id=="falsh"){  //如果是flash按钮，触发flash事件
                    that.flashEvent();
                }else if(id=="again"){  //如果是again按钮，触发createNums和flash事件，并播放动画
                    that.createNumsEvent();
                    that.flashEvent();
                    that.startAnimation();
                }else if(id=='speedUp'||id=='slowDown'||id=="pause"){    //如果触发的是加减速事件，则触发changeSpeed函数调整速度
                    that.changeSpeed(id);
                }else if(id=="prior"||id=="next"||id=="goto"){  //如果触发的是跟踪事件，则触发debug
                    that.debug(id);
                }else{                                                          //如果触发的是排序选项事件，则修改排序算法，并触发flash事件
                    that.changeSortType(id);    //修改排序算法sort的类型
                }

            }
        });
        return;
    }
    this.pushHis = function(){ //将算法的具体步骤，动画的帧压入arrHis的线性表中
        this.Histry.push(arguments);
        return;
    }
    this.startAnimation = function(){   //播放动画事件
        $("button[name=pause]").html("暂停");   //修改button
        var Histry = this.Histry;
        var that = this;
        this.timer = setInterval(function(){    //开始播放排序动画
            if(that.point<0){
                that.point = 0; //如发现point错误，则进行修正
            }
            if(that.point<Histry.length){
                console.log(Histry[0]); //在网页的console打印arrHis的信息
                that.sortDom(that.max,Histry[that.point][0],Histry[that.point][1],Histry[that.point][2],Histry[that.point][3],Histry[that.point][4],Histry[that.point][5],Histry[that.point][6],Histry[that.point][7],Histry[that.point][8]);
                that.point++;
                $("input[name=node]").val(that.point);
            }else{
                that.initDom(that.sortRes,that.max);    //输出最终动画帧
                that.stopAnimation();  //停止排序动画
                $("input[name=node]").val("End");   //修改button
                $("button[name=pause]").html("重新播放");
            }
        },this.speed);
        return;
    }
    this.stopAnimation = function(){    //暂停动画播放
        clearInterval(this.timer);
        $("button[name=pause]").html("播放");
        return;
    }
    this.changeSortType = function(arg){   //根据arg来选择排序算法
        this.sort = this.sortType[arg][0];
        this.sortDom = this.sortType[arg][1];
        var str;    //修改button
        switch (arg) {
            case "bubble":
                str = "冒泡";
                break;
            case "insert":
                str = "插入";
                break;
            case "select":
                str = "选择";
                break;
            case "quick":
                str = "快排";
                break;
            case "merge":
                str = "归并";
                break;
            case "shell":
                str = "希尔";
                break;
            default:
                str = "错误";
                break;
        }
        $("input[name=type]").val(str);
        this.stopAnimation();  //暂停动画
        this.Histry = [];   //清空Histry历史记录
        this.point = 0; //归零节点位置
        this.sortRes = this.sort(this.arr); //使用sort算法排序数组arr，将排序结果写入sortRes中，并将排序过程写入Histry中
        this.initDom(this.arr,this.max);    //打印初始图形
        $("input[name=maxNode]").val(this.Histry.length);
        return;
    }
    this.debug = function(id){   //可视化跟踪
        this.stopAnimation();  //停止动画，使得新配置生效
        var Histry = this.Histry;   //用Histry代替this.Histry，缩短代码长度，point不是指针，且可能需要修改，无法缩短
        if(id=="prior"){    //触发的是“上一步”
            if(this.point-1>=0){
                this.point--;
                this.sortDom(this.max,Histry[this.point][0],Histry[this.point][1],Histry[this.point][2],Histry[this.point][3],Histry[this.point][4],Histry[this.point][5],Histry[this.point][6],Histry[this.point][7],Histry[this.point][8]);
                $("input[name=node]").val(this.point);
            }else{
                this.initDom(this.arr,this.max);    //输出初始图形
                this.point=-1;
                $("input[name=node]").val("Start");
            }
        }else if(id=="next"){   //触发的是“下一步”
            if(this.point+1<this.Histry.length){
                this.point++;
                this.sortDom(this.max,Histry[this.point][0],Histry[this.point][1],Histry[this.point][2],Histry[this.point][3],Histry[this.point][4],Histry[this.point][5],Histry[this.point][6],Histry[this.point][7],Histry[this.point][8]);
                $("input[name=node]").val(this.point);
            }else{
                this.initDom(this.sortRes,this.max);    //输出最终图形
                this.point=this.Histry.length;
                $("input[name=node]").val("End");
                $("button[name=pause]").html("重新播放");
            }
        }else{  //触发转跳
            var node = Number($("input[name=destNode]").val()) ;
            if(node>=0&&node<this.Histry.length){
                this.point = node;
                $("input[name=node]").val(node);
                this.sortDom(this.max,Histry[this.point][0],Histry[this.point][1],Histry[this.point][2],Histry[this.point][3],Histry[this.point][4],Histry[this.point][5],Histry[this.point][6],Histry[this.point][7],Histry[this.point][8]);
            }else{  //输入数据错误，触发警告
                if(node<0){
                    alert("请输入大于0的数");
                    $("input[name=destNode]").val(this.point);
                }else{
                    alert("请输入小于"+this.Histry.length+"的数");
                    $("input[name=destNode]").val(this.point);
                }
            }
        }
        return;
    }
    this.changeSpeed = function(id){   //动画速度控制
        if (id=="pause"){   //如果触发的是播放||暂停按钮
            $("input[name=node]").val(this.point);
            if($("button[name=pause]").html()=="暂停"){
                this.stopAnimation();
                $("button[name=pause]").html("播放");
            }else{
                if($("button[name=pause]").html()=="重新播放"){ //如果处于重新播放状态
                    this.changeArr($("textarea[name=arr]").val());
                    this.point = 0;
                    this.Histry = [];
                    this.sortRes = this.sort(this.arr);
                    $("input[name=maxNode]").val(this.Histry.length);
                }
                this.speed = Number($("input[name=speedNum]").val());   //使用Number避免speed被修改成string类型
                if(this.speed<0){   //自定义最大速度不能高于0毫秒
                    this.speed = 0;
                }else if(this.speed>1000){
                    this.speed = 1000;
                }
                this.startAnimation();  //播放动画
                $("button[name=pause]").html("暂停");
            }
        }else { //如果触发的是加减速按钮
            this.stopAnimation();
            if(id == 'speedUp'){    //推荐最快速度为5毫秒
                if(this.speed >=15){
                    this.speed = this.speed - 10;   //加速10
                }else{
                    this.speed = 5;
                }
            }
            if(id == 'slowDown'){   //设定最慢速度为1000毫秒
                if(this.speed < 1000){
                    this.speed = this.speed + 10;  //减速10
                }else{
                    this.speed = 1000;
                }
            }
        }
        $("input[name=speedNum]").val(this.speed);
        return;
    }
    this.initDom = function(arr,max){  //根据数组arr生成可视化图标
        var html='',item= '';
        for (var i = 0; i <arr.length; i++) {
            item = 	'<div class="frame"><span class="sort_span" style="height: '+arr[i]/max*100+'%"></span></div>';
            html= html+item;
        }
        document.querySelector('.displayBox').innerHTML = html;  //使用DOM将生成的html插入到HTML网页中
        return;
    }
}

var s = new SortAnimation();
s.init();   //初始化SortAnimation