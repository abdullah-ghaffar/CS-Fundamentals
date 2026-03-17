function countAnagrams(text, pattern) {
    let count = 0;
    let patternMap = {};
    let windowMap = {};

    // 1. Pattern Map banao
    for (let char of pattern) {
        patternMap[char] = (patternMap[char] || 0) + 1;
    }

    const k = pattern.length;
    let matchCount = 0; // Yeh batayega kitne unique characters match ho rahe hain

    // 2. Sliding Window logic
    for (let i = 0; i < text.length; i++) {
        // Naya character add karo
        let char = text[i];
        windowMap[char] = (windowMap[char] || 0) + 1;

        // Agar ye char pattern mein hai aur count match ho gaya
        if (windowMap[char] === patternMap[char]) {
            matchCount++;
        }

        // Window size se barhi ho gayi (Slide karo)
        if (i >= k) {
            let leftChar = text[i - k];
            if (windowMap[leftChar] === patternMap[leftChar]) {
                matchCount--;
            }
            windowMap[leftChar]--;
        }

        // 3. Compare (Agar matchCount map ki length ke barabar ho)
        if (i >= k - 1) {
            if (matchCount === Object.keys(patternMap).length) {
                count++;
            }
        }
    }

    console.log("Anagrams ki tadaad:", count);
    return count;
}

// --- TEST ---
const text = "cbaebabacdcba";
const pattern = "abc";
countAnagrams(text, pattern); // Ab output 2 aayega!