function selectFileImage(fileObj) {
    var file = fileObj.files['0'];
    //图片方向角 added by lzk
    var Orientation = null;

    if (file) {
        console.log("正在上传,请稍后...");
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
        if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);
            return;
        }
        // var URL = URL || webkitURL;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function () {
            // alert(EXIF.pretty(this));
            EXIF.getAllTags(this);
            //alert(EXIF.getTag(this, 'Orientation')); 
            Orientation = EXIF.getTag(this, 'Orientation');
            //return;
        });

        var oReader = new FileReader();
        oReader.onload = function (e) {
            //var blob = URL.createObjectURL(file);
            //_compress(blob, file, basePath);
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;

                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                alert(expectWidth + ',' + expectHeight);
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                alert(canvas.width + ',' + canvas.height);

                var base64 = null;
                var mpImg = new MegaPixImage(image);
                mpImg.render(canvas, {
                    maxWidth: 800,
                    maxHeight: 1200,
                    quality: 0.8,
                    orientation: Orientation
                });

                base64 = canvas.toDataURL("image/jpeg", 0.8);

                //uploadImage(base64);

                $("#preview").attr("src", base64);

                $("#pg13_0").css("background-image", "url(img/p2.png)");
                $("#pg13_2").show();
                $("#pg13_4").show();
                var $info = $('#info'), $zhiwen = $('#zhiwen'), $line = $('#line');
                $info.stop().text('检测中...');
                $line.stop().show();
                document.querySelector('#line').addEventListener('webkitAnimationEnd', function () {
                    $info.text('检测完成');
                    $line.hide();
                    setTimeout(function () {
                        $info.text('');
                        //callback
                    }, 1000);
                }, false);
            };
        };
        oReader.readAsDataURL(file);
    }
}

