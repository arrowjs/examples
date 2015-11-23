Arrowjs.io examples
==================
To run Demo Upload-Blueimp example:
```sh
git clone https://github.com/arrowjs/examples.git
cd examples
cd Upload-Blueimp
npm install i
node server.js
```
Open web browser then navigate to http://localhost:8000


Giới thiệu ví dụ Upload-Blueimp được lấy mẫu từ ví dụ : https://blueimp.github.io/jQuery-File-Upload/

- Ở demo gốc module được sử dụng để thực hiện việc nhận file upload là module blueimp-file-upload-expressjs những hiện tại vì lý do cài đặt gặp lỗi lên không sử dụng

- Ở demo này module được sử dụng để hỗ trợ việc upload từ phía client là jquery-file-upload-middleware có link : https://github.com/aguidrevitch/jquery-file-upload-middleware

- Giới thiệu về : jquery-file-upload-middleware

    jquery-file-upload-middleware : là một module hỗ trợ việc nhận upload file dựa trên code của jQuery-File-Upload
    Cở bản để sử dụng module này : 
    + Bước 1 : Cài đặt : npm install jquery-file-upload-middleware
    + Bước 2 : Khai báo một đối tượng và cấu hình ban đầu cho nó :
    
    ~~~javascrip
        var  upload = require('jquery-file-upload-middleware'); 
            upload.configure({
                uploadDir: __dirname + '/public/uploads',
                uploadUrl: '/uploads',
                imageVersions: {
                    thumbnail: {
                        width: 80,
                        height: 80
                    }
                }
           });
    ~~~~   
       Ở đây có một số thông số cơ bản : 
            uploadDir : Khai báo đường dẫn để lưu file khi được client upload lên server
            uploadUrl : Khai báo một Url để server trả về phía client để sử lý tiếp (trong ví dụ chưa dùng tới)
            imageVersions : Khai báo các thông số để trả về một ảnh thu nhỏ
            
    + Bước 3 : Để sử dụng được chức năng nhận file upload bạn cần viết câu lệnh sau vào function nhận sự kiện upload của bạn 
        Ví dụ : 

        ~~~javascrip
            var application = new Arrow();
                application.use('/upload', function (req, res, next) {
                        // imageVersions are taken from upload.configure()
                        upload.fileHandler({
                            uploadDir: function () {
                                return <đường dẫn đến thư mục bạn muốn upload >
                            },
                            uploadUrl: function () {
                                return '/uploads/' + <tên file bạn muốn phía client xử lý>
                            }
                        })(req, res, next);
                });
        ~~~


       	Ở đây router mình nhận sử lý là /upload . Khi người dùng upload file theo đường dẫn này thì hàm sẽ được xử lý
                File upload lên sẽ được lưu vào theo cấu hình cua bạn tại  uploadDir
                Đường link để phía client nhận lại bạn khai báo tại  uploadUrl (có thể không khai báo nếu bạn không cần nhận lại thông tin này)
                Các đối số cần cung cấp gồm  req, res, next
                
        Đây là một ví dụ cơ bản : ngoài ra bạn có thể tham khảo tại link nguồn sẽ có nhiều config nâng cao hơn như : upload.fileManager().getFiles();
      
    + Bước 4 : Khai báo phía view html cơ bản để có thể đẩy file upload lên server đã được config như trên gồm có :
        Ví dụ ở đây được lấy ở view basic trong ví dụ Upload-Blueimp để dễ hình dung :
        Nhưng thành phàn quan trọng để view có thể upload lên server gồm có : 
            - thẻ : <input id="fileupload" type="file" name="files[]" multiple>    
            - một đoạn javascript để xử lý sự kiện cho thẻ input có id="fileupload" và name="files[]"


              	$(function () {
                  'use strict';
                  // Change this to the location of your server-side upload handler:
                  var url = '/upload';
                  $('#fileupload').fileupload({
                      url: url,
                      dataType: 'json',
                      done: function (e, data) {
                          $.each(data.result.files, function (index, file) {
                              $('<p/>').text(file.name).appendTo('#files');
                          });
                      },
                      progressall: function (e, data) {
                          var progress = parseInt(data.loaded / data.total * 100, 10);
                          $('#progress .progress-bar').css(
                              'width',
                              progress + '%'
                          );
                      }
                  }).prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');
              });
              

        Ở đây dữ liệu được upload lên theo url = '/upload';
        Kiểu dữ liệu là  dataType: 'json',
        Ở ví dụ basic file được upload tự động theo mặc định, còn nếu bạn không muốn upload tự động bạn thiết lập thuộc tính autoUpload: false như ví dụ basic-plus
        Sau khi upload xong dữ liệu server trả về client sẽ được nhận tại 

                    done: function (e, data) {
                        $.each(data.result.files, function (index, file) {
                            $('<p/>').text(file.name).appendTo('#files');
                        });
                    }

		 Thông tin file upload được trả về tại đối số file (bạn có thể console.log(file) để biết thêm chi tiết )
		 Đối tượng progressall để nhận lại tiến trình upload file dùng hiển thị ra progress-bar
        Bạn có thể đọc thêm demo theo link trên để biết thêm một số cấu hình khác nâng cao hơn