const sum = function(...args) {
    let temp = 0;
    temp = args.reduce((prev, next) => {
        return prev + next
    });
    return temp
};

export default sum;