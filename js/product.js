function changeImage(element){

  // 获取主图

  const mainImage =
    document.getElementById("mainProductImage");

  // 替换主图

  mainImage.src = element.src;

  // 去掉所有active

  const thumbs =
    document.querySelectorAll(".thumb");

  thumbs.forEach((thumb)=>{

    thumb.classList.remove("active-thumb");

  });

  // 当前加active

  element.classList.add("active-thumb");
}