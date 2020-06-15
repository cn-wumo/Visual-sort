#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int CreateData(int arr[], int n, int min, int max){  //用于生成随机数的函数
	//数组arr用来保存随机数，n表示生成的数量，min表示下界，max表示上界 
	int i,j,flag;
	srand(time(NULL));	//使用时间函数 time生成一个随机种子，控制 rand 函数生成随机数 
	if((max - min + 1) < n)		return 0;	//如果随机数的取值范围的大小比生成的 数量少就无法生成 
	for(i = 0; i < n; i++){
		do{
			arr[i]= (max - min + 1)*rand()/(RAND_MAX + 1) + min;  //生成随机数   
			flag = 0;
		}while(flag);
	} 
	return 1;
	
}

void ShellSort(int a[], int n)	//希尔排序 
{
	int d, i, j, x;
	d = n/2; 	//计算第一次的间隔 
	while( d >= 1 )//循环到间隔小于 1时结束 
	{	
		for( i = d; i < n; i ++  )
		{
			x = a[i];	//取序列中的下一个数据 
			j = i - d;	//序列中前一个数据的序号 
			while( j >= 0 && a[j] > x)	//下一个数大于前一个数 
			{	
				a[j+d] = a[j];	//将后一个数向前移动 
				j = j - d;		//修改序号，继续向前移动 
			}
			a[j+d] = x;		//保存数据 
		} 
		d /= 2;		//减小间隔 
	} 
}

int main(){
	int n,i;
	printf("输入要生成的数据个数：");
	scanf("%d",&n);
	int a[n];
	CreateData(a,n,1,1000);
	printf("原数据：\n");
	for(i = 0; i < n; i++){
		printf("%d ",a[i]);
	} 
	printf("\n");
	ShellSort(a,n);
	printf("排序后：\n");
	for(i = 0; i < n; i++){
		printf("%d ",a[i]);
	} 
	printf("\n");
	return 0;
}
