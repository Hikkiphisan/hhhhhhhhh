
if (this.Bo_Demm_chay_Frame > this.Muc_gioi_han_thoi_gian_của_mot_frame) {
    if (this.frameX >= this.maxFrame) {
        this.frameX = 0;
    } else {this.frameX++;}
    this.Bo_Demm_chay_Frame= 0;
} else {this.Bo_Demm_chay_Frame += 50}
