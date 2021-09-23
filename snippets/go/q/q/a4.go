package q

import "fmt"

func A4() {
	nums := []int{5, 9, 3, 1, 2, 8, 4, 7, 6}
	fmt.Println("before: ", nums)
	result := insertSort(nums)
	fmt.Println("after: ", result)
}

func insertSort(nums []int) []int {
	result := nums[0:1]
	fmt.Println(result, nums[1:])

	for i, value := range nums[1:] {
		for j, sortedValue := range result {
			if value < sortedValue {
				result = append(result[:j], append([]int{value}, result[j:]...)...)
				break
			}

			if j == len(result)-1 {
				result = append(result, value)
				break
			}
		}
		fmt.Println(result, nums[i+2:])
	}

	return result
}
