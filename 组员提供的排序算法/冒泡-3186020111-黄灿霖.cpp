#include<stdio.h>
   void bubbleSort(int* arr,int n)
{
	int temp,i,j;
	for(i=0;i<n-1;i++)  //进行n-1趟冒泡 ， 
		for(j=0;j<n-1-i;j++)//每趟冒泡需要比较n-1-i次 ，然后每趟冒泡就会有一个最大的数就浮上去 
			if(arr[j]>arr[j+1]) //如果这个数比和它比较的数大，就交换它们的位置 
			{
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
}
   int main(){
   	int a[100],i,n;
   	scanf("%d",&n);
   	for(i=0;i<n;i++)
   	 scanf("%d",&a[i]);
   	 bubbleSort(a,n);
   	 for(i=0;i<n;i++)
   	 printf("%d ",a[i]);
   }
