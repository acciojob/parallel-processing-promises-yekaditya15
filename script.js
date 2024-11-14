const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

window.addEventListener("load", () => {
  downloadImages(images)
    .then((loadedImages) => {
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = error;
      output.appendChild(errorMessage);
    });
});

function downloadImages(imageArray) {
  const promises = imageArray.map((image) => {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.src = image.url;
      imgElement.onload = () => resolve(imgElement);
      imgElement.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    });
  });

  return Promise.all(promises);
}
