window.addEventListener("load", () => {
  runAnimations();
});

const handleReload = () => {
  window.location.reload();
};

const handleContactClick = () => {
  document.getElementById("contact-popup").style.display = "flex";
};

const handleSearch = async () => {
  const inputField = document.querySelector(".search-bar__input");
  const searchText = inputField.value.trim();

  if (searchText.length === 0) {
    document.getElementById("error-message").innerText =
      "Please enter text before searching.";
    return;
  }

  if (searchText.length > 1000) {
    document.getElementById("error-message").innerText =
      "Please limit your input to 1000 words.";
    return;
  }

  document.getElementById("error-message").innerText = "";
  document.querySelector(".search-bar__icon-image").style.display = "none";
  document.getElementById("loading-spinner").style.display = "block";

  try {
    const response = await fetchChatbotResponse(searchText);
    document.getElementById("chatbot-response").innerText = response;
    document.getElementById("search-popup").style.display = "flex";
  } finally {
    document.getElementById("loading-spinner").style.display = "none";
    document.querySelector(".search-bar__icon-image").style.display = "block";
  }
};

const fetchChatbotResponse = async (prompt) => {
  try {
    const k = "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"; 

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${K},
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: You are an experienced psychiatrist with a deep understanding of the human mind and dream interpretation. Analyze the following dream and provide an insightful, interesting, and concise explanation. Here's the dream: "${prompt}",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(API Error: ${response.status} - ${errorText});
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return An error occurred: ${error.message};
  }
};

const closePopup = (event) => {
  const overlay = event.currentTarget;
  if (
    overlay.classList.contains("popup-overlay") ||
    overlay.classList.contains("popup-close")
  ) {
    overlay.closest(".popup-overlay").style.display = "none";
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};
