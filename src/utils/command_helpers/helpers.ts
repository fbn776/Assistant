/**Returns the GCD of a list of numbers*/
export const GCDList = (...nums: number[]) => {
    return nums.reduce((val: number, curr: number) => {
        let a = val;
        let b = curr;

        while (b !== 0) {
            let t = b;
            b = a % b;
            a = t;
        }
        return a;
    })
};

/**Returns the product of a list of numbers*/
export const ProdList = (...nums: number[]) => {
    return nums.reduce((val: number, curr: number) => {
        return val * curr;
    });
}