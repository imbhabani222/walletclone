export const sentenceCase = (str) => {
  if(str){
    const words = str?.toLowerCase().split(" ");

    const sentenceCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    const sentenceCaseString = sentenceCaseWords.join(" ");
    return sentenceCaseString;
  }
   
  };
