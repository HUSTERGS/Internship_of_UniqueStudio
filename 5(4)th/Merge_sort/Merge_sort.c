#include <stdio.h>
#include <stdlib.h>

void Merge_Sort(int arr[], int len);
int min(int x, int y);

int main(void) {
	int arr[10] = {1,2,4,1,2,4,5,7,3,2};
	int len = 10, i = 0;
	for (; i < len; i++)
		printf("%d ", arr[i]);
	printf("\n");
	Merge_Sort(arr, len);
	for (i = 0; i < len; i++)
		printf("%d ", arr[i]);
	printf("\n");
}

int min(int x, int y){
	return x > y ? y : x;
}

void Merge_Sort(int arr[], int len){
	int * a = arr;
	int * b = (int *)malloc(len * sizeof(int));
	int seg, start; //seg is the length of data waiting for sorting, doubles every round
	for (seg = 1; seg < len; seg *= 2) {
		for (start = 0; start < len; start += seg * 2){//perform sorting upon every two segments
			int low = start, mid = min(start + seg, len), high = min(start + seg * 2, len);
			int k = low;
			int start1 = low, end1 = mid; //seg1
			int start2 = mid, end2 = high; //seg2
			while (start1 < end1 && start2 < end2) //perform merge_sorting 
				b[k++] = a[start1] < a[start2] ? a[start1++] : a[start2++];//merge seg1 and seg2
			while (start1 < end1) //handle the left data
				b[k++] = a[start1++];
			while (start2 < end2) 
				b[k++] = a[start2++];
		}
		int * temp = a;
		a = b;
		b = temp; //exchange arrA and arrB, prepare for the next round sorting
	}
	
	if (a != arr) { //if arrA and arrB exchanged
		int i;
		for (i = 0; i < len; i++)
			b[i] = a[i];
		b = a;
	}
	free(b);
}
