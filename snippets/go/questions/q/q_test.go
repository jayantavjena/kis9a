package q

import (
	"reflect"
	"testing"
)

func TestMergeStringMaps(t *testing.T) {
	a := map[string]string{
		"a": "aa",
	}
	b := map[string]string{
		"b": "bb",
	}
	res := map[string]string{
		"a": "aa",
		"b": "bb",
	}
	if ret := mergeStringMaps(a, b); !reflect.DeepEqual(ret, res) {
		t.Fatalf("string")
	}
}
