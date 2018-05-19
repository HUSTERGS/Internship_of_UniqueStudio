#include <stdio.h>

void Heapsort(int arr[], int len);
void Max_heapify(int arr[], int start, int end);
void Swap(int *x, int *y) {
	int temp = *x;
	*x = *y;
	*y = temp;
}

int main(void){
	int a[10] = {10, 0, 2, 4, 5, 1, 9, 5}; //length 8
	int len, i;
	len = 8;
	for (i = 0; i < len; i++)
		printf("%d ", a[i]);
	printf("\n");
	Heapsort(a, len);
	for (i = 0; i < len; i++)
		printf("%d ", a[i]);
	printf("\n");
}

void Max_heapify(int arr[], int start, int end) {
	int dad = start;  
	int son = dad * 2 + 1; //conclude the position of son from the nature of heap
	while (son <= end) {
		if (son + 1 <= end && arr[son] < arr[son+1]) //choose the bigger son
			son++;
		if (arr[dad] < arr[son]){ // if dad is smaller than son, exchange
			Swap(&arr[dad], &arr[son]);
			dad = son;
			son = dad * 2 + 1; //prepare for the next round
		} else
			return;
	}
}

void Heapsort(int arr[], int len) {
	int i;
	for (i = len / 2 - 1; i >= 0; i--)
		Max_heapify(arr, i, len - 1);  //initialization, begin with the last dad
	for (i = len - 1; i > 0; i--){
		Swap(&arr[0], &arr[i]);  //arr[0] is always the biggest element, exchange it with the former element of ordered elements
		Max_heapify(arr, 0, i - 1);
	}
}
