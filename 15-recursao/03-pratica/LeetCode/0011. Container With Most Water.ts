function maxArea(height: number[]): number {
    let esq = 0;
    let dir = height.length - 1;
    let maiorArea = 0;

    while (esq < dir) {
        const altura = Math.min(height[esq], height[dir]);
        const area = altura * (dir - esq);
        if (area > maiorArea) maiorArea = area;
        if (height[esq] <= height[dir]) {
            esq++;
        } else {
            dir--;
        }
    }
    return maiorArea;
}

// Example 1:
let height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height));
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// Example 2:
height = [1, 1];
console.log(maxArea(height));
// Output: 1
