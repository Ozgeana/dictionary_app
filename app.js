const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = new Audio();
const btn = document.getElementById("btn"); 
const addWordButton = document.getElementById("add-word");
const questionMarkButton = document.getElementById("question-mark");
const unknownWordsCounter = document.getElementById("unknown-words-counter");
const wordList = document.getElementById("word-list");
const modal = document.getElementById("myModal");
const modalClose = document.getElementsByClassName("close")[0];
const inputWord = document.getElementById("inp-word"); // Kelimenin alındığı input alanı
const wordIcon = document.getElementById("word-icon");
const wordListContainer = document.getElementById("word-list-container");

btn.addEventListener("click", () => { 
    let inpWord = document.getElementById("inp-word").value;

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
            sound.src = `https:${data[0].phonetics[0].audio}`; 
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});


function playSound() {
  sound.play(); 
}



let unknownWords = new Set(); // Her kelimenin yalnızca bir kez eklenmesini sağlamak için Set kullanın

// Artı butonuna tıklandığında
addWordButton.addEventListener("click", () => {
    const word = inputWord.value.trim();
    
    if (word !== "" && !unknownWords.has(word)) {
        unknownWords.add(word); // Kelime daha önce eklenmediyse, eklenen kelimelere ekle
        updateUnknownWordsCounter();
        inputWord.value = "";
    }
});

// Soru işareti ikonuna tıklandığında
questionMarkButton.addEventListener("click", () => {
    // Modal penceresini aç
    modal.style.display = "block";

    // Eklenen kelimeleri görüntüle
    displayUnknownWords();
});

// Modal penceresini kapat
modalClose.onclick = function () {
    modal.style.display = "none";
};

// Kullanıcı modal dışına tıkladığında pencereyi kapat
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function updateUnknownWordsCounter() {
    unknownWordsCounter.textContent = unknownWords.size;
}

function displayUnknownWords() {
    wordList.innerHTML = ""; // Kelime listesini temizle

    if (unknownWords.size === 0) {
        wordList.innerHTML = "<p>Henüz kelime eklenmedi.</p>";
    } else {
        let index = 1;
        unknownWords.forEach((word) => {
            const li = document.createElement("li");
            li.textContent = `${index}. ${word}`;
            wordList.appendChild(li);
            index++;
        });
    }
}
const wordCollection = {
  words: [], // Kelimeleri saklamak için bir dizi
  addWord: function (word) {
      // Kelimeyi diziye ekle
      this.words.push(word);
  },
  getWords: function () {
      // Eklenen kelimeleri döndür
      return this.words;
  },
  clearWords: function () {
      // Eklenen kelimeleri temizle
      this.words = [];
  },
};

// Kelimeleri nesneye ekleyin
addWordButton.addEventListener("click", () => {
  const word = inputWord.value.trim();
  if (word !== "") {
      wordCollection.addWord(word);
      addedWords.push(word); // Eklenen kelimeleri diziye ekleyin
      inputWord.value = "";
  }
});
// Eklenen kelimeleri liste haline getirmek için bir fonksiyon
function displayWordsInList() {
  const wordListContainer = document.getElementById("word-list-container");
  const wordList = document.getElementById("word-list");

  // Liste öğelerini temizle
  wordList.innerHTML = "";

  // Eklenen kelimeleri liste olarak göster
  addedWords.forEach((word, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = word;
      listItem.addEventListener("click", () => {
          // Kelimenin anlamını göstermek için bir işlev çağır
          showWordMeaning(word);
      });
      wordList.appendChild(listItem);
  });

  // Liste bölmesini görünür yap
  wordListContainer.style.display = "block";
}

// "Eklenen Kelimeleri Göster" düğmesine tıklamayı dinle
const showWordsButton = document.getElementById("show-words");
showWordsButton.addEventListener("click", () => {
  displayWordsInList();
});

// Bir kelimenin anlamını göstermek için bir işlev
function showWordMeaning(word) {
  // Burada kelimenin anlamını nasıl alacağınıza ve göstereceğinize dair kodu ekleyin
  // Örnek olarak kelimenin API'den anlamını alabilirsiniz.
  // Aşağıdaki örnekte, kelimenin anlamını rastgele bir metinle gösteriyorum.

  const meaning = `Örnek anlam: ${word} kelimesinin anlamı burada.`;

  alert(meaning);
}

let isWordListVisible = false;

// İkona tıklama olayını dinleyin
wordIcon.addEventListener("click", () => {
    if (isWordListVisible) {
        hideWordList();
    } else {
        displayWordsInList();
    }
});

function displayWordsInList() {
    const wordList = document.getElementById("word-list");

    // Liste öğelerini temizle
    wordList.innerHTML = "";

    // Eklenen kelimeleri liste olarak göster
    addedWords.forEach((word, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${word}`;
        wordList.appendChild(listItem);
    });

    // Liste bölmesini görünür yap
    wordListContainer.style.display = "block";

    isWordListVisible = true;
}

function hideWordList() {
    // Liste bölmesini gizle
    wordListContainer.style.display = "none";

    isWordListVisible = false;
}