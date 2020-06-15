/*
    Bubble sort和其相对应的HTML DOM
 */
function bubbleSort(baseArr){
    var arr = baseArr.slice(),len=baseArr.length;   //使用slice()函数赋值数组，避免原始数据被修改
    for (var i = 0;i<len-1;i++){
        var isEnd = false;  //设定终止标志，避免最坏情况
        for (var j=len-1;j>i;j--){  //从数组尾部开始冒泡，不断上浮
            if(arr[j-1]>arr[j]){    //相邻比较，如符合条件则交换相邻数据，继续冒泡
                arr[j-1] = arr[j-1]^arr[j];
                arr[j] = arr[j-1]^arr[j];
                arr[j-1] = arr[j-1]^arr[j];
                isEnd = true;
            }
            this.pushHis(arr.slice(),i-1,j-1,j);    //压入关键帧
        }
        this.pushHis(arr.slice(),i);    //压入关键帧
        if(!isEnd){
            break;  //符合终止条件，break
        }
    }
    return arr; //返回最终数组结果
}
function bubbleSortDom(max,arr,a,b,c){
    var html='',len=this.arr.length,spanClass;
    for (var i = 0;i<len;i++){
        spanClass ='sort_span'; //sort_span为基础class
        if (i<=a){
            spanClass += ' sort_span_black';    //标记已排序部分
        }else if (i==b){
            spanClass += ' sort_span_tag';  //标记上浮目标
        }else if(i==c){
            spanClass += ' sort_span_green';    //标记比较目标
        }
        html += "<div class='frame'><span class='"+spanClass+"' style='height: "+arr[i]/max*100+"%'></span></div>";
    }
    document.querySelector(".displayBox").innerHTML = html; //DOM输出
}

/*
    Insert sort和其相对应的HTML DOM
 */
function insertSort(baseArr){
    var len=baseArr.length,arr=baseArr.slice(); //使用slice()函数赋值数组，避免原始数据被修改
    for (var i =1;i<len;i++){
        for(var j=i;j>0&&arr[j-1]>arr[j];j--){  //从已排序部分的尾部开始，不断上浮，如符合条件则交换，直到停止
            this.pushHis(arr.slice(),i,j,j-1);
            arr[j-1] = arr[j-1]^arr[j];
            arr[j] = arr[j-1]^arr[j];
            arr[j-1] = arr[j-1]^arr[j];
        }
        this.pushHis(arr.slice(),i,j);  //压入关键帧
    }
    return arr;
}
function insertSortDom(max,arr,c,a,b){
    var len = arr.length,spanClass='',html='';
    for (var i = 0;i<len;i++){
        spanClass = 'sort_span';    //sort_span为基础class
        if(i<=c){
            spanClass += ' sort_span_black';    //标记已排序部分
        }
        if(i==a){
            spanClass += ' sort_span_tag';    //标记跟踪目标
        }else if(i==b){
            spanClass += ' sort_span_green';  //标记比较目标
        }
        html += "<div class='frame'><span class='"+spanClass+"' style='height: "+arr[i]/max*100+"%'></span></div>";
    }
    document.querySelector(".displayBox").innerHTML = html; //DOM输出
}

/*
    Select sort和其相对应的HTML DOM
 */
function selectSort(baseArr){
    var arr = baseArr.slice(),len=arr.length;   //使用slice()函数赋值数组，避免原始数据被修改
    for (var i=0; i<len-1; i++) {
        var min = i;
        this.pushHis(arr.slice(),i-1,j,min);    //压入关键帧
        for (var j = i+1; j<len; j++) { //遍历寻找最小值
            if(arr[min]>arr[j]){
                min = j
            }
            this.pushHis(arr.slice(),i-1,j,min);    //压入关键帧
        }
        if(i!=min){ //如找到最小值则交换
            arr[i] = arr[min]^arr[i];
            arr[min] = arr[min]^arr[i];
            arr[i] = arr[min]^arr[i];
        }
        this.pushHis(arr.slice(),i);    //压入关键帧
    }
    return arr;
}
function selectSortDom(max,arr,a,b,c){
    var html='',item= '',spanClass='',len = arr.length;
    for (var i = 0; i <len; i++) {
        spanClass = 'sort_span';    //sort_span为基础class
        if(i<=a){
            spanClass += ' sort_span_black';    //标记已排序部分
        }
        if(i==b){
            spanClass += ' sort_span_burlywood';    //标记遍历指针
        }else if(i==c){
            spanClass += ' sort_span_tag';  //标记最小值目标
        }
        item = '<div class="frame"><span class="'+ spanClass +'" style="height: '+arr[i]/max*100+'%"></span></div>';
        html= html+item;
    }
    document.querySelector('.displayBox').innerHTML = html; //DOM输出
}
/*
    Quick sort和其相对应的HTML DOM
 */

