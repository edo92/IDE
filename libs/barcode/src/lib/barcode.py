import os
import sys
import json
from pdf417 import encode, render_image  # ,render_svg


input_form = sys.argv[2]
directory_path = sys.argv[1]


def json_to_code():
    code_list = []
    form = json.loads(input_form)
    code_list.append('@')
    code_list.append('@  ANSI 636014040002DL00410288ZC03290048DLDCAC')
    
    code_list.append('DCBNONE')
    code_list.append('DCDNONE')
    code_list.append('DBA02252020')

    code_list.append('DCS'+form['lastName']);   
    code_list.append('DAC'+form['firstName']);    
    code_list.append('DAD'+form['middleName']);    
    return '\n'.join(code_list)


def generate_barcode(dir_path):
    code = json_to_code()
    codes = encode(code, columns=12)
    image = render_image(codes)  # Pillow Image object
    image.save(dir_path + 'barcode.jpg')
    
generate_barcode(sys.argv[1])
