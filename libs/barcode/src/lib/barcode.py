import os
import sys
import json
import code128
from pdf417 import encode, render_image 


input_form = sys.argv[2]
directory_path = sys.argv[1]

class PDF417_Code:
    code_list = []

    def __init__(self, input_form):
        self.input_form = input_form

    def generate(self, db_number):
        form = json.loads(self.input_form)
        self.code_list.append('@')
        self.code_list.append('@  ANSI'+db_number)
        
        self.code_list.append('DCBNONE')
        self.code_list.append('DCDNONE')
        self.code_list.append('DBA02252020')

        self.code_list.append('DCS'+form['lastName']);   
        self.code_list.append('DAC'+form['firstName']);    
        self.code_list.append('DAD'+form['middleName']);   

        return '\n'.join(self.code_list)
    
    
class BarcodeGenerator:
    def __init__(self, directory_path):
        self.barcode_1d_name = os.path.join(
            directory_path, 'barcode-1d')

        self.barcode_2d_name = os.path.join(
            directory_path, 'barcode-2d')


    # 2D barcode
    def generate_barcode_2d(self, code):
        codes = encode(code, columns=12)
        image = render_image(codes)  # Pillow Image object
        image.save(self.barcode_2d_name+'.jpg')


    # 1D barcode
    def generate_barcode_1d(self, code):
        code128.image(self.barcode_1d_name).save(
            self.barcode_1d_name+'.png')  # with PIL present

        with open(self.barcode_1d_name+".svg", "w") as f:
            f.write(code128.svg(code))

        os.remove(self.barcode_1d_name+".svg")



# Run
rawcode = PDF417_Code(input_form)
barcode = BarcodeGenerator(directory_path)

# Generated
auto_generated_code =''
code = rawcode.generate(auto_generated_code)

# Barcode
barcode.generate_barcode_2d(code)
barcode.generate_barcode_1d(auto_generated_code)
