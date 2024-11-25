const canvas = document.querySelector('canvas'); //lựa chọn truy vấn thẻ canvas trong html
const ctx = canvas.getContext('2d'); //gọi 2D Context trong HTML5 Canvas

// canvas.width = window.innerWidth;     // cài đặt kích thước của canvas để bằng kích thước của cửa sổ trình duyệt hiện tại.
// canvas.height = window.innerHeight; // cài đặt kích thước của canvas để bằng kích thước của cửa sổ trình duyệt hiện tại.
// //  canvas sẽ mở rộng và thu nhỏ tùy thuộc vào kích thước của cửa sổ trình duyệt.

const canvas_width = canvas.width = 600
const canvas_height = canvas.height = 600
//canvas sẽ luôn giữ kích thước này không thay đổi, giống như việc bạn có một tấm bảng trắng có kích thước cố định mà không thay đổi khi bạn đặt nó lên bất kỳ bảng nào khác.

const playerImage = new Image()  //Image có sẵn
playerImage.src= "Walk.png";
const spriteWidth = 128;
const spriteHeight = 128;
let frameX = 7
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5

function animate() {
    ctx.clearRect(0, 0, canvas_width, canvas_height)  //dùng để xóa các đối tượng đã được vẽ trên canvas để vẽ lại các đối tượng mới, khong thì các hình ảnh sẽ bị chồng lên nhau và cứ tồn tại mãi ở đó.
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    gameFrame++  //mỗi khi function được gọi thì gameFrame tăng lên
    if (gameFrame % staggerFrames == 0) { //hàm này để điều chỉnh tốc độ nhưng không hiểu cách hoạt động
        if (frameX < 7)  {  //hàm if để chạy animation giữa các frame.
            frameX++;}
        //chuyển sang frame kế tiếp
        else {
            frameX = 0;
        }// Reset frameX về 0 sau khi vượt quá giới hạn
    }


    requestAnimationFrame(animate);  //lặp lại quá trình vẽ và tạo ra hiệu ứng chuyển động liên tục
}


playerImage.onload = function() {
    animate();
};

