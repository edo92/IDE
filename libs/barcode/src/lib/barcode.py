import os
import sys
import json
from pdf417 import encode, render_image  # ,render_svg


input_form = sys.argv[2]
directory_path = sys.argv[1]


def json_to_code():
    code_list = []
    form = json.loads(input_form)
    
    return '\n'.join(code_list)


def generate_barcode(dir_path):
    code = json_to_code()
    codes = encode(code, columns=12)
    image = render_image(codes)  # Pillow Image object
    image.save(dir_path + 'barcode.jpg')
    
generate_barcode(sys.argv[1])
