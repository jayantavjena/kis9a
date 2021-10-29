package q

import "fmt"

func A1() {
	nums := []int{5, 9, 3, 1, 2, 8, 4, 7, 6}
	fmt.Println("before: ", nums)
	result := bubbleSort(nums)
	fmt.Println("after: ", result)
}

func bubbleSort(nums []int) []int {
	for i := 0; i < len(nums); i++ {
		isSwapped := false
		for j, value := range nums[:len(nums)-i-1] {
			if value > nums[j+1] {
				nums[j] = nums[j+1]
				nums[j+1] = value
				isSwapped = true
			}
			fmt.Println(nums)
		}

		if !isSwapped {
			break
		}
		fmt.Println("-----")
	}
	return nums
}
