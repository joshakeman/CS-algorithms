## How does quicksort work?

1. First you find the "pivot" element in the array.
2. Start the left pointer at the first element of the array.
3. Start the right pointer at the last element of the array.
4. Compare the lement pointing with the left pointer... if it is less than the pivot element, then move the left pointer to the right (add 1 to the left index). COntinue this until the left side element is greater or equal to the pivot element.
5. Compare the element pointing with right pointer and if it's gerater than the pivot element, move it left (subtract 1 from right index). Continue until the right side element is less or equal to the pivot element.
6. Check if the left pointer is less than or equal to the right element, then saw the lements in locations of these pointers.
7. INcrement the left pointer and decrement the right pinter.
8. If index of left pointer is still less than the index of the right pointer, repeat the process; else return the index of the left pointer.

**Note** quicksort has the advantage that unlike mergesort you can sort a list in place, so you don't need to make a copy of the array, so you save on memory

Key word to remember: you **partition** list by picking a **pivot** item. **Partition** with **pivot**
Quick sort partition with pivot




### Time Complexity:
Best: O(nLogn), 
Average: O(nLogn), 
Worst: O(n^2)
### Space Complexity:
O(logn(n))