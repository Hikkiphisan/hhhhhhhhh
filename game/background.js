const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d");
const canvas_Width = canvas.width = 800
const canvas_Height = canvas.height = 700;
let gameSpeed = 2;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "vecteezy_waterfall-game-background_24098100.jpg"

let x = 0      //biến x đre lưu trữ vị trí ngang cho background1, trong trường hợp để là 0 thì ảnh ở mép luôn
let x2 = 2000  //biến x2 đến lưu trữ vị tri cho background2, vị trí 2000 tức là ử vị trí 2000px theo chiều ngang trái sang phải là 2000 thì ảnh x2 xảy ra.
function animate() {
   ctx.drawImage(backgroundLayer1, x, 0);   <!--y luôn đặt là 0 để ảnh ở ngay mép từ trên xuống-->
   ctx.drawImage(backgroundLayer1, x2, 0);
   if (x < -2000) x = 2000;     //x nó lướt tới vị trí -2000px thì nó tự đặt lại thành 2000
   else x -= gameSpeed    //ban đầu là x-- thì nó vẫn di chuyển lùi, nhưng để x-= speed tức là xét tốc độ.
   if (x2 < -2000) x2 = 2000 - gameSpeed;
   else x2 -= gameSpeed;
   requestAnimationFrame(animate);
}
animate()