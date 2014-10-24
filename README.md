secretor
========

simple file encoder and decoder

简单的文件加密解密工具

Usage
--------

`secretor [-e|-d] -k key input_file output_file`

* -e --encode encode input file 加密文件
* -d --decode decode input file 解密文件
* -k --key key to encode or decode file 加密或解密需要的密钥
* input_file 输入的文件
* output_file 输出的文件

Todo
--------

* input_file and output_file can be `wildcard` such as `*`
  (支持文件名使用通配符批量加密解密)
