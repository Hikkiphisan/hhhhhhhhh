window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let arraykedich = [];
    let bienscore = 0;
    let gameover = false;
    class Nhapnutbanphim {
        constructor() {
            this.array_keys = []
            window.addEventListener('keydown', sukien => {
                if ((sukien.key === 'ArrowDown' ||
                     sukien.key === 'ArrowUp'   ||
                     sukien.key === 'ArrowLeft' ||
                     sukien.key === 'ArrowRight')
                  && this.array_keys.indexOf(sukien.key) === -1)
                    {this.array_keys.push(sukien.key);}

            });

            window.addEventListener('keyup', sukien => {
                if (sukien.key === 'ArrowDown' ||
                    sukien.key === 'ArrowUp' ||
                    sukien.key === 'ArrowLeft' ||
                    sukien.key === 'ArrowRight') {
                    this.array_keys.splice(this.array_keys.indexOf(sukien.key), 1);
                }
                console.log(sukien.key, this.array_keys);
            })
        }
    }

    class nhanvatchinh {
        constructor(ChieuRong_KhungGame, ChieuDai_KhungGame) {
            this.ChieuRong_KhungGame = ChieuRong_KhungGame;     //gameWidth và gameHeight là không gian của trò chơi hoạt động
            this.ChieuDai_KhungGame = ChieuDai_KhungGame;
            this.ChieuRong_NhanVat = 128;
            this.ChieuDai_NhanVat = 128;
            this.x = 0;
            this.y = 128
            this.link_hinhanh = document.getElementById('nhanvatchinh');


            //để chạy hoạt hoạ
            this.frameX = 0;
            this.maxFrame = 7;
            this.frameY = 3;
            this.fps = 20;
            this.Bo_Demm_chay_Frame = 0;
            this.Muc_gioi_han_thoi_gian_của_mot_frame = 1000/this.fps

            this.toc_do = 0;
            this.buocnhayy = 0

        }

        draw(noidung) {
            noidung.drawImage(this.link_hinhanh,
                              this.frameX * this.ChieuRong_NhanVat,
                              this.frameY * this.ChieuDai_NhanVat,
                              this.ChieuRong_NhanVat,
                              this.ChieuDai_NhanVat,
                              this.x,
                              this.y,
                              this.ChieuRong_NhanVat,
                              this.ChieuDai_NhanVat)
        }
        update(nhapnut, khoangthoigian_kethu_tieptheo_xuathien, arraykedich) {


            //xảy ra va chạm
            arraykedich.forEach(enemy => {
                const khoangcach_ToaDo_x_giua_2_DoiTuong = enemy.x - this.x;
                const khoangcach_ToaDo_y_giua_2_DoiTuong = enemy.y - this.y;
                const khoangcach_giua_nguoichoi_va_kethu =
                    Math.sqrt(khoangcach_ToaDo_x_giua_2_DoiTuong * khoangcach_ToaDo_x_giua_2_DoiTuong
                               + khoangcach_ToaDo_y_giua_2_DoiTuong * khoangcach_ToaDo_y_giua_2_DoiTuong);
               //định lý Py ta go

                if (khoangcach_giua_nguoichoi_va_kethu < enemy.ChieuRong_NhanVat/20 + this.ChieuRong_NhanVat/20) {
                    gameover = true;
                }
            })



            // điều kiện để chạy hoạt hoạ
            if (this.Bo_Demm_chay_Frame > this.Muc_gioi_han_thoi_gian_của_mot_frame) {
                if (this.frameX >= this.maxFrame) {
                    this.frameX = 0;
                } else {this.frameX++;}
                    this.Bo_Demm_chay_Frame= 0;
            } else {this.Bo_Demm_chay_Frame += 50}

            this.x += this.toc_do;

            if (nhapnut.array_keys.indexOf('ArrowRight') > -1) {
                this.toc_do = 5
            } else if(nhapnut.array_keys.indexOf('ArrowLeft') > -1) {
                this.toc_do = -5

            } else if (nhapnut.array_keys.indexOf('ArrowUp') > -1 && this.trenmatdat()) { //thoả mãn điều kiện ấn duy nhất một nút và nhân vật phải ở trên mặt đất)
                let music  = new Howl ({
                    src: ['tuturu_1.mp3']
                });
                music.play();
                this.buocnhayy -= 45;
            } else {
                this.toc_do = 0;
            }

            this.y += this.buocnhayy;

            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x > this.ChieuRong_KhungGame) {
                this.x = -30
            }

            if (!this.trenmatdat()) {
                this.buocnhayy ++
                this.frameY = 2
            } else {
                this.frameY = 0
            }

            if(this.y >  (this.ChieuDai_KhungGame - 60) - this.ChieuDai_NhanVat) {
                this.y = (this.ChieuDai_KhungGame - 60)- this.ChieuDai_NhanVat
            }

        }
        trenmatdat() {
            return this.y >= (this.ChieuDai_KhungGame - 60) - this.ChieuDai_NhanVat;  //để trả lại true false xác định rõ ràng nhân vật đang đứng trên mặt đấy ở mép trái bên dưới cùng.
        }


    }

    class background {
        constructor(gameWidth, gameHeight) {
            this.link_HinhAnh = document.getElementById("background");
            this.x = 0;
            this.y = 0;
            this.Chieurong_khung_nen = 2000;
            this.Chieudai_khung_nen = 725;
            this.tocdo = 4;

        }
        draw(noidung) {
            noidung.drawImage(this.link_HinhAnh,
                              this.x,
                              this.y,
                              this.Chieurong_khung_nen,
                              this.Chieudai_khung_nen);
            noidung.drawImage(this.link_HinhAnh,
                              this.x + this.Chieurong_khung_nen,
                              this.y,
                              this.Chieurong_khung_nen,
                              this.Chieudai_khung_nen);

        }
        update() {
            this.x -= this.tocdo;
            if (this.x < 0 - this.Chieurong_khung_nen) {
                this.x = 0
            }
        }}

    class class_enemy {
        constructor(gameWdth, gameHeight) {
            this.ChieuRong_KhungGame = gameWdth;
            this.ChieuDai_KhungGame = gameHeight;
            this.ChieuRong_NhanVat = 128;
            this.ChieuDai_NhanVat = 128;
            this.link_hinhAnh = document.getElementById("kedich2");
            this.x = this.ChieuRong_KhungGame + 200;   //điểm xuất phát của kẻ thù, nếu để this.gameWidth - 100 tức là con quái sẽ xuất phát từ bên ngoài canvas với khoảng cách 100 so vói mép bên phải.
            this.y = (this.ChieuDai_KhungGame - 60) - this.ChieuDai_NhanVat;
            this.frameX = 0;
            this.maxframe = 17
            this.fps = 20;
            this.Bo_Demm_chay_Frame = 0;
            this.Muc_gioi_han_thoi_gian_của_mot_frame  = 10/this.fps;
            this.speed = 4;
            this.loaibo_Kethu_vuotqua_khoi_array = false;
        }

        draw(noidung) {
            noidung.drawImage(this.link_hinhAnh,
                              this.frameX * this.ChieuRong_NhanVat,
                              0,
                              this.ChieuRong_NhanVat,
                              this.ChieuDai_NhanVat,
                              this.x,
                              this.y,
                              this.ChieuRong_NhanVat,
                              this.ChieuDai_NhanVat)
        }
        update() {
            if (this.Bo_Demm_chay_Frame > this.Muc_gioi_han_thoi_gian_của_mot_frame) {
                if (this.frameX >= this.maxframe) this.frameX = 0;
                else {this.frameX++;
                }
                this.Bo_Demm_chay_Frame = 0;
            } else {
                this.Bo_Demm_chay_Frame ++;
            }
            this.x -= this.speed;

            if (this.x < 0 - this.ChieuRong_NhanVat) {
                this.loaibo_Kethu_vuotqua_khoi_array = true;
                bienscore++
            }
        }
    }

    function taothemnhieukedich(khoang_cach_time_giua_now_va_last) {
        if (bodemthoigiankethu > khoangthoigian_kethu_tieptheo_xuathien + ngaunhien_kethu_tieptheo_xuathien) {
            arraykedich.push(new class_enemy(canvas.width, canvas.height));
            ngaunhien_kethu_tieptheo_xuathien = Math.random() * 10000 + 500
            bodemthoigiankethu = 0
        } else {
            bodemthoigiankethu += khoang_cach_time_giua_now_va_last
        }
        arraykedich.forEach(phantu_enemy => {
            phantu_enemy.draw(ctx);
            phantu_enemy.update(khoang_cach_time_giua_now_va_last);
        });
        arraykedich = arraykedich.filter(phantu_enemy => !phantu_enemy.loaibo_Kethu_vuotqua_khoi_array)
    }

    function hienthi_DiemSo(context) {
        context.fillStyle = 'black';
        context.font = "40px Helvetica";
        context.fillText("Điểm Số: " + bienscore, 20, 50);

        if (gameover) {  //neugameover trả ra true thì chạy những thứ trong này.
            context.textAlign = "center";
            context.font = "50px Arial"
            context.fillStyle = 'green';
            context.fillText("Bạn chơi gà thật đấy!", canvas.width -400, 200);

        }
    }

    const nhapnut = new Nhapnutbanphim();
    const nguoichoi = new nhanvatchinh(canvas.width, canvas.height);  //cao và rộng của canvas để gán vào biến gameWidth và gameHeight.
    const phongnen = new background(canvas.width, canvas.height);
    let moc_thoi_gian_chay_obj_truoc_do = 0
    let bodemthoigiankethu = 0;   //
    let khoangthoigian_kethu_tieptheo_xuathien =  10   //thêm kẻ thù mới cứ sau 1000 ml giây, 1 giây bằng 1000ml giây
    let ngaunhien_kethu_tieptheo_xuathien = Math.random() * 1000 + 500 //mathramdom() đang chạy ngẫu nhiên từ 0 đến 1 trong ngoặc kép.
    //tức là chạy ngẫu nhiên từ 500 đến 1000
    // Khi nhân với 1000 (Math.random() * 1000), ta có được một số ngẫu nhiên từ 0 đến 1000 (bao gồm 0 nhưng không bao gồm 1000).

    function animate(dau_moc_thoi_gian_now) {   //tác dụng như vòng lặp, vứt cái gì vào đây là nó lặp lại theo quy trình, 60s mỗi frame
        const khoang_cach_time_giua_now_va_last = dau_moc_thoi_gian_now - moc_thoi_gian_chay_obj_truoc_do
        moc_thoi_gian_chay_obj_truoc_do = dau_moc_thoi_gian_now

        ctx.clearRect(0,0, canvas.width, canvas.height)
        phongnen.draw(ctx);  //đặt nền lên trước giông như xếp layer ấy
        phongnen.update();
        nguoichoi.draw(ctx);  //ctx này lấy ở dòng 3 để vẽ 2d với hình như noidung miêu tả.
        nguoichoi.update(nhapnut, khoang_cach_time_giua_now_va_last, arraykedich);
        taothemnhieukedich(khoang_cach_time_giua_now_va_last);
        hienthi_DiemSo(ctx);
        if (!gameover)  //nếu không phải là game over
            //tác dụng gần giống return và break, nếu "không phải là game over" trả về true thì tiếp tục lặp lại animate, còn nếu trả false tức là game đã kết thúc, không cần tiếp tục vòng lặp hoạt hình nữa.

            requestAnimationFrame(animate);


    }
    animate(0);


})

