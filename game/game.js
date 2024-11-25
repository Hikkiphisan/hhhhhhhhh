const canvas = document.querySelector('canvas'); //lựa chọn truy vấn thẻ canvas trong html
const ctx = canvas.getContext('2d'); //gọi 2D Context trong HTML5 Canvas

// canvas.width = window.innerWidth;     // cài đặt kích thước của canvas để bằng kích thước của cửa sổ trình duyệt hiện tại.
// canvas.height = window.innerHeight; // cài đặt kích thước của canvas để bằng kích thước của cửa sổ trình duyệt hiện tại.
// //  canvas sẽ mở rộng và thu nhỏ tùy thuộc vào kích thước của cửa sổ trình duyệt.

const canvas_width = canvas.width = 128
const canvas_height = canvas.height = 128
//canvas sẽ luôn giữ kích thước này không thay đổi, giống như việc bạn có một tấm bảng trắng có kích thước cố định mà không thay đổi khi bạn đặt nó lên bất kỳ bảng nào khác.



//create empty array


let images = [];
images.length = 10;

//push the images into array

for(let i = 1 ; i < images.length ; i++){
    images[i] = new Image();
    images[i].src = 'Walk (' + i.toString() + ').png';   //vòng lặp tạo ra tên file ảnh với một huỗi walk[1] ,[2]
}
//Ví dụ, nếu i có giá trị là 0, đoạn mã sẽ tạo ra đường dẫn 'Walk (0).png'. Nếu i có giá trị là 1, đoạn mã sẽ tạo ra đường dẫn 'Walk (1).png', và cứ tiếp tục như vậy.


let i = 1;
setInterval(function(){  //setInterval dùng để thiết lập một vòng lặp tự động
    i++;
    if( i >= 10){   //nếu i tăng liên tục cho đến khi vượt quá 10 thì i sẽ bằng 1 và quay lại lặp từ số 1 đến vĩnh cửu
        i = 1;
    }
    ctx.drawImage(images[i],100,100,canvas_width,canvas_height);
    //phương thức drawImage được dùng để vẽ hình ảnh lên canvas ở vị trí x,y:100,100 và kích thước z,x: 100,100, với timeout là 100ms thì nó sẽ nhảy sang hnh tiếp theo
},100)