package q

import (
	"fmt"
	"math/rand"
	"time"
)

func A3() {
	nums := []int{5, 9, 3, 1, 2, 8, 4, 7, 6}
	fmt.Println("before: ", nums)
	result := quickSort(nums)
	fmt.Println("after: ", result)
}

func quickSort(nums []int) []int {
	if len(nums) == 1 {
		return nums
	}

	rand.Seed(time.Now().Unix())
	index := rand.Intn(len(nums))

	var smallerNums []int
	var largerNums []int

	baseValue := nums[index]

	for i := 0; i < len(nums); i++ {
		if i == index {
			continue
		}

		value := nums[i]
		if baseValue <= value {
			largerNums = append(largerNums, value)
		} else {
			smallerNums = append(smallerNums, value)
		}
	}

	var result []int

	if len(smallerNums) > 0 {
		result = quickSort(smallerNums)
	}
	result = append(result, baseValue)
	if len(largerNums) > 0 {
		result = append(result, quickSort(largerNums)...)
	}

	fmt.Println(smallerNums, baseValue, largerNums)

	return result
}
