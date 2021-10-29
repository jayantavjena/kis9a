package q

import "fmt"

func A2() {
	nums := []int{5, 9, 3, 1, 2, 8, 4, 7, 6}
	fmt.Println("before: ", nums)
	result := selectionSort(nums)
	fmt.Println("after: ", result)
}

func selectionSort(nums []int) []int {
	for i, v1 := range nums {
		minValueIndex := i
		minValue := v1

		for j, v2 := range nums[i:] {
			if minValue > v2 {
				minValueIndex = i + j
				minValue = v2
			}
		}

		nums[i] = minValue
		nums[minValueIndex] = v1

		fmt.Println(nums)
	}

	return nums
}
