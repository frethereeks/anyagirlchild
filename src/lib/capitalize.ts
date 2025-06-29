export const capitalize = (str: string) => {
    return str.toLowerCase().split(" ").map((word, index) => {
        if (index === 0 || word.length > 3) {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }
        else return word;
    }).join(" ")
}