export const mapArrayToObject = (myArray) => {
    // return myArray.reduce(() => ).map((item, index) => {
    //     []
    // });
    Object.assign({}, [...myArray]);
}