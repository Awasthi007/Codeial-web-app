

const inpFile = document.getElementById("my-form");
console.log(inpFile);
const previewContainer = document.getElementById("image-preview");
console.log(previewContainer);
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

inpFile.addEventListener("change", function(){
    const file = this.file[0];

    if(file){
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("laod", function(){
            console.log(this);
            previewImage.setAttribute("src", this.result);
        });
        
        reader.readAsDataURL(file);
    }else{
        previewDefaultText.style.display = "null";
        previewImage.style.display = "null";
    }
});