function quickSort(arr,left,right){
    if(left==undefined&&right==undefined){  //如第一次递归，则初始化
        left = 0;
        right= arr.length-1;
        arr = arr.slice();  //使用slice()函数赋值数组，避免原始数据被修改
    }
    var baseLeft = left;
    var baseRight = right;
    if(left>=right){    //如递归终点，则返回
        return;
    }
    var base = left;    //记录比较目标base
    while(left<right){
        while(left<right&&arr[right]>arr[base]){    //确认左侧小于base
            this.pushHis(arr.slice(),left,right,baseLeft,baseRight);    //压入关键帧
            right--;
        }
        while(left<right&&arr[left]<=arr[base]){    //确认右侧大于base
            this.pushHis(arr.slice(),left,right,baseLeft,baseRight);    //压入关键帧
            left++;
        }
        var temp = arr[left];   //交换左右数据
        arr[left] = arr[right];
        arr[right] = temp;
    }
    var temp = arr[baseLeft];   //交换base和中值数据
    arr[baseLeft] = arr[left];
    arr[left] = temp;

    this.sort(arr,baseLeft,left-1,arr); //递归调用左侧
    this.sort(arr,left+1,baseRight,arr);    //递归调用右侧

    return arr;
}

function quickSortDom(max,arr,left,right,baseLeft,baseRight){
    var html='',item= '',len=arr.length;
    for (var i = 0;i<len;i++) {
        spanClass = 'sort_span';    //sort_span为基础class
        if(left<i&&i<right){
            spanClass += ' sort_span_black';    //标记选定部分
        }else if(i==left){
            spanClass += ' sort_span_green';    //标记左值
        }else if(i==right){
            spanClass += ' sort_span_burlywood';    //标记右值
        }
        if(i==baseLeft){
            spanClass += ' sort_span_tag';  //标记左边界和base
        }
        if(i==baseRight){
            spanClass += ' sort_span_teal'; //标记右边界
        }
        item = '<div class="frame"><span class="'+ spanClass +'" style="height: '+arr[i]/max*100+'%"></span></div>';
        html= html+item;
    }
    document.querySelector('.displayBox').innerHTML = html; //DOM输出
}
/*
    Merge sort和其相对应的HTML DOM
 */
