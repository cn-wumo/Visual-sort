#include<iostream>
using namespace std;
void insertSort(int array[], int num)//输入待排序的数组array和数组长度num 
{
    for(int i = 1; i < num; ++i)//挨个循环 
    {
        int j=i;
		for(int j = i; j> 0 && array[j-1] > array[j]; j--)//从i的位置向前搜索，如果发现array[j-1]>array[j]且j>0就插入 
        {
            int tmp = array[j];
            array[j] = array[j-1];
            array[j-1] = tmp;
        }
    }
}
int main(){
	int num,i;
	cin>>num;//输入数组元素的个数 
	int *array=new int[num];//按照元素个数 定义数组 
	for(i=0;i<num;i++)
	cin>>array[i]; 
	insertSort(array,num);//排序 
	for(i=0;i<num;i++)
	cout<<array[i]<<" ";//输出 
	delete[] array;//释放数组空间 
	return 0;  
}
