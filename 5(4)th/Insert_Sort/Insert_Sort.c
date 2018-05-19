#include <stdio.h>
void Insert_Sort(int arr[], int len);
int main(void){
	int a[10] = {10, 0, 2, 4, 5, 1, 9, 5}; //length 8
	int len, i;
	len = 8;
	for (i = 0; i < len; i++)
		printf("%d ", a[i]);
	printf("\n");
	Insert_Sort(a, len);
	for (i = 0; i < len; i++)
		printf("%d ", a[i]);
	printf("\n");
}

void Insert_Sort(int arr[], int len) {
	int i, j, temp; 
	for (i = 1; i < len; i++){
		temp = arr[i]; //store the current value
		for (j = i; j > 0 && arr[j-1] > temp; j--)
			arr[j] = arr[j-1];  //move
		arr[j] = temp; //revalue when jump out
	}
}
