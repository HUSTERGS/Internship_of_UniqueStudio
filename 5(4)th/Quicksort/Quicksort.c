#include <stdio.h>

void Quicksort(int arr[], int len);
void quick_sort(int arr[], int start, int end);  //main sort program
void swap(int *x, int *y){  //exchange two value essentially
	int temp = *x;
	*x = *y;
	*y = temp;
}

int Mid(int x, int y, int z){
	return x > y ? (y > z ? y : (x > z ? z : x)) : (x > z ? x : (y > z ? z : y));
} //return the middle value among three values as the "mid", in order to promote the average efficiency

int main(void){
	int arr[10] = {1, 0, 4, 2, 10, 18, -1, 30, 3, 0}; //length 10
	int len = 10;
	int i;
	for (i = 0; i < len; i++)
		printf("%d ", arr[i]);
	printf("\n");
	Quicksort(arr, len);
	for (i = 0; i < len; i++)
		printf("%d ", arr[i]);
	printf("\n");
}	

void quick_sort(int arr[], int start, int end){
	if (start >= end)
		return;
	//int mid = Mid(arr[start], arr[end], arr[(start + end) / 2]);
	int mid = arr[end];
	int left = start, right = end - 1;
	while (left < right) {
		while (arr[left] < mid && left < right) //find the value bigger than the mid within the left part
			left++;
		while (arr[right] >= mid && left < right) //find the value smaller than the mid within the right part
			right--;
		swap(&arr[left], &arr[right]); //exchange them
	}
	if (arr[left] >= arr[end])
		swap(&arr[left], &arr[end]);
	else
		left++;
	if (left) //ensure that left >= 1
		quick_sort(arr, start, left - 1);
	quick_sort(arr, left + 1, end);
}

void Quicksort(int arr[], int len){
	quick_sort(arr, 0, len - 1);
}
