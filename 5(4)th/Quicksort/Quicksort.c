#include <stdio.h>
void Quicksort(arr[], int len);
int main=(void){
	int arr[10] = {1, 0, 4, 2, 10, 18, -1, 30, 3, 0}; //length 10
	int len = 10;
	int i;
	for (i = 0; i < len; i++)
		printf("\d", arr[i]);
	printf("\n");
	Quicksort(arr, len);
	for (i = 0; i < len; i++)
		printf("\d", arr[i]);
	printf("\n");
}	

void Quicksort(int arr[], int len){
	
}
