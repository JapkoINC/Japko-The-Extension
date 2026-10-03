const wordA = "jabłko";
const wordB = "apple";
const replacementWord = "Japko";

function walkText(node) {
  let child = node.firstChild;
  while (child) {
    const next = child.nextSibling;
    if (child.nodeType === 3) { 
      const text = child.nodeValue;
      
  
      const newText = text
        .replace(new RegExp(wordA, 'gi'), replacementWord)
        .replace(new RegExp(wordB, 'gi'), replacementWord);
        
      if (newText !== text) {
        child.nodeValue = newText;
      }
    } else if (child.nodeType === 1 && child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE') {
      walkText(child);
    }
    child = next;
  }
}


walkText(document.body);

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if (addedNode.nodeType === 1) { 
        walkText(addedNode);
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });