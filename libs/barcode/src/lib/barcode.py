import os
import sys
from pdf417 import encode, render_image  # ,render_svg


def generate_barcode(data, dir_path):
    codes = encode(data, columns=12)
    image = render_image(codes)  # Pillow Image object
    image.save(os.path.join(dir_path, 'barcode.jpg'))


generate_barcode(sys.argv[1], sys.argv[2])
