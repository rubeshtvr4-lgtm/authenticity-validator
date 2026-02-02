<<<<<<< HEAD
// A simple logic to compare two texts
exports.checkPlagiarism = (uploadedText, databaseText) => {
    if (!uploadedText || !databaseText) return 0;

    const words1 = uploadedText.toLowerCase().split(/\W+/);
    const words2 = databaseText.toLowerCase().split(/\W+/);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    // Find intersection (common words)
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // Calculate Jaccard Similarity (0 to 100%)
    const union = new Set([...set1, ...set2]);
    const score = (intersection.size / union.size) * 100;
    
    return score.toFixed(2); // Returns "45.20" etc.
=======
// A simple logic to compare two texts
exports.checkPlagiarism = (uploadedText, databaseText) => {
    if (!uploadedText || !databaseText) return 0;

    const words1 = uploadedText.toLowerCase().split(/\W+/);
    const words2 = databaseText.toLowerCase().split(/\W+/);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    // Find intersection (common words)
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // Calculate Jaccard Similarity (0 to 100%)
    const union = new Set([...set1, ...set2]);
    const score = (intersection.size / union.size) * 100;
    
    return score.toFixed(2); // Returns "45.20" etc.
>>>>>>> 04e92bd834593c8fa4360410d354b0903e4d7c24
};