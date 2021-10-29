package q

import "fmt"

func A5() {
	nums := []int{5, 9, 3, 1, 2, 8, 4, 7, 6}
	fmt.Println("before: ", nums)
	result := insertSort(nums)
	fmt.Println("after: ", result)
}

func mergeSort(nums []int) []int {
	if len(nums) == 1 {
		return nums
	}
	halfIndex := len(nums) / 2
	leftNums := mergeSort(nums[:halfIndex])
	rightNums := mergeSort(nums[halfIndex:])
	leftIndex := 0
	rightIndex := 0
	var result []int
	for i := 0; i < len(leftNums)+len(rightNums); i++ {
		if len(rightNums) <= rightIndex || (len(leftNums) > leftIndex && leftNums[leftIndex] <= rightNums[rightIndex]) {
			result = append(result, leftNums[leftIndex])
			leftIndex++
		} else {
			result = append(result, rightNums[rightIndex])
			rightIndex++
		}
	}
	fmt.Println(leftNums, rightNums)
	fmt.Println(result)
	fmt.Println("-----")
	return result
}