function mergeSort(arr,left,right){
    if(left==undefined&&right==undefined){  //如第一次递归，则初始化
        left = 0;
        right= arr.length-1;
        arr = arr.slice();  //使用slice()函数赋值数组，避免原始数据被修改
    }
    var shiftArr = arr.slice(); //复制辅助数组空间
    if(right-left==1||right-left==0){   //确认递归终点
        if(left+1==right&&arr[left]>arr[right]){
            arr[left]=arr[left]^arr[right];
            arr[right]=arr[left]^arr[right];
            arr[left]=arr[left]^arr[right];
        }
        this.pushHis(arr.slice(),left,right);   //压入关键帧
        return;
    }else{
        var middle = Math.floor((left+right)/2);
        this.sort(arr,left,middle-1);   //递归调用左侧
        this.sort(arr,middle,right);    //递归调用右侧
        for(var i=left,j=middle,k=left;k<=right;k++){   //将arr数组左右两侧依次插入辅助数组shiftarr
            if(i>=middle){  //如左侧插入结束，插入右侧
                shiftArr[k] = arr[j];
                j++;
            }else if(j>right){  //如右侧插入结束，插入左侧
                shiftArr[k] = arr[i];
                i++
            }else{  //比较左右侧，优先插入最小值，并移动对应指针
                if(arr[i]>arr[j]){
                    shiftArr[k] = arr[j];
                    j++;
                }else{
                    shiftArr[k] = arr[i];
                    i++;
                }
            }
            this.pushHis(shiftArr.slice(),left,right,k,arr.slice(),i,j,middle); //压入关键帧
        }
        for(var i=0;i<arr.length;i++){
            arr[i] = shiftArr[i];   //将排序结果写回原始数组
        }
    }
    return arr;
}
function mergeSortDom(max,arr,a,b,c,shiftArr,d,e,f){
    var html='',item= '';   //动画主窗口
    for (var i = 0;i<arr.length;i++) {
        spanClass = 'sort_span';    //sort_span为基础class
        if(a<=i&&i<=b){
            spanClass += ' sort_span_black';    //标记已排序区域
            if(i>c){
                spanClass = 'sort_span_none';   //标记待排序区域
            }
        }
        if(i==c){
            spanClass += ' sort_span_tag';  //标记插入目标
        }
        item = '<div class="frame"><span class="'+ spanClass +'" style="height: '+arr[i]/max*100+'%"></span></div>';
        html= html+item;
    }
    document.querySelectorAll('.displayBox')[0].innerHTML = html;   //DOM输出
    if(shiftArr!=undefined){    //动画辅助窗口
        var html='',item= '';
        for (var i=0;i<shiftArr.length;i++) {
            spanClass = 'sort_span';    //sort_span为基础class
            if((d<=i&&i<f)||(e<=i&&i<=b)){
                spanClass += ' sort_span_black';    //标记选定区域
            }else{
                spanClass = ' sort_span_none';  //非选定区域透明化
            }
            if(i==d){
                spanClass += ' sort_span_green';    //选定区域左指针
            }else if(i==e){
                spanClass += ' sort_span_burlywood';    //选定区域右指针
            }
            item = '<div class="frame"><span class="'+ spanClass +'" style="height: '+shiftArr[i]/max*100+'%"></span></div>';
            html= html+item;
        }
        document.querySelectorAll('.displayBox')[1].innerHTML = html;   //DOM输出
    }
}
/*
    Shell sort和其相对应的HTML DOM
 */
function shellSort(baseArr){
    var arr =baseArr.slice(),len=arr.length,gap = Math.ceil(len/2); //使用slice()函数赋值数组，避免原始数据被修改，设定gap为数组长度的一半
    while(gap>0){
        for(var i=0;i<gap;i++){ //确保能够遍历数组
            for(var j=i;j<len;j=j+gap) {    //间值为gap的插入排序
                var k;
                for(k=j;k>0,arr[k-gap]>arr[k];k=k-gap){
                    arr[k-gap] = arr[k-gap]^arr[k];
                    arr[k] = arr[k-gap]^arr[k];
                    arr[k-gap] = arr[k-gap]^arr[k];
                    this.pushHis(arr.slice(),gap,i,k,k-gap);    //压入关键帧
                }
                this.pushHis(arr.slice(),gap,i,k,k-gap);    //压入关键帧
            }
        }
        gap = Math.floor(gap/2);    //折叠gap
    }
    return arr;
}
function shellSortDom(max,arr,gap,a,b,c){
    var html='',item= '',len = arr.length;
    for (var i = 0; i<len; i++) {
        spanClass = 'sort_span';    //sort_span为基础class
        if((i-a)%gap==0){
            spanClass += ' sort_span_black';    //标记选定部分
        }
        if(i==b){
            spanClass += ' sort_span_green';    //标记比较部分
        }else if(i==c){
            spanClass += ' sort_span_tag';  //标记目标部分
        }
        item = 	'<div class="frame"><span class="'+ spanClass +'" style="height: '+arr[i]/max*100+'%"></span></div>';
        html= html+item;
    }
    document.querySelector('.displayBox').innerHTML = html; //DOM输出
}
