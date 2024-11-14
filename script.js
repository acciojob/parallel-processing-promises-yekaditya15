const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

function downloadAllImages() {
  output.innerHTML = "Loading images...";

  Promise.all(images.map(downloadImage))
    .then((loadedImages) => {
      output.innerHTML = "";
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      output.innerHTML = error;
    });
}

btn.addEventListener("click", downloadAllImages);
