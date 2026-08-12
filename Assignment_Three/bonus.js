// Write a function to find the longest common prefix string amongst
// an array of strings.If there is no common prefix, return an empty string "".

function longestCommonPrefix(arr) {
    let prefix = arr[0];
    console.log(prefix);

    for (let word of arr) {
        console.log(word);
        while (!word.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
        }
    }

    return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));